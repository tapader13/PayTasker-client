import PricingCard from './PricingCard';

const Parchase = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold dark:text-white'>Purchase Coins</h1>
        <p className='mt-2 dark:text-gray-300 text-gray-600'>
          Select a coin package to get started with tasks
        </p>
      </div>
      <PricingCard />
    </div>
  );
};

export default Parchase;
