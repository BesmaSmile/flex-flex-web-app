import React from 'react';
import hero from '@/assets/img/hero.jpeg';
import { SearchBar } from '@/components';
import Image from 'next/image';

function Hero() {
  return (
    <div className="hero">
      <div className='h-screen relative'>
        <Image className='h-full w-full object-cover' src={hero} alt="hero" />
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-center flex flex-row justify-center items-center">
          <div className="col-8">
            <div className="font-medium text-3xl mt-36 mb-5">Search for your favorite movies and tv Shows !</div>
            <SearchBar />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Hero;
