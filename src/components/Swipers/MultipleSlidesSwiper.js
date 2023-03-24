/* eslint-disable import/no-unresolved */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import './style.scss';

function MultipleSlidesSwiper({ children }) {
  return (
    <Swiper
      slidesPerView={4}
      slidesPerGroupSkip={1}
      breakpoints={{
        769: {
          slidesPerView: 4,
          slidesPerGroup: 4,
        },
      }}
      spaceBetween={5}
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
    </Swiper>
  );
}

export default MultipleSlidesSwiper;
