"use client";

export default function Avis() {
  return (
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
  );
}