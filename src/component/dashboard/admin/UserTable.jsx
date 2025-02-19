import useUserInfo from '../../../hooks/useUserInfo';

export default function UserTable({ users, onRemoveUser, onUpdateRole }) {
  const { userInfo: loginUser } = useUserInfo();
  const roles = ['Admin', 'Buyer', 'Worker'];
  // console.log(users);
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white dark:bg-gray-700 border border-gray-300'>
        <thead>
          <tr className='bg-gray-100 dark:bg-gray-600'>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Photo
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Name
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Email
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Role
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Coins
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='flex h-full py-4  items-center justify-center whitespace-nowrap'>
                <img
                  src={user.profilePicture || '/placeholder-user.jpg'}
                  alt={user.name}
                  className='rounded-full h-8 w-8'
                />
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                {user.name}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                {user.email}
              </td>

              {user.role === 'admin' && loginUser.email === user.email ? (
                <>
                  {/* Show message across all three fields if logged-in admin */}
                  <td
                    colSpan={3}
                    className='px-6 py-4 text-sm dark:text-white text-gray-900 font-semibold text-center'
                  >
                    It&apos;s currently logged in as admin
                  </td>
                </>
              ) : (
                <>
                  {/* Role Selection Field */}
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                    {!(
                      user.role === 'admin' && loginUser.email === user.email
                    ) && (
                      <select
                        value={user.role}
                        onChange={(e) => onUpdateRole(user._id, e.target.value)}
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-tertiary focus:border-tertiary sm:text-sm'
                      >
                        {roles.map((role) => (
                          <option key={role} value={role.toLowerCase()}>
                            {role}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>

                  {/* Normal fields for other users */}
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white'>
                    {user.coins}
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <button
                      onClick={() => onRemoveUser(user)}
                      className='text-red-600 hover:text-red-900 focus:outline-none focus:underline'
                    >
                      Remove
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
