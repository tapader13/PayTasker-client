import { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useUserInfo = () => {
  const axiosPublic = useAxiosPublic();
  const { user: isLoggedIn } = useAuth();
  // const [user, setUser] = useState('');
  // const [loading, setLoading] = useState(false);
  const {
    data: user = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['user', isLoggedIn?.email],
    queryFn: () =>
      axiosPublic.get('/users/' + isLoggedIn?.email).then((res) => res.data),
    enabled: !!isLoggedIn?.email,
  });
  console.log(user, 56);
  return { userInfo: user, loading: isLoading, refetchUser: refetch };
  // useEffect(() => {
  //   const getUser = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axiosPublic.get('/users/' + isLoggedIn?.email);
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getUser();
  // }, [isLoggedIn]);

  // return { userInfo: user, loading };
};

export default useUserInfo;
