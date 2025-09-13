"use client";


function CountdownCircles() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const eventDate = new Date("2026-03-20T09:00:00");
    const now = new Date();
    const diff = eventDate.getTime() - now.getTime();

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const parts = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="absolute bottom-20 mt-8 flex flex-wrap justify-center gap-5">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="w-[120%] h-48 opacity-1"
        >
          <path
            d="
            M0,100 
            L150,100 
            L180,60 
            L210,140 
            L240,100 
            L300,100 
            L340,40 
            L360,160 
            L400,100
            L450,100 
            L480,60 
            L510,140 
            L540,100 
            L600,100 
            L640,40 
            L660,160 
            L700,100
            L750,100 
            L780,60 
            L810,140 
            L840,100 
            L900,100 
            L940,40 
            L960,160 
            L1000,100
            L1050,100
            L1100,60
            L1130,140
            L1160,100
            L1200,100
            "
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dasharray"
              from="0,2000"
              to="2000,0"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
      {parts.map((p) => (
        <div
          key={p.label}
          className="relative group w-20 h-20 md:w-28 md:h-28 bg-gradient-to-b from-blue-700 to-indigo-800 rounded-lg shadow-md flex flex-col items-center justify-center overflow-hidden"
        >
          {/* animated glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-white/10 transition duration-500" />
          <span className="text-2xl md:text-3xl font-extrabold text-white drop-shadow animate-pulse">
            {p.value.toString().padStart(2, "0")}
          </span>
          <span className="text-[11px] md:text-sm uppercase tracking-wide text-blue-100 mt-1">
            {p.label}
          </span>
          {/* underline */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-lime-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      ))}
    </div>
  );
}




import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const images = [
  {
    src: "/images/slider-img4.jpg",
    title: "MVCON 2025",
    subtitle: "Advancing excellence in diabetes and diabetic foot care",
  },
  {
    src: "/images/slider-img1.jpg",
    title: "Global Collaboration",
    subtitle: "250–300 healthcare professionals exchanging ideas & innovations",
  },
  {
    src: "/images/slider-img3.jpg",
    title: "Scientific Program",
    subtitle: "Talks, workshops, symposiums & paper presentations",
  },
];


export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Variants
  const overlayVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
      ease: "easeOut" as const, // ✅ type-safe way
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const, // ✅ fixes TS error
    },
  },
};


  return (
    <section className="relative w-full h-screen overflow-hidden bg-black/40">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={images[index].src}
            alt={images[index].title}
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-4">
              {images[index].title}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-2xl mb-6">
              {images[index].subtitle}
            </motion.p>
            
            <Link href="/">
              <motion.a
                variants={itemVariants}
                className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition inline-block"
              >
                Register Now
              </motion.a>
            </Link>
            <CountdownCircles />
          </motion.div>
           
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white hover:bg-black/60"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 p-3 rounded-full text-white hover:bg-black/60"
      >
        <ChevronRight size={28} />
      </button>
    </section>
  );
}
