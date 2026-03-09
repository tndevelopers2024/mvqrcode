"use client";

import { motion, Variants } from "framer-motion";

// -------- Schedule for Day 3 Dr. M. Madhavi Amma Hall (Hall B) --------
const schedule = [
  {
    time: "08:00 AM onwards",
    topic: "Registration from 8:00 AM onwards",
  },
  {
    time: "08:00 AM – 09:00 AM",
    topic: "Oral presentations",
    faculty: "",
    chairpersons: "Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "09:00 AM – 09:20 AM",
    topic: "Sweet trouble - How Diabetes can affect your smile",
    faculty: "Dr.Rimo C Mathews",
    chairpersons: "Dr.Vinitha Ramachandran, Dr.Siva Shankari S",
  },
  {
    time: "09:20 AM – 09:40 AM",
    topic: "Silent complications: Sexual dysfunction in diabetes",
    faculty: "Dr.P Paranthaman",
    chairpersons: "Dr.R Balamurugan, Dr.V.Ravindranath",
  },
  {
    time: "09:40 AM – 10:00 AM",
    topic: "Diabetes & Violence: Is there a pathophysiological connect ?",
    faculty: "Dr.R Balamurugan",
    chairpersons: "Dr.Milind Ruke, Dr.V.Ravindranath",
  },
  {
    time: "10:00 AM – 11:00 AM",
    topic: "Quiz - Finals",
    faculty: "",
    chairpersons: "",
  },
  {
    time: "11:00 AM – 11:30 AM",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chairpersons: "",
  },
  {
    time: "11:30 AM – 12:00 PM",
    topic: "Monogenic diabetes in Hall A",
    faculty: "Dr.V.Mohan",
    chairpersons: "",
  },
  {
    time: "12:00 PM – 12:30 PM",
    topic: "Type 5 diabetes: India's Protein Deficiency DM (PDDM) in Hall A",
    faculty: "Dr.Sunil Gupta",
    chairpersons: "",
  },
  {
    time: "12:30 PM – 01:15 PM",
    topic: "Prof. MV Gold Medal Oration 2026 & Launch in Hall A / MV Life Time Achievement Award in Hall A",
    faculty: "Dr.Harikrishna KR Nair, Dr.A V Anoop",
    chairpersons: "",
  },
  {
    time: "01:15 PM onwards",
    topic: "Valedictory function followed by lunch",
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

export default function DaythreeHallB({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const heading = "Day 3 Dr. M. Madhavi Amma Hall (Hall B)";

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
                key={`${item.time}-${item.topic}`}
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
