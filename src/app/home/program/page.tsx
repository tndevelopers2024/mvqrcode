"use client";

import { useState } from "react";
import Dayone from "@/components/program/day1";
import Daytwo from "@/components/program/day2";
import Daythree from "@/components/program/day3";
import ProgramHeader from "@/components/program/hero";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("day1");

  return (
    <main className="flex flex-col items-center justify-center w-full">
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

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "day1" && <Dayone />}
          {activeTab === "day2" && <Daytwo />}
          {activeTab === "day3" && <Daythree />}
        </div>
      </div>
    </main>
  );
}
