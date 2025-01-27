import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
const Payment = () => {
  return (
    <div className='max-w-xl space-y-20 mx-auto mt-10'>
      {' '}
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      <div>
        <input className='w-full' type='email' name='email' id='' />
        <button>Submit</button>
      </div>
    </div>
  );
};

export default Payment;
