import React from 'react';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import Error from './Error';

type InfiniteScrollProps = {
  title?: string;
  state: {
    data: any[];
    loading: boolean;
    page: number;
    totalPages: number;
    error?: string | null;
  };
  children: React.JSX.Element[];
  pageSize: number;
  loadData: () => void;
  Shimmer: React.FC<{ count: number }>;
};

function InfiniteScroll({
  title, state, children, pageSize, loadData, Shimmer,
}: InfiniteScrollProps) {
  const {
    data, loading, page, totalPages, error,
  } = state;

  const hasMore = page < totalPages;

  const next = () => {
    if (hasMore) {
      loadData();
    }
  };

  if ((loading && data.length === 0) || error) {
    return (
      <div className="flex flex-wrap justify-center gap-0">
        <div className="w-10/12 text-red-600 font-light text-xl my-[50px] mb-5">{title}</div>
        <Shimmer count={pageSize} />
      </div>
    );
  }

  return (
    data.length > 0 && (
      <InfiniteScrollComponent
        loader={null}
        dataLength={data.length}
        next={next}
        hasMore={hasMore}
        style={{ overflowX: 'hidden', overflowY: 'hidden' }}
      >
        <div className="flex flex-wrap justify-center">
          <div className="w-10/12 text-red-600 font-light text-xl my-[50px] mb-5">{title}</div>
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
