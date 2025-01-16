export default function WithdrawalRequest({ requests, onApprovePayment }) {
  return (
    <div className='mt-8'>
      <h2 className='mb-4 text-xl font-semibold'>
        Pending Withdrawal Requests
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Worker Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Email
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Coins
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Amount ($)
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Payment System
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Account Number
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Date
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Action
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {requests?.map((request) => (
              <tr key={request.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {request.worker_name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {request.worker_email}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {request.withdrawal_coin}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  ${request.withdrawal_amount}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {request.payment_system}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {request.account_number}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {new Date(request.withdraw_date).toLocaleDateString()}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <button
                    onClick={() => onApprovePayment(request.id)}
                    className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out'
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
