import useUserInfo from '../../hooks/useUserInfo';
import WorkerHome from './WorkerHome';
import BuyerHome from './BuyerHome';
import AdminHome from './AdminHome';
import { Loader2 } from 'lucide-react';

const DashboardHome = () => {
  const { userInfo, loading } = useUserInfo();
  if (loading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-tertiary' />
      </div>
    );
  }
  if (userInfo?.role === 'worker') {
    return <WorkerHome />;
  }
  if (userInfo?.role === 'buyer') {
    return <BuyerHome />;
  }
  if (userInfo?.role === 'admin') {
    return <AdminHome />;
  }
};

export default DashboardHome;
