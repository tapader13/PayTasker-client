import { Navigate } from 'react-router';
import useUserInfo from '../hooks/useUserInfo';

const PrivateWorkerRoute = ({ children }) => {
  const { userInfo, loading } = useUserInfo();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (userInfo && userInfo?.role === 'worker') {
    return children;
  }
  return <Navigate to={'/login'} replace state={{ from: location }} />;
};

export default PrivateWorkerRoute;
