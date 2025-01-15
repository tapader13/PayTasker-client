import { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

export default function TaskList() {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 12;
  const axiosSecure = useAxiosSecure();
  const fetchTasks = async () => {
    const res = await axiosSecure.get('/tasks-worker');
    return res?.data?.data;
  };
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-[#00838C]' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
        <AlertCircle className='h-10 w-10 text-red-500' />
        <h2 className='mt-4 text-xl font-semibold'>Error loading tasks</h2>
        <p className='mt-2 text-gray-600'>{error.message}</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold'>Available Tasks</h1>
      {tasks.length === 0 ? (
        <div className='rounded-lg border border-gray-200 bg-white p-6 text-center'>
          <p className='text-gray-600'>No tasks available at the moment.</p>
        </div>
      ) : (
        <>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {currentTasks.map((task) => (
              <div
                key={task.id}
                className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'
              >
                <h2 className='mb-2 text-xl font-semibold'>
                  {task.task_title}
                </h2>
                <p className='mb-2 text-sm text-gray-600'>
                  Posted by: {task.username}
                </p>
                <p className='mb-2 text-sm text-gray-600'>
                  Deadline:{' '}
                  {moment(new Date(task.completion_date)).format('MMM d, YYYY')}
                </p>
                <p className='mb-2 text-sm font-medium text-[#00838C]'>
                  Reward: {task.payable_amount} coins
                </p>
                <p className='mb-4 text-sm text-gray-600'>
                  Workers needed: {task.required_workers}
                </p>
                <Link to={`task/${task.id}`}>
                  <button className='w-full rounded-md bg-[#00838C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#006d75]'>
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className='mt-8 flex justify-center'>
            {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 rounded-md px-3 py-1 ${
                    currentPage === index + 1
                      ? 'bg-[#00838C] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
