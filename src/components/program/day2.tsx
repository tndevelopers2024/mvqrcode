"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

const schedule = [
  { time: "09:30 - 09:45", topic: "Saving the limb, Saving the life → Non Amputation Strategies in osteomyelitis", faculty: "Dr. Suresh Anadhan" },
  { time: "09:45 - 10:00", topic: "Mechanical offloading (Unburden the wound)", faculty: "Dr. Vishnu Vijay" },
  { time: "10:00 - 10:15", topic: "Surgical offloading (VIDEO)", faculty: "Dr. Senthil" },
  { time: "10:15 - 10:30", topic: "Discussion", faculty: "" },
  { time: "10:30 - 11:00", topic: "Digital subtraction Angiography – Revascularization in Lower Limb", faculty: "Dr. Vijay Viswanathan, Dr. Ravikumar" },
  { time: "11:00 - 11:20", topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "11:30 - 12:30", topic: "QUIZ – By QUIZ MASTER", faculty: "Dr. Abhijith" },
  { time: "12:30 - 01:30", topic: "Free paper Presentation (7 Oral presentations) – (5 mins presentation + 2 mins discussion)", faculty: "" },
  { time: "01:30 - 02:15", topic: "LUNCH & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "02:30 - 02:45", topic: "Managing Heart failure in People with Diabetes (with 5 min discussion)", faculty: "Dr. Pradeep Nair" },
  { time: "02:50 - 03:50", topic: "Surgical Demonstration (VIDEO) – Debridement, Skin grafting, TCC Application, Ingrown Toe Nail", faculty: "Dr. Kumar / Dr. Senthil" },
  { time: "03:50 - 04:00", topic: "MOBILITY Break (to specify)", faculty: "Ms. Vaishnavi Vijay" },
  { time: "04:00 - 04:15", topic: "The Gut Wrenching Troubles: Managing Diabetic GastroParesis (with 5 min discussion)", faculty: "Dr. Vishnu Priya Prashanth" },
  { time: "04:20 - 04:35", topic: "When diabetes reaches the lungs: Diabetic Pneumopathy (with 5 min discussion)", faculty: "Dr. Abhishek" },
  { time: "04:40 - 04:55", topic: "The Silent Struggle: Healing Beyond HL91C (with 5 min discussion)", faculty: "Ms. Vaishnavi Vijay" },
  { time: "05:00 - 05:30", topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "05:30 - 06:00", topic: "SYMPOSIUM ON DIABETIC FOOT – Latest Advances in Wound care", faculty: "Dr. Harikrishnan Nair, Dr. Milind Ruke" },
  { time: "06:00 - 06:30", topic: "PHARMA – SLOT (Based on Sponsorship) (Insulin symposium)", faculty: "" },
  { time: "06:30 - 07:00", topic: "SYMPOSIUM ON DIABETIC KIDNEY DISEASE", faculty: "Dr. Edwin Fernando / Dr. Vijay Viswanathan / Dr. Janaka" },
  { time: "07:00 - 07:30", topic: "How to prevent Medico legal problem", faculty: "Dr. Vishnu Vijay" },
  { time: "07:00 onwards", topic: "Networking Dinner", faculty: "" },
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

export default function Daytwo({ searchQuery }: { searchQuery: string }) {
  const heading = "MVCON – Day 2 Scientific Program";

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
      <div className="container mx-auto py-14 px-6 lg:px-20 bg-gradient-to-tr from-blue-950 to-blue-700 rounded-2xl">
        <div className="text-center mb-12">
          {/* ✅ Heading animation */}
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
          {/* Vertical line */}
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
