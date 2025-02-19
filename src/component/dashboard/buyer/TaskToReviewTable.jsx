export default function TaskToReviewTable({
  submissions,
  onViewSubmission,
  onApproveSubmission,
  onRejectSubmission,
}) {
  // console.log(submissions);
  return (
    <div className='mt-8'>
      <h2 className='text-xl font-semibold mb-4'>Tasks to Review</h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white dark:bg-gray-700 border border-gray-300'>
          <thead>
            <tr className='bg-gray-100 dark:bg-gray-600'>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
                Worker Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
                Task Title
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
                Payable Amount
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-600'>
            {submissions?.map((submission) => (
              <tr key={submission.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                  {submission.worker_name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                  {submission.task_title}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                  {submission.payable_amount} coins
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                  <button
                    onClick={() => onViewSubmission(submission)}
                    className='dark:text-white text-gray-800 hover:text-tertiary mr-2'
                  >
                    View
                  </button>
                  <button
                    onClick={() => onApproveSubmission(submission)}
                    className='text-green-600 hover:text-green-900 mr-2'
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => onRejectSubmission(submission)}
                    className='text-red-600 hover:text-red-900'
                  >
                    Reject
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
