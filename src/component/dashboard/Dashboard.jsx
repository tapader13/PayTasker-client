import {
  Bell,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  History,
  Home,
  ListTodo,
  PlusCircle,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
} from 'lucide-react';

import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import useUserInfo from '../../hooks/useUserInfo';
import Footer from '../footer/Footer';
const navigationItems = {
  worker: [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Task List', href: '/dashboard/tasks', icon: ListTodo },
    {
      name: 'My Submissions',
      href: '/dashboard/mysubmissions',
      icon: ClipboardList,
    },
    { name: 'Withdrawals', href: '/dashboard/withdrawals', icon: Wallet },
  ],
  buyer: [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Add New Tasks', href: '/dashboard/add-task', icon: PlusCircle },
    { name: "My Task's", href: '/dashboard/my-tasks', icon: ListTodo },
    { name: 'Purchase Coin', href: '/dashboard/purchase', icon: ShoppingCart },
    {
      name: 'Payment History',
      href: '/dashboard/paymentshistory',
      icon: History,
    },
  ],
  admin: [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'Manage Users', href: '/dashboard/manage-users', icon: Users },
    { name: 'Manage Tasks', href: '/dashboard/manage-tasks', icon: Settings },
  ],
};
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { userInfo } = useUserInfo();
  const loc = useLocation();
  const { user } = useAuth();
  const pathname = loc?.pathname;
  const items = userInfo?.role ? navigationItems[userInfo?.role] : [];
  const axiosSecure = useAxiosSecure();

  const fetchNotification = async () => {
    const res = await axiosSecure.get('/notifications');
    return res?.data?.data;
  };
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotification,
    // enabled: !!user?.email,
  });
  const handleBellClick = () => {
    if (notifications.length === 0) {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'No new notifications',
        showConfirmButton: false,
        timer: 2000, // Auto-close after 2 seconds
      });
      return;
    }

    const notificationMessages = notifications
      .map(
        (notification) =>
          `<div style="text-align: left; margin-bottom: 8px;">
            <p><strong>${notification.message}</strong></p>
            <p style="color: gray; font-size: 12px;">${new Date(
              notification.time
            ).toLocaleString()}</p>
          </div>`
      )
      .join('');

    Swal.fire({
      title: 'Notifications',
      html: `<div style="max-height: 200px; overflow-y: auto;">${notificationMessages}</div>`,
      showConfirmButton: false,
      timer: 4000, // Auto-close after 4 seconds
      position: 'top-end',
      background: '#fff',
      width: '300px',
      customClass: {
        popup: 'swal-notification-popup',
      },
    });
  };
  console.log(userInfo, 1, items);
  console.log(isOpen);
  return (
    <div>
      <div className='fixed left-0 right-0 top-0 z-50 flex h-16 items-center border-b bg-white px-4'>
        <div className='flex w-64 items-center'>
          <Link to='/' className='text-xl font-bold text-tertiary'>
            PayTasker
          </Link>
        </div>

        <div className='ml-auto flex items-center gap-4 py-2'>
          {/* Available Coins */}
          <div className='flex flex-col items-end'>
            <div className='flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5'>
              <span className='text-sm font-medium text-gray-600'>
                Available Coins:
              </span>
              <span className='font-bold text-[#00838C]'>{userInfo.coins}</span>
            </div>
            <p className='text-xs mt-1 hidden sm:block text-gray-500 capitalize'>
              {userInfo.role}
            </p>
          </div>

          {/* User Info */}
          <div className='flex flex-col justify-center gap-2'>
            <img
              src={userInfo.profilePicture}
              alt={userInfo.name}
              className='h-6 w-6 rounded-full'
            />

            <p className='text-sm hidden uppercase sm:block font-medium text-gray-900'>
              {userInfo.name}
            </p>
          </div>
          <div className='relative'>
            <button
              onClick={handleBellClick}
              className='relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <Bell className='h-6 w-6' />
              {notifications.length > 0 && (
                <span className='absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500' />
              )}
              <span className='sr-only'>Notifications</span>
            </button>
          </div>
          {/* Notification Bell */}
          {/* <button className='relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500'>
            <Bell className='h-6 w-6' />
            <span className='absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500' />
            <span className='sr-only'>Notifications</span>
          </button> */}
        </div>
      </div>
      <div className='flex'>
        <div>
          <nav
            className={`fixed bottom-0 left-0 top-16 z-40 bg-white transition-all duration-300 ${
              isOpen ? 'w-64' : 'w-20'
            }`}
          >
            {/* Toggle Button */}
            <button
              onClick={() => {
                console.log('Button clicked');
                setIsOpen((prevState) => !prevState);
              }}
              className='absolute z-10 -right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-md hover:bg-gray-50'
            >
              {isOpen ? (
                <ChevronLeft className='h-5 w-5' />
              ) : (
                <ChevronRight className='h-5 w-5' />
              )}
            </button>

            {/* Navigation Items */}
            <div className='h-full border-r'>
              <div className='space-y-1 p-4'>
                {items?.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#00838C] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className='h-5 w-5 shrink-0' />
                      <span
                        className={`whitespace-nowrap transition-opacity ${
                          isOpen ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
        <div
          className={`${
            isOpen ? 'ml-64' : 'ml-20'
          }  w-full mt-16  flex flex-col min-h-screen`}
        >
          <div className='px-4 flex-1 py-8 lg:px-8'>
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
