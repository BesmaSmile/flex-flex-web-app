import React from 'react';
import hero from 'assets/img/hero.jpeg';
import { SearchBar } from 'components';

function Hero() {
  return (
    <div className="hero">
      <div>
        <img src={hero} alt="hero" />
        <div className="hero-content d-flex row justify-content-center align-items-center">
          <div className="col-8">
            <div className="search-label">Search for your favorite movies and tv Shows !</div>
            <SearchBar />
          </div>
        </div>
      </div>
    </div>

  );
}

export default Hero;
