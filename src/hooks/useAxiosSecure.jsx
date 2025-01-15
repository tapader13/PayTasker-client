import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const instance = axios.create({
  baseURL: 'http://localhost:5001',
});
const useAxiosSecure = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  instance.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem(
        'access_token'
      )}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (config) => {
      return config;
    },
    function (error) {
      if (error.response.status === 403 || error.response.status === 401) {
        logoutUser();
        navigate('/login');
        // localStorage.removeItem('access_token');
      }
      return Promise.reject(error);
    }
  );
  return instance;
};

export default useAxiosSecure;
