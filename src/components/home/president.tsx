"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function WelcomeSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Message + Main Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image – first on mobile, second on desktop */}
          <div className="order-1 lg:order-2 flex flex-col">
            <div className="relative w-full h-64 sm:h-80 lg:h-[500px] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/president.jpg"
                alt="MVCON Main"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <h3 className="text-center mt-4 text-3xl md:hidden">Dr. Vijay Viswanathan</h3>
            <p className="text-center md:hidden">Organising Chairman</p>
          </div>

          {/* Message */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Message From the Organising Chairman
            </h2>
            <p className="text-gray-700 leading-relaxed">
              It gives me immense pleasure to welcome you to the inaugural
              edition of MVCON, a new forum for a plethora of scientific
              sessions from MV Diabetes. With over 75 years of legacy in
              pioneering diabetes care, MV Diabetes has stood as a leader in
              both comprehensive diabetes management and advanced diabetic foot
              care. MVCON builds on this legacy, creating a scientific platform
              where diabetologists, surgeons, and paramedics can come together
              to learn, exchange, and collaborate. With a special expertise on
              diabetic foot—an area where MV Diabetes has earned both national
              and international recognition—we aim to advance skills, share
              innovations, and improve clinical outcomes for patients across the
              globe.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              As the National President of RSSDI, India’s largest organization
              for healthcare professionals and researchers in diabetes, and the
              Honorary President of D-Foot International, I have dedicated my
              mission to developing a multidisciplinary approach to reduce
              preventable amputations worldwide. MVCON reflects this strategic
              vision, & I look forward to welcoming you to Chennai, to a
              prestigious event that promises learning, inspiration, and
              collaboration for the diabetes community.
            </p>
           <div className="text-right flex flex-col mt-4">
             <i className="text-right text-2xl max-md:hidden">
              – Dr. Vijay Viswanathan
            </i>
            <small className="max-md:hidden">Organising Chairman</small>
           </div>
          </div>
        </div>

        {/* Speaker Grid */}
        <div className="space-y-12">
          <div className="flex justify-center flex-wrap gap-8">
            {[
              {
                name: "Dr. Viswanathan Vishnu Vijay",
                role: "Organising Committee",
                img: "/images/person2.jpg",
              },
              {
                name: "Dr. Prashanth Arun",
                role: "Organising Committee",
                img: "/images/person1.jpg",
              },
            ].map((speaker, index) => (
              <div
                key={index}
                className="w-80 relative group bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4"
                data-aos="zoom-in"
                data-aos-duration={900 + index * 100}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={speaker.img}
                    alt={speaker.name}
                    className="w-full h-72 object-cover object-top rounded-xl transform group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/speakers"
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition"
                  >
                    {speaker.name}
                  </Link>
                  <p className="text-gray-500 text-sm mt-2">{speaker.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 – remaining 3 images */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                name: "Dr.Sivashankari S",
                role: "Organising Committee",
                img: "/images/person3.jpg",
              },
              {
                name: "Dr.Satyavani K",
                role: "Organising Committee",
                img: "/images/person4.jpg",
              },
              {
                name: "Ms. Nagajothi",
                role: "Organising Committee",
                img: "/images/nagajothi.jpg", // new image
              },
            ].map((speaker, index) => (
              <div
                key={index}
                className="w-80 relative group bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4"
                data-aos="zoom-in"
                data-aos-duration={1100 + index * 100}
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={speaker.img}
                    alt={speaker.name}
                    className="w-full h-72 object-cover object-top rounded-xl transform group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/speakers"
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition"
                  >
                    {speaker.name}
                  </Link>
                  <p className="text-gray-500 text-sm mt-2">{speaker.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
