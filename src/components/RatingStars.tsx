import React from 'react';
import StarRatings from 'react-star-ratings';

function RatingStars({ value }: { value: number }) {
  return (
    <StarRatings
      rating={value}
      starRatedColor="#ffd700"
      numberOfStars={5}
      name='rating'
      starDimension='15px'
      starSpacing='1px'
    />
  );
}

export default RatingStars;