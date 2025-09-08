"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function DevisDialog({ operation }: { operation: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📩 Données envoyées :", { operation, ...formData });
    // TODO: envoyer vers API (mail, base de données...)
    setIsOpen(false);
  };

  return (
    <>
      {/* Bouton pour ouvrir le dialog */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[#1C4A6E] text-white rounded-lg hover:bg-[#163854] transition"
      >
        Demander un devis
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Fond semi-transparent */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        {/* Contenu du dialog */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4 text-[#1C4A6E]">
              Demande de devis — {operation}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
              </div>

              {/* Lien Google Calendar (placeholder pour le moment) 
              <a
                href="https://calendar.google.com/"
                target="_blank"
                className="text-sm text-blue-600 hover:underline"
              >
                📅 Réserver un créneau via Google Calendar
              </a>*/}

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1C4A6E] text-white rounded-lg hover:bg-[#163854] transition"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
