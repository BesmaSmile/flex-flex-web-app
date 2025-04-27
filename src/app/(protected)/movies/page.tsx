"use client";
import React, { useEffect } from 'react';

import { PaginatedList, ArticleCardShimmers, ArticleCard } from '@/components';


import { useStore } from '@/store';

function Movies() {
  const movies = useStore((state) => state.popularMovies);
  const getPopularMovies = useStore((state) => state.getPopularMovies);

  useEffect(() => {
    getPopularMovies(1);
  }, []);

  return (
    <div className="mt-5">
      <PaginatedList title="Movies" state={movies} loadData={getPopularMovies} Shimmer={ArticleCardShimmers}>
        {movies.data.map((movie) => (
          <ArticleCard
            className='m-[5px]'
            key={movie.id}
            article={{ ...movie, category: 'movie' }}
          />
        ))}
      </PaginatedList>
    </div>

  );
}

export default Movies;
