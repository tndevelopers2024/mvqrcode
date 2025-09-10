"use client";

import { motion, Variants } from "framer-motion";
import { Clock } from "lucide-react";

const schedule = [
  { time: "09:30 - 10:00", topic: "GLP1 For Weight Loss", faculty: "Dr. Jayasree Gopal" },
  { time: "10:00 - 10:30", topic: "Management of Hypertension in Newly diagnosed cases - specify", faculty: "Dr. Narasingan" },
  { time: "10:30 - 11:00", topic: "Monogenic diabetes ?", faculty: "Dr. V. Mohan" },
  { time: "11:00 - 11:30", topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "11:30 - 12:00", topic: "Ambulatory BP or Pharma Topic", faculty: "Dr. Lakshmanan" },
  { time: "12:00 - 12:30", topic: "Prevention of Diabetes in India", faculty: "Dr. A. Ramachandran" },
  { time: "12:30 - 01:15", topic: "Prof. MV GMO 2026 – Dr. Harikrishnan Nair & Launch (if any)", faculty: "" },
  { time: "01:15 onwards", topic: "Valedictory function followed by Lunch", faculty: "" },
];

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut" as const,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

// ✅ Highlight search matches
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

export default function Daythree({ searchQuery }: { searchQuery: string }) {
  const heading = "MVCON – Day 3 Scientific Program";

  // ✅ Prioritize search
  const filteredSchedule =
    searchQuery.trim() === ""
      ? schedule
      : schedule.filter(
          (item) =>
            item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.faculty.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <section className="bg-gray-50 py-10 w-full">
      <div className="container mx-auto py-14 px-6 lg:px-20 bg-gradient-to-tr from-blue-950 to-blue-600 rounded-2xl">
        <div className="text-center mb-12">
          {/* ✅ Animated heading */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-2 flex justify-center flex-wrap gap-x-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {heading.split(" ").map((word, wi) => (
              <span key={wi} className="inline-flex">
                {word.split("").map((char, ci) => (
                  <motion.span
                    key={ci}
                    custom={wi * word.length + ci}
                    variants={letterVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h2>
          <p className="text-gray-200">
            A multidisciplinary update on diabetes & diabetic foot care
          </p>
        </div>

        {/* Timeline wrapper */}
        <div className="relative pl-8">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-0 top-0 w-[1px] h-full origin-top border-l border-dotted border-white"
          />

          {filteredSchedule.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-white text-lg font-semibold">
                No sessions match your search.
              </p>
              <p className="text-gray-300 text-sm mt-2">
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
                className="mb-10 relative"
              >
                {/* Dot */}
                <span className="absolute -left-[43px] flex items-center justify-center w-6 h-6 rounded-full bg-white text-primary text-xs">
                  <Clock size={14} />
                </span>

                {/* Time */}
                <div className="text-sm font-semibold text-primary bg-white inline-block px-4 rounded-3xl mb-1">
                  {item.time}
                </div>

                {/* Topic */}
                <h3 className="text-lg font-semibold text-white">
                  {highlightText(item.topic, searchQuery)}
                </h3>

                {/* Faculty */}
                {item.faculty && (
                  <p className="text-white text-sm mt-1">
                    Faculty: {highlightText(item.faculty, searchQuery)}
                  </p>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
