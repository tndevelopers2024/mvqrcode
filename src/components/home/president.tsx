"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WelcomeSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 py-24 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Committee Organizers
      </h2>
      <div className="max-w-7xl mx-auto px-2 lg:px-20 relative">
        <div className="relative flex flex-col md:flex-row items-center gap-10">
          {/* Left Side - Gradient Card with Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex flex-col justify-center items-center md:items-start text-center md:text-left bg-gradient-to-tr from-blue-900 to-sky-400 text-white p-10 rounded-3xl shadow-2xl md:w-1/2"
          >
            {/* Decorative Shape */}
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/20 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-300/40 rounded-full blur-2xl" />

            {/* Image */}
            <div className="relative w-[20rem] h-[26rem] mb-6 rounded-2xl overflow-hidden shadow-xl transform rotate-[-3deg] hover:rotate-0 transition duration-300 ease-out ring-8 ring-white/30">
              <Image
                src="/images/president.jpg"
                alt="President"
                fill
                className="object-cover"
              />
            </div>

            {/* Heading + Name */}
            <h2 className="text-3xl md:text-4xl font-extrabold leading-snug drop-shadow-md">
              From the President
            </h2>
            <p className="mt-2 text-lg font-medium opacity-90 drop-shadow-sm">
              Dr. Vijay <br /> organization Chairman, President
            </p>
          </motion.div>

          {/* Right Side - Overlapping White Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="relative bg-white shadow-xl rounded-3xl p-10 md:-ml-16 md:w-2/3 border border-gray-100"
          >
            <div className="text-gray-700 space-y-6 leading-relaxed">
              <p className="text-md">
                It gives me immense pleasure to welcome you to the inaugural
                edition of <strong>MVCON</strong>, a new academic tradition from
                MV Hospital for Diabetes. With over 75 years of legacy in
                pioneering diabetes care, MV has stood as a leader in both
                holistic diabetes management and advanced diabetic foot care.
                MVCON builds on this legacy, creating a platform where
                diabetologists, surgeons, and paramedics can come together to
                learn, exchange, and collaborate. With a special focus on
                diabetic foot an area where MV has earned national and
                international recognition we aim to advance skills, share
                innovations, and improve outcomes for patients everywhere.
              </p>
              <p className="text-md">
                As President of RSSDI, India’s largest diabetes body, and
                Honorary President of D Foot International, I have dedicated my
                mission to reducing preventable amputations worldwide. MVCON
                reflects that vision, and I look forward to welcoming you to
                Chennai, to an event that promises learning, inspiration, and
                collaboration for the diabetes community.
              </p>
            </div>

            {/* 🔥 Circular Doctor Portraits */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-12 justify-items-center">
          {/* Doctor 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative w-48 h-48 rounded-full p-[4px] bg-gradient-to-tr from-sky-500 to-pink-500 shadow-xl">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/images/person2.jpg"
                  alt="Doctor 1"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-800">
              Arun Viswanathan
            </h3>
            <p className="text-sm text-gray-600">Organising Committee</p>
          </motion.div>

          {/* Doctor 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, rotate: -2 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative w-48 h-48 rounded-full p-[4px] bg-gradient-to-tr from-purple-500 to-indigo-500 shadow-xl">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/images/person1.jpg"
                  alt="Doctor 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-800">
              Dr. Prashanth Arun
            </h3>
            <p className="text-sm text-gray-600">Organising Committee</p>
          </motion.div>
        </div>
          </motion.div>
        </div>
      </div>

      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-300/30 rounded-full blur-3xl -z-10 -translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-300/20 rounded-full blur-3xl -z-10 translate-x-32 translate-y-32" />
    </section>
  );
}
