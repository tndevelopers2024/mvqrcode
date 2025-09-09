"use client";

import { motion, Variants } from "framer-motion";
import { Clock } from "lucide-react";

const schedule = [
  { time: "09:30 – 10:00", topic: "(Topic – TBD)", faculty: "Dr.Krishna Seshadri" },
  { time: "10:00 – 10:15", topic: "Muscle, metabolism & glucose: Exercise in Diabetes", faculty: "Dr. Vishnu Priya" },
  { time: "10:20 – 10:35", topic: "National Vs International - ADA Vs RSSDI (Whats New / What Next / Whats difference)", faculty: "Dr.Uma Mahesh" },
  { time: "10:40 – 10:55", topic: "Unmasking Anemia in Diabetes", faculty: "Dr. V.P. Sriram" },
  { time: "11:00 – 11:20", topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "11:30 – 12:30", topic: "Life Time Achievement Award - Dr. Jitendra Singh Rana & Inauguration + Key Note lecture", faculty: "" },
  { time: "12:30 – 12:50", topic: "Recurrence DFU - The Indian Strategy for prevention", faculty: "Dr.Senthil" },
  { time: "12:50 – 1:05", topic: "The Golden Hour in Diabetic Foot Ulcer", faculty: "Dr.Sasi Kumar" },
  { time: "1:10 – 1:25", topic: "Structural & Functional Triggers of DFU", faculty: "Dr.Ashwanth (Ortho)" },
  { time: "1:30 – 2:15", topic: "LUNCH & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "2:30 – 3:00", topic: "Demonstration of High Risk Feet", faculty: "Dr. Vijay Viswanathan / Ms.Seena & Ms.Bamilla" },
  { time: "3:00 – 3:30", topic: "Smart Dressing Solutions - The T.I.M.E. concept (Video)", faculty: "Dr.Kumar / Dr. Senthil" },
  { time: "3:30 – 4:00", topic: "CGMS & WEARABLES", faculty: "Dr.Prashanth Arun" },
  { time: "4:00 – 4:30", topic: "INSULIN PUMP", faculty: "Dr.Leela Baid" },
  { time: "4:30 – 4:50", topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "5:00 – 5:30", topic: "SYMPOSIUM ON DIABETIC FOOT - Latest Advances in Wound care", faculty: "Dr.Harikrishnan Nair, Dr.Milind Ruke, Dr.Senthil" },
  { time: "5:30 – 6:00", topic: "PHARMA - SLOT (Based on Sponsorship) (Obesity workshop)", faculty: "" },
  { time: "6:00 – 6:30", topic: "SLEEP & OSA", faculty: "Dr.Ramakrishnan" },
  { time: "6:30 – 7:00", topic: "Approach to impotence in people with diabetes", faculty: "Dr.Mithun Bhatia" },
  { time: "7:00 onwards", topic: "Networking Dinner", faculty: "" },
];

// ✅ Variants for heading letters
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05,
      duration: 0.4,
      ease: "easeOut" as const,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: custom * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function Dayone() {
  const heading = "MVCON – Day 1 Scientific Program";

  return (
    <section className="bg-gray-50 py-16 w-full">
      <div className="container mx-auto py-14 px-6 lg:px-20 bg-gradient-to-tr from-blue-950 to-blue-700 rounded-2xl">
        <div className="text-center mb-12">
          {/* ✅ Animated heading (word preserved, letters animated inside word) */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex justify-center flex-wrap gap-x-2">
            {heading.split(" ").map((word, wi) => (
              <span key={wi} className="inline-flex">
                {word.split("").map((char, ci) => (
                  <motion.span
                    key={ci}
                    custom={wi * word.length + ci}
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
            className="absolute left-0 top-0 w-[1px] h-full origin-top border-l border-dotted border-white-600"
          />

          {schedule.map((item, i) => (
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
              <h3 className="text-lg font-semibold text-white">{item.topic}</h3>

              {/* Faculty */}
              {item.faculty && (
                <p className="text-white text-sm mt-1">Faculty: {item.faculty}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
