export default function WorkerState({ stats }) {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8'>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='text-sm font-medium text-gray-500'>
            Total Submissions
          </h3>
          <svg
            className='h-4 w-4 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
            />
          </svg>
        </div>
        <p className='text-2xl font-bold'>{stats.totalSubmissions}</p>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='text-sm font-medium text-gray-500'>
            Pending Submissions
          </h3>
          <svg
            className='h-4 w-4 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <p className='text-2xl font-bold'>{stats.pendingSubmissions}</p>
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex items-center justify-between mb-2'>
          <h3 className='text-sm font-medium text-gray-500'>Total Earnings</h3>
          <svg
            className='h-4 w-4 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <p className='text-2xl font-bold'>${stats.totalEarnings.toFixed(2)}</p>
      </div>
    </div>
  );
}
