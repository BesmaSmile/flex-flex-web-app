import React, { useEffect } from 'react';
import { apiConfig } from '@/config';
import hero from '@/assets/img/hero.jpeg';
import { OneSlideSwiper } from './Swipers';
import { useStore } from '@/store';
import Image from 'next/image';

function UpcomingMovies() {
  const upcomingMovies = useStore((state) => state.upcomingMovies);
  const getUpcomingMovies = useStore((state) => state.getUpcomingMovies);

  const { data, loading, error } = upcomingMovies;


  useEffect(() => {
    getUpcomingMovies(1);
  }, [getUpcomingMovies]);

  return (
    (loading || error) ? (
      <div className="w-full h-full relative"><Image className='block w-full h-full object-cover' key="hero" src={hero} alt="Upcoming" /></div>
    ) : (
      <OneSlideSwiper>
        {[
          <div className="w-full h-full relative" key="hero"><Image className='block w-full h-full object-cover' src={hero} alt="Upcoming" /></div>,
          ...data.map(({ id, title, poster_path }) => (
            <div className="w-full h-full relative" key={id}>
              <Image layout="fill" className='block w-full h-full object-cover' src={`${apiConfig.imgUrl}/${poster_path}`} alt={title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent/0 via-[#2d2d2d]/0" />
            </div>
          ))]}
      </OneSlideSwiper>
    )
  );
}

export default UpcomingMovies;
