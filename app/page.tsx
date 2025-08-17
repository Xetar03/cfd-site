"use client";

import { motion } from "framer-motion";
import { Calendar, Wrench, Snowflake, Sun } from "lucide-react";

export default function HomePage() {
  return (
    <div className="font-sans bg-white text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-serif text-[#1C4A6E]">CFD</span>
          </div>
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

      {/* Hero Section */}
      <section className="pt-28 pb-20 bg-gray-50 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif text-[#1C4A6E] mb-4"
        >
          Confort toute l’année,<br /> Hiver comme été
        </motion.h1>
        <p className="text-lg text-gray-600 mb-6">
          Installation, entretien et dépannage de climatisations et pompes à chaleur.
        </p>
        <button className="bg-[#F2B705] text-[#1C4A6E] hover:bg-[#1C4A6E] hover:text-white rounded-xl px-6 py-3 text-lg">
          Demander un devis gratuit
        </button>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-[#1C4A6E] mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="shadow-lg rounded-2xl p-6 flex flex-col items-center bg-white">
              <Snowflake className="w-12 h-12 text-[#1C4A6E] mb-4" />
              <h3 className="text-xl font-bold mb-2">Climatisation</h3>
              <p className="text-gray-600">Installation et entretien pour un confort optimal.</p>
            </div>
            <div className="shadow-lg rounded-2xl p-6 flex flex-col items-center bg-white">
              <Sun className="w-12 h-12 text-[#F2B705] mb-4" />
              <h3 className="text-xl font-bold mb-2">Pompes à chaleur</h3>
              <p className="text-gray-600">Solutions écologiques et économiques pour chauffer.</p>
            </div>
            <div className="shadow-lg rounded-2xl p-6 flex flex-col items-center bg-white">
              <Wrench className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-xl font-bold mb-2">Dépannage</h3>
              <p className="text-gray-600">Interventions rapides et efficaces en cas de panne.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Réalisations Section */}
      <section id="realisations" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-[#1C4A6E] mb-12">Réalisations</h2>
          <p className="text-gray-600 mb-6">Quelques exemples de nos installations récentes.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <div className="h-40 bg-gray-200 rounded-xl"></div>
            <div className="h-40 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </section>

      {/* Avis Clients Section */}
      <section id="avis" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-[#1C4A6E] mb-12">Avis Clients</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="shadow rounded-2xl p-6 bg-white text-left">
              <p className="italic text-gray-600 mb-2">“Installation impeccable, travail propre et rapide.”</p>
              <span className="font-semibold">— Jean M.</span>
            </div>
            <div className="shadow rounded-2xl p-6 bg-white text-left">
              <p className="italic text-gray-600 mb-2">“Très réactif, dépannage effectué dans la journée !”</p>
              <span className="font-semibold">— Sophie L.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-[#1C4A6E] mb-8">Contactez-nous</h2>
          <p className="text-gray-600 mb-6">
            Pour toute demande d’information ou devis, remplissez le formulaire ci-dessous.
          </p>
          <form className="grid gap-4 text-left">
            <input
              className="border rounded-lg p-3"
              type="text"
              placeholder="Nom"
              required
            />
            <input
              className="border rounded-lg p-3"
              type="email"
              placeholder="Email"
              required
            />
            <textarea
              className="border rounded-lg p-3"
              rows={4}
              placeholder="Votre message"
              required
            />
            <button
              type="submit"
              className="bg-[#F2B705] text-[#1C4A6E] hover:bg-[#1C4A6E] hover:text-white rounded-xl px-6 py-3 font-semibold"
            >
              Envoyer
            </button>
          </form>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-[#1C4A6E] text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 CFD - Confort toute l’année</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
