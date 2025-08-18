"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="block">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-serif text-[#1C4A6E]">CFD</span>
          </div>
        </Link>
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="#services">Services</a>
          <a href="#realisations">Réalisations</a>
          <a href="#avis">Avis</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="bg-[#F2B705] text-[#1C4A6E] hover:bg-[#1C4A6E] hover:text-white rounded-xl px-4 py-2">
          Prendre RDV
        </button>
      </div>
    </header>
  );
}