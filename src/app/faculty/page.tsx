"use client";

import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer"
import { motion } from "framer-motion";

const faculty = [
  { name: "DR.RAKESH SAHAY", img: "/images/about-bg.jpg" },
  { name: "DR.ASHRAF", img: "/images/about-bg.jpg" },
  { name: "DR.NIHAL THOMAS", img: "/images/about-bg.jpg" },
  { name: "DR.JANAKA", img: "/images/about-bg.jpg" },
  { name: "DR.MITHUN BHATIA", img: "/images/about-bg.jpg" },
  { name: "DR.SUNIL GUPTA", img: "/images/about-bg.jpg" },
  { name: "DR.RAJENDRAN ( APOLLO )", img: "/images/about-bg.jpg" },
  { name: "DR.ANUJ MAHESWARI", img: "/images/about-bg.jpg" },
  { name: "DR.MILIND RUKE", img: "/images/about-bg.jpg" },
  { name: "DR.ASHWANTH", img: "/images/about-bg.jpg" },
  { name: "DR.DHARMARAJAN", img: "/images/about-bg.jpg" },
  { name: "DR.MEENAKSHI BAJAJ", img: "/images/about-bg.jpg" },
  { name: "DE.EDWIN FERNANDO", img: "/images/about-bg.jpg" },
  { name: "DR.PRAKASH", img: "/images/about-bg.jpg" },
  { name: "DR.BALAJI - RAMACHANDRA", img: "/images/about-bg.jpg" },
  { name: "DR.BHAVATHARANI", img: "/images/about-bg.jpg" },
  { name: "DR.PANEER SELVAM", img: "/images/about-bg.jpg" },
  { name: "DR. A. SHANMUGAVELAN", img: "/images/about-bg.jpg" },
  { name: "DR. VIJAYA KUMAR", img: "/images/about-bg.jpg" },
  { name: "DR.K.SHANMUGAM", img: "/images/about-bg.jpg" },
  { name: "DR.AARTHY KANNAN", img: "/images/about-bg.jpg" },
  { name: "DR.ANAND MOSES", img: "/images/about-bg.jpg" },
  { name: "DR.KANNAN NATARAJAN", img: "/images/about-bg.jpg" },
  { name: "DR.BALAJI C", img: "/images/about-bg.jpg" },
  { name: "DR.BALAMURUGAN", img: "/images/about-bg.jpg" },
  { name: "DR.USHA AIYYAGARI", img: "/images/about-bg.jpg" },
  { name: "DR.RAMAKRISHNAN", img: "/images/about-bg.jpg" },
  { name: "DR.RAVINDRAN", img: "/images/about-bg.jpg" },
  { name: "DR.MOHAN KRISHNAMOORTHY", img: "/images/about-bg.jpg" },
  { name: "DR.PARANTHAM", img: "/images/about-bg.jpg" },
  { name: "DR.CHANDRASEKAR", img: "/images/about-bg.jpg" },
  { name: "DR.PRIYA", img: "/images/about-bg.jpg" },
  { name: "DR.KRISHNA SESHADRI", img: "/images/about-bg.jpg" },
  { name: "DR.MURALIDHARAN", img: "/images/about-bg.jpg" },
  { name: "DR.JAYASREE", img: "/images/about-bg.jpg" },
  { name: "DR.NARASINGAN", img: "/images/about-bg.jpg" },
  { name: "DR. LAKSHMAN", img: "/images/about-bg.jpg" },
  { name: "DR.V.MOHAN", img: "/images/about-bg.jpg" },
  { name: "DR.RAMACHANDRAN", img: "/images/about-bg.jpg" },
  { name: "KMC", img: "/images/about-bg.jpg" },
  { name: "MMC", img: "/images/about-bg.jpg" },
  { name: "RAMACHANDRAN", img: "/images/about-bg.jpg" },
  { name: "STANTLEY", img: "/images/about-bg.jpg" },
  { name: "DR.V.RAJENDRAN", img: "/images/about-bg.jpg" },
  { name: "DR.SHANMUGAVELU", img: "/images/about-bg.jpg" },
  { name: "DR.ABIJITH", img: "/images/about-bg.jpg" },
  { name: "Dr Nanditha Ramachandran", img: "/images/about-bg.jpg" },
  { name: "Dr Anjana", img: "/images/about-bg.jpg" },
];

export default function FacultySection() {
  return (
    <main>
      <Navbar/>
      <header className="relative w-full mt-16 text-white bg-[url('/images/program-bg1.jpg')] bg-cover bg-top">
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-700/70"></div>

        <div className="relative py-32 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Meet Our Faculty
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
                <div className="relative w-full max-w-xs bg-gradient-to-b from-blue-700 to-purple-900 rounded-t-[150px] rounded-b-2xl shadow-lg flex flex-col items-center">
                  {/* Image container with shine */}
                  <div className="shine-card relative z-10 flex justify-center -translate-x-3 -translate-y-3 rounded-t-[150px] overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-100 h-72 object-cover object-top rounded-b-lg transition-transform duration-500 group-hover:scale-110"
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
