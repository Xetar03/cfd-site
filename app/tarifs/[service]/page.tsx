"use client";

import { useState } from "react";
import Layout from "@/components/main/Layout";

interface TarifsPageProps {
  params: { service: string };
}

const servicesContent: Record<
  string,
  { title: string; description: string; tarifs: { label: string; price: string }[] }
> = {
  "climatisation": {
    title: "Climatisation",
    description: "Découvrez nos formules pour l’installation et l’entretien de climatisations.",
    tarifs: [
      { label: "Installation", price: "1200 €" },
      { label: "Entretien annuel", price: "150 €" },
      { label: "Dépannage", price: "90 €" },
    ],
  },
  "pompes-a-chaleur": {
    title: "Pompes à chaleur",
    description: "Nos solutions économiques et écologiques pour le chauffage.",
    tarifs: [], // <-- remplacé par UI dynamique
  },
  "depannage": {
    title: "Dépannage",
    description: "Intervention rapide et efficace en cas de panne.",
    tarifs: [
      { label: "Diagnostic", price: "70 €" },
      { label: "Main d’œuvre / heure", price: "60 €" },
      { label: "Urgence 24/7", price: "100 €" },
    ],
  },
};

export default function TarifsPage({ params }: TarifsPageProps) {
  const service = servicesContent[params.service];
  const [distance, setDistance] = useState(10);
  const [type, setType] = useState<"gaz" | "fioul">("gaz");

  if (!service) {
    return (
      <Layout>
        <div className="p-10 text-red-600">Service introuvable</div>
      </Layout>
    );
  }

  // --- Calcul dynamique pour pompes à chaleur ---
  const basePrice = type === "gaz" ? 3500 : 3800;
  const price = basePrice + distance * 5;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-serif text-[#1C4A6E] mb-6">
          Tarifs — {service.title}
        </h1>
        <p className="text-gray-600 mb-8">{service.description}</p>

        {/* Cas spécifique Pompes à chaleur */}
        {params.service === "pompes-a-chaleur" ? (
          <div className="space-y-8">
            {/* Type chaudière */}
            <div>
              <h2 className="text-xl font-bold mb-2">Type de chaudière :</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setType("gaz")}
                  className={`px-4 py-2 rounded-lg border transition ${
                    type === "gaz"
                      ? "bg-[#1C4A6E] text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  Gaz
                </button>
                <button
                  onClick={() => setType("fioul")}
                  className={`px-4 py-2 rounded-lg border transition ${
                    type === "fioul"
                      ? "bg-[#1C4A6E] text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  Fioul
                </button>
              </div>
            </div>

            {/* Distance */}
            <div>
              <h2 className="text-xl font-bold mb-2">Distance (km) :</h2>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-[#1C4A6E]"
              />
              <p className="mt-2 text-gray-600">👉 +{distance} km</p>
            </div>

            {/* Prix estimé */}
            <div className="bg-white shadow-lg rounded-xl p-6 text-center">
              <h2 className="text-xl font-bold mb-2">Prix estimé</h2>
              <span className="text-3xl font-bold text-[#1C4A6E]">{price} €</span>
            </div>
          </div>
        ) : (
          /* Cas normal */
          <div className="grid md:grid-cols-3 gap-6">
            {service.tarifs.map((tarif, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 text-center hover:shadow transition"
              >
                <h2 className="text-xl font-bold mb-2">{tarif.label}</h2>
                <span className="text-2xl font-bold text-[#1C4A6E]">
                  {tarif.price}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
