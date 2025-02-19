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
import BuyerState from './buyer/BuyerState';

export default function OverviewBuyer() {
  const axiosSecure = useAxiosSecure();

  const fetchBuyerData = async () => {
    const res = await axiosSecure.get('/buyer-states');
    return res?.data;
  };

  const {
    data: buyer_data = [],
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['buyerData'],
    queryFn: fetchBuyerData,
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
        <h2 className='mt-4 text-xl font-semibold'>Error loading buyer data</h2>
        <p className='mt-2 text-gray-600'>{error.message}</p>
      </div>
    );
  }

  const { states, submissions } = buyer_data;
  console.log(states);

  const chartData = [
    { name: 'Total Payments', value: states.totalPayment },
    { name: 'Pending Tasks', value: states.pendingTasks },
    { name: 'Total Tasks', value: states.totalTaskCount },
  ];

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold dark:text-white'>
        Buyer Dashboard Overview
      </h1>

      <BuyerState stats={states} />

      <div className='grid gap-8 mt-8'>
        <div className='bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md'>
          <h3 className='text-sm font-medium text-gray-500 dark:text-gray-300 mb-4'>
            Data Visualization Guide for Buyers
          </h3>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis tick={{ fill: 'red' }} dataKey='name' />
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
