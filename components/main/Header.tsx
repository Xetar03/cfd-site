"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto relative flex items-center justify-between p-4">

        {/* ✅ Logo à gauche */}
        <Link href="/" className="flex items-center z-10">
          <Image
            src="/images/Logo.png"
            alt="Falow Energies"
            width={120}
            height={40}
            className="h-auto max-h-10 w-auto"
            priority
          />
        </Link>

        {/* ✅ Navigation centrée */}
        <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="/#services">Services</a>
          <a href="/#realisations">Réalisations</a>
          <a href="/#avis">Avis</a>
          <a href="/#contact">Contact</a>
          {/* <a href="/boutique">Boutique</a> */}
        </nav>

        {/* Burger button mobile */}
        <button
          className="md:hidden absolute right-4"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6 text-[#1C4A6E]" />
        </button>
      </div>

      {/* Menu mobile (Dialog HeadlessUI) */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="md:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black/40" aria-hidden="true" />

        <Dialog.Panel className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-6 z-50">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-serif text-[#1C4A6E]">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <nav className="flex flex-col space-y-4 text-gray-700 font-medium">
            <a href="/#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
            <a href="/#realisations" onClick={() => setMobileMenuOpen(false)}>Réalisations</a>
            <a href="/#avis" onClick={() => setMobileMenuOpen(false)}>Avis</a>
            <a href="/#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            {/*<a href="/boutique" onClick={() => setMobileMenuOpen(false)}>Boutique</a>*/}
          </nav>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
