"use client";

import { motion, Variants } from "framer-motion";

// -------- Schedule for Day 3 Hall A --------
const schedule = [
  {
    time: "08:00 AM onwards",
    topic: "Registration from 8:00 AM onwards",
  },
  {
    time: "09:00AM – 09:30 AM",
    topic: "Integrated management of Diabetes and Obesity",
    faculty: "Dr.Jayashree Gopal",
    chairpersons: "Dr.A.Panneer Selvam, Dr.K.Shanmugam",
  },
  {
    time: "09:30AM – 09:50 AM",
    topic: "Diabetes technology in people with diabetic kidney disease- an evolving field with clinical opportunities",
    faculty: "Dr.Janaka Karalliedde",
    chairpersons: "Dr.Vijay Viswanathan, Dr.Edwin Fernando",
  },
  {
    time: "09:50AM- 10:10AM",
    topic: "Alpha cell as the guardian of Beta cell",
    faculty: "Dr.Vinod Mittal",
    chairpersons: "Dr.M S Ashraf, Dr.A.Panneer Selvam",
  },
  {
    time: "10:10AM - 10:30 AM",
    topic: "BP unmasked: Ambulatory Blood Pressure monitoring can transform Hyper",
    faculty: "Dr.S.S.Lakshmanan",
    chairpersons: "Dr.M S Ashraf,Dr.K.Shanmugam",
  },
  {
    time: "10:30AM - 11:00AM",
    topic: "Changes in the profile of Diabetes and CV risk in a decade in the population",
    faculty: "Dr.A.Ramachandran",
    chairpersons: "Dr.S.S.Lakshmanan, Dr.P.Paranthaman",
  },
  {
    time: "11:00 - 11:30 AM",
    topic: "TEA BREAK & VISIT TO THE STALLS /POSTER AREA",
  },
  {
    time: "11:30 AM– 12:00 PM",
    topic: "Monogenic diabetes",
    faculty: "Dr.V.Mohan",
    chairpersons: "Dr.S.S.Lakshmanan, Dr.P.Paranthaman",
  },
  {
    time: "12:00 PM -12:30 PM",
    topic: "Type 5 diabetes: India's Protein Deficiency DM (PDDM)",
    faculty: "Dr.Sunil Gupta",
    chairpersons: "Dr.V.Mohan, Dr.Vijay Viswanathan",
  },
  {
    time: "12:30 PM -01:15 PM",
    topic: "Prof. MV Gold Medal Oration 2026",
    faculty: "Dr.Ashok Kumar Das",
  },
  {
    time: "",
    topic: "MV Life Time Achievement Award",
    faculty: "Dr.A V Anoop",
  },
  {
    time: "1:15 PM",
    topic: "Valedictory function followed by lunch",
  },
];



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

export default function DaythreeHallA({
  searchQuery,
}: {
  searchQuery: string;
}) {
  const heading = "Day 3 Prof. M. Viswanathan Hall (Hall A)";

  const filteredSchedule =
    searchQuery.trim() === ""
      ? schedule
      : schedule.filter(
        (item) =>
          item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.faculty && item.faculty.toLowerCase().includes(searchQuery.toLowerCase()))
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
                className="shadow-lg rounded-2xl overflow-hidden flex flex-col min-h-32 md:flex-row"
              >
                {/* Time Block */}
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
                    <div className="flex flex-col justify-between md:flex-row mt-4">
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
