export default function SubmissionModal({ isOpen, onClose, submission }) {
  if (!isOpen || !submission) return null;

  return (
    <div
      className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full'
      id='my-modal'
    >
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-950'>
        <div className='mt-3'>
          <h3 className='text-lg font-medium leading-6 text-gray-900 mb-2'>
            Submission Details
          </h3>
          <div className='mt-2 px-7 py-3'>
            <p className='text-sm text-gray-500 dark:text-gray-300 mb-1'>
              <strong>Worker Name:</strong> {submission.worker_name}
            </p>
            <p className='text-sm dark:text-gray-300 text-gray-500 mb-1'>
              <strong>Buyer Name:</strong> {submission.buyer_name}
            </p>
            <p className='text-sm dark:text-gray-300 text-gray-500 mb-1'>
              <strong>Task:</strong> {submission.task_title}
            </p>
            <p className='text-sm dark:text-gray-300 text-gray-500 mb-1'>
              <strong>Payable Amount:</strong> {submission.payable_amount} coins
            </p>
            <p className='text-sm dark:text-gray-300 text-gray-500 mb-1'>
              <strong>Submission Date:</strong>{' '}
              {new Date(submission.current_date).toLocaleString()}
            </p>
            <p className='text-sm dark:text-gray-300 text-gray-500 mt-4'>
              <strong>Submission Details:</strong>
            </p>
            <p className='text-sm dark:text-gray-300 text-gray-700 mt-1'>
              {submission.submission_details}
            </p>
          </div>
          <div className='items-center px-4 py-3'>
            <button
              className='px-4 py-2 bg-tertiaryhover text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-tertiary'
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
