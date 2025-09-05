"use client";

import { useEffect, useState } from "react";

export default function TestCalendarPage() {
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSlots() {
      try {
        const res = await fetch("/api/calendar/slots");
        const data = await res.json();

        if (res.ok) {
          setSlots(data.slots || []);
        } else {
          setError(data.error || "Erreur inconnue");
        }
      } catch (err) {
        setError("Impossible d’appeler l’API");
      } finally {
        setLoading(false);
      }
    }

    fetchSlots();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#1C4A6E] mb-4">
        🔍 Test Google Calendar API
      </h1>

      {loading && <p className="text-gray-600">Chargement des créneaux...</p>}
      {error && <p className="text-red-600">❌ {error}</p>}

      <ul className="space-y-3">
        {slots.map((slot) => (
          <li
            key={slot.id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <p className="font-semibold">{slot.summary || "Sans titre"}</p>
            <p className="text-sm text-gray-600">
              Début : {slot.start ? new Date(slot.start).toLocaleString() : "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              Fin : {slot.end ? new Date(slot.end).toLocaleString() : "N/A"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
