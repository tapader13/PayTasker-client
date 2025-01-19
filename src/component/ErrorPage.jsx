import { OctagonX } from 'lucide-react';

const ErrorPage = () => {
  return (
    <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
      <OctagonX className='h-10 w-10 text-red-500' />
      <h2 className='mt-4 text-xl font-semibold'>404 - Page Not Found</h2>
      <p className='mt-2 text-gray-600'>
        {' '}
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
};

export default ErrorPage;
