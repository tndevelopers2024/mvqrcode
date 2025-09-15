"use client";
import { useState } from "react";

export default function AbstractForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-16">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/coundown-bg.jpg')" }} // replace with your image
      ></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/80 to-blue-600/70"></div>

      {/* Glass card */}
      <div className="relative max-w-2xl w-full p-8 rounded-3xl backdrop-blur-xl bg-white/20 shadow-2xl z-10">
        <h2 className="text-center text-3xl font-extrabold text-white drop-shadow-md mb-10">
          Submit Your Abstract
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <div className="relative">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full rounded-xl bg-white/10 px-4 pt-5 pb-2 text-white placeholder-transparent border border-white/40 focus:border-white focus:ring-2 focus:ring-white/50 outline-none"
            />
            <label
              htmlFor="name"
              className="absolute left-4 -top-5 text-white/80 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-white/60 peer-placeholder-shown:text-base"
            >
              Name
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={(e) => {
                // keep only digits in state
                const onlyNums = e.target.value.replace(/\D/g, "");
                setFormData((prev) => ({ ...prev, contact: onlyNums }));
              }}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              placeholder=" "
              required
              maxLength={10}
              className="peer w-full rounded-xl bg-white/10 px-4 pt-5 pb-2 text-white placeholder-transparent border border-white/40 focus:border-white focus:ring-2 focus:ring-white/50 outline-none"
            />
            <label
              htmlFor="contact"
              className="absolute left-4 -top-5 text-white/80 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-white/60 peer-placeholder-shown:text-base"
            >
              Contact
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
              className="peer w-full rounded-xl bg-white/10 px-4 pt-5 pb-2 text-white placeholder-transparent border border-white/40 focus:border-white focus:ring-2 focus:ring-white/50 outline-none"
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-5 text-white/80 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-white/60 peer-placeholder-shown:text-base"
            >
              Email
            </label>
          </div>

          {/* File */}
          <div className="relative">
            <label
              htmlFor="file"
              className="block mb-2 text-white/80 font-medium"
            >
              File Attachment{" "}
              <span className="text-xs text-white/60">(PDF / DOCX)</span>
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
              className="block w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/30 file:text-white hover:file:bg-white/40 transition"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white/20 text-white font-semibold shadow-lg hover:bg-white/30 hover:shadow-white/40 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </div>
    </section>
  );
}
