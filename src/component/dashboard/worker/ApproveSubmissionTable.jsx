export default function ApprovedSubmissionTable({ submissions }) {
  // console.log(submissions);
  return (
    <div className='mt-8'>
      <h2 className='text-xl dark:text-white font-semibold mb-4'>
        Approved Submissions
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white dark:bg-gray-700 border border-gray-300'>
          <thead>
            <tr className='bg-gray-100 dark:bg-gray-600'>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Task Title
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Payable Amount
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Buyer Name
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>
                Status
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-600'>
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>
                  {submission.task_title}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>
                  ${submission.payable_amount.toFixed(2)}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>
                  {submission.buyer_name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200'>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                    {submission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
