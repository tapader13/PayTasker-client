import { ArrowRight } from 'lucide-react';
import SectionWrapper from '../wrapper/SectionWrapper';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

export function TopPick() {
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    const res = await axiosPublic.get('/tasks-worker');
    console.log(res, 45);
    setTasks(res?.data?.data.slice(0, 3));
  };
  console.log(tasks, 12);
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <section className='w-full py-16 bg-gray-100'>
      <SectionWrapper>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='flex items-center justify-between mb-12'>
            <h2 className='text-left text-3xl font-bold text-gray-900 md:text-4xl '>
              Top Picks
            </h2>
            <Link to={'/alltask'}>
              <button className='text-tertiary hover:text-tertiaryhover flex items-center focus:outline-none'>
                View all
                <ArrowRight className='ml-2 h-4 w-4' />
              </button>
            </Link>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-4'>
            {tasks?.map((pick) => (
              <div
                key={pick.id}
                className='overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl'
              >
                <div className=''>
                  <div className=''>
                    <div className={` relative h-64 overflow-hidden`}>
                      <img
                        src={pick.task_image_url || '/placeholder.svg'}
                        alt={pick.task_title}
                        className='h-full w-full object-cover transition-all duration-300 group-hover:scale-110'
                      />
                    </div>
                  </div>
                  <div className='p-6'>
                    <h3 className='text-lg   mb-1  font-semibold text-gray-900'>
                      {pick.task_title}
                    </h3>
                    <p className='text-sm text-gray-400 mb-3 line-clamp-2'>
                      {pick.task_detail}
                    </p>
                    <div className='flex items-center space-x-2'>
                      <span className='text-gray-500'>
                        ⟠{pick.required_workers}
                      </span>
                      <span className='text-tertiary'>
                        ~ ${pick.payable_amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}

export default TopPick;
