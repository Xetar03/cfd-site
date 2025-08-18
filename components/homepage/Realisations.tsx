"use client";

export default function Realisations() {
  return (
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
  );
}