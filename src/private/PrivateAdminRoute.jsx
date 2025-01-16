import { Navigate } from 'react-router';
import useUserInfo from '../hooks/useUserInfo';

const PrivateAdminRoute = ({ children }) => {
  const { userInfo, loading } = useUserInfo();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (userInfo && userInfo?.role === 'admin') {
    return children;
  }
  return <Navigate to={'/login'} replace />;
};

export default PrivateAdminRoute;
