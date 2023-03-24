import React from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import Error from 'components/Error';

function InfiniteScroll({
  title, state, children, pageSize, loadData, Shimmer,
}) {
  const {
    data, loading, page, totalPages, error,
  } = state;

  const hasMore = page < totalPages;

  const next = () => {
    if (hasMore) {
      loadData();
    }
  };

  if (loading && data.length === 0) {
    return (
      <div className="d-flex row justify-content-center g-0">
        <div className="col-10 title">{title}</div>

        <Shimmer count={pageSize} />
      </div>
    );
  }
  if (error) {
    return <Error message={error} />;
  }
  return (
    data.length > 0 && (
      <InfiniteScrollComponent
        dataLength={data.length}
        next={next}
        hasMore={hasMore}
        style={{ overflowX: 'hidden', overflowY: 'hidden' }}
      >
        <div className="d-flex row justify-content-center g-0">
          <div className="col-10 title">{title}</div>

          {children}
          {loading && (
            <Shimmer count={pageSize} />
          )}
        </div>
      </InfiniteScrollComponent>
    )
  );
}

export default InfiniteScroll;
