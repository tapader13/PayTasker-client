import { useState, useEffect } from 'react';
import BuyerState from './buyer/BuyerState';
import TaskToReviewTable from './buyer/TaskToReviewTable';
import SubmissionModal from './buyer/SubmissionModal';
import ConfirmationModal from './admin/ConfirmationModal';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

export default function BuyerHome() {
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const axiosSecure = useAxiosSecure();

  const fetchBuyerData = async () => {
    const resposne = await axiosSecure.get('/buyer-states');
    return resposne?.data;
  };
  const {
    isError,
    error,
    isLoading,
    data: buyer_data = [],
    refetch: buyerHomeRefetch,
  } = useQuery({
    queryKey: ['buyer-state'],
    queryFn: fetchBuyerData,
  });

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
      const res = await axiosSecure.patch(`/${confirmAction}-submission`, {
        id: selectedSubmission._id,
      });
      if (res?.data?.success) {
        buyerHomeRefetch();
        toast.success(res?.data?.message);
        setShowConfirmModal(false);
      }
    } catch (err) {
      // console.log(err);
      toast.error(err?.response?.data?.message || err?.message);
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <div className='animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#00838C]'></div>
      </div>
    );
  }

  if (isError) {
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
        <p className='mt-2 text-gray-600 dark:text-gray-300'>{error.message}</p>
      </div>
    );
  }
  // console.log(buyer_data);
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold dark:text-white'>
        Buyer Dashboard
      </h1>
      <BuyerState stats={buyer_data?.states} />
      <TaskToReviewTable
        submissions={buyer_data?.submissions}
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
