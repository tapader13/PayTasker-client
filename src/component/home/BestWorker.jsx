import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, Award, Mail } from 'lucide-react';
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
  // console.log(workers, 567);
  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-tertiary' />
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
  const getWorkerLevel = (coins) => {
    if (coins >= 200) return 'Expert';
    if (coins >= 100) return 'Intermediate';
    return 'Beginner';
  };
  return (
    <SectionWrapper>
      <div className='container mx-auto px-4 py-16'>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-12 text-left text-3xl font-bold text-gray-900 md:text-4xl'
        >
          Our Top Performers
        </motion.h1>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {workers.map((worker, index) => (
            <motion.div
              key={worker._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='group relative overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl'>
                <div className='absolute -right-16 -top-16 h-40 w-40 rounded-full bg-tertiary transition-all duration-300 group-hover:scale-150'></div>
                <div className='relative h-64 overflow-hidden'>
                  <img
                    src={worker.profilePicture || '/placeholder-user.jpg'}
                    alt={worker.name}
                    className='h-full w-full object-cover transition-all duration-300 group-hover:scale-110'
                  />
                </div>
                <div className='p-6'>
                  <h2 className='mb-2 text-xl font-semibold text-gray-900'>
                    {worker.name}
                  </h2>
                  <p className='mb-2 text-sm text-gray-600'>
                    {worker.specialty}
                  </p>
                  <p className='mb-4 flex items-center text-sm text-gray-500'>
                    <Mail className='mr-2 h-4 w-4' />
                    {worker.email}
                  </p>
                  <div className='flex items-center justify-between'>
                    <span className='flex items-center text-tertiary'>
                      <Award className='mr-2 h-5 w-5' />
                      <span className='font-bold'>{worker.coins}</span> coins
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium ${
                        worker.coins >= 200
                          ? 'bg-green-100 text-green-800'
                          : worker.coins >= 100
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {getWorkerLevel(worker.coins)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
    // <SectionWrapper>
    //   <div className='container mx-auto px-4 py-8'>
    //     <h1 className='mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl'>
    //       Best Workers
    //     </h1>
    //     <div
    //       //   whileTap={{ scale: 0.95 }}
    //       className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'
    //     >
    //       {workers.map((worker) => (
    //         <motion.div
    //           whileHover={{ scale: 1.1 }}
    //           key={worker._id}
    //           className='bg-white rounded-lg shadow-md overflow-hidden'
    //         >
    //           <div className='relative h-48'>
    //             <img
    //               src={worker.profilePicture || '/placeholder-user.jpg'}
    //               alt={worker.name}
    //               className='rounded-t-lg h-full w-full object-cover'
    //             />
    //           </div>
    //           <div className='p-4'>
    //             <h2 className='text-xl font-semibold mb-2'>{worker.name}</h2>
    //             <p className='text-gray-600'>
    //               <span className='font-bold text-tertiary'>
    //                 {worker.coins}
    //               </span>{' '}
    //               coins
    //             </p>
    //           </div>
    //         </motion.div>
    //       ))}
    //     </div>
    //   </div>
    // </SectionWrapper>
  );
}
