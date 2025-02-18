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
import useAxiosSecure from '../../hooks/useAxiosSecure';
import AdminStat from './admin/AdminState';
import { Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OverviewAdmin() {
  const axiosSecure = useAxiosSecure();

  const fetchAdminData = async () => {
    const response = await axiosSecure.get('/admin-states');
    return response.data;
  };

  const {
    data: adminData = {},
    isLoading,
    isError,
    error,
    refetch: refetchAdminOverview,
  } = useQuery({
    queryKey: 'adminData',
    queryFn: fetchAdminData,
  });

  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-tertiary' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
        <AlertCircle className='h-10 w-10 text-red-500' />
        <h2 className='mt-4 text-xl font-semibold'>Error loading admin data</h2>
        <p className='mt-2 text-gray-600'>{error.message}</p>
      </div>
    );
  }

  const { states, withdrowReq, submissions } = adminData;
  console.log(states);
  // Chart Data for Admin Overview
  const chartData = [
    {
      name: 'totalAvailableCoins',
      value: states.totalAvailableCoins,
    },
    {
      name: 'totalBuyers',
      value: states.totalBuyers,
    },
    {
      name: 'totalPayments',
      value: states.totalPayments,
    },
    {
      name: 'totalWorkers',
      value: states.totalWorkers,
    },
  ];
  console.log(chartData);
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold'>Admin Dashboard Overview</h1>

      {/* Admin Stats */}
      <AdminStat stats={states} />

      {/* Charts for Withdrawal Requests */}
      <div className='grid gap-8 mt-8'>
        {/* Withdrawal Requests Chart */}
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h3 className='text-sm font-medium text-gray-500 mb-4'>
            Withdrawal Requests
          </h3>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Line type='monotone' dataKey='value' fill='#00838C' />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
