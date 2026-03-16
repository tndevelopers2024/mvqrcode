"use client";

import { motion, Variants } from "framer-motion";

// -------- Schedule for Day 2 Prof. M. Viswanathan Hall (Hall A) --------
const schedule = [
  {
    time: "08:00 AM onwards",
    topic: "Registration from 8:00 AM onwards",
  },
  {
    time: "09:00 AM – 09:20 AM",
    topic: "Unravelling Obesity: The What, Why and How",
    faculty: "Dr SN Narasingan",
    chairpersons: "Dr.N.Bhavatharani, Dr.C.Balaji",
  },
  {
    time: "09:20 AM – 09:40 AM",
    topic: "SURMOUNTing Obesity: Going above Thresholds",
    faculty: "Dr NK Narayanan",
    chairpersons: "Dr.Priya, Dr.C.Balaji",
  },
  {
    time: "09:40 AM – 10:00 AM",
    topic: "Making good things even better: Expanding Applicability of Automated Insulin Delivery",
    faculty: "Dr.Nandita",
    chairpersons: "Dr.Priya, Dr.C.Muralidharan",
  },
  {
    time: "10:00 AM – 10:30 AM",
    topic: "Cardiac energy metabolism in failing heart among people with diabetes",
    faculty: "Dr.Anuj Maheshwari",
    chairpersons: "Dr.N.Bhavatharani, Dr.R.Ramakrishnan",
  },
  {
    time: "10:30 AM – 11:00 AM",
    topic: "How to evaluate kidney function in diabetes ?",
    faculty: "Dr.Edwin Fernando",
    chairpersons: "Dr.Vijay Viswanathan, Dr.Janaka Karalliedde",
  },
  {
    time: "11:00 AM - 11:30 AM",
    topic: "TEA BREAK & VISIT TO THE STALLS /POSTER AREA",
  },
  {
    time: "11:30 AM to 12:00 PM",
    topic: "Management strategies for slowing CKD progression in people with diabetes",
    faculty: "Dr.Janaka Karalliedde",
    chairpersons: "Dr.Edwin Fernando, Dr.Vijay Viswanathan",
  },
  {
    time: "12:00 PM– 12:30 PM",
    topic: "Gestational diabetes in India: Translating evidence into practice",
    faculty: "Dr.N.Bhavatharani",
    chairpersons: "Dr.P.Dharmarajan, Dr.R.Ramakrishnan",
  },
  {
    time: "12:30 PM-01:00 PM",
    topic: "Type 1 diabetes: Clinical insights and emerging therapies",
    faculty: "Dr.Usha Aiyyagari",
    chairpersons: "Dr.P.Dharmarajan, Dr.Shriraam Mahadevan",
  },
  {
    time: "1:00 PM-01:30 PM",
    topic: "How to prevent Medico legal problems",
    faculty: "Dr.Viswanathan Vishnu Vijay",
    chairpersons: "Dr.P Manoj, Dr.Prashanth Arun",
  },
  {
    time: "1:30 PM - 2:30PM",
    topic: "LUNCH & VISIT TO THE STALLS /POSTER AREA",
  },
  {
    time: "2:30 PM– 3:00 PM",
    topic: "Innovative advances in DSA imaging to optimise calcium removal and revascularisation outcomes",
    faculty: "Dr.Vijay Viswanathan, Dr.R Ravikumar",
    chairpersons: "Dr.Milind Ruke, Dr.Thangavelu Easwaran",
  },
  {
    time: "3:00 PM – 4:00 PM",
    topic: `Live hands-on workshop
* Debridement - sweet lime
* VAC & TCC Application`,
    faculty: "Dr. Senthil G/ Dr.Milind Ruke",
  },
  {
    time: "4:00 PM – 4:30 PM",
    topic: "The Untapped potential of Imaging in Diabetic Foot Care",
    faculty: "Mr.Srikar Nallan",
    chairpersons: "Dr.Senthil G, Dr.P.Manoj",
  },
  {
    time: "4:30 PM - 5:00PM",
    topic: "TEA BREAK & VISIT TO THE STALLS /POSTER AREA",
  },
  {
    time: "5:00PM -5:30 PM",
    topic: "Unsaid truth about sugar monitoring",
    faculty: "Dr.Mithun Bhartia",
    chairpersons: "Dr.Mohan Krishnamoorthy, Dr.Prashanth Arun",
  },
  {
    time: "5:30 PM- 6:00 PM",
    topic: "Nutrition panel discussion",
    faculty: "Dr.Meenakshi Bajaj, Dr.Hemamalini, Dr.Patricia Trueman",
    chairpersons: "Dr.Mohan Krishnamoorthy (Moderator)",
  },
  {
    time: "6:00 PM – 6:30 PM",
    topic: "Evolving role of GLP-1 RAs in Diabesity",
    faculty: "Dr.Prashanth Arun",
    chairpersons: "Dr.G.Prakash, Dr.K.Uma Mahesh",
  },
  {
    time: "6:30 PM – 6:50 PM",
    topic: "New Generation Insulins: The promising solution to glycaemic havoc in India",
    faculty: "Dr Usha Ayyagari",
  },
  {
    time: "6:50 PM – 7:10 PM",
    topic: "Initiate with Impact: Semaglutide Redefining First line Diabetes Care",
    faculty: "Dr Ashwin Karuppan",
  },
  {
    time: "07:10 PM -07:30 PM",
    topic: "The Gold Standard: Semaglutide leads the way in Weight loss and Beyond",
    faculty: "Dr S S Lakshmanan",
    chairpersons: "Dr.P.Paranthaman, Dr.Hemanga Barman",
  },
  {
    time: "07:30 PM -08:00 PM",
    topic: "Empagliflozin in Cardio Renal Metabolic protection",
    faculty: "Dr.Leela Baid",
    chairpersons: "Dr.G.Prakash, Dr.Vishnu Priya Reddy",
  },
  {
    time: "Networking Dinner 8:00 pm onwards",
    topic: "Networking Dinner 8:00 pm onwards",
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

// -------- Component --------
export default function DaytwoHallA({ searchQuery }: { searchQuery: string }) {
  const heading = "Day 2 Prof. M. Viswanathan Hall (Hall A)";

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

        {/* Schedule Cards */}
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
                className={`shadow-lg rounded-2xl overflow-hidden flex flex-col min-h-32 md:flex-row`}
              >
                {/* Time */}
                <div className="w-full md:w-[200px] bg-indigo-50 flex items-center justify-center p-4">
                  <span className="text-lg font-bold text-indigo-600 text-center">
                    {item.time}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-gray-800  whitespace-pre-line">
                    {highlightText(item.topic, searchQuery)}
                  </h3>

                  <div className="flex flex-col justify-between mt-4 md:flex-row mt-2">
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
                        Chair Person:{" "}
                        <span className="font-bold">
                          {highlightText(item.chairpersons, searchQuery)}
                        </span>
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
