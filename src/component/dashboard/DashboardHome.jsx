import useUserInfo from '../../hooks/useUserInfo';
import WorkerHome from './WorkerHome';
import BuyerHome from './BuyerHome';

const DashboardHome = () => {
  const { userInfo } = useUserInfo();
  if (userInfo?.role === 'worker') {
    return <WorkerHome />;
  }
  if (userInfo?.role === 'buyer') {
    return <BuyerHome />;
  }
  return <div>Unauthorized or role not assigned</div>;
};

export default DashboardHome;
