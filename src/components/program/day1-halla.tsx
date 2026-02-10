"use client";

import { motion, Variants } from "framer-motion";

// -------- Schedule for Hall A --------
const schedule = [
  {
    time: "08:00 AM",
    topic: "Registration from 8 am onwards",
  },
  {
    time: "09:30 AM – 09:50 AM",
    topic: "Double burden: Navigating diabetes and tuberculosis",
    faculty: "Dr.Chandrasekar S",
    chairpersons: "Dr.C.R.Anand Moses, Dr.P.Dharmarajan",
  },
  {
    time: "09:50 AM – 10:10 AM",
    topic: "MASLD: The silent saboteur",
    faculty: "Dr.G.Vijayakumar",
    chairpersons: "Dr.C.R.Anand Moses, Dr.P.Dharmarajan",
  },
  {
    time: "10:10 AM – 10:30 AM",
    topic: "Managing Heart failure in People with Diabetes",
    faculty: "Dr.A.Panneer Selvam",
    chairpersons: "Dr.M.Shunmugavelu, Dr.C.Muralidharan",
  },
  {
    time: "10:30 AM – 11:00 AM",
    topic: "Secondary diabetes: Unravelling the hidden causes",
    faculty: "Dr.A.Shanmugam",
    chairpersons: "Dr.M.Shunmugavelu, Dr.C.Muralidharan",
  },
  {
    time: "11:00 AM – 11:30 AM",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chairpersons: "",
  },
  {
    time: "11:30 AM – 12:30 PM",
    topic: "MV Life Time Achievement Award & Inauguration & Key Note Lecture",
    faculty: "Dr.A V Anoop",
    chairpersons: "",
  },
  {
    time: "12:30 PM – 1:00 PM",
    topic: "Recurrence of DFU - The Indian Strategy for prevention",
    faculty: "Dr.Senthil G",
    chairpersons: "Dr.C.Muralidharan, Dr.Aarathy Kannan",
  },
  {
    time: "1:00 PM – 1:30 PM",
    topic: "Demonstration of High Risk Feet",
    faculty: "Dr.Vijay Viswanathan / Ms.Seena Rajsekar & Ms.Bamila Selvaraj",
    chairpersons: "Dr.C.Muralidharan, Dr.Aarathy Kannan",
  },
  {
    time: "1:30 PM – 2:30 PM",
    topic: "LUNCH & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chairpersons: "",
  },
  {
    time: "2:30 PM – 3:00 PM",
    topic: "Redefining limb salvage: New frontiers in technology",
    faculty: "Dr.Milind Ruke",
    chairpersons: "Dr.Senthil G, Dr.Shanthi",
  },
  {
    time: "3:00 PM – 3:30 PM",
    topic: "Mechanical offloading (Unburden the wound)",
    faculty: "Dr.Viswanathan Vishnu Vijay",
    chairpersons: "Dr.Senthil G, Dr.Gayatri",
  },
  {
    time: "3:30 PM – 4:00 PM",
    topic: "Surgical offloading (Video)",
    faculty: "Dr.Senthil G",
    chairpersons: "Dr.Milind Ruke, Dr.Rajasenthil",
  },
  {
    time: "4:00 PM – 4:30 PM",
    topic: "Charcot foot: Timely diagnosis to prevent amputation",
    faculty: "Dr.Johny J Kannampilly",
    chairpersons: "Dr.Milind Ruke, Dr.Rajasenthil",
  },
  {
    time: "4:30 PM – 5:00 PM",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chairpersons: "",
  },
  {
    time: "5:00 PM – 5:30 PM",
    topic: "The role of microbiota in the management of diabetes and hypertension",
    faculty: "Dr.A. Muruganathan",
    chairpersons: "Dr.G.Prakash, Dr.K.Shanmugam",
  },
  {
    time: "5:30 PM – 6:00 PM",
    topic: "Management of hyperglycemia during DFU",
    faculty: "Dr.R M Anjana",
    chairpersons: "Dr.Vijay Viswanathan, Dr.Krishna G Seshadri",
  },
  {
    time: "6:00 PM – 6:30 PM",
    topic: "Breathing while you sleep: Unmasking OSA",
    faculty: "Dr.N Ramakrishnan",
    chairpersons: "Dr.C.Muralidharan, Dr.M.Shunmugavelu",
  },
  {
    time: "6:30 PM – 7:00 PM",
    topic: "Integrating lifestyle interventions into diabetes care",
    faculty: "Dr.Krishna G Seshadri",
    chairpersons: "Dr.C.Muralidharan, Dr.M.Shunmugavelu",
  },
  {
    time: "7:00 PM – 7:30 PM",
    topic: "TBD",
    faculty: "",
    chairpersons: "",
  },
  {
    time: "7:30 PM onwards",
    topic: "Networking Dinner",
    faculty: "",
    chairpersons: "",
  },
];


// -------- Animation Variants --------
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

// -------- Highlight Function --------
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
            (item.faculty &&
              item.faculty.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.chairpersons &&
              item.chairpersons
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
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
                className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col min-h-32 md:flex-row"
              >
                {/* Left column – TIME */}
                <div className="w-full md:w-[200px] bg-indigo-50 flex items-center justify-center p-4">
                  <span className="text-lg md:text-lg font-bold text-indigo-600 text-center">
                    {item.time}
                  </span>
                </div>

                {/* Right column – DETAILS */}
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {highlightText(item.topic, searchQuery)}
                    </h3>
                    <div className="flex flex-col md:flex-row justify-between">
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
