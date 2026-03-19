"use client";

import { useState } from "react";
import Image from "next/image";
import DayoneHallA from "@/components/program/day1-halla";
import DayoneHallB from "@/components/program/day1-hallb";
import DaytwoHallA from "@/components/program/day2-halla";
import DaytwoHallB from "@/components/program/day2-hallb";
import DaythreeHallA from "@/components/program/day3-halla";
import DaythreeHallB from "@/components/program/day3-hallb";
import ProgramHeader from "@/components/program/hero";
import { Search, X } from "lucide-react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Calendar, MapPin, Users, Microscope, MessageSquare, Network } from "lucide-react";


export default function HomePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [day1Hall, setDay1Hall] = useState<"hallA" | "hallB">("hallA");
  const [day2Hall, setDay2Hall] = useState<"hallA" | "hallB">("hallA");
  const [day3Hall, setDay3Hall] = useState<"hallA" | "hallB">("hallA");
  const [searchQuery, setSearchQuery] = useState("");

  const hallTabs = [
    { id: "hallA", name: "Prof. M. Viswanathan Hall", hall: "hall - A" },
    { id: "hallB", name: "Dr. M. Madhavi Amma Hall", hall: "hall - B" },
  ];

  const renderHallTabs = (dayHall: "hallA" | "hallB", setDayHall: any) => (
    <div className="flex justify-center gap-4 flex-wrap my-10">
      {hallTabs.map((hall) => (
        <button
          key={hall.id}
          onClick={() => setDayHall(hall.id)}
          className={`flex flex-col items-center justify-center rounded-lg shadow-md border transition-all duration-300
            ${dayHall === hall.id
              ? "bg-yellow-300 text-black border-blue-950"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
            }`}
        >
          <span className="text-sm font-semibold mb-2 bg-black text-white w-full px-2 py-0.5 rounded">
            {hall.hall.toUpperCase()}
          </span>
          <div className="px-6 py-4 text-center">
            <span className="text-sm md:text-lg font-medium">{hall.name}</span>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Navbar />
      <ProgramHeader />

      {/* Tabs */}
      <div className="mt-10 mx-auto w-11/12 md:w-12/12 font-grotesk">
       <div className="flex justify-center gap-4 flex-nowrap max-md:justify-start overflow-x-auto my-10 mobile-scrollbar">
          {[
            { id: "overview", label: "Overview" },
            { id: "day1", day: "Day 01", date: "20th", month: "MAR", year: "2026", day2: "Friday" },
            { id: "day2", day: "Day 02", date: "21st", month: "MAR", year: "2026", day2: "Saturday" },
            { id: "day3", day: "Day 03", date: "22nd", month: "MAR", year: "2026", day2: "Sunday" },
            { id: "register", label: "Register & Pay" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center rounded-lg shadow-md border transition-all duration-300 ${activeTab === tab.id
                ? "bg-yellow-300 text-black border-blue-950"
                : "bg-white text-gray-700 border-gray-200"
                }`}
            >
              {/* OVERVIEW + REGISTER (LABEL ONLY) */}
              {(tab.id === "overview" || tab.id === "register") ? (
                <div className="px-10 py-6 font-semibold text-lg text-center">
                  {tab.label}
                </div>
              ) : (
                <>
                  {/* DAY TABS */}
                  <span className="text-sm font-semibold mb-2 bg-black text-white w-full px-2 py-0.5 rounded">
                    {tab.day}
                  </span>
                  <span className="text-sm">{tab.day2}</span>
                  <div className="flex gap-6 md:px-6 md:py-4 p-2">
                    <span className="md:text-3xl text-xl font-bold">
                      {tab.date}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{tab.month}</span>
                      <span className="text-sm">{tab.year}</span>
                    </div>
                  </div>
                </>
              )}
            </button>
          ))}

        </div>

        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === "overview" && (
          <section className="w-full flex justify-center mb-20">
            <div className="relative w-full max-w-5xl rounded-xl shadow-xl overflow-hidden">

              {/* BACKGROUND IMAGE WITH REDUCED OPACITY */}
              <div
                className="absolute inset-0 bg-[url(/images/line-bg.jpg)] bg-no-repeat bg-cover bg-center"
                style={{ opacity: 0.75 }}
              />

              {/* CONTENT LAYER */}
              <div className="relative z-10 bg-white/90">

                <div className="flex justify-between items-center flex-wrap gap-4 max-md:justify-center px-10 pt-5">
                  <img src="images/mvdiabetes.webp" width={150} alt="MV Diabetes" />
                  <img src="images/finallogo.png" width={200} alt="MVCON" />
                  <img src="images/drc.jpeg" width={200} alt="DRC Logo" />
                </div>

                {/* Header */}
                <div className="text-center py-10 px-6">
                  <h1 className="text-6xl font-extrabold text-blue-800 tracking-wide">
                    MVCON 2026
                  </h1>
                </div>

                {/* Date & Venue */}
                <div className="flex flex-col md:flex-row justify-center gap-6 px-6">
                  <div className="flex items-center gap-3 border rounded-full pl-2 pr-4 py-2 shadow-sm bg-white">
                    <div className="flex justify-center items-center bg-orange-500 rounded-full p-4">
                      <Calendar className="text-white" />
                    </div>
                    <span className="text-sm font-medium">
                      20, 21, 22 March 2026
                    </span>
                  </div>

                  <div className="flex items-center gap-3 border rounded-full pl-2 pr-4 py-2 shadow-sm bg-white">
                    <div className="flex justify-center items-center bg-orange-500 rounded-full p-4">
                      <MapPin className="text-white" />
                    </div>
                    <span className="text-sm font-medium">
                      GRT Hotels, T.Nagar, Chennai
                    </span>
                  </div>
                </div>

                {/* Speaker */}
                <div className="flex justify-center mt-12 px-6">
                  <div className="bg-blue-50 rounded-xl p-6 text-center shadow-md max-w-md">
                    <img
                      src="images/president.jpg"
                      alt="Speaker"
                      className="mx-auto rounded-lg"
                    />

                    <div className="mt-4 bg-yellow-400 text-black rounded-lg px-4 py-2">
                      <p className="font-bold text-md">
                        Dr. Vijay Viswanathan
                      </p>
                      <p className="text-sm">
                        Head & Chief Diabetologist <br />
                        MV Hospital for Diabetes, Chennai
                      </p>
                    </div>
                  </div>
                </div>

                {/* Conference Highlights */}
                <div className="mt-16 px-6 pb-14">
                  <h2 className="text-center text-2xl font-bold text-blue-800 mb-10">
                    Conference Highlights
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Card 1 */}
                    <div className="bg-blue-50 rounded-xl p-6 text-center shadow-sm">
                      <Users className="mx-auto text-orange-500 mb-3" size={36} />
                      <p className="text-sm font-medium">
                        Wide range of sessions:
                        Talks on diabetes and
                        management of its
                        complications such
                        as kidney, eye, heart
                        and dedicated sessions
                        on diabetic foot
                      </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-blue-50 rounded-xl p-6 text-center shadow-sm">
                      <Microscope className="mx-auto text-orange-500 mb-3" size={36} />
                      <p className="text-sm font-medium">
                        Live workshops:
                        Hands-on debridement
                        practice and
                        demonstrations of
                        advanced techniques
                        such as Negative
                        Pressure Wound
                        Therapy.
                      </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-blue-50 rounded-xl p-6 text-center shadow-sm">
                      <MessageSquare className="mx-auto text-orange-500 mb-3" size={36} />
                      <p className="text-sm font-medium">
                        Scientific exchanges:
                        Symposiums, Panel
                        discussions, Original
                        research presentations
                        (oral and poster),
                        Quiz competition,
                        and Debates
                      </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-blue-50 rounded-xl p-6 text-center shadow-sm">
                      <Network className="mx-auto text-orange-500 mb-3" size={36} />
                      <p className="text-sm font-medium">
                        Networking opportunity:
                        A dedicated Delegate
                        Lounge for interaction
                        with peers and faculty
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </section>

        )}

        {/* ================= DAY TABS ================= */}
        {activeTab === "day1" && renderHallTabs(day1Hall, setDay1Hall)}
        {activeTab === "day2" && renderHallTabs(day2Hall, setDay2Hall)}
        {activeTab === "day3" && renderHallTabs(day3Hall, setDay3Hall)}

        {activeTab === "register" && (
          <div className="w-full flex justify-center mb-20">
            {/* CARD WRAPPER */}
            <div className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-xl">

              {/* BACKGROUND IMAGE (CONSTRAINED) */}
              <div
                className="absolute inset-0 bg-[url(/images/line-bg.jpg)] bg-no-repeat bg-cover bg-center rounded-xl"
                style={{ opacity: 0.75 }}   // 👈 adjust if needed
              />

              {/* CONTENT */}
              <div className="relative z-10 bg-white/90 px-6 py-12 text-center rounded-xl">

                {/* Who Should Attend */}
                <h2 className="text-5xl font-bold text-blue-800 mb-2">
                  Who Should Attend
                </h2>
                <p className="text-sm text-gray-700 mb-8">
                  Diabetologists, Surgeons, Post Graduates &amp; Paramedics <br />
                  interested in diabetic foot and wound management
                </p>

                {/* Register & Pay */}
                <h2 className="text-3xl font-bold text-blue-800 mb-6">
                  Register &amp; Pay
                </h2>
                <p className="text-md text-blue-700 mb-2">
                  Registration Fee
                </p>

                {/* Fee Boxes */}
                <div className="flex flex-col gap-3 items-center mb-8">
                  <div className="bg-blue-800 text-white px-6 py-2 rounded-md text-lg font-medium w-full max-w-md">
                    Post Graduates: Rs. 3,000/- Per Person
                  </div>
                  <div className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg font-medium w-full max-w-md">
                    Delegates: Rs. 4,000/- Per Person
                  </div>
                  <div className="bg-blue-400 text-white px-2 md:px-6 py-2 rounded-md text-lg font-medium w-full max-w-md">
                    Spot Registration: Rs. 5,000/- Per Person
                  </div>
                </div>

                {/* QR Section */}
                <p className="text-sm font-semibold mb-4">
                  Scan &amp; Register Here
                </p>

                <img
                  src="images/qr.png"
                  alt="QR Code"
                  className="mx-auto w-40 h-40 mb-8"
                />

                {/* Footer */}
                <div className="text-md text-blue-700">
                  <p>For further details:</p>
                  <p className="font-medium">
                    <a href="tel:+918925955818">+91 8925955818</a> | <a href="mailto:mvcon@mvdiabetes.in">mvcon@mvdiabetes.in</a>
                  </p>
                  <p className="mt-1 font-semibold"><a href="https://mvcon.in">mvcon.in</a></p>
                </div>

              </div>
            </div>
          </div>

        )}


        {/* Search (only for day tabs) */}
        {activeTab !== "overview" && activeTab !== "register" && (
          <div className="mt-6 mx-auto w-11/12 md:w-5/12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border-2 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        )}


        {/* Program Content */}
        <div>
          {activeTab === "day1" &&
            (day1Hall === "hallA" ? (
              <DayoneHallA searchQuery={searchQuery} />
            ) : (
              <DayoneHallB searchQuery={searchQuery} />
            ))}

          {activeTab === "day2" &&
            (day2Hall === "hallA" ? (
              <DaytwoHallA searchQuery={searchQuery} />
            ) : (
              <DaytwoHallB searchQuery={searchQuery} />
            ))}

          {activeTab === "day3" &&
            (day3Hall === "hallA" ? (
              <DaythreeHallA searchQuery={searchQuery} />
            ) : (
              <DaythreeHallB searchQuery={searchQuery} />
            ))}
        </div>


      </div>

      <Footer />
    </main>
  );
}
