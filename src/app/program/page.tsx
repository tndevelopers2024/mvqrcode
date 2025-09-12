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

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Navbar />
      <ProgramHeader />

      {/* Tabs */}
      <div className="mt-10 mx-auto w-11/12 md:w-12/12">
        <div className="flex justify-center border-b border-gray-300">
          {["day1", "day2", "day3"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 font-medium text-sm md:text-2xl transition-all duration-300 ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {tab === "day1" && "Day 1"}
              {tab === "day2" && "Day 2"}
              {tab === "day3" && "Day 3"}
            </button>
          ))}
        </div>

        {/* Hall toggles */}
        {activeTab === "day1" && (
          <div className="flex justify-center gap-6 mt-4">
            <button
              onClick={() => setDay1Hall("hallA")}
              className={`px-4 py-2 rounded-lg font-medium text-sm md:text-lg transition-all ${
                day1Hall === "hallA"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Prof. M. Viswanathan Hall
            </button>
            <button
              onClick={() => setDay1Hall("hallB")}
              className={`px-4 py-2 rounded-lg font-medium text-sm md:text-lg transition-all ${
                day1Hall === "hallB"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Dr. M. Madhavi Amma Hall
            </button>
          </div>
        )}

        {activeTab === "day2" && (
          <div className="flex justify-center gap-6 mt-4">
            <button
              onClick={() => setDay2Hall("hallA")}
              className={`px-4 py-2 rounded-lg font-medium text-sm md:text-lg transition-all ${
                day2Hall === "hallA"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Prof. M. Viswanathan Hall
            </button>
            <button
              onClick={() => setDay2Hall("hallB")}
              className={`px-4 py-2 rounded-lg font-medium text-sm md:text-lg transition-all ${
                day2Hall === "hallB"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Dr. M. Madhavi Amma Hall
            </button>
          </div>
        )}

        {activeTab === "day3" && (
          <div className="flex justify-center gap-6 mt-4">
            <button
              onClick={() => setDay3Hall("hallA")}
              className={`px-4 py-2 rounded-lg font-medium text-sm md:text-lg transition-all ${
                day3Hall === "hallA"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Prof. M. Viswanathan Hall 
            </button>
            <button
              onClick={() => setDay3Hall("hallB")}
              className={`px-4 py-2 rounded-lg font-medium text-sm md:text-lg transition-all ${
                day3Hall === "hallB"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Dr. M. Madhavi Amma Hall
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="mt-6 mx-auto w-11/12 md:w-5/12">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
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
