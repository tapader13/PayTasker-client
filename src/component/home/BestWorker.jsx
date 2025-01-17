import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SectionWrapper from '../wrapper/SectionWrapper';
import { motion } from 'motion/react';
export default function BestWorker() {
  const [workers, setWorkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    fetchBestWorkers();
  }, []);

  const fetchBestWorkers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosPublic.get('/best-workers');
      if (response?.data?.success) {
        setWorkers(response?.data?.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(workers, 567);
  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-[#00838C]' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
        <AlertCircle className='h-10 w-10 text-red-500' />
        <h2 className='mt-4 text-xl font-semibold'>
          Error loading best workers
        </h2>
        <p className='mt-2 text-gray-600'>{error}</p>
      </div>
    );
  }

  return (
    <SectionWrapper>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl'>
          Best Workers
        </h1>
        <div
          //   whileTap={{ scale: 0.95 }}
          className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'
        >
          {workers.map((worker) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              key={worker._id}
              className='bg-white rounded-lg shadow-md overflow-hidden'
            >
              <div className='relative h-48'>
                <img
                  src={worker.profilePicture || '/placeholder-user.jpg'}
                  alt={worker.name}
                  className='rounded-t-lg h-full w-full object-cover'
                />
              </div>
              <div className='p-4'>
                <h2 className='text-xl font-semibold mb-2'>{worker.name}</h2>
                <p className='text-gray-600'>
                  <span className='font-bold text-[#00838C]'>
                    {worker.coins}
                  </span>{' '}
                  coins
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
