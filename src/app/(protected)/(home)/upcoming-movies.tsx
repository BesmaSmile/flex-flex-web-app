import React from 'react';
import { ArticleCard, ArticleCardShimmers } from '@/components';
import { MultipleSlidesSwiper } from '@/components/Swipers';
import { useStore } from '@/store';

function UpcomingMovies() {
  const upcomingMovies = useStore((state) => state.upcomingMovies);
  console.log('upcomingMovies', upcomingMovies);
  const { data, loading, error } = upcomingMovies;
  return (
    <div className="upcoming-movies mb-10">
      <div className="flex flex-col items-center gap-0">
        <div className="w-10/12 text-red-600 font-light text-xl my-[50px] mb-5">Upcoming...</div>

        {(loading || error) && (
          <div className="flex flex-row justify-center gap-0">
            <ArticleCardShimmers count={4} />
          </div>
        )}

        <div className="w-10/12">
          {data.length > 0 && (
            <MultipleSlidesSwiper>
              {data.map((movie) => (
                <ArticleCard key={movie.id} article={{ ...movie, category: 'movie' }} />
              ))}
            </MultipleSlidesSwiper>
          )}
        </div>
      </div>
    </div>

  );
}

export default UpcomingMovies;
