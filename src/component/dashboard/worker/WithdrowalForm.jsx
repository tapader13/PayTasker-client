import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const paymentSystems = ['Bkash', 'Rocket', 'Nagad', 'PayPal'];

export default function WithdrowalForm({
  workerEmail,
  workerName,
  availableCoins,
}) {
  const [coinsToWithdraw, setCoinsToWithdraw] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0.0);
  const [paymentSystem, setPaymentSystem] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
  const handleCoinsChange = (e) => {
    const coins = parseInt(e.target.value, 10);
    setCoinsToWithdraw(coins);
    setWithdrawalAmount((coins / 20 || 0).toFixed(2));
  };
  // console.log(coinsToWithdraw, withdrawalAmount);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const withdrowData = {
        worker_email: workerEmail,
        worker_name: workerName,
        withdrawal_coin: coinsToWithdraw,
        withdrawal_amount: withdrawalAmount,
        payment_system: paymentSystem,
        withdraw_date: new Date().toISOString(),
        status: 'pending',
      };
      const response = await axiosSecure.post(
        '/worker-withdrawals',
        withdrowData
      );

      if (response?.data?.success) {
        toast.success(response.data?.message);
        setCoinsToWithdraw(0);
        setWithdrawalAmount(0.0);
        setPaymentSystem('');
        setAccountNumber('');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canWithdraw =
    availableCoins >= 200 &&
    coinsToWithdraw >= 200 &&
    coinsToWithdraw <= availableCoins;

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label
          htmlFor='coinsToWithdraw'
          className='mb-2 block text-sm font-medium dark:text-gray-300 text-gray-700'
        >
          Coins to Withdraw
        </label>
        <input
          type='number'
          id='coinsToWithdraw'
          value={coinsToWithdraw}
          onChange={handleCoinsChange}
          min={200}
          max={availableCoins}
          className='mt-1 block w-full dark:bg-gray-700 dark:text-white rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00838C] focus:outline-none focus:ring-1 focus:ring-[#00838C] sm:text-sm'
          required
        />
      </div>
      <div>
        <label
          htmlFor='withdrawalAmount'
          className='mb-2 block text-sm font-medium dark:text-gray-300 text-gray-700'
        >
          Withdrawal Amount ($)
        </label>
        <input
          type='number'
          id='withdrawalAmount'
          value={withdrawalAmount}
          className='mt-1 block w-full rounded-md border border-gray-300 dark:bg-gray-700 dark:text-white bg-gray-100 px-3 py-2 shadow-sm sm:text-sm'
          readOnly
        />
      </div>
      <div>
        <label
          htmlFor='paymentSystem'
          className='mb-2 block text-sm dark:text-gray-300 font-medium text-gray-700'
        >
          Select Payment System
        </label>
        <select
          id='paymentSystem'
          value={paymentSystem}
          onChange={(e) => setPaymentSystem(e.target.value)}
          className='mt-1 dark:bg-gray-700 dark:text-white block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00838C] focus:outline-none focus:ring-1 focus:ring-[#00838C] sm:text-sm'
          required
        >
          <option value=''>Select a payment system</option>
          {paymentSystems.map((system) => (
            <option key={system} value={system}>
              {system}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor='accountNumber'
          className='mb-2 block dark:text-gray-300 text-sm font-medium text-gray-700'
        >
          Account Number
        </label>
        <input
          type='text'
          id='accountNumber'
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className='mt-1 dark:bg-gray-700 dark:text-white block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00838C] focus:outline-none focus:ring-1 focus:ring-[#00838C] sm:text-sm'
          required
        />
      </div>

      {canWithdraw ? (
        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex w-full items-center justify-center rounded-md bg-tertiary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-tertiaryhover focus:outline-none focus:ring-2 focus:ring-[#00838C] focus:ring-offset-2 disabled:bg-gray-400'
        >
          {isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Processing...
            </>
          ) : (
            'Withdraw'
          )}
        </button>
      ) : (
        <p className='text-center text-sm text-red-600'>
          Insufficient coins. Minimum withdrawal is 200 coins.
        </p>
      )}
    </form>
  );
}
