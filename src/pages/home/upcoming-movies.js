import React from 'react';
import { useSelector } from 'react-redux';
import { ArticleCard, ArticleCardShimmers } from 'components';
import { MultipleSlidesSwiper } from 'components/Swipers';

function UpcomingMovies() {
  const { upcomingMovies } = useSelector((state) => state.movies);

  const { data, loading, error } = upcomingMovies;
  return (
    <div className="upcoming-movies">
      <div className="d-flex row justify-content-center g-0">
        <div className="col-10 title">Upcoming...</div>

        {(loading || error) && (
          <div className="d-flex row justify-content-center g-0">
            <ArticleCardShimmers count={4} />
          </div>
        )}
        <div className="col-10">

          {data.length > 0 && (
            <MultipleSlidesSwiper>
              {upcomingMovies.data.map((movie) => (
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
