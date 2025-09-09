"use client";

import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative w-full py-20 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Left side illustration / shape */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative w-full lg:w-1/2"
        >
          <div className="aspect-square rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400 shadow-2xl flex items-center justify-center text-white text-5xl font-bold">
            MVCON 2025
          </div>
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-40" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-40" />
        </motion.div>

        {/* Right side content */}
        <div className="w-full lg:w-1/2">
          <motion.h2
            custom={0}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
          >
            About MVCON
          </motion.h2>

          <motion.p
            custom={1}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-gray-700 leading-relaxed mb-4"
          >
            MVCON is MV Hospital’s annual international conference dedicated to
            advancing excellence in diabetes and diabetic foot care. The event
            will bring together <span className="font-semibold">250–300 healthcare professionals</span>,
            including diabetologists, surgeons, and paramedics, to exchange
            ideas, explore innovations, and foster collaborations.
          </motion.p>

          <motion.p
            custom={2}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg text-gray-700 leading-relaxed mb-6"
          >
            This <span className="font-semibold">3-day scientific program</span> will feature talks,
            workshops, symposiums, and paper presentations—making MVCON a
            premier platform for knowledge-sharing and industry engagement.
          </motion.p>

          <motion.button
            custom={3}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Learn More
          </motion.button>
        </div>
      </div>
    </section>
  );
}
