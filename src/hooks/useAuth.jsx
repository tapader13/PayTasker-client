import { useContext } from 'react';
import { context } from '../provider/AuthProvider';

const useAuth = () => {
  const auth = useContext(context);
  return auth;
};

export default useAuth;
