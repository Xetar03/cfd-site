"use client";

import { Flame , Snowflake, Sun } from "lucide-react";
import Link from "next/link";

export default function Services() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif text-[#1C4A6E] mb-12">Nos Services</h2>
        <div className="grid md:grid-cols-3 gap-8">

          <Link href="/tarifs/climatisation" className="block">
            <div className="shadow-lg rounded-2xl p-6 flex flex-col items-center bg-white hover:shadow-xl hover:scale-105 transition transform cursor-pointer">
              <Snowflake className="w-12 h-12 text-[#1C4A6E] mb-4" />
              <h3 className="text-xl font-bold mb-2">Climatisation</h3>
              <p className="text-gray-600">Installation et entretien pour un confort optimal.</p>
            </div>
          </Link>

          <Link href="/tarifs/chaudiere" className="block">
            <div className="shadow-lg rounded-2xl p-6 flex flex-col items-center bg-white hover:shadow-xl hover:scale-105 transition transform cursor-pointer">
              <Flame className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Chaudière</h3>
              <p className="text-gray-600">Installation, entretien et dépannage de chaudières.</p>
            </div>
          </Link>

          <Link href="/tarifs/pompes-a-chaleur" className="block">
            <div className="shadow-lg rounded-2xl p-6 flex flex-col items-center bg-white hover:shadow-xl hover:scale-105 transition transform cursor-pointer">
              <Sun className="w-12 h-12 text-[#F2B705] mb-4" />
              <h3 className="text-xl font-bold mb-2">Pompes à chaleur</h3>
              <p className="text-gray-600">Solutions écologiques et économiques pour chauffer.</p>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
