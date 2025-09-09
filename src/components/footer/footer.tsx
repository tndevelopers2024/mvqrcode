"use client";

import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="bg-gradient-to-tr from-blue-950 to-blue-700 text-white pt-12 pb-6 px-4 tracking-wide">
      <div className="text-center">
        {/* Links */}
        <ul className="flex gap-x-8 gap-y-3 justify-center flex-wrap">
          <li>
            <a
              href="javascript:void(0)"
              className="text-[15px] text-slate-300 hover:text-white"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              className="text-[15px] text-slate-300 hover:text-white"
            >
              Program Proposal
            </a>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              className="text-[15px] text-slate-300 hover:text-white"
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Social media */}
        <div className="mt-12">
          <h6 className="text-[15px] text-slate-300 mb-4">
            Stay connected with us:
          </h6>

          <div className="flex justify-center items-center gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition"
            >
              <FaXTwitter size={24} />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-600 pt-6 mt-12">
          <p className="text-[15px] text-slate-300">
            © MV International Conference. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
