"use client";

import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer"
import { motion } from "framer-motion";
const InternationalFaculty= [
  { name: "Dr.Harikrishna KR Nair", img: "/images/faculty/Dr-Harikrishna-KR-Nair.jpg" },
  { name: "Dr.Janaka karalliedde", img: "/images/faculty/Dr-Janaka-karalliedde.jpg" },  
  { name: "DR.Srikar Nallan", img: "/images/faculty/Srikar-nallan.jpg" }, 
]
const faculty = [
  
  { name: "Dr.Aarathy Kannan", img: "/images/faculty/Dr. Aarthi kannan.jpg" },  
  { name: "Dr.Abijith", img: "/images/faculty/abijith.jpg" },
  { name: "Dr.S.R. Abishek", img: "/images/faculty/DR. S.R. Abishek.jpg" },
  { name: "Dr.C.R.Anand Moses", img: "/images/faculty/Dr. Anand Moses.png" },
  { name: "Dr.R.M.Anjana", img: "/images/faculty/Dr.R.M.Anjana.jpg" },
  { name: "Dr.Anuj Maheshwari", img: "/images/faculty/Dr Anuj Maheshwari.png" },
  { name: "Dr.M.S.Ashraf", img: "/images/faculty/ashraf.jpg" },
  { name: "Dr.Ashwanth Narayan B", img: "/images/faculty/Dr.Ashwanth-Narayan.jpeg" },
  { name: "Dr.C.Balaji", img: "/images/faculty/Dr. C. Balaji.jpg" },
  // { name: "Dr.K.Balaji", img: "/images/faculty/Dr.K Balaji.jpg" },
  { name: "Dr.R.Balamurugan", img: "/images/faculty/DR.R.Balamurugan.jpeg" },
  { name: "Mrs.Bamila Selvaraj", img: "/images/faculty/Mrs.Bamila.S.jpg" },
  { name: "Dr.N.Bhavatharani", img: "/images/faculty/BHAVATHARANI.jpg" },
  { name: "Dr.S.Chandrasekar", img: "/images/faculty/Dr S Chandrasekar.jpg" },
  { name: "Dr.P.Dharmarajan", img: "/images/faculty/Dr. Dharmarajan.jpg" },
  { name: "Dr.Edwin Fernando", img: "/images/faculty/edwin.jpg" },
  { name: "Dr.Jayashree Gopal", img: "/images/faculty/Dr. Jayashree gopal.jpg" },
  { name: "Dr.Kannan Natarajan", img: "/images/faculty/DR Kannan Natrajan.png" },
  { name: "Dr.Krishna G Seshadri", img: "/images/faculty/Prof. Krishna G Seshadri.jpg" },
  { name: "Dr.SS.Lakshmanan", img: "/images/faculty/s-s-lakshmanan.jpg" },
  { name: "Dr.Leela Baid", img: "/images/faculty/Dr. Leela Baid.png" },
  { name: "Dr.Manoj P", img: "/images/faculty/Dr.Manoj-P.jpeg" },
  { name: "Dr.Manoj Khatri", img: "/images/faculty/Dr.Manoj-Khatri.jpeg" },
  { name: "Dr.Meenakshi Bajaj", img: "/images/faculty/meenakshi-bajaj.jpg" },
  { name: "Dr.Milind Ruke", img: "/images/faculty/MILIND.png" },
  { name: "Dr Mithun Bhartia", img: "/images/faculty/Dr.Mithun Bhartia.jpg" },
  { name: "Dr.V.Mohan", img: "/images/faculty/Padmashri  Prof. DR.V.Mohan.jpg" },
  { name: "Dr.Mohan Krishna Moorthy", img: "/images/faculty/Dr. MOHAN KRISHNAMOORTHY.png" },
  { name: "Dr.C.Muralidharan", img: "/images/faculty/Dr.C.Muralidharan.png" },
  { name: "Dr.Nandita Arun", img: "/images/faculty/Dr Nanditha Ramachandran.jpg" },
  { name: "Dr.S. N. Narasingan", img: "/images/faculty/Dr.S.N.Narasingan.jpg" },
  { name: "Dr.A.Panneer Selvam", img: "/images/faculty/Dr.Paneer selvam.jpg" },
  { name: "Dr.P.Paranthaman", img: "/images/faculty/Dr.P.Paranthaman.png" },  
  { name: "Dr.Priya", img: "/images/faculty/priya.jpg" },
  { name: "Dr.Prashanth Arun", img: "/images/faculty/Dr. Prashanth Arun.jpg" },
  { name: "Dr.G.Praakash", img: "/images/faculty/DR.G.PRAKASH.jpg" },
  { name: "Dr.A.Ramachandran", img: "/images/faculty/Dr.A.RAMACHANDRAN.jpg" },
  { name: "Dr.N.Ramakrishnan", img: "/images/faculty/DR.RAMAKRISHNAN N.jpg" },
  { name: "Dr.S.R.Ramakrishnan", img: "/images/faculty/Dr.S.R.Ramakrishnan.jpg"},
  { name: "Dr.V.Rajendran", img: "/images/faculty/Dr. V. Rajendran.jpg" },
  { name: "Dr.R.Ravikumar", img: "/images/faculty/Dr R Ravikumar.jpg" },
  { name: "Dr.V.Ravindranath", img: "/images/faculty/ravindran.jpg" },
  // { name: "Dr.Sanjay B S", img: "/images/faculty/Dr Sanjay B S.png" },
  { name: "Dr.T.Sasi Kumar", img: "/images/faculty/DR. SASI KUMAR.jpg" },
  { name: "Dr.K.Sathyavani", img: "/images/faculty/sathyavani.jpg" },
  { name: "Ms.Seena Rajasekar", img: "/images/faculty/Mrs.Seena Rajsekar.jpg" },
  { name: "Dr.G.Senthil", img: "/images/faculty/Dr. G. Senthil.jpg" },
  { name: "Dr.A.Shanmugam", img: "/images/faculty/Dr A Shanmugam.jpg" }, 
  { name: "Dr.K.Shanmugam", img: "/images/faculty/Dr. K. Shanmugam.jpg" },
  { name: "Dr.A.Shanmugavelu", img: "/images/faculty/DR. A. SHANMUGAVELAN.jpg" },
  { name: "Dr.Shanthi", img: "/images/faculty/Dr.Shanthi.png" },
  { name: "Dr.Shriraam Mahadevan", img: "/images/faculty/Dr.Shriraam-Mahadevan.jpeg" },
  { name: "Dr.Sriram VP", img: "/images/faculty/Dr. Sriram VP.png" },   
  { name: "Dr.D.Suresh Anandan", img: "/images/faculty/Dr D.Suresh Anandan.png" },
  { name: "Dr.Sunil Gupta", img: "/images/faculty/DR.SUNIL GUPTA.jpg" },
  { name: "Dr.K.Uma Mahesh", img: "/images/faculty/Dr. Uma Mahesh.png" },
  { name: "Dr.Usha Aiyyagari", img: "/images/faculty/Dr Usha Aiyyagari.png" },
  { name: "Ms.Vaishnavi Vijay", img: "/images/faculty/Ms.Vaishnavi Vijay.jpg" },
  { name: "Dr.Vijay Viswanathan", img: "/images/faculty/vijay-viswanathan.jpg" },
  { name: "Dr.G.Vijaya Kumar", img: "/images/faculty/DR. VIJAYA KUMAR.jpg" },
  { name: "Dr.Vishnu Priya Prashanth", img: "/images/faculty/Dr.Vishnu Priya Prashanth.jpg" },
  { name: "Dr.Vishnupriya Reddy", img: "/images/faculty/Dr. Vishnupriya Reddy.jpg" },
  { name: "Dr.Viswanathan Vishnu Vijay", img: "/images/faculty/Dr. Viswanathan Vishnu Vijay.jpg" },
];
  // { name: "KMC", img: "/images/about-bg.jpg" },
  // { name: "MMC", img: "/images/about-bg.jpg" },
  // { name: "RAMACHANDRAN", img: "/images/about-bg.jpg" },
  // { name: "STANTLEY", img: "/images/about-bg.jpg" },
  // { name: "DR.JAYASREE", img: "/images/about-bg.jpg" },

