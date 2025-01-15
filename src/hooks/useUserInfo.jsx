import { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const useUserInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { user: isLoggedIn } = useAuth();
  const [user, setUser] = useState('');
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosPublic.get('/users/' + isLoggedIn?.email);
        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, [isLoggedIn]);
  console.log(user, 56);
  return { userInfo: user };
};

export default useUserInfo;
