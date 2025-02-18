import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import useUserInfo from '../hooks/useUserInfo';
import { Link, Navigate } from 'react-router';
import { NavLink } from 'react-router';

const steps = {
  worker: [
    'Step 1: Log in to the platform using your email/password or Google account.',
    'Step 2: Browse available tasks that you can complete.',
    'Step 3: Submit your work for review once a task is completed.',
    'Step 4: Track your earnings in real-time, displayed in coins.',
    'Step 5: When you have earned at least 200 coins (equivalent to $10), request a withdrawal.',
    'Step 6: Get paid via the withdrawal system.',
  ],
  buyer: [
    'Step 1: Log in to the platform using your email/password or Google account.',
    'Step 2: Create new tasks and define the requirements and rewards for workers.',
    'Step 3: Post tasks for workers to browse and complete.',
    'Step 4: Review and approve or reject submitted work.',
    'Step 5: Manage your coin balance, adding more coins as necessary.',
    'Step 6: Use coins to create and manage tasks.',
  ],
  admin: [
    'Step 1: Log in to the platform using your admin credentials.',
    'Step 2: View and manage user accounts, including Workers and Buyers.',
    'Step 3: Monitor task submissions and approve/reject them as needed.',
    'Step 4: Handle withdrawal requests from workers.',
    'Step 5: Generate reports and track platform activity.',
    'Step 6: Use the admin dashboard to manage platform operations.',
  ],
};

export default function Guide() {
  const { userInfo } = useUserInfo();

  const renderSteps = (role) => {
    return steps[role].map((step, index) => (
      <div key={index} className='flex items-start mt-4'>
        <CheckCircle className='h-5 w-5 text-green-500 mr-2' />
        <span className='text-sm text-gray-700'>{step}</span>
      </div>
    ));
  };
  if (!userInfo?.role) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='w-full lg:w-10/12 mx-auto  py-16 sm:py-24'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl'>
            How to Use PayTasker
          </h1>
          <p className='mt-5 max-w-xl mx-auto text-xl text-gray-500'>
            Step-by-step instructions for {userInfo?.role} users
          </p>
        </div>

        {userInfo?.role && (
          <div className='mt-16'>
            <h2 className='text-3xl font-extrabold text-gray-900'>
              {userInfo?.role} User Guide
            </h2>
            <div className='mt-6'>{renderSteps(userInfo?.role)}</div>
          </div>
        )}

        <div className='mt-16 text-center'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Ready to get started?
          </h2>
          <div className='mt-8'>
            <Link
              to='/dashboard'
              className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-tertiary hover:bg-tertiaryhover'
            >
              Go to Dashboard
              <ArrowRight className='ml-2 -mr-1 h-5 w-5' />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
