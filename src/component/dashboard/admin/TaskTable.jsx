export default function TaskTable({ tasks, onDeleteTask }) {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white dark:bg-gray-700 border border-gray-300'>
        <thead>
          <tr className='bg-gray-100 dark:bg-gray-600'>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Title
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Description
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Buyer
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Amount
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Worker
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Complete Date
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                {task.task_title}
              </td>
              <td className='px-6 py-4 text-sm dark:text-white text-gray-900'>
                {task.task_detail.length > 50
                  ? `${task.task_detail.substring(0, 50)}...`
                  : task.task_detail}
              </td>
              <td className='px-6 dark:text-white py-4 whitespace-nowrap text-sm text-gray-900'>
                {task.buyerEmail}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                {task.payable_amount}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full `}
                >
                  {task.required_workers}
                </span>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                {new Date(task.completion_date).toLocaleDateString()}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <button
                  onClick={() => onDeleteTask(task)}
                  className='text-red-600 hover:text-red-900 focus:outline-none focus:underline'
                >
                  Delete Task
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
