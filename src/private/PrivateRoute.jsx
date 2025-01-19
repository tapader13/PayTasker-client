import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-tertiary' />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to={'/login'} replace />;
};

export default PrivateRoute;
