"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Section8() {
  const images = ["/images/slider-img2.jpg", "/images/slider-img3.jpg"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="py-16 w-full bg-gray-50" id="contact">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mt-4">
            Direction To The Venue
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 items-stretch gap-8">
          {/* Map */}
          <div
            className=" w-full h-80 lg:h-auto rounded-xl shadow-lg overflow-hidden"
            data-aos="zoom-in"
            data-aos-duration={1000}
          >
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3072.0945357485843!2d80.24289710336862!3d13.039908109886285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52672ddd6e4001%3A0x9d58f9c9658fc6f1!2sGReaT%20Ceremonies%20by%20GRT%20Hotels!5e1!3m2!1sen!2sin!4v1757745347993!5m2!1sen!2sin"
              className="w-full h-[450px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Image Slider */}
          <div
            className="flex-1 w-full h-[450px] flex items-center justify-center"
            data-aos="zoom-in"
            data-aos-duration={1000}
          >
            <div className="relative w-full h-[450px] lg:h-auto bg-white shadow-lg rounded-xl flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[index]}
                  src={images[index]}
                  alt="Venue Direction"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
