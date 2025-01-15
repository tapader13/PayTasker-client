import { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const useUserInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { user: isLoggedIn } = useAuth();
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get('/users/' + isLoggedIn?.email);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [isLoggedIn]);
  console.log(user, 56);
  return { userInfo: user, loading };
};

export default useUserInfo;
