import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const paymentSystems = ['Bkash', 'Rocket', 'Nagad', 'PayPal'];

export default function WithdrowalForm({
  workerEmail,
  workerName,
  availableCoins,
}) {
  const [coinsToWithdraw, setCoinsToWithdraw] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('0.00');
  const [paymentSystem, setPaymentSystem] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleCoinsChange = (e) => {
    const coins = parseInt(e.target.value, 10);
    setCoinsToWithdraw(coins);
    setWithdrawalAmount((coins / 20 || 0).toFixed(2));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/withdrawals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          worker_email: workerEmail,
          worker_name: workerName,
          withdrawal_coin: coinsToWithdraw,
          withdrawal_amount: withdrawalAmount,
          payment_system: paymentSystem,
          account_number: accountNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit withdrawal request');
      }

      setSuccess(true);
      setCoinsToWithdraw('');
      setWithdrawalAmount('0.00');
      setPaymentSystem('');
      setAccountNumber('');
    } catch (err) {
      setError(err.message);
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
          className='mb-2 block text-sm font-medium text-gray-700'
        >
          Coins to Withdraw
        </label>
        <input
          type='number'
          id='coinsToWithdraw'
          value={coinsToWithdraw}
          onChange={handleCoinsChange}
          min='200'
          max={availableCoins}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00838C] focus:outline-none focus:ring-1 focus:ring-[#00838C] sm:text-sm'
          required
        />
      </div>
      <div>
        <label
          htmlFor='withdrawalAmount'
          className='mb-2 block text-sm font-medium text-gray-700'
        >
          Withdrawal Amount ($)
        </label>
        <input
          type='text'
          id='withdrawalAmount'
          value={withdrawalAmount}
          className='mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 shadow-sm sm:text-sm'
          readOnly
        />
      </div>
      <div>
        <label
          htmlFor='paymentSystem'
          className='mb-2 block text-sm font-medium text-gray-700'
        >
          Select Payment System
        </label>
        <select
          id='paymentSystem'
          value={paymentSystem}
          onChange={(e) => setPaymentSystem(e.target.value)}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00838C] focus:outline-none focus:ring-1 focus:ring-[#00838C] sm:text-sm'
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
          className='mb-2 block text-sm font-medium text-gray-700'
        >
          Account Number
        </label>
        <input
          type='text'
          id='accountNumber'
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#00838C] focus:outline-none focus:ring-1 focus:ring-[#00838C] sm:text-sm'
          required
        />
      </div>
      {error && (
        <div className='rounded-md bg-red-50 p-4 text-sm text-red-700'>
          {error}
        </div>
      )}
      {success && (
        <div className='rounded-md bg-green-50 p-4 text-sm text-green-700'>
          Your withdrawal request has been submitted successfully!
        </div>
      )}
      {canWithdraw ? (
        <button
          type='submit'
          disabled={isSubmitting}
          className='inline-flex w-full items-center justify-center rounded-md bg-[#00838C] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#006d75] focus:outline-none focus:ring-2 focus:ring-[#00838C] focus:ring-offset-2 disabled:bg-gray-400'
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
