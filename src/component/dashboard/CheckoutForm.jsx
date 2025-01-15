import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAuth from './../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import useUserInfo from './../../hooks/useUserInfo';
import { useLocation, useNavigate } from 'react-router';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [err, setErr] = useState('');
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const { refetchUser } = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const [coins, setCoins] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryCoins = params.get('coins');
    const queryPrice = params.get('price');

    if (queryCoins && queryPrice) {
      setCoins(Number(queryCoins));
      setPrice(Number(queryPrice));
    } else {
      navigate('/dashboard/purchase');
    }
  }, [location.search, navigate]);
  useEffect(() => {
    if (!price) return;
    axiosSecure
      .post('/create-payment-intent', {
        price: price,
      })
      .then((response) => {
        console.log(
          'Payment intent client secret from server:',
          response.data?.clientSecret
        );
        setClientSecret(response.data?.clientSecret);
      });
  }, [axiosSecure, price]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      // console.log('[error]', error);
      setErr(error.message);
    } else {
      // console.log('[PaymentMethod]', paymentMethod);
      setErr('');
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'Anonymous',
            email: user?.email || 'unknown',
            address: {
              line1: '123 Main St', // Replace with actual data
              city: 'Mumbai', // Replace with actual data
              state: 'MH', // Replace with actual data
              postal_code: '400001', // Replace with actual data
              country: 'IN', // Replace with actual data
            },
          },
        },
      });

    if (confirmError) {
      // console.log(confirmError, 'confirm err');
      setErr(confirmError.message);
      return;
    } else {
      // console.log(paymentIntent, 'payment intent');
      if (paymentIntent.status === 'succeeded') {
        setPaymentIntentId(paymentIntent.id);
        const payment = {
          email: user?.email,
          transactionId: paymentIntent.id,
          price: price,
          date: new Date(),
          coins: coins,
          status: paymentIntent.status,
        };
        const response = await axiosSecure.post('/payment', payment);
        if (response?.data?.success) {
          // console.log(response?.data?.message);
          toast.success(response?.data?.message);
          refetchUser();
          //   refetch();
          //   navigate('/dashboard/payment-history');
        } else {
          // console.log(response?.data?.message);
          toast.error(response?.data?.message);
        }
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button
        className='bg-[#BB8506] text-white px-4 py-2 mt-4'
        type='submit'
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      {err && <p className='text-red-500'>{err}</p>}
      {paymentIntentId && (
        <p className='text-green-500'>
          Payment Successful. Your Payment Id: {paymentIntentId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
