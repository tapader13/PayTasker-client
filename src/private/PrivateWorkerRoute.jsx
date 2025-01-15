import { Navigate } from 'react-router';
import useUserInfo from '../hooks/useUserInfo';

const PrivateWorkerRoute = ({ children }) => {
  const { userInfo, loading } = useUserInfo();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (userInfo) {
    return children;
  }
  return <Navigate to={'/login'} replace />;
};

export default PrivateWorkerRoute;
