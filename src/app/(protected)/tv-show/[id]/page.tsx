"use client";
import React, { useEffect, use } from 'react';
import Error from '@/components/Error';
import { ArticleDetails, ArticleDetailsShimmer } from '@/components';
import { useStore } from '@/store';

function TvShow({ params }: {
  params: Promise<{ id: number }>
}) {
  const { id } = use(params)
  const movieDetails = useStore((state) => state.tvShowDetails);
  const getTvShowsDetails = useStore((state) => state.getTvShowsDetails);
  const { data, loading, error } = movieDetails;

  useEffect(() => {
    getTvShowsDetails(id);
  }, [getTvShowsDetails, id]);
  return (
    <div className="tv-show">
      {loading && <ArticleDetailsShimmer />}
      {!loading && error && <Error message={error} />}
      {loading === false && !error && <ArticleDetails article={{ ...data, category: 'tv-show' }} />}
    </div>
  );
}

export default TvShow;
