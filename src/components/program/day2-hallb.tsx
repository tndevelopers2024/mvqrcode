"use client";

import { motion, Variants } from "framer-motion";

// -------- Schedule for Day 2 Hall B --------
const schedule = [
  {
    time: "08:00 AM",
    topic: "Registration Start",
  },
  {
    time: "09:30 – 09:50 AM",
    topic:
      "Saving limbs, changing lives: Case based insights in diabetic foot care",
    faculty: "Dr.Senthil, Dr.Kumar P",
    chair: "Dr.Milind Ruke, Dr.P Manoj",
  },
  {
    time: "09:50 – 10:10 AM",
    topic:
      "Limb salvage in Osteomyelitis: Evolving strategies beyond amputation",
    faculty: "Dr.D Suresh Anandan",
    chair: "Dr.Milind Ruke, Dr.P Manoj",
  },
  {
    time: "10:10 – 10:30 AM",
    topic: "Smart Dressing Solutions - The T.I.M.E. concept",
    faculty: "Dr.Senthil G",
    chair: "Dr.Harikrishnan Nair, Dr.Thangavelu Eshwaran",
  },
  {
    time: "10:30 – 11:00 AM",
    topic:
      "Innovative advances in DSA imaging to optimise calcium removal and revascularisation outcomes",
    faculty: "Dr.Vijay Viswanathan, Dr.R Ravikumar",
    chair: "Dr.Harikrishnan Nair, Dr.Thangavelu Eshwaran",
  },
  {
    time: "11:00 – 11:30 AM",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chair: "",
  },
  {
    time: "11:30 AM – 12:30 PM",
    topic: "Quiz",
    faculty: "Dr.Abhijith",
    chair: "",
  },
  {
    time: "12:30 PM – 01:00 PM",
    topic: "Future of diabetes care: CGMS into routine practice",
    faculty: "Dr.Prashanth Arun",
    chair: "Dr.Kannan Natarajan, Dr.C Balaji",
  },
  {
    time: "01:00 PM – 01:30 PM",
    topic: "TBD",
    faculty: "Dr.Leela Baid",
    chair: "Dr.Kannan Natarajan, Dr.C Balaji",
  },
  {
    time: "01:30 PM – 02:15 PM",
    topic: "LUNCH & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chair: "",
  },
  {
    time: "02:30 PM – 03:00 PM",
    topic:
      "Insulin in the Era of SGLT2 Inhibitors and GLP-1 RAs: Is Its Role Changing or Evolving?",
    faculty: "Dr.V.Ravindranath",
    chair: "Dr.Leela Baid, Dr.V.P.Sriram",
  },
  {
    time: "03:00 PM – 03:30 PM",
    topic:
      "When diabetes reaches the lungs: Diabetic Pneumopathy",
    faculty: "Dr.S R Abishek",
    chair: "Dr.Leela Baid, Dr.V.P.Sriram",
  },
  {
    time: "03:30 PM – 04:00 PM",
    topic:
      "THE GUT Wrenching Troubles: Managing Diabetic GastroParesis",
    faculty: "Dr.Vishnu Priya Prashanth",
    chair: "Dr.N Bhavatharani, Dr.K.Uma Mahesh",
  },
  {
    time: "04:00 PM – 04:30 PM",
    topic:
      "Sweet troubles: Marriage, Divorce and Intimacy challenges among couples with diabetes",
    faculty: "Ms.Vaishnavi Vijay",
    chair: "Dr.N.Bhavatharani, Dr.K.Uma Mahesh",
  },
  {
    time: "04:30 PM – 05:00 PM",
    topic: "TEA BREAK & VISIT TO THE STALLS / POSTER AREA",
    faculty: "",
    chair: "",
  },
  {
    time: "05:00 PM – 05:30 PM",
    topic: "Periarthritis of shoulder and its Management",
    faculty: "Dr.Ashwanth Narayanan B",
    chair: "Dr.Kannan Natarajan, Dr.C Balaji",
  },
  {
    time: "05:30 PM – 06:00 PM",
    topic: "Debate (MV ALUMNI)",
    faculty: "",
    chair: "Dr.Krishna Seshadri, Dr.Mitalee H Barman",
  },
  {
    time: "06:00 PM – 06:30 PM",
    topic: "TBD",
    faculty: "",
    chair: "",
  },
  {
    time: "06:30 PM – 07:00 PM",
    topic: "TBD",
    faculty: "",
    chair: "",
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
function highlightText(text: string, query: string, bold = false) {
  if (!query) return bold ? <span className="font-bold">{text}</span> : text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span
        key={i}
        className={`bg-yellow-200 text-black px-1 rounded ${bold ? "font-bold" : ""
          }`}
      >
        {part}
      </span>
    ) : bold ? (
      <span key={i} className="font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function DayTwoHallB({ searchQuery }: { searchQuery: string }) {
  const heading = "MVCON 2026 – Day 2 (Dr. M. Madhavi Amma Hall)";

  const filteredSchedule =
    searchQuery.trim() === ""
      ? schedule
      : schedule.filter(
        (item) =>
          item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.faculty && item.faculty.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (item.chair && item.chair.toLowerCase().includes(searchQuery.toLowerCase()))
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
                    <div className="flex flex-col justify-between mt-6 md:flex-row">
                      {item.faculty && (
                        <p className="text-gray-600 text-md">
                          Faculty:{" "}
                          <span className="font-bold">
                            {highlightText(item.faculty, searchQuery)}
                          </span>
                        </p>
                      )}
                      {item.chair && (
                        <p className="text-gray-600 text-md">
                          Chairpersons:{" "}
                          <span className="font-bold">
                            {highlightText(item.chair, searchQuery)}
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
