import { useEffect, useState } from 'react';

const TaskModal = ({ isOpen, onClose, task, onUpdate }) => {
  const [updatedTask, setUpdatedTask] = useState(task);

  useEffect(() => {
    setUpdatedTask(task);
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedTask);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
      <div className='relative w-full mx-auto my-6 max-w-xl'>
        <div className='relative flex w-full flex-col rounded-lg border-0 bg-white dark:bg-gray-950  shadow-lg outline-none focus:outline-none'>
          <div className='flex items-start justify-between rounded-t border-b border-solid border-gray-300 p-5'>
            <h3 className='text-2xl dark:text-white font-semibold'>
              Update Task
            </h3>
            <button
              className='float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-gray-800 opacity-5 outline-none focus:outline-none'
              onClick={onClose}
            >
              <span className='block h-6 w-6 bg-transparent text-2xl text-gray-800 opacity-5 outline-none focus:outline-none'>
                ×
              </span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className='relative flex-auto p-6'>
            <div className='mb-4'>
              <label
                className='mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300'
                htmlFor='task_title'
              >
                Title
              </label>
              <input
                type='text'
                id='task_title'
                name='task_title'
                value={updatedTask.task_title}
                onChange={handleChange}
                className='w-full appearance-none rounded border px-3 py-2 leading-tight dark:bg-gray-700 dark:text-white text-gray-700 shadow focus:outline-none'
                required
              />
            </div>
            <div className='mb-4'>
              <label
                className='mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300'
                htmlFor='task_detail'
              >
                Task Detail
              </label>
              <textarea
                id='task_detail'
                name='task_detail'
                value={updatedTask.task_detail}
                onChange={handleChange}
                className='w-full appearance-none rounded border px-3 py-2 leading-tight dark:bg-gray-700 dark:text-white text-gray-700 shadow focus:outline-none'
                rows='4'
                required
              ></textarea>
            </div>
            <div className='mb-4'>
              <label
                className='mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300'
                htmlFor='submission_info'
              >
                Submission Details
              </label>
              <textarea
                id='submission_info'
                name='submission_info'
                value={updatedTask.submission_info}
                onChange={handleChange}
                className='w-full appearance-none rounded border px-3 py-2 leading-tight dark:bg-gray-700 dark:text-white text-gray-700 shadow focus:outline-none'
                rows='3'
                required
              ></textarea>
            </div>
            <div className='flex items-center justify-end rounded-b border-t border-solid border-gray-300 pt-6'>
              <button
                className='background-transparent mr-2 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none'
                type='button'
                onClick={onClose}
              >
                Close
              </button>
              <button
                className='mb-1 mr-1 rounded bg-tertiary px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-tertiaryhover'
                type='submit'
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
