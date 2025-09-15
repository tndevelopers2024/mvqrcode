"use client";

import { useEffect, useState } from "react";

export default function LaunchCountdown() {
  // ⏰ Change this to the time you want to count down to
  const launchDate = new Date("2025-09-16T00:35:00");

  // ✅ Helper defined inside so it can access launchDate
  const getTimeLeft = () => {
    const now = new Date();
    const diff = launchDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isOver: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isOver) return null; // 👈 hides overlay after launch

  return (
    <section className="fixed left-0 top-0 z-[1000] w-full h-full bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Our Website Launches In
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <TimeBox label="Days" value={timeLeft.days} />
          <TimeBox label="Hours" value={timeLeft.hours} />
          <TimeBox label="Minutes" value={timeLeft.minutes} />
          <TimeBox label="Seconds" value={timeLeft.seconds} />
        </div>
      </div>
    </section>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-4">
      <p className="text-4xl font-bold">
        {value.toString().padStart(2, "0")}
      </p>
      <p className="text-sm mt-1">{label}</p>
    </div>
  );
}
