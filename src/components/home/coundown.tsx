"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function StylishCountdown() {
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
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section
  className="relative w-full text-white py-20 overflow-hidden bg-gradient-to-tr from-blue-900 to-blue-400"
  style={{
    backgroundImage:
      "linear-gradient(to top right, rgba(30,58,138,0.85), rgba(59,130,246,0.85)), url('/images/coundown-bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

      {/* --- Heartbeat Background --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="w-[120%] h-48 opacity-10"
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

      <div className="max-w-6xl mx-auto px-6 lg:px-20 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Countdown to MVCON 2025
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative flex max-md:flex-col max-md:gap-10 justify-between items-center">
          {/* Animated Gradient Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 animate-pulse max-md:rotate-90 max-md:w-[85%] max-md:left-[50%] max-md:-translate-x-[50%]" />

          {/* Countdown Items */}
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ y: i % 2 === 0 ? 40 : -40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className={`relative flex flex-col items-center w-28 p-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg ${
                i % 2 === 0 ? "translate-y-6" : "-translate-y-6"
              }`}
            >
              <span className="text-3xl font-bold">
                {item.value.toString().padStart(2, "0")}
              </span>
              <span className="text-xs uppercase opacity-70">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button Centered */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <Link
            href="/"
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-lg text-white font-semibold  hover:from-yellow-500 hover:via-orange-600 hover:to-red-600  transition inline-block"
          >
            Register Now
          </Link>
        </motion.div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </section>
  );
}