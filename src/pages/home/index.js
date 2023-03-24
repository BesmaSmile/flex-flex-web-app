import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Hero from './hero';
import PopularMovies from './popular-movies';
import UpcomingMovies from './upcoming-movies';
import './style.scss';

function Home() {
  const dispatch = useDispatch();
  const loadPopularMovies = () => {
    dispatch({
      type: 'movies/GET_POPULAR_MOVIES',
    });
  };

  const loadUpcomingMovies = () => {
    dispatch({
      type: 'movies/GET_UPCOMING_MOVIES',
    });
  };
  const getFavorite = () => {
    dispatch({
      type: 'favorite/GET_FAVORITE',
    });
  };

  useEffect(() => {
    loadPopularMovies();
    loadUpcomingMovies();
    getFavorite();
  }, []);
  return (
    <div className="home">
      <Hero />
      <UpcomingMovies />
      <PopularMovies loadPopularMovies={loadPopularMovies} />

    </div>
  );
}

export default Home;
