"use client";
import React, { useEffect, use } from 'react';
import Error from '@/components/Error';
import { ArticleDetails, ArticleDetailsShimmer } from '@/components';
import { useStore } from '@/store';

function Movie({ params }: {
  params: Promise<{ id: number }>
}) {
  const { id } = use(params)
  console.log('id', id);
  const movieDetails = useStore((state) => state.movieDetails);
  const getMovieDetails = useStore((state) => state.getMovieDetails);
  const { data, loading, error } = movieDetails;

  useEffect(() => {
    getMovieDetails(id);
  }, []);
  return (
    <div className="movie">
      {loading && <ArticleDetailsShimmer />}
      {!loading && error && <Error message={error} />}
      {loading === false && !error && <ArticleDetails article={{ ...data, category: 'movie' }} />}
    </div>
  );
}

export default Movie;
