import { useState, useEffect } from 'react';
import BuyerState from './buyer/BuyerState';
import TaskToReviewTable from './buyer/TaskToReviewTable';
import SubmissionModal from './buyer/SubmissionModal';
import ConfirmationModal from './admin/ConfirmationModal';

export default function BuyerHome() {
  const [stats, setStats] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    fetchBuyerData();
  }, []);

  const fetchBuyerData = async () => {
    try {
      setIsLoading(true);
      const [statsResponse, submissionsResponse] = await Promise.all([
        fetch('/api/buyer/stats'),
        fetch('/api/buyer/submissions'),
      ]);

      if (!statsResponse.ok || !submissionsResponse.ok) {
        throw new Error('Failed to fetch buyer data');
      }

      const statsData = await statsResponse.json();
      const submissionsData = await submissionsResponse.json();

      setStats(statsData);
      setSubmissions(submissionsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewSubmission = (submission) => {
    setSelectedSubmission(submission);
    setShowSubmissionModal(true);
  };

  const handleApproveSubmission = (submission) => {
    setSelectedSubmission(submission);
    setConfirmAction('approve');
    setShowConfirmModal(true);
  };

  const handleRejectSubmission = (submission) => {
    setSelectedSubmission(submission);
    setConfirmAction('reject');
    setShowConfirmModal(true);
  };

  const confirmSubmissionAction = async () => {
    try {
      const response = await fetch(
        `/api/buyer/submissions/${selectedSubmission.id}/${confirmAction}`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${confirmAction} submission`);
      }

      // Update local state
      setSubmissions(
        submissions.filter((sub) => sub.id !== selectedSubmission.id)
      );

      // Refresh stats
      const statsResponse = await fetch('/api/buyer/stats');
      if (statsResponse.ok) {
        const updatedStats = await statsResponse.json();
        setStats(updatedStats);
      }

      setShowConfirmModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00838C]'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
        <svg
          className='h-10 w-10 text-red-500'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <h2 className='mt-4 text-xl font-semibold'>Error loading buyer data</h2>
        <p className='mt-2 text-gray-600'>{error}</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold'>Buyer Dashboard</h1>
      <BuyerState stats={stats} />
      <TaskToReviewTable
        submissions={submissions}
        onViewSubmission={handleViewSubmission}
        onApproveSubmission={handleApproveSubmission}
        onRejectSubmission={handleRejectSubmission}
      />
      <SubmissionModal
        isOpen={showSubmissionModal}
        onClose={() => setShowSubmissionModal(false)}
        submission={selectedSubmission}
      />
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmSubmissionAction}
        title={`Confirm ${confirmAction} Submission`}
        message={`Are you sure you want to ${confirmAction} this submission?`}
      />
    </div>
  );
}
