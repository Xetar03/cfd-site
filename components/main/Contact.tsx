"use client";

export default function Contact() {
  return (
    <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-[#1C4A6E] mb-8">Contactez-nous</h2>
          <p className="text-gray-600 mb-6">
            Pour toute demande d’information ou devis, remplissez le formulaire ci-dessous.
          </p>
          <form className="grid gap-4 text-left">
            <input
              className="border rounded-lg p-3"
              type="text"
              placeholder="Nom"
              required
            />
            <input
              className="border rounded-lg p-3"
              type="email"
              placeholder="Email"
              required
            />
            <textarea
              className="border rounded-lg p-3"
              rows={4}
              placeholder="Votre message"
              required
            />
            <button
              type="submit"
              className="bg-[#F2B705] text-[#1C4A6E] hover:bg-[#1C4A6E] hover:text-white rounded-xl px-6 py-3 font-semibold"
            >
              Envoyer
            </button>
          </form>
        </div>
      </section>
  );
}