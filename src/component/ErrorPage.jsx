import { OctagonX } from 'lucide-react';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
      <OctagonX className='h-10 w-10 text-red-500' />
      <h2 className='mt-4 text-xl font-semibold'>404 - Page Not Found</h2>
      <p className='mt-2 text-gray-600'>
        {' '}
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to={'/'}
        className='mt-4 px-6 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md'
      >
        Go back to home
      </Link>
    </div>
  );
};

export default ErrorPage;
