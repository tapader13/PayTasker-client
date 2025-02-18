import { Loader2 } from 'lucide-react';
import useUserInfo from '../../hooks/useUserInfo';

export default function Profile() {
  const { userInfo: user } = useUserInfo();

  if (!user) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-tertiary' />
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <div className='flex items-center space-x-1 sm:space-x-6'>
          <img
            src={user.profilePicture}
            alt={user.name}
            className='h-24 w-24 rounded-full object-cover'
          />
          <div>
            {/* User Info */}
            <h2 className='text-3xl font-semibold text-gray-900'>
              {user.name}
            </h2>
            <p className='text-lg text-gray-600'>{user?.email}</p>
            <p className='text-lg text-gray-600'>Role: {user?.role}</p>
            <p className='text-lg text-gray-600'>Coins: {user?.coins}</p>
          </div>
        </div>

        <div className='mt-6'>
          <h3 className='text-2xl font-semibold text-gray-900'>
            Additional Info
          </h3>
          <div className='mt-4 space-y-4'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Phone Number:</span>
              <span className='text-gray-900'>
                {user.phoneNumber || 'Not Provided'}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Address:</span>
              <span className='text-gray-900'>
                {user.address || 'Not Provided'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
