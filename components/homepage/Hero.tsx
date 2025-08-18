"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
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
  );
}