export default function FacultySection() {
  return (
    <main>
      <Navbar/>
      <header className="relative w-full mt-16 text-white bg-[url('/images/coundown-bg.jpg')] bg-cover bg-center">
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-700/70"></div>

        <div className="relative py-36 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our Faculties
          </h1>
        </div>
      </header>
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-center text-4xl font-bold mb-10">International Faculties</h3>
          <div className="flex  gap-16 place-content-center mb-16">
            {InternationalFaculty.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex flex-col items-center "
              >
                {/* Arched Card */}
                {/* <div className="relative w-full max-w-xs  bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-t-[150px] rounded-b-2xl shadow-lg flex flex-col items-center"> */}
                  <div className="relative w-full max-w-xs rounded-t-[150px] rounded-b-2xl shadow-lg flex flex-col items-center">
                  {/* Image container with shine */}
                  <div className="shine-card relative z-10 flex justify-center  rounded-t-[150px] overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className=" h-72 max-md:h-[400px] max-w-[240px] object-cover object-top rounded-b-lg transition-transform duration-500 group-hover:scale-110 border"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="text-center mt-3">
                  <h3 className="text-lg font-bold text-gray-900 capitalize">
                    {member.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <h3 className="text-center text-4xl font-bold mb-10">National Faculties</h3>
          <div className="grid gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            
            {faculty.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex flex-col items-center"
              >
                {/* Arched Card */}
                {/* <div className="relative w-full max-w-xs  bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-t-[150px] rounded-b-2xl shadow-lg flex flex-col items-center"> */}
                  <div className="relative w-full max-w-xs rounded-t-[150px] rounded-b-2xl shadow-lg flex flex-col items-center">
                  {/* Image container with shine */}
                  <div className="shine-card relative z-10 flex justify-center  rounded-t-[150px] overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className=" h-72 max-md:h-[400px] object-cover object-top rounded-b-lg transition-transform duration-500 group-hover:scale-110 border"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="text-center mt-3">
                  <h3 className="text-lg font-bold text-gray-900 capitalize">
                    {member.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
