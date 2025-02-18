import { useQuery } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import WorkerState from './worker/WorkerState';

export default function OverviewWorker() {
  const axiosSecure = useAxiosSecure();

  const fetchWorkerData = async () => {
    const res = await axiosSecure.get('/worker-states');
    return res?.data;
  };

  const {
    data: worker_data = [],
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

  const { states } = worker_data;
  const chartData = [
    { name: 'Total Submissions', value: states.totalSubmitCount },
    { name: 'Pending Submissions', value: states.pendingSubmit },
    { name: 'Total Earnings', value: states.totalPayment },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold'>Worker Dashboard Overview</h1>

      {/* Display Worker State */}
      <WorkerState stats={states} />

      {/* Charts */}
      <div className='grid gap-8  mt-8'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-sm font-medium text-gray-500 mb-4'>
            Data Visualization Guide for Workers
          </h3>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Line type='monotone' dataKey='value' stroke='#00838C' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
