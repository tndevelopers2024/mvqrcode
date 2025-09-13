"use client";

import Image from "next/image";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

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
      <ul className="list-disc list-inside space-y-2">
        <li>Abstracts must contain original scientific data.</li>
        <li>
          They should focus on diabetes and its complications: prevention,
          clinical treatment outcomes, innovative techniques, and therapies.
          Case reports are also accepted.
        </li>
        <p className="pt-4 font-bold">The abstract must be structured:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            Maximum length: <strong>400 words</strong> (excluding title and
            author affiliations).
          </li>
          <li>
            Sub-headings in bold: Background and Aims, Materials and Methods,
            Results, Conclusions.
          </li>
          <li>
            Title should be short (10–15 words) with authors & affiliations.
          </li>
          <li>
            One table or one figure (not exceeding 300 words) may be included.
          </li>
          <li>
            Presentations must avoid branding and use generic product names.
          </li>
        </ul>
      </ul>
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
      <section className="w-full bg-gradient-to-br from-sky-50 via-white to-purple-50 py-16">
        <header className="relative w-full text-white bg-[url('/images/sponsor-bg.png')] bg-cover bg-top">
        <div className="absolute inset-0 bg-blue-700/70" />
        <div className="relative py-32 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Submit Your Abstract
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            
          </p>
        </div>
      </header>
        <div className="max-w-7xl mx-auto px-6 py-10 lg:px-12">
          {/* Page Title */}
          

          {/* Sections */}
          <div className="space-y-24">
            {sections.map((sec, i) => (
              <div
                key={i}
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
                <div className="relative w-full h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={sec.img}
                    alt={sec.title}
                    fill
                    className="object-cover object-center hover:scale-105 transition duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}
