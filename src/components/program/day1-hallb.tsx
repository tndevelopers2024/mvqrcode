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
    topic: "MVOP01-Exosomal microRNAs as Emerging Regulators of Ferroptosis and Their Potential in the Development of Novel Therapeutic Strategies for Human Dise",
    faculty: "Adhira Prakash",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP02-A comparative study of management of diabetic foot ulcer with human epidermal growth factor vs placental extract gel",
    faculty: "Shreyas V Nair",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP03-Exploring the association between Hypomagnesemia and Diabetic nephropathy",
    faculty: "Lakshmana Prasanth Katragad",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP04-DNA Methylation-Induced Nrf2 Dysfunction In Diabetic Foot Ulcers: Implications for Epigenetic Therapy",
    faculty: "Kannan Harithpriya",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP05-Mangiferin-regulated NRF2 signaling attenuates hyperglycemic stress in macrophages",
    faculty: "Ravichandran Jayasuriya",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "09:40 AM – 10:00 AM",
    topic: "Unmasking Anemia in Diabetes",
    faculty: "Dr. V.P. Sriram",
    chairpersons: "Dr.Kannan Natarajan, Dr.C Balaji",
  },
  {
    time: "10:00 AM – 10:20 AM",
    topic: "International Vs National - ADA Vs RSSDI guidelines What's New / What Next / What's the difference ?",
    faculty: "Dr.K.Uma Mahesh",
    chairpersons: "Dr.Kannan Natarajan, Dr.C Balaji",
  },
  {
    time: "10:20 AM -10:40 AM",
    topic: "The invisible threat: Identifying asymptomatic diabetes in clinical practice",
    faculty: "Dr.Aarathy Kannan",
    chairpersons: "Dr.Suresh Kanna S ,Dr.B.Kannan",
  },
  {
    time: "10:40 AM- 11:00 AM",
    topic: "The silent erosion: Unveiling the double burden of diabetes and sarcopenia",
    faculty: "Dr. Vishnu Priya Reddy",
    chairpersons: "Dr.N.N.Anand, Dr.B.Kannan",
  },
  {
    time: "11:00 AM - 11:30 AM",
    topic: "TEA BREAK & VISIT TO THE STALLS /POSTER AREA",
  },
  {
    time: "11:30 AM – 12:00 PM",
    topic: "Demonstration of High Risk Feet in Hall A",
    faculty: "Dr. Vijay Viswanathan / Ms.Seena",
    chairpersons: "Dr.C.Muralidharan, Dr.Aarathy Kannan",
  },
  {
    time: "12:00 PM -12:30 PM",
    topic: "Periodontitis as the sixth complication of Diabetes: Integrating Oral health into Primary Diabetes Care",
    faculty: "Dr.Vinitha Ramachanadran",
    chairpersons: "Dr.N.Bhavatharani, Dr.G.Prakash",
  },
  {
    time: "12:30 PM -1:00 PM",
    topic: "Surrogate measures in routine clinical practice",
    faculty: "Dr.Satyavani K",
    chairpersons: "Dr.N.Bhavatharani, Dr.G.Prakash",
  },
  {
    time: "01:00 PM – 01:30 PM",
    topic: "MVOP06-Non Diabetic Renal Pathologies In Diabetic Patients : A Biopsy Based Perspective",
    faculty: "Pon Abinaya",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP07-Hydroxytyrosol Targets Hyperglycemia-Induced Endothelial Dysfunction: A Network Pharmacology and In Vitro Investigation",
    faculty: "DK GokulRaj",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP08- Efficacy of Topical Timolol Vs Normal Saline In The Healing Of Chronic Diabetic Foot Ulcers",
    faculty: "Divya Padmakumar",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP09- Prolonged QTc in Type 2 Diabetes: An Under-Recognized Cardiovascular Risk Signal",
    faculty: "Vraj rajesh kumar shah",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "1:30 PM - 2:30PM",
    topic: "LUNCH & VISIT TO THE STALLS /POSTER AREA",
  },
  {
    time: "2:30 PM- 3:30 PM",
    topic: "MVOP10-Uncovering the Therapeutic Potential of Lobeglitazone in Diabetic Nephropathy through Network Pharmacology and Molecular Docking",
    faculty: "Kalaimani M",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP11-Integrative Management Preventing Amputation in Chronic Non-Healing Diabetic Foot Ulcer",
    faculty: "P.Revin Selvan",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP12- Comparative Effectiveness of Topical Oxygen Therapy and Negative Pressure Wound Therapy In Diabetic Foot Ulcers: A Prospective Study",
    faculty: "Rohith Balaji SR",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP13-Clinico-Microbiological Profile and Antibiotic Susceptibility Pattern of Diabetic Foot Infections Background",
    faculty: "Jacob C Jacob",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP14-Effect of Sulforaphane on Wound Healing by Mitigating Oxieptosis under Hyperglycemic Microenvironment",
    faculty: "Kavyashree Srikanth",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP15- Correlation of Cognitive Function With Urine Albumin Creatinine Ratio in Type 2 Diabetes",
    faculty: "Niveda",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP16 - Emerging Role of ESMOLOL HYDROCHLORIDE TOPICAL GEL 14% in Diabetic Foot Ulcer (DFU) Management- Early Clinical Experience",
    faculty: "Thangavelu Easwaran",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "3:30 PM - 4:30 PM",
    topic: "MV Life Time Achievement Award in Hall A",
    faculty: "Dr.Jitendra Singh",
  },
  {
    time: "",
    topic: "Inauguration & Key Note lecture in Hall A",
  },
  {
    time: "4:30 PM - 5:00PM",
    topic: "TEA BREAK & VISIT TO THE STALLS /POSTER AREA",
  },
  {
    time: "5:00 PM - 5:30 PM",
    topic: "Retina reimagined: Technology transforming Diabetic Retinopathy screening",
    faculty: "Dr.Manoj Khatri",
    chairpersons: "Dr.Kannan Natarajan, Dr.Mitalee H Barman",
  },
  {
    time: "5:30 PM - 6:00 PM",
    topic: "Work place bullying and violence as risk factors for type 2 diabetes",
    faculty: "Dr.Keerthi Prabhu",
    chairpersons: "Dr.Kannan Natarajan, Dr.K.Shanmugam",
  },
  {
    time: "6:00PM -6:30 PM",
    topic: "Breathing while you sleep: Unmasking OSA",
    faculty: "Dr.N Ramakrishnan",
    chairpersons: "Dr.Leela Baid, Dr.K.Shanmugam",
  },
  {
    time: "6:30 PM- 07:30 PM",
    topic: "MVOP17- Inhibition of Ferroptosis in Pancreatic \u03b2 Cells: A Comprehensive In Silico, In Vitro, and In Vivo Approach for Diabetes Therapy",
    faculty: "Murali Krishna Prasad",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP18-Digital Health Technology Use and Barriers in Type 2 Diabetes Care",
    faculty: "Sagarika Duggirala",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP19-Early Microvascular Burden in Young-Onset Type 2 Diabetes Mellitus",
    faculty: "Shantanu Gondkar",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP20-Double Vision in Diabetes: A Sixth Nerve Surprise",
    faculty: "Sivaprakasan K",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP21-The Incidental Metabolic Crisis",
    faculty: "Varun M",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP22-The Pathogenic Role of Ferroptosis in GDM-Related Placental Dysfunction",
    faculty: "S Monisha",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "",
    topic: "MVOP23- Prevalence of different stages of heart failure among People with Type 2 Diabetes",
    faculty: "Naresh kumar S",
    chairpersons: "Judges: Dr.V.P.Sriram, Dr.Satyavani K",
  },
  {
    time: "07:30 PM -08:00 PM",
    topic: "MV Alumni - Debate (SGLT2i vs GLP1RA)",
    chairpersons: "Dr.Hemanga Barman, Dr.Mitalee H Barman, Dr.V.P.Sriram",
  },
  {
    time: "Networking Dinner 8:00 pm onwards",
    topic: "Networking Dinner 8:00 pm onwards",
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
  const heading = "MVCON \u2013 Day 1 (Dr. M. Madhavi Amma Hall)";

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
      <div className="max-w-8xl mx-auto px-6 lg:px-20">
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
                className="shadow-lg rounded-2xl overflow-hidden flex flex-col min-h-32 md:flex-row"
              >
                {/* Left column \u2013 TIME block */}
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
