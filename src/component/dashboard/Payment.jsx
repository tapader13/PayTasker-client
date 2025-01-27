import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import useAuth from '../../hooks/useAuth';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
  const { user } = useAuth();
  return (
    <div className='max-w-xl space-y-20 mx-auto mt-10'>
      {' '}
      <div>
        <h1 className='text-xl font-bold mb-5'>Payment Using Stripe</h1>
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
          <button className='w-full px-4 py-2 bg-tertiary text-white mt-4'>
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
