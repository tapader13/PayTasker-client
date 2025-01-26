import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://as12-ea931.web.app',
});
const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
