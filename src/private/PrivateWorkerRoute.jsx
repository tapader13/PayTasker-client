import { Navigate } from 'react-router';
import useUserInfo from '../hooks/useUserInfo';
import { Loader2 } from 'lucide-react';

const PrivateWorkerRoute = ({ children }) => {
  const { userInfo, loading } = useUserInfo();
  if (loading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-tertiary' />
      </div>
    );
  }
  if (userInfo) {
    return children;
  }
  return <Navigate to={'/login'} replace />;
};

export default PrivateWorkerRoute;
