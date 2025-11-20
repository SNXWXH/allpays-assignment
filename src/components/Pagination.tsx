interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from(
    { length: Math.min(totalPages, 10) },
    (_, i) => i + 1
  );

  return (
    <div className='flex items-center justify-center gap-2 mt-6'>
      {pages.map((page) => {
        const isActive = currentPage === page;
        const buttonClass = isActive
          ? 'flex items-center justify-center rounded-md font-medium transition-colors h-8 px-3 text-sm bg-[#646cff] text-white hover:bg-[#535bf2]'
          : 'flex items-center justify-center rounded-md font-medium transition-colors h-8 px-3 text-sm border border-gray-300 bg-white hover:bg-gray-50 text-gray-700';

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={buttonClass}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
