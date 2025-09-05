"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";

export default function DepannageDialog({ service }: { service: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", slot: "" });
  const [slots, setSlots] = useState<{ id: string; start: string; end: string; summary?: string }[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.phone || !form.slot) {
    alert("⚠️ Merci de remplir tous les champs avant de réserver !");
    return;
  }

  const res = await fetch("/api/calendar/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...form, service }),
  });

  const data = await res.json();

  if (data.success) {
    alert("✅ Votre dépannage a bien été réservé !");
    setIsOpen(false);
  } else {
    alert("❌ Erreur : " + (data.error || "Impossible de réserver"));
  }
};


  useEffect(() => {
    fetch("/api/calendar/slots")
      .then(res => res.json())
      .then(data => {
        if (data.slots) setSlots(data.slots);
      });
  }, []);

  // ✅ Grouper les créneaux par date
  const groupedSlots = slots.reduce((acc: any, slot) => {
    const day = new Date(slot.start).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
    if (!acc[day]) acc[day] = [];
    acc[day].push(slot);
    return acc;
  }, {});

  const days = Object.keys(groupedSlots);
  const currentDay = days[currentDayIndex];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 px-4 py-2 bg-[#1C4A6E] text-white rounded-lg"
      >
        Prévoir un dépannage
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative z-50">
          <Dialog.Title className="text-xl font-bold mb-4">Réserver un dépannage</Dialog.Title>

          {/* Formulaire infos utilisateur */}
          <input
            required
            type="text"
            placeholder="Votre nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 mb-2 rounded"
          />

          <input
            required
            type="tel"
            placeholder="Téléphone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border p-2 mb-2 rounded"
          />

          <input
            type="text"
            placeholder="Adresse"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border p-2 mb-4 rounded"
          />

          {/* ✅ Navigation entre jours */}
          {days.length > 0 && (
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentDayIndex((i) => Math.max(0, i - 1))}
                disabled={currentDayIndex === 0}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                ←
              </button>

              <p className="font-semibold text-gray-700">{currentDay}</p>

              <button
                onClick={() => setCurrentDayIndex((i) => Math.min(days.length - 1, i + 1))}
                disabled={currentDayIndex === days.length - 1}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                →
              </button>
            </div>
          )}

          {/* ✅ Affichage des créneaux du jour courant */}
          <div className="flex flex-wrap gap-2">
            {groupedSlots[currentDay]?.map((slot: any) => (
              <button
                key={slot.id}
                onClick={() => setForm({ ...form, slot: slot.start })}
                className={`px-3 py-2 rounded border ${
                  form.slot === slot.start
                    ? "bg-[#1C4A6E] text-white border-[#1C4A6E]"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {new Date(slot.start).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#1C4A6E] text-white rounded"
            >
              Réserver
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
