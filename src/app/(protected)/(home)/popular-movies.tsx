import React from 'react';
import { ArticleCard, InfiniteScroll, ArticleCardShimmers } from '@/components';
import { useStore } from '@/store';

function PopularMovies({ loadMorePopularMovies }: { loadMorePopularMovies: () => void }) {
  const infinitePopularMovies = useStore((state) => state.infinitePopularMovies);

  return (
    <div className="popular-movies">

      <InfiniteScroll title="Popular Movies" state={infinitePopularMovies} pageSize={20} loadData={loadMorePopularMovies} Shimmer={ArticleCardShimmers}>
        {infinitePopularMovies.data.map((movie) => (
          <ArticleCard className="m-[10px]" key={movie.id} article={{ ...movie, category: 'movie' }} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default PopularMovies;
