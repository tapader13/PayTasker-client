import useUserInfo from '../../hooks/useUserInfo';
import WorkerHome from './WorkerHome';
import BuyerHome from './BuyerHome';

const DashboardHome = () => {
  const { userInfo, loading } = useUserInfo();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (userInfo?.role === 'worker') {
    return <WorkerHome />;
  }
  if (userInfo?.role === 'buyer') {
    return <BuyerHome />;
  }
};

export default DashboardHome;
