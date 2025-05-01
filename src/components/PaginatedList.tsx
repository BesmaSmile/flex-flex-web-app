import React from 'react';
import ReactPaginate from 'react-paginate';
import Error from './Error';
import NoResult from './NoResult';

type PaginatedListProps = {
  title: string,
  state: {
    page: number,
    totalPages: number,
    loading: boolean,
    error?: any,
  },
  loadData: (page: number) => void,
  Shimmer: React.ComponentType<{ count: number }>,
  children: React.ReactNode,
};

function PaginatedList({
  title, state, loadData, Shimmer, children,
}: PaginatedListProps) {
  const {
    page,
    totalPages,
    loading,
    error,
  } = state;
  const handlePageClick = ({ selected }: { selected: number }) => {
    loadData(selected + 1);
  };

  return (
    <div className="flex flex-wrap justify-center gap-0">
      <div className="w-10/12 mb-5">
        <div className="flex justify-between items-center gap-0">
          <div className="font-light text-xl">{title}</div>
          <div className='flex flex-row list-none'>
            {totalPages > 0 && (
              <ReactPaginate
                forcePage={page - 1}
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={10}
                pageCount={Math.min(totalPages, 500)}
                previousLabel="<"
                renderOnZeroPageCount={() => <></>}
                className="flex flex-wrap justify-end list-none"
                pageClassName=""
                pageLinkClassName="cursor-pointer relative block text-red-600 no-underline border border-red-600 px-3 py-1 hover:z-20 hover:text-white hover:bg-red-600 hover:border-red-600 focus:z-30 focus:text-white focus:bg-red-600 focus:shadow-[1px_2px_10px_rgba(46,36,36,0.86)]"
                previousClassName="rounded-tl-md rounded-bl-md"
                previousLinkClassName="cursor-pointer rounded-tl-md rounded-bl-md relative block text-red-600 no-underline border border-red-600 px-3 py-1 hover:z-20 hover:text-white hover:bg-red-600 hover:border-red-600 focus:z-30 focus:text-white focus:bg-red-600 focus:shadow-[1px_2px_10px_rgba(46,36,36,0.86)]"
                nextClassName="rounded-tr-md rounded-br-md"
                nextLinkClassName="cursor-pointer rounded-tr-md rounded-br-md relative block text-red-600 no-underline border border-red-600 px-3 py-1 hover:z-20 hover:text-white hover:bg-red-600 hover:border-red-600 focus:z-30 focus:text-white focus:bg-red-600 focus:shadow-[1px_2px_10px_rgba(46,36,36,0.86)]"
                breakClassName=""
                breakLinkClassName="relative block text-red-600 no-underline border border-red-600 px-3 py-1"
                activeClassName="z-30 bg-red-600 text-white shadow-[1px_2px_10px_rgba(46,36,36,0.86)]"
                activeLinkClassName='text-white'
                disabledClassName="text-red-600 opacity-70 pointer-events-none border-red-600"
              />
            )}
          </div>
        </div>
      </div>

      {loading && !error && <Shimmer count={20} />}
      <div className="w-10/12">{error && <Error message={error} />}</div>
      <div className="w-10/12">
        {!error && !loading && totalPages === 0 && (
          <NoResult message="No data to show !" />
        )}
      </div>
      {children}
    </div>

  );
}

export default PaginatedList;
