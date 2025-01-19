import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

export default function TaskSubmissionForm({ taskInfo }) {
  const [submissionDetails, setSubmissionDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        task_id: taskInfo?._id,
        task_title: taskInfo?.task_title,
        payable_amount: taskInfo?.payable_amount,
        worker_email: user?.email,
        worker_name: user?.displayName,
        submission_details: submissionDetails,
        buyer_name: taskInfo?.username,
        buyer_email: taskInfo?.buyerEmail,
        current_date: new Date().toISOString(),
        status: 'pending',
      };
      const response = await axiosSecure.post(
        '/tasks-worker/submit',
        submitData
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        setSubmissionDetails('');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label
          htmlFor='submission_details'
          className='mb-2 block text-sm font-medium text-gray-700'
        >
          Submission Details
        </label>
        <textarea
          id='submission_details'
          name='submission_details'
          rows='6'
          className='mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#00838C] focus:ring-[#00838C] sm:text-sm'
          placeholder='Enter your submission details here...'
          value={submissionDetails}
          onChange={(e) => setSubmissionDetails(e.target.value)}
          required
        ></textarea>
      </div>

      <button
        type='submit'
        disabled={isSubmitting}
        className='inline-flex w-full items-center justify-center rounded-md bg-tertiary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-tertiaryhover focus:outline-none focus:ring-2 focus:ring-[#00838C] focus:ring-offset-2 disabled:bg-gray-400'
      >
        {isSubmitting ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Submitting...
          </>
        ) : (
          'Submit Task'
        )}
      </button>
    </form>
  );
}
