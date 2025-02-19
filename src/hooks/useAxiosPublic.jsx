import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://server-drab-nine.vercel.app',
});
const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
