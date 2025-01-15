import { useState } from 'react';
import { Coins } from 'lucide-react';
import { Link } from 'react-router';

const pricingPlans = [
  { coins: 10, price: 1, popular: false },
  { coins: 150, price: 10, popular: true },
  { coins: 500, price: 20, popular: false },
  { coins: 1000, price: 35, popular: false },
];

export default function PricingCard() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async (coins, price) => {
    // try {
    //   setIsLoading(true);
    //   const response = await fetch('/api/create-checkout-session', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       coins,
    //       price,
    //     }),
    //   });
    //   const { sessionId } = await response.json();
    //   const stripe = await stripePromise;
    //   // Redirect to Stripe Checkout
    //   const { error } = await stripe.redirectToCheckout({
    //     sessionId,
    //   });
    //   if (error) {
    //     console.error('Error:', error);
    //     alert('Payment failed. Please try again.');
    //   }
    // } catch (err) {
    //   console.error('Error:', err);
    //   alert('Something went wrong. Please try again.');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
      {pricingPlans.map((plan) => (
        <div
          key={plan.coins}
          className={`relative rounded-lg border bg-white p-6 shadow-sm transition-transform hover:scale-105 ${
            plan.popular
              ? 'border-[#00838C] ring-2 ring-[#00838C]'
              : 'border-gray-200'
          }`}
        >
          {plan.popular && (
            <div className='absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#00838C] px-3 py-1 text-xs font-semibold text-white'>
              Most Popular
            </div>
          )}

          <div className='text-center'>
            <Coins className='mx-auto h-8 w-8 text-[#00838C]' />
            <h3 className='mt-4 text-3xl font-bold'>{plan.coins}</h3>
            <p className='text-sm text-gray-500'>coins</p>
          </div>

          <div className='my-6 border-t border-gray-100' />

          <div className='text-center'>
            <p className='text-4xl font-bold'>${plan.price}</p>
            <p className='mt-1 text-sm text-gray-500'>one-time payment</p>
          </div>

          <Link to={`/dashboard/payment`}>
            <button
              onClick={() => handlePurchase(plan.coins, plan.price)}
              disabled={isLoading}
              className='mt-6 w-full rounded-lg bg-[#00838C] px-4 py-2 text-white transition-colors hover:bg-[#006d75] disabled:bg-gray-400'
            >
              {isLoading ? 'Processing...' : 'Purchase Now'}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
