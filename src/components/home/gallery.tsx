// components/CenterCarousel.js
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  { id: 1, title: "Marina Beach", image: "/images/place1.jpg" },
  { id: 2, title: "Mahabalipuram", image: "/images/place2.jpg" },
  { id: 3, title: "Dakshinachitra", image: "/images/place3.jpg" },
  { id: 4, title: "Parthasarathy temple", image: "/images/place4.jpg" },
  { id: 5, title: "Kabaleeshwarar temple", image: "/images/place5.jpg" },
  { id: 6, title: "Santhome church", image: "/images/place6.jpg" },
];

export default function CenterCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full mx-auto py-32 h-full">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Places of Attraction in Chennai 
      </h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        centeredSlides={true}
        loop={true}
        speed={900}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Autoplay, Navigation, Pagination]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
        }}
        watchSlidesProgress={true}
        slideToClickedSlide={true}
        className="mySwiper"
      >
        {slides.map((slide, idx) => {
          const isActive = idx === activeIndex;

          return (
            <SwiperSlide
              key={slide.id}
              className="flex justify-center items-center py-24"
            >
              <div
                className={`relative rounded-xl overflow-hidden shadow-xl transform-gpu ${
                  isActive ? "active-slide" : "inactive-slide"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={400}
                  height={400}
                  priority={idx === activeIndex}
                  className="object-cover w-full h-[400px]"
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded whitespace-nowrap">
                  {slide.title}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="custom-prev absolute top-1/2 left-14 max-md:left-2 -translate-y-1/2 bg-white/90 text-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-200 transition z-50">
        <ChevronLeft size={24} />
      </button>
      <button className="custom-next absolute top-1/2 right-14 max-md:right-2 -translate-y-1/2 bg-white/90 text-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-200 transition z-50">
        <ChevronRight size={24} />
      </button>

      {/* Custom Pagination Dots */}
      <div className="custom-pagination flex justify-center gap-3 mt-8"></div>

      <style jsx>{`
        /* Unique transition styles */
        .active-slide {
          transform: scale(1.1) rotateY(0deg) translateY(0);
          opacity: 1;
          z-index: 20;
          transition: all 0.8s ease-in-out;
        }
        .inactive-slide {
          transform: scale(0.9) rotateY(10deg) translateY(10px);
          opacity: 0.6;
          z-index: 10;
          transition: all 0.8s ease-in-out;
        }

        /* Stylish pagination dots */
        .custom-pagination .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #ccc;
          opacity: 0.7;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          width: 16px;
          height: 16px;
          background: #111;
          opacity: 1;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.4);
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
