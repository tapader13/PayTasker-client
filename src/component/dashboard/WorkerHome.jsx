import useAxiosSecure from './../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import WorkerState from './worker/WorkerState';

export default function WorkerHome() {
  const axiosSecure = useAxiosSecure();

  const fetchWorkerData = async () => {
    const res = await axiosSecure.get('/worker-states');
    return res?.data;
  };
  const {
    data: worker_data,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['workerData'],
    queryFn: fetchWorkerData,
  });
  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00838C]'></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
        <svg
          className='h-10 w-10 text-red-500'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <h2 className='mt-4 text-xl font-semibold'>
          Error loading worker data
        </h2>
        <p className='mt-2 text-gray-600'>{error.message}</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold'>Worker Dashboard</h1>
      <WorkerState stats={stats} />
      <ApprovedSubmissionsTable submissions={approvedSubmissions} />
    </div>
  );
}
