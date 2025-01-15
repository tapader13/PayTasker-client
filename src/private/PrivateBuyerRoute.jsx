import { Navigate } from 'react-router';
import useUserInfo from '../hooks/useUserInfo';

const PrivateBuyerRoute = ({ children }) => {
  const { userInfo, loading } = useUserInfo();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (userInfo && userInfo?.role === 'buyer') {
    return children;
  }
  return <Navigate to={'/login'} replace />;
};

export default PrivateBuyerRoute;
