"use client";

import { motion } from "framer-motion";
import { MdOutlineWorkspacePremium, MdOutlinePushPin } from "react-icons/md";
import { IoDiamondOutline } from "react-icons/io5";
import { LuMedal } from "react-icons/lu";
import { GiRibbonMedal } from "react-icons/gi";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";


const sponsorships = [
  {
    title: "Platinum Partner",
    price: "₹10,00,000",
    icon: <MdOutlineWorkspacePremium className="w-12 h-12 text-yellow-400" />,
    features: [
      "1 Symposium OR Speaker Slot (choice of one).",
      "Premium Stall Location: 3m x 3m exhibition space.",
      "Logo on side stage panels & Scientific Program Booklet.",
      "Full-page ad in Scientific Program Booklet.",
      "Delegate Kit Inserts (advance approval required).",
      "Sponsor-Branded Case Studies/Trials included.",
      "Exclusive Lunch with Faculty (branding included).",
      "Verbal Recognition at Valedictory Function.",
      "50 Complimentary Registrations.",
      "3 Meal Passes.",
    ],
  },
  {
    title: "Diamond Partner",
    price: "₹8,00,000",
    icon: <IoDiamondOutline className="w-12 h-12 text-yellow-400" />,
    features: [
      "1 Symposium OR Speaker Slot (choice of one).",
      "Premium Stall Location: 3m x 2m exhibition space.",
      "Logo on side stage panels & Scientific Program Booklet.",
      "Half-page ad in Scientific Program Booklet.",
      "Delegate Kit Inserts (advance approval required).",
      "Sponsor-Branded Case Studies/Trials included.",
      "Verbal Recognition at Valedictory Function.",
      "40 Complimentary Registrations.",
      "3 Meal Passes.",
    ],
  },
  {
    title: "Gold Partner",
    price: "₹5,00,000",
    icon: <LuMedal className="w-12 h-12 text-yellow-400" />,
    features: [
      "Exhibition Space: 3m x 2m stall.",
      "Logo on side stage panels & Scientific Program Booklet.",
      "Quarter-page ad in Scientific Program Booklet.",
      "Delegate Kit Inserts (advance approval required).",
      "Sponsor-Branded Case Studies/Trials included.",
      "Verbal Recognition at Valedictory Function.",
      "30 Complimentary Registrations.",
      "2 Meal Passes.",
    ],
  },
  {
    title: "Silver Partner",
    price: "₹3,00,000",
    icon: <GiRibbonMedal className="w-12 h-12 text-yellow-400" />,
    features: [
      "Exhibition Space: 2m x 2m stall.",
      "Logo on side stage panels & Scientific Program Booklet.",
      "Verbal Recognition at Valedictory Function.",
      "25 Complimentary Registrations.",
      "2 Meal Passes.",
    ],
  },
];

export default function SponsorshipOpportunities() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white">
      <Navbar/>
      <header className="relative w-full mt-16 text-white bg-[url('/images/sponsor-bg.png')] bg-cover bg-top">
        <div className="absolute inset-0 bg-blue-700/70" />
        <div className="relative py-32 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sponsorship Opportunities
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Join as a sponsor and highlight your commitment to innovation,
            collaboration, and knowledge sharing.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-6 lg:px-24 text-center my-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {sponsorships.map((sponsor, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-200 
                         bg-gradient-to-tr from-blue-900 to-blue-500 hover:border-yellow-400 hover:shadow-2xl transition-all duration-300"
            >
              {/* shimmer overlay — actual element (no pseudo) */}
              <div
                className="absolute -left-1/2 top-0 w-[150%] h-full transform -translate-x-full rotate-12 
                           bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0
                           group-hover:opacity-100 group-hover:translate-x-[150%]
                           transition-all duration-700 pointer-events-none z-10"
                aria-hidden="true"
              />

              {/* card content above overlay */}
              <div className="relative z-20">
                <div className="mb-4 mx-auto rounded-tl-3xl rounded-br-3xl bg-white w-20 h-20 grid place-content-center">
                  {sponsor.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  {sponsor.title}
                </h3>
                <p className="inline-block mt-2 px-4 py-1 rounded-2xl font-bold bg-white text-blue-900">
                  {sponsor.price}
                </p>

                <ul className="mt-4 text-left space-y-2 text-sm w-fit mx-auto">
                  {sponsor.features.map((f, idx) => (
                    <li key={idx} className="flex items-start text-white">
                      <span className="text-yellow-400 mr-2">✔</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-24 my-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-tr from-blue-800 to-blue-600 text-white p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-yellow-300">
            Important Notes
          </h2>
          <ul className="space-y-4 text-left">
            <li className="flex items-start">
              <span className="mr-3 text-yellow-400 text-xl"><MdOutlinePushPin/></span>
              Delegate Kit Inserts: Subject to prior approval; duplicates will
              not be allowed. First-come, first-served basis.
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-yellow-400 text-xl"><MdOutlinePushPin/></span>
              Case Studies/Trials: Allowed for Platinum, Diamond, and Gold
              partners only.
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-yellow-400 text-xl"><MdOutlinePushPin/></span>
              Acknowledgement: Sponsors recognized at Valedictory Function.
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-yellow-400 text-xl"><MdOutlinePushPin/></span>
              No Social Media/Digital Promotion included in sponsorship
              packages.
            </li>
          </ul>
        </motion.div>
      </div>
      <Footer/>
    </section>
  );
}
