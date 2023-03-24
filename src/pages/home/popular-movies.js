import React from 'react';
import { useSelector } from 'react-redux';
import { ArticleCard, InfiniteScroll, ArticleCardShimmers } from 'components';

function PopularMovies({ loadPopularMovies }) {
  const { popularMovies } = useSelector((state) => state.movies);

  return (
    <div className="popular-movies">

      <InfiniteScroll title="Popular Movies" state={popularMovies} pageSize={20} loadData={loadPopularMovies} Shimmer={ArticleCardShimmers}>
        {popularMovies.data.map((movie) => (
          <ArticleCard key={movie.id} article={{ ...movie, category: 'movie' }} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default PopularMovies;
