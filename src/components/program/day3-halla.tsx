"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const schedule = [
  { time: "09:30 – 10:00 AM", topic: "GLP1 For Weight Loss (20 min talk + 10 min discussion)", faculty: "Dr. Jayasree Gopal" },
  { time: "10:00 – 10:30 AM", topic: "Ambulatory BP or Pharma Topic (20 min talk + 10 min discussion)", faculty: "Dr. S.S. Lakshmanan" },
  { time: "10:10 – 11:00 AM", topic: "Management of Hypertension in Newly diagnosed cases of diabetes", faculty: "Dr. Narasingan" },
  { time: "11:00 – 11:30 AM", topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "11:30 – 12:00 PM", topic: "Monogenic diabetes", faculty: "Dr. V. Mohan" },
  { time: "12:00 – 12:30 PM", topic: "Prevention of Diabetes in India", faculty: "Dr. A. Ramachandran" },
  { time: "12:30 – 01:15 PM", topic: "Prof. MV Gold Medal Oration 2026 & Launch (if any)", faculty: "" },
  { time: "01:15 PM onwards", topic: "Valedictory function followed by lunch", faculty: "" },
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

export default function DaythreeHallA({ searchQuery }: { searchQuery: string }) {
  const heading = "MVCON – Day 3 (Prof. M. Viswanathan Hall)";

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
      <div className="container mx-auto py-14 px-6 lg:px-20 bg-gradient-to-tr from-blue-900 to-blue-700 rounded-2xl">
        <div className="text-center mb-12">
          {/* Heading animation */}
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
          <p className="text-gray-200">A multidisciplinary update on diabetes & diabetic foot care</p>
        </div>

        {/* Timeline */}
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
              <p className="text-white text-lg font-semibold">No sessions match your search.</p>
              <p className="text-gray-300 text-sm mt-2">Try searching with a different keyword.</p>
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
                <span className="absolute -left-[43px] flex items-center justify-center w-6 h-6 rounded-full bg-white text-primary text-xs">
                  <Clock size={14} />
                </span>

                <div className="text-sm font-semibold text-primary bg-white inline-block px-4 rounded-3xl mb-1">{item.time}</div>

                <h3 className="text-lg font-semibold text-white">{highlightText(item.topic, searchQuery)}</h3>

                {item.faculty && <p className="text-white text-sm mt-1">Faculty: {highlightText(item.faculty, searchQuery)}</p>}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
