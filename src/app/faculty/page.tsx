"use client";

import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer"
import { motion } from "framer-motion";

const faculty = [
  { name: "DR.AARTHY KANNAN", img: "/images/faculty/Dr. Aarthi kannan.jpg" },
  { name: "DR.ABIJITH", img: "/images/faculty/abijith.jpg" },
  { name: "DR.ANAND MOSES", img: "/images/faculty/Dr. Anand Moses.png" },
  { name: "DR.ANUJ MAHESWARI", img: "/images/faculty/Dr Anuj Maheshwari.png" },
  { name: "Dr.Anjana", img: "/images/faculty/Dr.R.M.Anjana.jpg" },
  { name: "DR.A.SHANMUGAVELU", img: "/images/faculty/DR. A. SHANMUGAVELAN.jpg" },
  { name: "Dr.A.Shanmugam", img: "/images/faculty/Dr A Shanmugam.jpg" },
  { name: "DR.ASHRAF", img: "/images/faculty/ashraf.jpg" },
  { name: "DR.ASHWANTH", img: "/images/faculty/DR.ASHWANTH NARAYANAN.B.png" },
  { name: "DR.BALAJI - RAMACHANDRA", img: "/images/faculty/Dr.K Balaji.jpg" },
  { name: "DR.BALAJI C", img: "/images/faculty/Dr. C. Balaji.jpg" },
  { name: "DR.BALAMURUGAN", img: "/images/faculty/dummy.jpg" },
  { name: "DR.BHAVATHARANI", img: "/images/faculty/BHAVATHARANI.jpg" },
  { name: "DR.CHANDRASEKAR", img: "/images/faculty/Dr S Chandrasekar.jpg" },
  { name: "DR.D.Suresh Anandan", img: "/images/faculty/Dr D.Suresh Anandan.png" },
  { name: "DR.DHARMARAJAN", img: "/images/faculty/Dr. Dharmarajan.jpg" },
  { name: "DR.EDWIN FERNANDO", img: "/images/faculty/edwin.jpg" },
  { name: "DR.G.Senthil", img: "/images/faculty/Dr. G. Senthil.jpg" },
  { name: "DR.Jayashree gopal", img: "/images/faculty/Dr. Jayashree gopal.jpg" },
  { name: "DR.KANNAN NATARAJAN", img: "/images/faculty/DR Kannan Natrajan.png" },
  { name: "DR.KRISHNA SESHADRI", img: "/images/faculty/Prof. Krishna G Seshadri.jpg" },
  { name: "DR.K.SHANMUGAM", img: "/images/faculty/Dr. K. Shanmugam.jpg" },
  { name: "DR.LAKSHMANAN", img: "/images/faculty/Dr. S. S. LAKSHMANAN.png" },
  { name: "DR.Leela Baid", img: "/images/faculty/Dr. Leela Baid.png" },
  { name: "DR.MEENAKSHI BAJAJ", img: "/images/faculty/DR.MEENAKSHI BAJAJ.jpg" },
  { name: "DR.MILIND RUKE", img: "/images/faculty/MILIND.png" },
  { name: "DR.MITHUN BHATIA", img: "/images/faculty/Dr.Mithun Bhartia.jpg" },
  { name: "DR.MOHAN KRISHNAMOORTHY", img: "/images/faculty/Dr. MOHAN KRISHNAMOORTHY.png" },
  { name: "DR.MURALIDHARAN", img: "/images/faculty/Dr.C.Muralidharan.png" },
  { name: "DR.Nanditha Ramachandran", img: "/images/faculty/Dr Nanditha Ramachandran.jpg" },
  { name: "DR.NARASINGAN", img: "/images/faculty/Dr.S.N.Narasingan.jpg" },
  { name: "DR.NIHAL THOMAS", img: "/images//faculty/DR.NIHAL THOMAS.jpg" },
  { name: "DR.PANEER SELVAM", img: "/images/faculty/Dr.Paneer selvam.jpg" },
  { name: "DR.PARANTHAMAN", img: "/images/faculty/Dr.P.Paranthaman.png" },
  { name: "DR.PRAKASH", img: "/images/faculty/DR.G.PRAKASH.jpg" },
  { name: "DR.PRIYA", img: "/images/faculty/dummy.jpg" },
  { name: "DR.Prashanth Arun", img: "/images/faculty/Dr. Prashanth Arun.jpg" },
  { name: "DR.RAKESH SAHAY", img: "/images/faculty/DR.RAKESH SAHAY.jpg" },
  { name: "DR.RAMACHANDRAN", img: "/images/faculty/Dr.A.RAMACHANDRAN.jpg" },
  { name: "DR.RAMAKRISHNAN", img: "/images/faculty/DR.RAMAKRISHNAN N.jpg" },
  { name: "DR.R.Ravikumar", img: "/images/faculty/Dr R Ravikumar.jpg" },
  { name: "DR.RAVINDRAN", img: "/images/faculty/dummy.jpg" },
  { name: "DR.S.R. Abishek", img: "/images/faculty/DR. S.R. Abishek.jpg" },
  { name: "DR.Sanjay B S", img: "/images/faculty/Dr Sanjay B S.png" },
  { name: "DR.SASI KUMAR", img: "/images/faculty/DR. SASI KUMAR.jpg" },
  { name: "DR.Sriram VP", img: "/images/faculty/Dr. Sriram VP.png" },
  { name: "DR.SUNIL GUPTA", img: "/images/faculty/DR.SUNIL GUPTA.jpg" },
  { name: "DR.USHA AIYYAGARI", img: "/images/faculty/Dr Usha Aiyyagari.png" },
  { name: "Dr.Uma Mahesh", img: "/images/faculty/Dr. Uma Mahesh.png" },
  { name: "Dr.Vijay Viswanathan", img: "/images/faculty/vijay-viswanathan.jpg" },
  { name: "DR.VIJAYA KUMAR", img: "/images/faculty/DR. VIJAYA KUMAR.jpg" },
  { name: "Dr.Vishnu Priya Prashanth", img: "/images/faculty/Dr.Vishnu Priya Prashanth.jpg" },
  { name: "Dr.Vishnupriya Reddy", img: "/images/faculty/Dr. Vishnupriya Reddy.jpg" },
  { name: "Dr.Viswanathan Vishnu Vijay", img: "/images/faculty/Dr. Viswanathan Vishnu Vijay.jpg" },
  { name: "DR.V.MOHAN", img: "/images/faculty/Padmashri  Prof. DR.V.Mohan.jpg" },
  { name: "DR.V.RAJENDRAN", img: "/images/faculty/Dr. V. Rajendran.jpg" },
  { name: "Mrs.Bamila.S", img: "/images/faculty/Mrs.Bamila.S.jpg" },
  { name: "Mrs.Seena Rajsekar", img: "/images/faculty/Mrs.Seena Rajsekar.jpg" },
  { name: "Ms.Vaishnavi Vijay", img: "/images/faculty/Ms.Vaishnavi Vijay.jpg" },
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
      <header className="relative w-full mt-16 text-white bg-[url('/images/program-bg1.jpg')] bg-cover bg-top">
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-700/70"></div>

        <div className="relative py-32 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our Faculties
          </h1>
        </div>
      </header>
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-6">

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
                <div className="relative w-full max-w-xs  bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-t-[150px] rounded-b-2xl shadow-lg flex flex-col items-center">
                  {/* Image container with shine */}
                  <div className="shine-card relative z-10 flex justify-center -translate-x-3 -translate-y-3 rounded-t-[150px] overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className=" h-72 object-cover object-top rounded-b-lg transition-transform duration-500 group-hover:scale-110 border"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="text-center mt-3">
                  <h3 className="text-lg font-bold text-gray-900">
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
