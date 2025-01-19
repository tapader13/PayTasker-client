import { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import moment from 'moment';
import Pagination from './Pagination';

export default function MySubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const submissionsPerPage = 2;
  useEffect(() => {
    fetchSubmissions();
  }, [currentPage]);
  console.log(currentPage);
  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      const response = await axiosSecure.get(
        `/worker-submissions?page=${currentPage}&limit=${submissionsPerPage}`
      );
      if (response?.data?.success) {
        setSubmissions(response?.data?.data);
        setTotalPages(response?.data?.totalPages);
        // toast.success(response.data?.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(submissions, totalPages, 'complete');
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='h-10 w-10 animate-spin text-tertiary' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-[60vh] flex-col items-center justify-center text-center'>
        <AlertCircle className='h-10 w-10 text-red-500' />
        <h2 className='mt-4 text-xl font-semibold'>
          Error loading submissions
        </h2>
        <p className='mt-2 text-gray-600'>{error}</p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-6 text-2xl font-bold'>My Submissions</h1>
      {submissions.length === 0 ? (
        <div className='rounded-lg border border-gray-200 bg-white p-6 text-center'>
          <p className='text-gray-600'>
            You haven&apos;t made any submissions yet.
          </p>
        </div>
      ) : (
        <>
          <div className='overflow-x-auto rounded-lg border border-gray-200 bg-white'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                    Task Title
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                    Submission Date
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                    Reward
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {submissions.map((submission) => (
                  <tr key={submission.id}>
                    <td className='whitespace-nowrap px-6 py-4'>
                      <div className='text-sm font-medium text-gray-900'>
                        {submission.task_title}
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      <div className='text-sm text-gray-500'>
                        {moment(new Date(submission.current_date)).format(
                          'MMM d, yyyy'
                        )}
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      <div className='text-sm text-gray-900'>
                        {submission.payable_amount} coins
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                          submission.status
                        )}`}
                      >
                        {submission.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
          </div>
          <div className='mt-4 flex justify-center'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </div>
  );
}
