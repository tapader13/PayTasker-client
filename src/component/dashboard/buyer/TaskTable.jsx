import moment from 'moment';

const TaskTable = ({ tasks, onUpdate, onDelete }) => {
  return (
    <div>
      {' '}
      <div className='overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50 dark:bg-gray-600 '>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-200 text-gray-500'>
                Title
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-200 text-gray-500'>
                Workers
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-200 text-gray-500'>
                Payment
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-200 text-gray-500'>
                Completion Date
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider dark:text-gray-200 text-gray-500'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200 dark:divide-gray-600 dark:bg-gray-700 bg-white'>
            {tasks?.map((task) => (
              <tr key={task.id}>
                <td className='whitespace-nowrap px-6 py-4'>
                  <div className='text-sm font-medium text-gray-900 dark:text-white'>
                    {task.task_title}
                  </div>
                </td>
                <td className='whitespace-nowrap px-6 py-4'>
                  <div className='text-sm dark:text-gray-300 text-gray-500'>
                    {task.required_workers}
                  </div>
                </td>
                <td className='whitespace-nowrap px-6 py-4'>
                  <div className='text-sm dark:text-gray-300 text-gray-500'>
                    {task.payable_amount} coins
                  </div>
                </td>
                <td className='whitespace-nowrap px-6 py-4'>
                  <div className='text-sm dark:text-gray-300 text-gray-500'>
                    {moment(new Date(task.completion_date)).format(
                      'MMM d, yyyy'
                    )}
                  </div>
                </td>
                <td className='whitespace-nowrap px-6 py-4 text-sm font-medium'>
                  <button
                    onClick={() => onUpdate(task)}
                    className='mr-2 text-gray-800 dark:text-white hover:text-tertiary'
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    className='text-red-600 hover:text-red-900'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;
