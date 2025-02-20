// import { useState, useEffect } from 'react';
// import { Search, ArrowUpDown, Loader2 } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import moment from 'moment';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

export default function PaymentHistoryPage() {
  const axiosSecure = useAxiosSecure();
  //   const [sortConfig, setSortConfig] = useState({
  //     key: 'date',
  //     direction: 'desc',
  //   });
  //   const [searchTerm, setSearchTerm] = useState('');

  const fetchPayments = async () => {
    const response = await axiosSecure.get('/payments-history');

    return response?.data?.data;
  };
  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['paymentHistory'],
    queryFn: fetchPayments,
  });

  //   const handleSort = (key) => {
  //     setSortConfig({
  //       key,
  //       direction:
  //         sortConfig.key === key && sortConfig.direction === 'asc'
  //           ? 'desc'
  //           : 'asc',
  //     });
  //   };

  //   const sortedPayments = [...payments].sort((a, b) => {
  //     if (sortConfig.key === 'date') {
  //       return sortConfig.direction === 'asc'
  //         ? new Date(a.date) - new Date(b.date)
  //         : new Date(b.date) - new Date(a.date);
  //     }

  //     if (sortConfig.key === 'price' || sortConfig.key === 'coins') {
  //       return sortConfig.direction === 'asc'
  //         ? a[sortConfig.key] - b[sortConfig.key]
  //         : b[sortConfig.key] - a[sortConfig.key];
  //     }

  //     return sortConfig.direction === 'asc'
  //       ? a[sortConfig.key].localeCompare(b[sortConfig.key])
  //       : b[sortConfig.key].localeCompare(a[sortConfig.key]);
  //   });

  //   const filteredPayments = sortedPayments.filter(
  //     (payment) =>
  //       payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  if (isLoading) {
    return <Loader2 className='h-48 w-48' />;
  }
  if (isError) {
    return (
      <div className='text-center'>
        Error fetching payment history: {error.message}
      </div>
    );
  }
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='text-2xl dark:text-white font-bold'>Payment History</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-300'>
          View all your coin purchase transactions
        </p>
      </div>

      {/* Search Bar */}
      {/* <div className='mb-6 flex items-center rounded-lg border bg-white px-3 py-2'>
        <Search className='h-5 w-5 text-gray-400' />
        <input
          type='text'
          placeholder='Search by email, transaction ID, or status...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='ml-2 flex-1 border-none bg-transparent outline-none'
        />
      </div> */}

      {/* Payment Table */}
      <div className='rounded-lg border bg-white dark:bg-gray-700 '>
        <div className='overflow-x-auto'>
          <table className='min-w-full overflow-x-auto divide-y divide-gray-200'>
            <thead className='bg-gray-50 dark:bg-gray-600'>
              <tr>
                <th
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'
                  //   onClick={() => handleSort('date')}
                >
                  <div className='flex dark:text-gray-300 cursor-pointer items-center gap-2'>
                    Date
                    {/* <ArrowUpDown className='h-4 w-4' /> */}
                  </div>
                </th>
                <th
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'
                  //   onClick={() => handleSort('email')}
                >
                  <div className='flex cursor-pointer items-center gap-2'>
                    Email
                    {/* <ArrowUpDown className='h-4 w-4' /> */}
                  </div>
                </th>
                <th
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'
                  //   onClick={() => handleSort('transactionId')}
                >
                  <div className='flex cursor-pointer items-center gap-2'>
                    Transaction ID
                    {/* <ArrowUpDown className='h-4 w-4' /> */}
                  </div>
                </th>
                <th
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'
                  //   onClick={() => handleSort('price')}
                >
                  <div className='flex cursor-pointer items-center gap-2'>
                    Price ($)
                    {/* <ArrowUpDown className='h-4 w-4' /> */}
                  </div>
                </th>
                <th
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'
                  //   onClick={() => handleSort('coins')}
                >
                  <div className='flex cursor-pointer items-center gap-2'>
                    Coins
                    {/* <ArrowUpDown className='h-4 w-4' /> */}
                  </div>
                </th>
                <th
                  className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300'
                  //   onClick={() => handleSort('status')}
                >
                  <div className='flex cursor-pointer items-center gap-2'>
                    Status
                    {/* <ArrowUpDown className='h-4 w-4' /> */}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 dark:bg-gray-700 bg-white'>
              {isLoading ? (
                <tr>
                  <td colSpan='6' className='px-6 py-4 text-center'>
                    <Loader2 className='mx-auto h-8 w-8 animate-spin text-gray-400 dark:text-gray-200' />
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td
                    colSpan='6'
                    className='px-6 py-4 text-center dark:text-gray-300 text-gray-500'
                  >
                    No payment records found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className='hover:bg-gray-50 dark:hover:bg-gray-800'
                  >
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white'>
                      {moment(new Date(payment.date)).format('MMM d, yyyy')}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white'>
                      {payment.email}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300'>
                      {payment.transactionId}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white'>
                      ${payment.price}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white'>
                      {payment.coins}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4 text-sm'>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                          payment.status === 'succeeded'
                            ? 'bg-green-100 text-green-800'
                            : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
