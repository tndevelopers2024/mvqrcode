"use client";

import { motion, Variants } from "framer-motion";
import { Clock } from "lucide-react";

// -------- Schedule for Hall A --------
const schedule = [
  { time: "09:30 – 10:00", topic: "(Topic – TBD)", faculty: "Dr.Rakesh Sahay | Chairs: Dr.K.Shanmugam, Dr.M S Ashraf" },
  { time: "10:00 – 10:30", topic: "Type 1 (TBD)", faculty: "Dr.Nihal Thomas | Chairs: Dr.K.Shanmugam, Dr.M S Ashraf" },
  { time: "10:30 – 10:50", topic: "TBD", faculty: "Dr.Balamurugan | Chairs: Dr.Kannan Natrajan, Dr.C Balaji" },
  { time: "10:50 – 11:10", topic: "TBD", faculty: "Dr.Muruganathan | Chairs: Dr.Anand Moses, Dr.Dharmarajan" },
  { time: "11:10 – 11:30", topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "11:30 – 12:30", topic: "MV Life Time Achievement Award + Inauguration & Key Note lecture", faculty: "" },
  { time: "12:30 – 1:00", topic: "Recurrence of DFU - The Indian Strategy for prevention", faculty: "Dr.Senthil | Chairs: Dr.Muralidharan, Dr.Aarthy Kannan" },
  { time: "1:00 – 1:30", topic: "Structural & Functional Triggers of DFU", faculty: "Dr.Ashwanth (Ortho) | Chairs: Dr.Muralidharan, Dr.Aarthy Kannan" },
  { time: "1:30 – 2:30", topic: "LUNCH & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "2:30 – 3:00", topic: "Demonstration of High Risk Feet", faculty: "Dr. Vijay Viswanathan / Ms.Seena & Ms.Bamilla" },
  { time: "3:00 – 3:30", topic: "Smart Dressing Solutions - The T.I.M.E. concept (Video)", faculty: "Dr.Kumar / Dr. Senthil" },
  { time: "3:30 – 4:00", topic: "TBD", faculty: "Dr.Janaka | Chair: Dr.Vijay Viswanathan" },
  { time: "4:00 – 4:30", topic: "TBD", faculty: "Dr.Usha Aiyyagari | Chairs: Dr.Anand Moses, Dr.Dharmarajan" },
  { time: "4:30 – 5:00", topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "5:00 – 5:30", topic: "Nutrition panel discussion", faculty: "Dr.Meenakshi Bajaj, Dr.V.Ravindranath, Dr.S.Chandrasekar | Moderator: Dr.Mohan Krishnamoorthy" },
  { time: "5:30 – 6:00", topic: "CGMS & WEARABLES, INSULIN PUMP", faculty: "Dr.Prashanth Arun, Dr.Leela Baid | Chairs: Dr.Kannan Natrajan, Dr.C Balaji" },
  { time: "6:00 – 6:30", topic: "SLEEP & OSA", faculty: "Dr.Ramakrishnan" },
  { time: "6:30 – 7:00", topic: "Sexual dysfunction in people with diabetes", faculty: "Dr.Mithun Bhatia" },
  { time: "7:00 onwards", topic: "Networking Dinner", faculty: "" },
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
  hidden: { opacity: 0, x: -50 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: custom * 0.1, duration: 0.2, ease: "easeOut" },
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

export default function DayoneHallA({ searchQuery }: { searchQuery: string }) {
  const heading = "MVCON – Day 1 (Prof. M. Viswanathan Hall)";

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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 flex justify-center flex-wrap gap-x-2">
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
          <p className="text-gray-200">
            A multidisciplinary update on diabetes & diabetic foot care
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-0 top-0 w-[1px] h-full origin-top border-l border-dotted border-white-600"
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
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
