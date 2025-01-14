import { Bell } from 'lucide-react';

const Dashboard = () => {
  const user = {
    name: 'John Doe',
    role: 'Software Engineer',
    image: '/assets/images/user.jpg',
    coins: 2000,
  };
  return (
    <div>
      <div className='fixed left-0 right-0 top-0 z-50 flex h-16 items-center border-b bg-white px-4'>
        <div className='flex w-64 items-center'>
          <a href='/dashboard' className='text-xl font-bold text-tertiary'>
            PayTasker
          </a>
        </div>

        <div className='ml-auto flex items-center gap-4'>
          {/* Available Coins */}
          <div className='flex flex-col items-end'>
            <div className='flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5'>
              <span className='text-sm font-medium text-gray-600'>
                Available Coins:
              </span>
              <span className='font-bold text-[#00838C]'>{user.coins}</span>
            </div>
            <p className='text-xs hidden sm:block text-gray-500 capitalize'>
              {user.role}
            </p>
          </div>

          {/* User Info */}
          <div className='flex flex-col justify-center gap-3'>
            <img
              src={user.image}
              alt={user.name}
              className='h-8 w-8 rounded-full'
            />

            <p className='text-sm hidden sm:block font-medium text-gray-900'>
              {user.name}
            </p>
          </div>

          {/* Notification Bell */}
          <button className='relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500'>
            <Bell className='h-6 w-6' />
            <span className='absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500' />
            <span className='sr-only'>Notifications</span>
          </button>
        </div>
      </div>
      <div className='flex'>
        <div></div>
        <div className='flex-1'></div>
      </div>
    </div>
  );
};

export default Dashboard;
