"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const schedule = [
  { time: "09:30 – 10:00", topic: "Saving the limb, Saving the life → Non Amputation Strategies in osteomyelitis", faculty: "Dr. Suresh Anadhan", chair: "Dr. Milind Ruke" },
  { time: "10:00 – 10:30", topic: "Mechanical offloading (Unburden the wound)", faculty: "Dr. Viswanathan Vishnu Vijay", chair: "" },
  { time: "10:30 – 10:50", topic: "Surgical offloading (VIDEO)", faculty: "Dr. Senthil", chair: "" },
  { time: "10:50 – 11:10", topic: "Digital subtraction Angiography – Revascularization in Lower Limb", faculty: "Dr. Vijay Viswanathan, Dr. Ravikumar", chair: "" },
  { time: "11:10 – 11:30", topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA", faculty: "", chair: "" },
  { time: "11:30 – 12:30", topic: "QUIZ – By QUIZ MASTER", faculty: "Dr. Abhijith", chair: "" },
  { time: "12:30 – 01:00", topic: "The Golden Hour in Diabetic Foot Ulcer (with 5 min discussion)", faculty: "Dr. Sasi Kumar", chair: "Dr. Senthil" },
  { time: "01:00 – 01:30", topic: "TBD", faculty: "Dr. Milind Ruke", chair: "" },
  { time: "01:30 – 02:15", topic: "LUNCH & VISIT TO THE STALLS / POSTER AREA", faculty: "", chair: "" },
  { time: "02:30 – 03:00", topic: "Muscle, metabolism & glucose: Exercise in Diabetes", faculty: "Dr. Vishnu Priya (Bangalore)", chair: "Dr. Sriram, Dr. K. Shanmugam" },
  { time: "03:00 – 03:30", topic: "When diabetes reaches the lungs: Diabetic Pneumopathy", faculty: "Dr. Abhishek", chair: "Dr. Sriram, Dr. K. Shanmugam" },
  { time: "03:30 – 04:00", topic: "Debate / Pharma Symposium", faculty: "", chair: "" },
  { time: "04:00 – 04:30", topic: "Pharma Symposium", faculty: "", chair: "" },
  { time: "04:30 – 05:00", topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA", faculty: "", chair: "" },
];

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

function highlightText(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-yellow-200 text-black px-1 rounded">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function DayTwoHallB({ searchQuery }: { searchQuery: string }) {
  const heading = "MVCON 2026 – Day 2 (Dr. M. Madhavi Amma Hall)";

  const filteredSchedule =
    searchQuery.trim() === ""
      ? schedule
      : schedule.filter(
          (item) =>
            item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.faculty.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.chair.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <section className="bg-gray-50 py-10 w-full">
      <div className="container mx-auto py-14 px-6 lg:px-20 bg-gradient-to-tr from-blue-950 to-blue-700 rounded-2xl">
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-2 flex justify-center flex-wrap gap-x-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {heading.split(" ").map((word, wi) => (
  <span key={wi} className="inline-block whitespace-nowrap mr-2">
    {word.split("").map((char, ci) => (
      <motion.span
        key={ci}
        custom={wi * 5 + ci}
        variants={letterVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="inline-block"
      >
        {char}
      </motion.span>
    ))}
  </span>
))}

          </motion.h2>
          <p className="text-gray-200">Scientific program for Hall B</p>
        </div>

        <div className="relative pl-8">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-0 top-0 w-[1px] h-full origin-top border-l border-dotted border-white"
          />

          {filteredSchedule.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-10 relative"
            >
              <span className="absolute -left-[43px] flex items-center justify-center w-6 h-6 rounded-full bg-white text-primary text-xs">
                <Clock size={14} />
              </span>

              <div className="text-sm font-semibold text-primary bg-white inline-block px-4 rounded-3xl mb-1">
                {item.time}
              </div>

              <h3 className="text-lg font-semibold text-white">
                {highlightText(item.topic, searchQuery)}
              </h3>

              {item.faculty && (
                <p className="text-white text-sm mt-1">
                  Faculty: {highlightText(item.faculty, searchQuery)}
                </p>
              )}
              {item.chair && (
                <p className="text-gray-200 text-sm">
                  Chair: {highlightText(item.chair, searchQuery)}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
