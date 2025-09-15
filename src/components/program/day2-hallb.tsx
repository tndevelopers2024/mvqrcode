"use client";

import { motion, Variants } from "framer-motion";
import { Clock } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";

// -------- Schedule for Day 2 Hall B --------
const schedule = [
  {
    time: "09:30 – 10:00 AM",
    topic:
      "Saving the limb, Saving the life → Non Amputation Strategies in osteomyelitis",
    faculty: "Dr. Suresh Anadhan",
    chair: "Dr. Milind Ruke",
  },
  {
    time: "10:00 – 10:30 AM",
    topic: "Mechanical offloading (Unburden the wound)",
    faculty: "Dr. Viswanathan Vishnu Vijay",
    chair: "",
  },
  {
    time: "10:30 – 10:50 AM",
    topic: "Surgical offloading (VIDEO)",
    faculty: "Dr. Senthil",
    chair: "",
  },
  {
    time: "10:50 – 11:10 AM",
    topic: "Digital subtraction Angiography – Revascularization in Lower Limb",
    faculty: "Dr. Vijay Viswanathan, Dr. Ravikumar",
    chair: "",
  },
  {
    time: "11:10 – 11:30 AM",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chair: "",
  },
  {
    time: "11:30 – 12:30 PM",
    topic: "QUIZ – By QUIZ MASTER",
    faculty: "Dr. Abhijith",
    chair: "",
  },
  {
    time: "12:30 – 01:00 PM",
    topic: "The Golden Hour in Diabetic Foot Ulcer (with 5 min discussion)",
    faculty: "Dr. Sasi Kumar",
    chair: "Dr. Senthil",
  },
  {
    time: "01:00 – 01:30 PM",
    topic: "TBD",
    faculty: "Dr. Milind Ruke",
    chair: "",
  },
  {
    time: "01:30 – 02:15 PM",
    topic: "LUNCH & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chair: "",
  },
  {
    time: "02:30 – 03:00 PM",
    topic: "Muscle, metabolism & glucose: Exercise in Diabetes",
    faculty: "Dr. Vishnu Priya (Bangalore)",
    chair: "Dr. Sriram, Dr. K. Shanmugam",
  },
  {
    time: "03:00 – 03:30 PM",
    topic: "When diabetes reaches the lungs: Diabetic Pneumopathy",
    faculty: "Dr. Abhishek",
    chair: "Dr. Sriram, Dr. K. Shanmugam",
  },
  {
    time: "03:30 – 04:00 PM",
    topic: "Debate / Pharma Symposium",
    faculty: "",
    chair: "",
  },
  { time: "04:00 – 04:30 PM", topic: "Pharma Symposium", faculty: "", chair: "" },
  {
    time: "04:30 – 05:00 PM",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chair: "",
  },
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
function highlightText(text: string, query: string, bold = false) {
  if (!query) return bold ? <span className="font-bold">{text}</span> : text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span
        key={i}
        className={`bg-yellow-200 text-black px-1 rounded ${
          bold ? "font-bold" : ""
        }`}
      >
        {part}
      </span>
    ) : bold ? (
      <span key={i} className="font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function DayTwoHallB({ searchQuery }: { searchQuery: string }) {
  const heading = "MVCON 2026 – Day 2 (Dr. M. Madhavi Amma Hall)";

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
          <p className="text-gray-600">
            A multidisciplinary update on diabetic foot care
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-8">
          {filteredSchedule.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-800 text-lg font-semibold">
                No sessions match your search.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try searching with a different keyword.
              </p>
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
                className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col min-h-32 md:flex-row"
              >
                {/* Left column – TIME block */}
                <div className="w-full md:w-[200px] bg-indigo-50 flex items-center justify-center p-4">
                  <span className="text-xl md:text-xl font-bold text-indigo-600 text-center">
                    {item.time}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {highlightText(item.topic, searchQuery)}
                    </h3>
                    {item.faculty && (
                      <p className="text-gray-600 text-md">
                        Faculty:{" "}
                        <span className="font-bold">
                          {highlightText(item.faculty, searchQuery)}
                        </span>
                      </p>
                    )}
                    {item.chair && (
                      <p className="text-gray-600 text-md">
                        Chairpersons:{" "}
                        <span className="font-bold">
                          {highlightText(item.chair, searchQuery)}
                        </span>
                      </p>
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
