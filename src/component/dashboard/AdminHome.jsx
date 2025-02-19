import { Loader2, AlertCircle } from 'lucide-react';
import AdminStat from './admin/AdminState';
import WithdrowalRequest from './admin/WithdrowlRequest';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

export default function AdminHome() {
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
    refetch: refetchAdminHOme,
  } = useQuery({
    queryKey: 'adminData',
    queryFn: fetchAdminData,
  });
  // console.log(adminData, 78);

  const handleApprovePayment = async (requestId, coin, worker_email) => {
    try {
      const response = await axiosSecure.patch(
        `/approve-withdrawal/${requestId}`,
        {
          coins: coin,
          email: worker_email,
        }
      );
      if (response?.data?.success) {
        refetchAdminHOme();
        toast.success(response?.data?.message);
      }
    } catch (err) {
      // console.error('Error approving withdrawal:', err);
      toast.error(err?.response?.data?.message);
    }
  };

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

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold dark:text-white'>
        Admin Dashboard
      </h1>
      <AdminStat stats={adminData?.states} />
      <WithdrowalRequest
        requests={adminData?.withdrowReq}
        onApprovePayment={handleApprovePayment}
      />
    </div>
  );
}
