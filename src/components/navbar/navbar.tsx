"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { MountainIcon } from 'lucide-react';

const Logo = () => (
    <div className="flex items-center justify-center">
      <MountainIcon className="h-8 w-8 text-primary" />
    </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-20 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary hover:text-primary/80 transition-colors">
          <Logo />
          <span>MVCon</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <Link href="/staticPages" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link href="/staticPages/#about" className="text-gray-700 hover:text-blue-600">
            About
          </Link>
          <Link href="/staticPages/program" className="text-gray-700 hover:text-blue-600">
            Program Proposal
          </Link>
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Register
          </Link>
          <Link href="/admin" className="text-gray-700 hover:text-blue-600">
            Admin
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md">
          <div className="flex flex-col space-y-4 p-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/program"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Program Proposal
            </Link>
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
            <Link
              href="/admin"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
