import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { useParams } from 'react-router';
import moment from 'moment';
import TaskSubmissionForm from './TaskSubmissionForm';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    fetchTaskDetails();
  }, [taskId]);
  // console.log(taskId);
  const fetchTaskDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axiosSecure.get(`/tasks-worker/${taskId}`);
      if (response?.data?.success) {
        setTask(response?.data?.data[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          Error loading task details
        </h2>
        <p className='mt-2 text-gray-600'>{error}</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
        <AlertCircle className='h-10 w-10 text-yellow-500' />
        <h2 className='mt-4 text-xl font-semibold'>Task not found</h2>
        <p className='mt-2 text-gray-600'>
          The requested task could not be found.
        </p>
      </div>
    );
  }
  // console.log(task);
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-3xl font-bold'>{task.task_title}</h1>
      <div className='mb-8 grid gap-6 md:grid-cols-2'>
        <div className='rounded-lg border bg-white p-6 shadow-sm'>
          <h2 className='mb-4 text-xl font-semibold'>Task Details</h2>
          <p className='mb-2'>
            <span className='font-medium'>Posted by:</span> {task.username}
          </p>
          <p className='mb-2'>
            <span className='font-medium'>Deadline:</span>{' '}
            {moment(new Date(task.completion_date)).format('MMMM d, yyyy')}
          </p>
          <p className='mb-2'>
            <span className='font-medium'>Reward:</span> {task.payable_amount}{' '}
            coins
          </p>
          <p className='mb-2'>
            <span className='font-medium'>Workers needed:</span>{' '}
            {task.required_workers}
          </p>
          <p className='mb-4'>
            <span className='font-medium'>Description:</span>
          </p>
          <p className='whitespace-pre-wrap rounded-md bg-gray-50 p-3 text-sm'>
            {task.task_detail}
          </p>
        </div>
        <div className='rounded-lg border bg-white p-6 shadow-sm'>
          <h2 className='mb-4 text-xl font-semibold'>
            Submission Requirements
          </h2>
          <p className='mb-4 whitespace-pre-wrap'>{task.submission_info}</p>
          <TaskSubmissionForm taskInfo={task} />
        </div>
      </div>
    </div>
  );
}
