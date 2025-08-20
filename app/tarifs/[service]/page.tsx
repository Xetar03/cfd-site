"use client";

import { use } from "react";
import Layout from "@/components/main/Layout";
import { useState } from "react";
import { useCsvApi } from "@/hooks/useCsvApi";

interface TarifsPageProps {
  params: Promise<{ service: string }>;
}

export default function TarifsPage({ params }: TarifsPageProps) {
  const { service } = use(params);
  const { data: allTarifs, loading } = useCsvApi("tarifs.csv");

  const [distance, setDistance] = useState(10);
  const [type, setType] = useState<"haute_t" | "basse_t">("haute_t");

  if (loading) {
    return (
      <Layout>
        <div className="p-10 text-gray-600">Chargement...</div>
      </Layout>
    );
  }

  const serviceRows = allTarifs.filter((row) => row.service === service);

  if (serviceRows.length === 0) {
    return (
      <Layout>
        <div className="p-10 text-red-600">Service introuvable ou pas encore configuré.</div>
      </Layout>
    );
  }

  // ----- Cas spécial : chaudière (paliers distance/type) -----
  if (service === "chaudiere") {
    const typeRows = serviceRows
      .filter((row) => row.type === type)
      .map((row) => ({
        distance_min: Number(row.distance_min),
        prix: Number(row.prix),
      }))
      .sort((a, b) => a.distance_min - b.distance_min);

    // Trouver le bon palier (distance_min <= distance)
    let price = typeRows.length ? typeRows[0].prix : 0;
    for (const row of typeRows) {
      if (distance >= row.distance_min) price = row.prix;
    }

    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-serif text-[#1C4A6E] mb-6">Tarifs — Chaudière</h1>
          <p className="text-gray-600 mb-8">
            Estimation d’entretien selon le type de chaudière et la distance.
          </p>

          {/* ✅ Bloc "Installation et dépannage — sur devis" réinséré */}
          <div className="text-gray-600 mb-8">
            <h2 className="text-2xl text-[#1C4A6E] mb-4">Installation et dépannage :</h2>
            <p>Tarifs des installations et des dépannages uniquement sur devis&nbsp;:</p>
            <ul className="list-disc ml-6 mt-4 space-y-1">
              <li>Installation — À partir de XXX€ — Demander un devis</li>
              <li>Dépannage — À partir de XXX€ — Demander un devis</li>
            </ul>
          </div>

          {/* UI de calcul d’entretien */}
          <div className="space-y-8">
            {/* Type chaudière */}
            <div>
              <h3 className="text-xl mb-3">Type de chaudière :</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setType("haute_t")}
                  className={`px-4 py-2 rounded-lg border transition ${
                    type === "haute_t" ? "bg-[#1C4A6E] text-white" : "bg-white text-gray-700"
                  }`}
                >
                  Haute température
                </button>
                <button
                  onClick={() => setType("basse_t")}
                  className={`px-4 py-2 rounded-lg border transition ${
                    type === "basse_t" ? "bg-[#1C4A6E] text-white" : "bg-white text-gray-700"
                  }`}
                >
                  Basse température
                </button>
              </div>
            </div>

            {/* Distance */}
            <div>
              <h2 className="text-xl font-bold mb-2">Distance (km) :</h2>
              <input
                type="range"
                step="5"
                min="0"
                max="150"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-[#1C4A6E]"
              />
              <p className="mt-2 text-gray-600">👉 {distance} km</p>
            </div>

            {/* Prix estimé d'entretien */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <h2 className="text-xl font-bold mb-2">Prix estimé (entretien)</h2>
              <span className="text-3xl font-bold text-[#1C4A6E]">{price} €</span>
              <p className="text-sm text-gray-500 mt-2">
                Estimation basée sur le type sélectionné et la distance. Hors installation/dépannage (sur devis).
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // ----- Cas génériques (autres services) -----
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-serif text-[#1C4A6E] mb-6">Tarifs — {service}</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {serviceRows.map((row, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow transition">
              <h2 className="text-xl font-bold mb-2">{row.label ?? "Prestation"}</h2>
              <span className="text-2xl font-bold text-[#1C4A6E]">
                {row.prix}
                {typeof row.prix === "number" ? " €" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
