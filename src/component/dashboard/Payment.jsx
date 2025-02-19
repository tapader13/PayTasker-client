import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
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

  const handleSsl = async () => {
    const payment = {
      email: user?.email,
      transactionId: '',
      price: price,
      date: new Date(),
      coins: coins,
      status: 'pending',
    };
    const response = await axiosSecure.post('/create-ssl-payment', payment);
    if (response?.data?.gatewayUrl) {
      window.location.replace(response?.data?.gatewayUrl);
    }
    console.log(response, 'success');
  };
  return (
    <div className='max-w-xl space-y-20 mx-auto mt-10'>
      {' '}
      <div>
        <h1 className='text-xl dark:text-white font-bold mb-5'>
          Payment Using Stripe
        </h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      <div>
        <h1 className='text-xl font-bold mb-5'>Payment Using SSLCOMMERZ</h1>
        <div className='border p-4'>
          <input
            className='w-full p-2 border'
            type='email'
            name='email'
            readOnly
            defaultValue={user?.email}
            id=''
          />
          <button
            onClick={handleSsl}
            className='w-full px-4 py-2 bg-tertiary text-white mt-4'
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
