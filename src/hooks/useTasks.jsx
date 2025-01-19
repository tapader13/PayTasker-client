import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { user: isLoggedIn } = useAuth();
  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['tasks', isLoggedIn?.email],
    queryFn: () => axiosSecure.get('/tasks').then((res) => res.data?.data),
    enabled: !!isLoggedIn?.email,
  });
  // console.log(tasks, 'tasks');
  return { tasks, loading: isLoading, refetchTasks: refetch };
};

export default useTasks;
