"use client";

import { useState } from "react";
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

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("day1");
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
              ? " bg-yellow-300 text-black border-blue-950" // Active tab
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"} // Inactive tab
          `}
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

      {/* Day Tabs */}
      <div className="mt-10 mx-auto w-11/12 md:w-12/12 font-grotesk">
        <div className="flex justify-center gap-4 flex-wrap my-10">
          {[
            { id: "day1", day: "Day 01", date: "20th", month: "MAR", year: "2026", day2:"Friday" },
            { id: "day2", day: "Day 02", date: "21st", month: "MAR", year: "2026", day2:"Saturday" },
            { id: "day3", day: "Day 03", date: "22nd", month: "MAR", year: "2026", day2:"Sunday" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center rounded-lg shadow-md border transition-all duration-300 ${
                activeTab === tab.id
                  ? " bg-yellow-300 text-black border-blue-950"
                  : "bg-white text-gray-700 border-gray-200"
              }`}
            >
              <span className="text-sm font-semibold mb-2 bg-black text-white w-full px-2 py-0.5 rounded">
                {tab.day}
              </span>
              {tab.day2}
              <div className="flex gap-6 md:px-6 md:py-4 p-2">
                <span
                  className={`md:text-3xl text-xl font-bold ${activeTab === tab.id ? "text-black" : "text-gray-800"}`}
                >
                  {tab.date}
                </span>
                <div className="flex flex-col">
                  <span className={`text-sm font-semibold ${activeTab === tab.id ? "text-black" : "text-gray-800"}`}>
                    {tab.month}
                  </span>
                  <span className={`text-sm ${activeTab === tab.id ? "text-black" : "text-gray-600"}`}>
                    {tab.year}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Hall Tabs */}
        {activeTab === "day1" && renderHallTabs(day1Hall, setDay1Hall)}
        {activeTab === "day2" && renderHallTabs(day2Hall, setDay2Hall)}
        {activeTab === "day3" && renderHallTabs(day3Hall, setDay3Hall)}

        {/* Search Bar */}
        <div className="mt-6 mx-auto w-11/12 md:w-5/12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border-2 ring-gray-400 rounded-xl shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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

        {/* Tab Content */}
        <div>
          {activeTab === "day1" &&
            (day1Hall === "hallA" ? <DayoneHallA searchQuery={searchQuery} /> : <DayoneHallB searchQuery={searchQuery} />)}
          {activeTab === "day2" &&
            (day2Hall === "hallA" ? <DaytwoHallA searchQuery={searchQuery} /> : <DaytwoHallB searchQuery={searchQuery} />)}
          {activeTab === "day3" &&
            (day3Hall === "hallA" ? <DaythreeHallA searchQuery={searchQuery} /> : <DaythreeHallB searchQuery={searchQuery} />)}
        </div>
      </div>
      <Footer />
    </main>
  );
}
