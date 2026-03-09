"use client";

import { motion, Variants } from "framer-motion";

// -------- Schedule for Hall B --------
const schedule = [
  {
    time: "08:00 AM onwards",
    topic: "Registration from 8:00 AM onwards",
  },
  {
    time: "09:00 AM – 09:40 AM",
    topic: "Oral presentations",
    faculty: "",
    chairpersons: "Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "09:40 AM – 10:00 AM",
    topic: "Unmasking Anemia in Diabetes",
    faculty: "Dr.V.P. Sriram",
    chairpersons: "Dr.Kannan Natarajan, Dr.C Balaji",
  },
  {
    time: "10:00 AM – 10:20 AM",
    topic:
      "International Vs National - ADA Vs RSSDI guidelines What's New / What Next / What's the difference?",
    faculty: "Dr.K.Uma Mahesh",
    chairpersons: "Dr.Kannan Natarajan, Dr.C Balaji",
  },
  {
    time: "10:20 AM – 10:40 AM",
    topic:
      "The invisible threat: Identifying asymptomatic diabetes in clinical practice",
    faculty: "Dr.Aarathy Kannan",
    chairpersons: "Dr.Suresh Kanna S, Dr.B.Kannan",
  },
  {
    time: "10:40 AM – 11:00 AM",
    topic:
      "The silent erosion: Unveiling the double burden of diabetes and sarcopenia",
    faculty: "Dr.Vishnu Priya Reddy",
    chairpersons: "Dr.N.N.Anand, Dr.B.Kannan",
  },
  {
    time: "11:00 AM – 11:30 AM",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chairpersons: "",
  },
  {
    time: "11:30 AM – 12:00 PM",
    topic: "Demonstration of High Risk Feet in Hall A",
    faculty:
      "Dr.Vijay Viswanathan / Ms.Seena Rajsekar & Ms.Bamila Selvaraj",
    chairpersons: "Dr.C.Muralidharan, Dr.Aarathy Kannan",
  },
  {
    time: "12:00 PM – 12:30 PM",
    topic:
      "Periodontitis as the sixth complication of Diabetes: Integrating Oral health into Primary Diabetes Care",
    faculty: "Dr.Vinitha Ramachanadran",
    chairpersons: "Dr.N.Bhavatharani, Dr.G.Prakash",
  },
  {
    time: "12:30 PM – 01:00 PM",
    topic: "Surrogate measures in routine clinical practice",
    faculty: "Dr.Satyavani K",
    chairpersons: "Dr.N.Bhavatharani, Dr.G.Prakash",
  },
  {
    time: "01:00 PM – 01:30 PM",
    topic: "Oral presentations",
    faculty: "",
    chairpersons: "Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "01:30 PM – 02:30 PM",
    topic: "LUNCH & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chairpersons: "",
  },
  {
    time: "02:30 PM – 03:30 PM",
    topic: "Oral presentations",
    faculty: "",
    chairpersons: "Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "03:30 PM – 04:30 PM",
    topic:
      "MV Life Time Achievement Award in Hall A / Inauguration & Key Note lecture in Hall A",
    faculty: "Dr.Jitendra Singh",
    chairpersons: "",
  },
  {
    time: "04:30 PM – 05:00 PM",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chairpersons: "",
  },
  {
    time: "05:00 PM – 05:30 PM",
    topic:
      "Retina reimagined: Technology transforming Diabetic Retinopathy screening",
    faculty: "Dr.Manoj Khatri",
    chairpersons: "Dr.K.Uma Mahesh, Dr.Mitalee H Barman",
  },
  {
    time: "05:30 PM – 06:00 PM",
    topic:
      "The Untapped potential of Imaging in Diabetic Foot Care",
    faculty: "Mr.Srikar Nallan",
    chairpersons: "Dr.Satyavani K, Dr.Senthil G",
  },
  {
    time: "06:00 PM – 06:30 PM",
    topic: "Breathing while you sleep: Unmasking OSA",
    faculty: "Dr.N Ramakrishnan",
    chairpersons: "Dr.Leela Baid, Dr.K.Shanmugam",
  },
  {
    time: "06:30 PM – 07:30 PM",
    topic: "Oral presentations",
    faculty: "",
    chairpersons: "Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "07:30 PM – 08:00 PM",
    topic: "MV Alumni - Debate (SGLT2i vs GLP1RA)",
    faculty: "",
    chairpersons:
      "Dr.Hemanga Barman, Dr.Mitalee H Barman, Dr.V.P.Sriram",
  },
  {
    time: "08:00 PM onwards",
    topic: "Networking Dinner",
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
                key={i}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col min-h-32 md:flex-row"
              >
                {/* Left column – TIME block */}
                <div className="w-full md:w-[200px] bg-indigo-50 flex items-center justify-center p-4">
                  <span className="text-xl md:text-[16px] font-bold text-indigo-600 text-center">
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
                          Faculty: <span className="font-bold">{highlightText(item.faculty, searchQuery)}</span>
                        </p>
                      )}
                      {item.chairpersons && (
                        <p className="text-gray-600 text-md">
                          Chairpersons: <span className="font-bold">{highlightText(item.chairpersons, searchQuery)}</span>
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
