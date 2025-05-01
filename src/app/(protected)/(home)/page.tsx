"use client";
import React, { useEffect } from 'react';
import Hero from './hero';
import PopularMovies from './popular-movies';
import UpcomingMovies from './upcoming-movies';
import { useStore } from '@/store';

function Home() {
  const getUpcomingMovies = useStore((state) => state.getUpcomingMovies);
  const loadMorePopularMovies = useStore((state) => state.loadMorePopularMovies);
  useEffect(() => {
    getUpcomingMovies(1);
    loadMorePopularMovies();
  }, [getUpcomingMovies, loadMorePopularMovies]);
  return (
    <div className="home">
      <Hero />
      <UpcomingMovies />
      <PopularMovies loadMorePopularMovies={loadMorePopularMovies} />
    </div>
  );
}

export default Home;
