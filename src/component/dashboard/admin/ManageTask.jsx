import { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import TaskTable from './TaskTable';
import ConfirmationModal from './ConfirmationModal';
import toast from 'react-hot-toast';

export default function ManageTask() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const axiosSecure = useAxiosSecure();

  const fetchTasks = async () => {
    const response = await axiosSecure.get('/tasks-manage');
    return response?.data?.data;
  };

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
    refetch: fetchTasksAgain,
  } = useQuery({
    queryKey: ['manage-task'],
    queryFn: fetchTasks,
  });
  const handleDeleteTask = (task) => {
    setTaskToDelete(task);
    setShowConfirmModal(true);
  };

  const confirmDeleteTask = async () => {
    try {
      const response = await axiosSecure.delete(
        `/tasks-manage/${taskToDelete._id}`,
        {
          method: 'DELETE',
        }
      );
      if (response?.data?.success) {
        fetchTasksAgain();
        toast.success(response?.data?.message);
        setShowConfirmModal(false);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

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
      <h1 className='mb-6 text-2xl font-bold'>Manage Tasks</h1>
      <TaskTable tasks={tasks} onDeleteTask={handleDeleteTask} />
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDeleteTask}
        title='Confirm Task Deletion'
        message={`Are you sure you want to delete the task "${taskToDelete?.title}"?`}
      />
    </div>
  );
}
