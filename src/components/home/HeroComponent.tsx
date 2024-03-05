"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroComponent() {
  const banner = [{ img: 1 }];

  return (
    <Swiper
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      modules={[Autoplay, Pagination, Navigation, FreeMode]}
    >
      {banner.map((slide) => (
        <SwiperSlide key={slide.img}>
          <Image
            src={`/images/home/${slide.img}.jpg`}
            width={1700}
            height={960}
            alt={"banner"}
            loading="lazy"
            className="mx-auto w-full"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
