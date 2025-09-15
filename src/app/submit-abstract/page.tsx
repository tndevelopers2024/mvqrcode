"use client";

import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import AbstractForm from "@/components/abstractForm/form";
import { motion } from "framer-motion";

const liVariants = (direction, delay) => ({
  hidden: { opacity: 0, x: direction === "left" ? -40 : 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, delay } },
});

const sections = [
  {
    title: "Submission Timeline",
    text: (
      <>
        <p>
          <strong>MVCON 2026 Scientific Abstract Submission</strong> is open and
          will close on <strong>31st December 2025</strong>.
        </p>
        <p className="mt-3">
          Registration for the conference is mandatory for abstract submission.
          Abstracts should be submitted through the online portal along with
          your MVCON 2026 Registration number.
        </p>
      </>
    ),
    img: "/images/submit-img.jpg",
  },
  {
    title: "Guidelines for Abstract",
    text: (
      <motion.ul
        className="list-disc list-inside space-y-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {[
          "Abstracts must contain original scientific data.",
          "They should focus on diabetes and its complications: prevention, clinical treatment outcomes, innovative techniques, and therapies. Case reports are also accepted.",
        ].map((item, idx) => (
          <motion.li
            key={idx}
            variants={liVariants(idx % 2 === 0 ? "left" : "right", idx * 0.15)}
          >
            {item}
          </motion.li>
        ))}

        <p className="pt-4 font-bold">The abstract must be structured:</p>

        <motion.ul
          className="list-disc ml-6 mt-2 space-y-1"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {[
            "Maximum length: 400 words (excluding title and author affiliations).",
            "Sub-headings in bold: Background and Aims, Materials and Methods, Results, Conclusions.",
            "Title should be short (10–15 words) with authors & affiliations.",
            "One table or one figure (not exceeding 300 words) may be included.",
            "Presentations must avoid branding and use generic product names.",
          ].map((item, idx) => (
            <motion.li
              key={idx}
              variants={liVariants(idx % 2 === 0 ? "left" : "right", idx * 0.15)}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </motion.ul>
    ),
    img: "/images/submit-img3.jpg",
  },
  {
    title: "Selection & Awards",
    text: (
      <>
        <p>
          The scientific committee reserves the right to make the final decision
          about acceptance of the abstract.
        </p>
        <p className="mt-3">
          Best oral and poster presentations will be awarded at the valedictory
          function of MVCON 2026.
        </p>
        <p className="mt-3">
          You will be notified of receipt of your abstract by email. For
          queries, contact{" "}
          <a
            href="mailto:info@mvcon2026.org"
            className="text-blue-600 underline"
          >
            info@mvcon2026.org
          </a>{" "}
          or call <span className="font-medium">+91-9876543210</span>.
        </p>
      </>
    ),
    img: "/images/submit-img2.jpg",
  },
];

export default function SubmitAbstract() {
  return (
    <main>
      <Navbar />
      <section className="w-full bg-gradient-to-br from-sky-50 via-white to-purple-50">
        {/* Hero */}
        <header className="relative w-full mt-16 text-white bg-[url('/images/submit-bg.jpg')] bg-cover bg-bottom">
          <div className="absolute inset-0 bg-blue-700/70" />
          <div className="relative py-32 container mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Submit Your Abstract
            </motion.h1>
          </div>
        </header>

        {/* Sections */}
        <div className="max-w-7xl mx-auto px-6 py-16 lg:px-12">
          <div className="space-y-24">
            {sections.map((sec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  i % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Text */}
                <div className={`${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    {sec.title}
                  </h2>
                  <div className="text-gray-700 leading-relaxed">
                    {sec.text}
                  </div>
                </div>

                {/* Image */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-md"
                >
                  <Image
                    src={sec.img}
                    alt={sec.title}
                    fill
                    className="object-cover object-center"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AbstractForm />
      <Footer />
    </main>
  );
}
