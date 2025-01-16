export default function TaskTable({ tasks, onDeleteTask }) {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-300'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Title
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Description
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Buyer
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Reward
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Status
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Created At
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {task.title}
              </td>
              <td className='px-6 py-4 text-sm text-gray-900'>
                {task.description.length > 50
                  ? `${task.description.substring(0, 50)}...`
                  : task.description}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {task.buyer_name}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {task.reward} coins
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    task.status === 'open'
                      ? 'bg-green-100 text-green-800'
                      : task.status === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {new Date(task.created_at).toLocaleDateString()}
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
