
import React from 'react';
import { Swiper as ReactSwiper, SwiperSlide } from 'swiper/react';

import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './style.scss';

function OneSlideSwiper({ children }: { children: React.ReactElement[] }) {
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
    >
      {children.map((child) => (
        <SwiperSlide key={child?.key}>{child}</SwiperSlide>
      ))}
    </ReactSwiper>
  );
}

export default OneSlideSwiper;
