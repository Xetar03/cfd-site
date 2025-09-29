//components/other/DevisDialog.tsx

import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function DevisDialog({ operation }: { operation: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    phone: "",
    email: "",
    message: "",
    callback: false,
  });
  const [notif, setNotif] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operation, ...formData }),
      });

      if (!res.ok) throw new Error("Erreur API");

      // ✅ Reset form + fermer la boite
      setFormData({
        name: "",
        firstName: "",
        phone: "",
        email: "",
        message: "",
        callback: false,
      });
      setIsOpen(false);

      // ✅ Notification
      setNotif("✅ Demande envoyée avec succès !");
      setTimeout(() => setNotif(""), 4000);
    } catch (err) {
      console.error(err);
      setNotif("❌ Erreur lors de l'envoi, réessayez.");
      setTimeout(() => setNotif(""), 4000);
    }
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

      {/* ✅ Notification */}
      {notif && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg border px-4 py-2 rounded-lg text-sm">
          {notif}
        </div>
      )}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* Fond semi-transparent */}
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

        {/* Contenu du dialog */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl max-w-xl w-full p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4 text-[#1C4A6E]">
              Demande de devis — {operation}
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
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
              <label className="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
              <label className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                placeholder="Décrivez votre problème"
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1 w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* ✅ Checkbox Être rappelé */}
            <div className="flex items-center">
              <input
                id="callback"
                type="checkbox"
                checked={formData.callback || false}
                onChange={(e) => setFormData({ ...formData, callback: e.target.checked })}
                className="h-4 w-4 text-[#1C4A6E] border-gray-300 rounded focus:ring-[#1C4A6E]"
              />
              <label htmlFor="callback" className="ml-2 text-sm text-gray-700">
                Être rappelé
              </label>
            </div>

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
