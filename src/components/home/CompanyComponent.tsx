"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  FreeMode,
  Mousewheel,
} from "swiper/modules";
import SwiperCore from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";

SwiperCore.use([Autoplay]);

export default function CompanyComponent() {
  const router = useRouter();

  const company = [
    { img: 1, url: "https://www.moph.go.th/" },
    { img: 2, url: "https://www.ddc.moph.go.th/" },
    { img: 3, url: "https://www.dtam.moph.go.th/index.php/th/" },
    { img: 4, url: "https://www.dms.go.th/" },
    { img: 5, url: "https://anamai.moph.go.th/th" },
    { img: 6, url: "https://www3.dmsc.moph.go.th/" },
    { img: 7, url: "https://hss.moph.go.th/" },
    { img: 8, url: "https://dmh.go.th/" },
    { img: 9, url: "https://www.fda.moph.go.th/" },
  ];

  return (
    <section className="w-full mx-auto py-2 px-4 lg:px-14 lg:py-14">
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        pagination={{
          enabled: false,
          dynamicBullets: true,
        }}
        // breakpoints={{
        //   320: { width: 320, slidesPerView: 1, spaceBetween: 30 },
        //   640: { width: 640, slidesPerView: 2, spaceBetween: 30 },
        //   768: { width: 768, slidesPerView: 3, spaceBetween: 30 },
        //   1024: { width: 1024, slidesPerView: 4, spaceBetween: 30 },
        // }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        freeMode={true}
        modules={[Pagination, Autoplay, FreeMode]}
      >
        {company.map((slide) => (
          <SwiperSlide key={slide.img}>
            <Link href={`${slide.url}`}>
              <Image
                src={`/images/company/logo-${slide.img}.png`}
                width={390}
                height={73}
                alt={"company"}
                loading="lazy"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
