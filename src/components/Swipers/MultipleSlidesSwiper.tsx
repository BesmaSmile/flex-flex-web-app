import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import './style.scss';

function MultipleSlidesSwiper({ children }: { children: React.ReactElement[] }) {
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
    >
      {children.map((child) => (
        <SwiperSlide key={child.key}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MultipleSlidesSwiper;
