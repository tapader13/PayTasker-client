import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddNewTask = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const required_workers = watch('required_workers');
  const payable_amount = watch('payable_amount');
  const totalCost = (required_workers || 0) * (payable_amount || 0);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      // Replace with your actual ImageBB API key
      formData.append('key', import.meta.env.VITE_API_IMGBB_KEY);

      const response = await axios.post(
        'https://api.imgbb.com/1/upload',
        formData
      );
      setValue('task_image_url', response.data.data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    const totalCost = data.required_workers * data.payable_amount;

    if (totalCost > user.coins) {
      alert('Not enough coins available. Please purchase more coins.');
      router.push('/dashboard/purchase');
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.post('/api/tasks', {
        ...data,
        total_cost: totalCost,
      });

      router.push('/dashboard/my-tasks');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <div className='mx-auto max-w-3xl'>
        <h1 className='mb-6 text-2xl font-bold'>Create New Task</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='rounded-lg border bg-white p-6'>
            {/* Task Title */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Task Title
              </label>
              <input
                type='text'
                {...register('task_title')}
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
                placeholder='e.g., Watch my YouTube video and leave a comment'
              />
              {errors.task_title && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.task_title.message}
                </p>
              )}
            </div>

            {/* Task Details */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Task Details
              </label>
              <textarea
                {...register('task_detail')}
                rows={4}
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
                placeholder='Provide detailed instructions for the task'
              />
              {errors.task_detail && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.task_detail.message}
                </p>
              )}
            </div>

            {/* Required Workers & Payment */}
            <div className='mb-4 grid gap-4 sm:grid-cols-2'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Required Workers
                </label>
                <input
                  type='number'
                  {...register('required_workers', { valueAsNumber: true })}
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
                />
                {errors.required_workers && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.required_workers.message}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Payment per Worker (coins)
                </label>
                <input
                  type='number'
                  {...register('payable_amount', { valueAsNumber: true })}
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
                />
                {errors.payable_amount && (
                  <p className='mt-1 text-sm text-red-500'>
                    {errors.payable_amount.message}
                  </p>
                )}
              </div>
            </div>

            {/* Total Cost Display */}
            <div className='mb-4 rounded-lg bg-gray-50 p-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-700'>
                  Total Cost:
                </span>
                <span className='text-lg font-bold text-[#00838C]'>
                  {totalCost} coins
                </span>
              </div>
              <div className='mt-1 text-xs text-gray-500'>
                Your available balance: {user.coins} coins
              </div>
            </div>

            {/* Completion Date */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Completion Date
              </label>
              <input
                type='date'
                {...register('completion_date')}
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
              />
              {errors.completion_date && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.completion_date.message}
                </p>
              )}
            </div>

            {/* Submission Info */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Submission Requirements
              </label>
              <textarea
                {...register('submission_info')}
                rows={3}
                className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
                placeholder='e.g., Provide a screenshot of your comment and your YouTube username'
              />
              {errors.submission_info && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.submission_info.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Task Image
              </label>
              <div className='mt-1 flex items-center gap-4'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageUpload}
                  className='hidden'
                  id='image-upload'
                />
                <label
                  htmlFor='image-upload'
                  className='flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
                >
                  {isUploading ? (
                    <Loader2 className='h-5 w-5 animate-spin' />
                  ) : (
                    <Upload className='h-5 w-5' />
                  )}
                  Upload Image
                </label>
                {watch('task_image_url') && (
                  <img
                    src={watch('task_image_url')}
                    alt='Task preview'
                    className='h-20 w-20 rounded-md object-cover'
                  />
                )}
              </div>
              {errors.task_image_url && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.task_image_url.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full rounded-md bg-[#00838C] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#006d75] disabled:bg-gray-400'
            >
              {isSubmitting ? (
                <Loader2 className='mx-auto h-5 w-5 animate-spin' />
              ) : (
                'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTask;
