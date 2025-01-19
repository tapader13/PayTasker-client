import { useState } from 'react';
import TaskModal from './TaskModal';
import TaskTable from './TaskTable';
import useTasks from './../../../hooks/useTasks';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useUserInfo from '../../../hooks/useUserInfo';
import { Loader2 } from 'lucide-react';

const MyTask = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { tasks, loading } = useTasks();
  const axiosSecure = useAxiosSecure();
  const { refetchUser } = useUserInfo();
  const { refetchTasks } = useTasks();
  const handleUpdate = (task) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/tasks/${taskId}`);
          if (response?.data?.success) {
            toast.success(response?.data?.message);
            refetchUser();
            refetchTasks();
          }
        } catch (err) {
          toast.error(err?.response?.data?.message);
        }
      }
    });
  };
  const handleUpdateSubmit = async (updatedTask) => {
    try {
      const { _id, ...manipulate } = updatedTask;
      const response = await axiosSecure.put(`/tasks/${_id}`, manipulate);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        refetchTasks();
        setIsUpdateModalOpen(false);
        setSelectedTask(null);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };
  if (loading)
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-tertiary' />
      </div>
    );
  return (
    <div>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='mb-6 text-2xl font-bold'>My Tasks</h1>
        <TaskTable
          tasks={tasks}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
        {selectedTask && (
          <TaskModal
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            task={selectedTask}
            onUpdate={handleUpdateSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default MyTask;
