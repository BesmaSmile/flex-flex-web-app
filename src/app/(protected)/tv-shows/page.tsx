"use client";
import React, { useEffect } from 'react';
import { PaginatedList, ArticleCardShimmers, ArticleCard } from '@/components';
import { useStore } from '@/store';


function TvShows() {
  const tvShows = useStore((state) => state.popularTvShows);
  const getPopularTvShows = useStore((state) => state.getPopularTvShows);

  useEffect(() => {
    getPopularTvShows(1);
  }, [getPopularTvShows]);

  return (
    <div className="mt-5">
      <PaginatedList title="TV Shows" state={tvShows} loadData={getPopularTvShows} Shimmer={ArticleCardShimmers}>
        {tvShows.data.map((tvShow) => (
          <ArticleCard
            className='m-[5px]'
            key={tvShow.id}
            article={{ ...tvShow, category: 'tv-show' }}
          />
        ))}
      </PaginatedList>
    </div>

  );
}

export default TvShows;
