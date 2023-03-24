import React from 'react';
import ReactStars from 'react-rating-stars-component';

function RatingStars({ value }) {
  return (
    <ReactStars
      value={value}
      count={5}
      size={15}
      activeColor="#ffd700"
      edit={false}
      isHalf
    />
  );
}

export default RatingStars;
