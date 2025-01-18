import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Your main content here */}

      <div className='flex items-center justify-center space-x-2 mt-8'>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className='flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00838C] disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='Previous page'
        >
          <ChevronLeft className='w-5 h-5' />
        </button>

        <div className='flex items-center space-x-1'>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00838C] ${
                currentPage === index + 1
                  ? 'bg-[#00838C] text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={`Page ${index + 1}`}
              aria-current={currentPage === index + 1 ? 'page' : undefined}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className='flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00838C] disabled:opacity-50 disabled:cursor-not-allowed'
          aria-label='Next page'
        >
          <ChevronRight className='w-5 h-5' />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
