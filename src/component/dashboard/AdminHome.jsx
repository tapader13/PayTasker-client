import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import AdminStat from './admin/AdminState';

export default function AdminHome() {
  const [stats, setStats] = useState(null);
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setIsLoading(true);
      const [statsResponse, withdrawalsResponse] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/withdrawal-requests'),
      ]);

      if (!statsResponse.ok || !withdrawalsResponse.ok) {
        throw new Error('Failed to fetch admin data');
      }

      const statsData = await statsResponse.json();
      const withdrawalsData = await withdrawalsResponse.json();

      setStats(statsData);
      setWithdrawalRequests(withdrawalsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprovePayment = async (requestId) => {
    try {
      const response = await fetch(
        `/api/admin/approve-withdrawal/${requestId}`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to approve withdrawal');
      }

      // Update the local state to reflect the change
      setWithdrawalRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== requestId)
      );

      // Refresh the stats
      const statsResponse = await fetch('/api/admin/stats');
      if (statsResponse.ok) {
        const updatedStats = await statsResponse.json();
        setStats(updatedStats);
      }
    } catch (err) {
      console.error('Error approving withdrawal:', err);
      // You might want to show an error message to the admin here
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-[#00838C]' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
        <AlertCircle className='h-10 w-10 text-red-500' />
        <h2 className='mt-4 text-xl font-semibold'>Error loading admin data</h2>
        <p className='mt-2 text-gray-600'>{error}</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold'>Admin Dashboard</h1>
      <AdminStat stats={stats} />
      <WithdrawalRequestsTable
        requests={withdrawalRequests}
        onApprovePayment={handleApprovePayment}
      />
    </div>
  );
}
