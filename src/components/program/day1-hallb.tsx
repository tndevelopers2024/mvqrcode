"use client";

import { motion, Variants } from "framer-motion";
import { Clock } from "lucide-react";
import { CiLocationOn } from "react-icons/ci";
import Link from "next/link";

// -------- Schedule for Hall B --------
const schedule = [
  {
    time: "09:30 – 10:00",
    topic: "(Topic – TBD)",
    faculty: "Dr.Aarthy Kannan | Chair: Dr.Senthil",
  },
  {
    time: "10:00 – 10:30",
    topic: "TBD",
    faculty: "Dr.Paranthaman | Chair: Dr.Anand Moses",
  },
  {
    time: "10:30 – 10:50",
    topic: "The GUT Wrenching Troubles: Managing Diabetic GastroParesis",
    faculty: "Dr. Vishnu Priya Prashanth | Chair: Dr.Muralidharan",
  },
  {
    time: "10:50 – 11:10",
    topic:
      "International Vs National - ADA Vs RSSDI Guidelines (What's New / What Next / What's the Difference?)",
    faculty: "Dr.Uma Mahesh | Chair: Dr.K.Shanmugam",
  },
  {
    time: "11:10 – 11:30",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
  },
  {
    time: "11:30 – 12:30",
    topic:
      "MV Life Time Achievement Award & Inauguration + Key Note lecture (Hall A)",
    faculty: "",
  },
  {
    time: "12:30 – 1:30",
    topic:
      "Oral presentations (7 approx. – 5 mins presentation + 2 mins discussion)",
    faculty: "",
  },
  {
    time: "1:30 – 2:30",
    topic: "LUNCH & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
  },
  {
    time: "2:30 – 3:00",
    topic: "Demonstration of High Risk Feet (Hall A)",
    faculty: "",
  },
  {
    time: "3:00 – 3:30",
    topic: "Smart Dressing Solutions - The T.I.M.E. concept (Video) (Hall A)",
    faculty: "",
  },
  {
    time: "3:30 – 4:00",
    topic: "Unmasking Anemia in Diabetes",
    faculty: "Dr. V.P. Sriram",
  },
  {
    time: "4:00 – 4:30",
    topic: "PHARMA SLOT (Based on Sponsorship) – Obesity Workshop",
    faculty: "",
  },
  {
    time: "4:30 – 5:00",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
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

export default function DayoneHallB({ searchQuery }: { searchQuery: string }) {
  const heading = "MVCON – Day 1 (Dr. M. Madhavi Amma Hall)";

  const filteredSchedule =
    searchQuery.trim() === ""
      ? schedule
      : schedule.filter(
          (item) =>
            item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.faculty.toLowerCase().includes(searchQuery.toLowerCase())
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
            A multidisciplinary update on diabetes & diabetic foot care
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
                className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row"
              >
                {/* Thumbnail */}
                <div className="w-[100%] max-md:h-64 md:w-[200px] h-40 md:h-auto bg-gray-200 flex items-center justify-center">
                  <img
                    src="/images/about-bg.jpg"
                    alt="Session"
                    className="w-[100%] h-full object-cover rounded"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-2">
                      <span className="flex items-center gap-2">
                        <Clock size={16} className="text-indigo-500" />
                        {item.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <CiLocationOn size={16} className="text-indigo-500" />
                        Dr. M. Madhavi Amma Hall
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {highlightText(item.topic, searchQuery)}
                    </h3>
                    {item.faculty && (
                      <p className="text-gray-600 text-sm">
                        Faculty: {highlightText(item.faculty, searchQuery)}
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
