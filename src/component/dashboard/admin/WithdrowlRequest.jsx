export default function WithdrowalRequest({ requests, onApprovePayment }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className='mt-8'>
      <h2 className='mb-4 dark:text-white text-xl font-semibold'>
        Pending Withdrawal Requests
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white dark:bg-gray-700 dark:text-white border border-gray-300'>
          <thead>
            <tr className='bg-gray-100 dark:bg-gray-600'>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
                Worker Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
                Email
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
                Coins
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
                Amount ($)
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
                Payment System
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
                Account Number
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
                Date
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {requests.map((request) => (
              <tr key={request.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                  {request.worker_name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                  {request.worker_email}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                  {request.withdrawal_coin}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                  ${request.withdrawal_amount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                  {request.payment_system}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm `}>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                  {new Date(request.withdraw_date).toLocaleDateString()}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <button
                    onClick={() =>
                      onApprovePayment(
                        request._id,
                        request.withdrawal_coin,
                        request.worker_email
                      )
                    }
                    className='bg-tertiaryhover hover:bg-tertiaryhover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out'
                  >
                    Approve Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
