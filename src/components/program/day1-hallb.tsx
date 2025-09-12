"use client";

import { motion, Variants } from "framer-motion";
import { Clock } from "lucide-react";

// -------- Schedule for Hall B --------
const schedule = [
  { time: "09:30 – 10:00", topic: "(Topic – TBD)", faculty: "Dr.Aarthy Kannan | Chair: Dr.Senthil" },
  { time: "10:00 – 10:30", topic: "TBD", faculty: "Dr.Paranthaman | Chair: Dr.Anand Moses" },
  { time: "10:30 – 10:50", topic: "The GUT Wrenching Troubles: Managing Diabetic GastroParesis", faculty: "Dr. Vishnu Priya Prashanth | Chair: Dr.Muralidharan" },
  { time: "10:50 – 11:10", topic: "International Vs National - ADA Vs RSSDI Guidelines (What's New / What Next / What's the Difference?)", faculty: "Dr.Uma Mahesh | Chair: Dr.K.Shanmugam" },
  { time: "11:10 – 11:30", topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "11:30 – 12:30", topic: "MV Life Time Achievement Award & Inauguration + Key Note lecture (Hall A)", faculty: "" },
  { time: "12:30 – 1:30", topic: "Oral presentations (7 approx. – 5 mins presentation + 2 mins discussion)", faculty: "" },
  { time: "1:30 – 2:30", topic: "LUNCH & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
  { time: "2:30 – 3:00", topic: "Demonstration of High Risk Feet (Hall A)", faculty: "" },
  { time: "3:00 – 3:30", topic: "Smart Dressing Solutions - The T.I.M.E. concept (Video) (Hall A)", faculty: "" },
  { time: "3:30 – 4:00", topic: "Unmasking Anemia in Diabetes", faculty: "Dr. V.P. Sriram" },
  { time: "4:00 – 4:30", topic: "PHARMA SLOT (Based on Sponsorship) – Obesity Workshop", faculty: "" },
  { time: "4:30 – 5:00", topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA", faculty: "" },
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

export default function DayoneHallB({ searchQuery }: { searchQuery: string }) {
  const heading = "MVCON – Day 1 (Dr. M. Madhavi Amma Hall)";

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
