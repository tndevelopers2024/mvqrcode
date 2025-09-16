"use client";

import { motion, Variants } from "framer-motion";

// -------- Schedule for Day 2 Hall A --------
const schedule = [
  {
    time: "09:30 – 09:50 AM",
    topic: "TBD",
    faculty: "Dr. Sunil Gupta",
    chairpersons: "Dr. A. Shanmugam, Dr. Priya",
  },
  {
    time: "09:50 – 10:10 AM",
    topic: "TBD",
    faculty: "Dr. Chandrasekar",
    chairpersons: "Dr. A. Shanmugam, Dr. Priya",
  },
  {
    time: "10:10 – 10:30 AM",
    topic: "TBD",
    faculty: "Dr. Janaka",
    chairpersons: "Dr. Vijay Viswanathan",
  },
  {
    time: "10:30 – 10:50 AM",
    topic: "How to evaluate kidney function in diabetes?",
    faculty: "Dr. Edwin Fernando",
    chairpersons: "Dr. Vijay Viswanathan",
  },
  {
    time: "10:50 – 11:10 AM",
    topic: "TBD",
    faculty: "Dr. G. Vijayakumar",
    chairpersons: "Dr. Shunmugavelu",
  },
  {
    time: "11:10 – 11:30 AM",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
  },
  {
    time: "11:30 – 12:00 PM",
    topic: "TBD",
    faculty: "Dr. Anuj Maheshwari",
    chairpersons: "Dr. Dharmarajan",
  },
  {
    time: "12:00 – 12:30 PM",
    topic: "TBD",
    faculty: "Dr. Bhavatharani",
    chairpersons: "Dr. K. Shanmugam",
  },
  {
    time: "12:30 – 01:00 PM",
    topic: "TBD",
    faculty: "Dr. Usha Aiyyagari",
    chairpersons: "Dr. Bhavatharani",
  },
  {
    time: "01:00 – 01:30 PM",
    topic: "TBD",
    faculty: "Dr. Paneer Selvam",
    chairpersons: "Dr. Shunmugavelu",
  },
  {
    time: "01:30 – 02:30 PM",
    topic: "LUNCH & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
  },
  {
    time: "02:30 – 03:00 PM",
    topic: "The Golden Hour in Diabetic Foot Ulcer",
    faculty: "Dr. Sasi Kumar",
    chairpersons: "Dr. Senthil",
  },
  {
    time: "03:00 – 04:00 PM",
    topic:
      "Surgical Demonstration (VIDEO) – Debridement (sweet lime), VAC & TCC Application",
    faculty: "Dr. Senthil / Dr. Milind Ruke",
  },
  {
    time: "04:00 – 04:30 PM",
    topic: "TBD",
    faculty: "Dr. Nandita Arun",
    chairpersons: "Dr. K. Shanmugam",
  },
  {
    time: "04:30 – 05:00 PM",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
  },
  {
    time: "05:00 – 05:30 PM",
    topic: "Managing Heart failure in People with Diabetes",
    faculty: "Dr. A. Shanmugam",
    chairpersons: "Dr. Prakash, Dr. Shunmugavelu",
  },
  {
    time: "05:30 – 06:00 PM",
    topic: "TBD",
    faculty: "Dr. Rajendran V",
    chairpersons: "Dr. Prakash, Dr. Shunmugavelu",
  },
  {
    time: "06:00 – 06:30 PM",
    topic: "Sexual dysfunction in people with diabetes",
    faculty: "Dr. Mithun Bhartia",
    chairpersons: "Dr. Muralidharan, Dr. Prashanth Arun",
  },
  {
    time: "06:30 – 07:00 PM",
    topic: "How to prevent Medico legal problems",
    faculty: "Dr. Viswanathan Vishnu Vijay",
    chairpersons: "Dr. Muralidharan, Dr. Prashanth Arun",
  },
  {
    time: "07:00 onwards",
    topic: "Networking Dinner",
    faculty: "",
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

export default function DaytwoHallA({ searchQuery }: { searchQuery: string }) {
  const heading = "MVCON 2026 – Day 2 (Prof. M. Viswanathan Hall)";

  const filteredSchedule =
    searchQuery.trim() === ""
      ? schedule
      : schedule.filter(
          (item) =>
            item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.faculty &&
              item.faculty.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.chairpersons &&
              item.chairpersons.toLowerCase().includes(searchQuery.toLowerCase()))
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
          <p className="text-gray-600">Scientific program for Hall A</p>
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
                  <span className="text-lg md:text-lg font-bold text-indigo-600 text-center">
                    {item.time}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {highlightText(item.topic, searchQuery)}
                    </h3>
                    <div className="flex flex-col justify-between md:flex-row">
                      {item.faculty && (
                      <p className="text-gray-600 text-md">
                        Faculty:{" "}
                        <span className="font-bold">
                          {highlightText(item.faculty, searchQuery)}
                        </span>
                      </p>
                    )}
                    {item.chairpersons && (
                      <p className="text-gray-600 text-md">
                        Chairpersons:{" "}
                        <span className="font-bold">
                          {highlightText(item.chairpersons, searchQuery)}
                        </span>
                      </p>
                    )}
                    </div>
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
