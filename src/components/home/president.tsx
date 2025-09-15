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
          {/* Message */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Message From the President
            </h2>
            <p className="text-gray-700 leading-relaxed">
              It gives me immense pleasure to welcome you to the inaugural
              edition of <strong>MVCON</strong>, a new academic tradition from
              MV Hospital for Diabetes. With over 75 years of legacy in
              pioneering diabetes care, MV has stood as a leader in both
              holistic diabetes management and advanced diabetic foot care.
              MVCON builds on this legacy, creating a platform where
              diabetologists, surgeons, and paramedics can come together to
              learn, exchange, and collaborate. With a special focus on diabetic
              foot – an area where MV has earned national and international
              recognition – we aim to advance skills, share innovations, and
              improve outcomes for patients everywhere.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              As President of <strong>RSSDI</strong>, India’s largest diabetes
              body, and Honorary President of{" "}
              <strong>D Foot International</strong>, I have dedicated my mission
              to reducing preventable amputations worldwide. MVCON reflects that
              vision, and I look forward to welcoming you to Chennai, to an
              event that promises learning, inspiration, and collaboration for
              the diabetes community.
            </p>
          </div>


          <div className="flex flex-col h-full">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/president.jpg"
                alt="MVCON Main"
                fill
                className="object-cover object-center"
                priority
              />
              {/* <div className="absolute bottom-4 left-4 bg-gradient-to-r from-black/90 via-black/60 to-transparent px-4 py-2 rounded-lg text-white">
                <h3 className="text-2xl font-semibold">Dr. Vijay</h3>
                <p className="text-sm">Organising Chairman, President</p>
              </div> */}
            </div>
          </div>
        </div>

        {/* Speaker Grid */}
        <div className="space-y-12">
          <div className="flex justify-center flex-wrap gap-8">
            {[
              {
                name: "Dr. Vishnu",
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
                name: "Dr.Sivashankari",
                role: "Committee Members",
                img: "/images/person3.jpg",
              },
              {
                name: "Dr.Satyavani",
                role: "Committee Members",
                img: "/images/person4.jpg",
              },
              {
                name: "Ms. Nagajothi",
                role: "Committee Members",
                img: "/images/person5.jpg", // new image
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
