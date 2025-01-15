import { useState } from 'react';
import TaskModal from './TaskModal';
import TaskTable from './TaskTable';
import useTasks from './../../../hooks/useTasks';

const MyTask = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { tasks, loading } = useTasks();
  const handleUpdate = (task) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = async (taskId) => {
    //   if (window.confirm('Are you sure you want to delete this task?')) {
    //     try {
    //       await axios.delete(`/api/tasks/${taskId}`);
    //       setTasks(tasks.filter((task) => task.id !== taskId));
    //     } catch (err) {
    //       setError('Failed to delete task. Please try again.');
    //     }
    //   }
  };
  const handleUpdateSubmit = async (updatedTask) => {
    //   try {
    //     const response = await axios.put(
    //       `/api/tasks/${updatedTask.id}`,
    //       updatedTask
    //     );
    //     setTasks(
    //       tasks.map((task) =>
    //         task.id === updatedTask.id ? response.data : task
    //       )
    //     );
    //     setIsUpdateModalOpen(false);
    //   } catch (err) {
    //     setError('Failed to update task. Please try again.');
    //   }
  };
  if (loading) return <div>Loading...</div>;
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
