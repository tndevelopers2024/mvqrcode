"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const images = [
  {
    src: "/images/image1.webp",
    title: "MVCON 2025",
    subtitle: "Advancing excellence in diabetes and diabetic foot care",
  },
  {
    src: "/images/image2.webp",
    title: "Global Collaboration",
    subtitle: "250–300 healthcare professionals exchanging ideas & innovations",
  },
  {
    src: "/images/image3.webp",
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
