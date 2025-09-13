"use client";

import { motion, Variants } from "framer-motion";
import { Clock } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";

// -------- Schedule for Day 2 Hall B --------
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

// -------- Variants --------
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.05, duration: 0.4, ease: "easeOut" },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.05, duration: 0.3, ease: "easeOut" },
  }),
};

// -------- Highlight function --------
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
    <section className="py-10 bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex justify-center flex-wrap gap-x-2 text-gray-800">
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
          </h2>
          <p className="text-gray-600">A multidisciplinary update on diabetic foot care</p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-8">
          {filteredSchedule.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-800 text-lg font-semibold">No sessions match your search.</p>
              <p className="text-gray-500 text-sm mt-2">Try searching with a different keyword.</p>
            </div>
          ) : (
            filteredSchedule.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row"
              >
                {/* Thumbnail */}
                <div className="w-[100%] max-md:h-64 md:w-[200px] md:h-auto bg-gray-200 flex items-center justify-center">
                  <img src="/images/about-bg.jpg" alt="Session" className="w-[100%] h-full object-cover" />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-6 text-gray-500 text-sm mb-2 flex-wrap">
                      <span className="flex items-center gap-2">
                        <Clock size={16} className="text-indigo-500" />
                        {item.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <CiLocationOn size={16} className="text-indigo-500" />
                        Dr. M. Madhavi Amma Hall
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {highlightText(item.topic, searchQuery)}
                    </h3>
                    {item.faculty && (
                      <p className="text-gray-600 text-sm">{highlightText(item.faculty, searchQuery)}</p>
                    )}
                    {item.chair && (
                      <p className="text-gray-500 text-sm">Chair: {highlightText(item.chair, searchQuery)}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
