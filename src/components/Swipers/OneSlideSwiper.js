/* eslint-disable import/no-unresolved */
import React from 'react';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.scss';

function OneSlideSwiper({ children }) {
  return (
    <ReactSwiper
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {children.map((child) => (
        <SwiperSlide key={child.key}>{child}</SwiperSlide>
      ))}
    </ReactSwiper>
  );
}

export default OneSlideSwiper;
