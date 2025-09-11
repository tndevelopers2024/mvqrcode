"use client";

import { useState } from "react";
import Dayone from "@/components/program/day1";
import Daytwo from "@/components/program/day2";
import Daythree from "@/components/program/day3";
import ProgramHeader from "@/components/program/hero";
import { Search, X } from "lucide-react";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("day1");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <Navbar/>
      {/* Header */}
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

        {/* Search Bar */}
        <div className="mt-6 ml-auto w-11/12 md:w-5/12">
          <div className="relative">
            {/* Search Icon */}
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

            {/* Cancel Icon (only shows if searchQuery has text) */}
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
          {activeTab === "day1" && <Dayone searchQuery={searchQuery} />}
          {activeTab === "day2" && <Daytwo searchQuery={searchQuery} />}
          {activeTab === "day3" && <Daythree searchQuery={searchQuery} />}
        </div>
      </div>
      <Footer/>
    </main>
  );
}
