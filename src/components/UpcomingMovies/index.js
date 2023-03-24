import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiConfig } from 'config';
import hero from 'assets/img/hero.jpeg';
import './style.scss';
import { OneSlideSwiper } from 'components/Swipers';

function UpcomingMovies() {
  const dispatch = useDispatch();
  const { upcomingMovies } = useSelector((state) => state.movies);

  const { data, loading, error } = upcomingMovies;
  const loadUpcomingMovies = () => {
    dispatch({
      type: 'movies/GET_UPCOMING_MOVIES',
    });
  };

  useEffect(() => {
    loadUpcomingMovies();
  }, []);
  return (
    (loading || error) ? (
      <div className="swipe-item"><img key="hero" src={hero} alt="Upcoming" /></div>
    ) : (
      <OneSlideSwiper>

        {data.map(({ id, title, poster_path }) => (
          <div className="swipe-item" key={id}>
            <img src={`${apiConfig.imgUrl}/${poster_path}`} alt={title} />
            <div className="shadow" />
          </div>
        ))}
      </OneSlideSwiper>
    )
  );
}

export default UpcomingMovies;
