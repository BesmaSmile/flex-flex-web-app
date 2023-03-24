import React from 'react';
import ReactPaginate from 'react-paginate';
import Error from 'components/Error';
import './style.scss';
import NoResult from 'components/NoResult';

function PaginatedList({
  title, state, loadData, Shimmer, children,
}) {
  const {
    page,
    totalPages,
    loading,
    error,
  } = state;
  const handlePageClick = ({ selected }) => {
    loadData(selected + 1);
  };
  return (
    <div className="d-flex row justify-content-center g-0">
      <div className="col-10 title">
        <div className="d-flex row justify-content-space-between g-0">
          <div className="col title">{title}</div>
          <div className="col">
            {totalPages > 0 && (
              <ReactPaginate
                forcePage={page - 1}
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
              />
            )}
          </div>
        </div>
      </div>

      {loading && !error && <Shimmer count={20} />}
      <div className="col-10">{error && <Error message={error} />}</div>
      <div className="col-10">{!error && !loading && totalPages === 0 && <NoResult message="No data to show !" />}</div>
      {children}
    </div>
  );
}

export default PaginatedList;
