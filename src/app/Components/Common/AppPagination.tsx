import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { MetaData } from '../../models/pagination';

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export default function AppPagination({ metaData, onPageChange }: Props) {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;
  const [pageNumber, setPageNumber] = useState(currentPage);

  function handlePageChange(page: number) {
    setPageNumber(page);
    onPageChange(page);
  }

  return (
    <div className='border-b-4 px-5 pt-1 border-b-yellow-500 dark:border-b-indigo-500 w-auto h-auto'>
      {metaData && (
        <div className='flex flex-col lg:flex-row justify-between items-center gap-y-2 lg:gap-y-0'>
          <p className='font-Primary font-thin text-lg lg:text-xl'>
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {currentPage * pageSize > totalCount
              ? totalCount
              : currentPage * pageSize}{' '}
            of {totalCount} items
          </p>
          {metaData.totalPages > 1 && (
            <ReactPaginate
              className='flex flex-row items-center gap-x-3 py-2  w-auto '
              forcePage={pageNumber - 1}
              pageClassName='font-thin'
              activeClassName='font-normal text-orange-500'
              pageLinkClassName={'p-2 font-Primary  text-inherit text-xl'}
              breakLabel='...'
              nextLabel={<ChevronRightIcon className='h-6 w-6' />}
              onPageChange={({ selected }) => {
                handlePageChange(selected);
              }}
              pageRangeDisplayed={3}
              pageCount={totalPages}
              previousLabel={<ChevronLeftIcon className='h-6 w-6' />}
            />
          )}
        </div>
      )}
    </div>
  );
}
