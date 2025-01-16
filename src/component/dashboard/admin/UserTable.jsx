export default function UserTable({ users, onRemoveUser, onUpdateRole }) {
  const roles = ['Admin', 'Buyer', 'Worker'];

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border border-gray-300'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Photo
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Name
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Email
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Role
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Coins
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='px-6 py-4 whitespace-nowrap'>
                <img
                  src={user.photo_url || '/placeholder-user.jpg'}
                  alt={user.display_name}
                  width={40}
                  height={40}
                  className='rounded-full'
                />
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {user.display_name}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {user.user_email}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                <select
                  value={user.role}
                  onChange={(e) => onUpdateRole(user.id, e.target.value)}
                  className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                >
                  {roles.map((role) => (
                    <option key={role} value={role.toLowerCase()}>
                      {role}
                    </option>
                  ))}
                </select>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                {user.coin}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <button
                  onClick={() => onRemoveUser(user)}
                  className='text-red-600 hover:text-red-900 focus:outline-none focus:underline'
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
