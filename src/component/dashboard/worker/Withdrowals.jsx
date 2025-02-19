import { Loader2, AlertCircle, DollarSign } from 'lucide-react';
import WithdrowalForm from './WithdrowalForm';
import useUserInfo from '../../../hooks/useUserInfo';

export default function Withdrawals() {
  //   useEffect(() => {
  //     fetchWorkerData();
  //   }, []);
  const { userInfo } = useUserInfo();
  // console.log(userInfo, 1);

  //   if (isLoading) {
  //     return (
  //       <div className='flex h-[60vh] items-center justify-center'>
  //         <Loader2 className='h-10 w-10 animate-spin text-tertiary' />
  //       </div>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
  //         <AlertCircle className='h-10 w-10 text-red-500' />
  //         <h2 className='mt-4 text-xl font-semibold'>
  //           Error loading worker data
  //         </h2>
  //         <p className='mt-2 text-gray-600'>{error}</p>
  //       </div>
  //     );
  //   }

  const withdrawalAmount = userInfo && (userInfo.coins / 20).toFixed(2);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold dark:text-white'>Withdrawals</h1>
      <div className='mb-8 grid gap-6 md:grid-cols-2'>
        <div className='rounded-lg border bg-white dark:bg-gray-700 p-6 shadow-sm'>
          <h2 className='mb-4 text-xl dark:text-gray-200 font-semibold'>
            Total Earnings
          </h2>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Available Coins
              </p>
              <p className='text-2xl font-bold dark:text-white text-tertiary'>
                {userInfo?.coins}
              </p>
            </div>
            <div>
              <p className='text-sm dark:text-gray-300 text-gray-600'>
                Withdrawal Amount
              </p>
              <p className='text-2xl font-bol dark:text-white text-tertiary'>
                <DollarSign className='mr-1 inline h-6 w-6' />
                {withdrawalAmount}
              </p>
            </div>
          </div>
        </div>
        <div className='rounded-lg border dark:bg-gray-700 bg-white p-6 shadow-sm'>
          <h2 className='mb-4 text-xl dark:text-white font-semibold'>
            Withdrawal Form
          </h2>
          <WithdrowalForm
            workerEmail={userInfo?.email}
            workerName={userInfo?.name}
            availableCoins={userInfo?.coins}
          />
        </div>
      </div>
    </div>
  );
}
