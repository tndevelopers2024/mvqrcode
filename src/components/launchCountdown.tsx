"use client";

import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function LaunchCountdown() {
  // ⏰ Change this to the time you want to count down to
  const launchDate = new Date("2025-09-16T00:00:00"); 


// 2025-09-16T11:00:00 <----- Paste this for coundown



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
    <section className="fixed left-0 top-0 z-[1000] w-full h-full bg-gray-600 text-white flex items-center justify-center">
      <div className="max-w-xl text-center">
        <div className="flex justify-center mb-5">
          <img src={"/images/finalLogo.png"} className="w-72" alt="" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Our Website Launches In
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <TimeBox label="Days" value={timeLeft.days} />
          <TimeBox label="Hours" value={timeLeft.hours} />
          <TimeBox label="Minutes" value={timeLeft.minutes} />
          <TimeBox label="Seconds" value={timeLeft.seconds} />
        </div>

        {/* contact details */}
        <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-4">
          Contact Us
        </h2>
        <div className="flex justify-center gap-5">
          <div className="flex flex-col flex-1 items-center gap-3 bg-white/10 p-4 rounded">
            <Phone className="text-yellow-400" />
            <a href="tel:+91-8925955818" className="hover:underline">
              +91 8925955818
            </a>
          </div>
          <div className="flex flex-col flex-1 items-center gap-3 bg-white/10 p-4 rounded">
            <Mail className="text-yellow-400" />
            <a href="mailto:mvcon@mvdiabetes.in" className="hover:underline">
              mvcon@mvdiabetes.in
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center gap-6 mt-6">
          <a
            href="https://www.facebook.com/MVHospitalForDiabetes/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://www.instagram.com/mvhospitaldiabetes/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://x.com/mvdiabetes1972"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition"
          >
            <FaXTwitter size={24} />
          </a>
        </div>
      </div>
    </section>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/30 rounded-2xl shadow p-4">
      <p className="text-4xl font-bold">{value.toString().padStart(2, "0")}</p>
      <p className="text-sm mt-1">{label}</p>
    </div>
  );
}
