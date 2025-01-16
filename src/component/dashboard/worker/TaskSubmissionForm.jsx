import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function TaskSubmissionForm({
  taskId,
  taskTitle,
  payableAmount,
  buyerName,
  buyerEmail,
}) {
  const [submissionDetails, setSubmissionDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/tasks/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task_id: taskId,
          task_title: taskTitle,
          payable_amount: payableAmount,
          submission_details: submissionDetails,
          buyer_name: buyerName,
          buyer_email: buyerEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit task');
      }

      setSuccess(true);
      setSubmissionDetails('');
    } catch (err) {
      setError(err.message);
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
      {error && (
        <div className='rounded-md bg-red-50 p-4 text-sm text-red-700'>
          {error}
        </div>
      )}
      {success && (
        <div className='rounded-md bg-green-50 p-4 text-sm text-green-700'>
          Your submission has been received successfully!
        </div>
      )}
      <button
        type='submit'
        disabled={isSubmitting}
        className='inline-flex w-full items-center justify-center rounded-md bg-[#00838C] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#006d75] focus:outline-none focus:ring-2 focus:ring-[#00838C] focus:ring-offset-2 disabled:bg-gray-400'
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
