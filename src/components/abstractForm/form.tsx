"use client";
import { useState } from "react";
import Image from "next/image";

export default function AbstractForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("contact", formData.contact);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("file", formData.file);

    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();
      console.log(data);

      // show popup instead of alert
      setShowPopup(true);

      // reset form after success
      setFormData({
        name: "",
        contact: "",
        email: "",
        file: null,
      });

      // auto close popup after 3s
      setTimeout(() => setShowPopup(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Form submission failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-16">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/coundown-bg.jpg')" }}
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

          {/* Contact */}
          <div className="relative">
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={(e) => {
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
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 
                ${
                  loading
                    ? "bg-white/30 text-gray-200 cursor-not-allowed"
                    : "bg-white/20 text-white hover:bg-white/30 hover:shadow-white/40"
                }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>

        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
            <Image
              src="/images/MV-logo.png"
              alt="MV Logo"
              width={120}
              height={120}
              className="mb-4"
            />
            <p className="text-lg font-semibold text-gray-700">
              Submission Successful!
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
