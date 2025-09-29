"use client";

export default function Contact() {
  return (
    // <section id="contact" className="py-16 bg-gray-50">
    //     <div className="max-w-4xl mx-auto px-4 text-center">
    //       <h2 className="text-3xl font-serif text-[#1C4A6E] mb-8">Contactez-nous</h2>
    //       <p className="text-gray-600 mb-6">
    //         Pour toute demande d’information ou devis, remplissez le formulaire ci-dessous.
    //       </p>
    //       <form className="grid gap-4 text-left">
    //         <input
    //           className="border rounded-lg p-3"
    //           type="text"
    //           placeholder="Nom"
    //           required
    //         />
    //         <input
    //           className="border rounded-lg p-3"
    //           type="email"
    //           placeholder="Email"
    //           required
    //         />
    //         <textarea
    //           className="border rounded-lg p-3"
    //           rows={4}
    //           placeholder="Votre message"
    //           required
    //         />
    //         <button
    //           type="submit"
    //           className="bg-[#F2B705] text-[#1C4A6E] hover:bg-[#1C4A6E] hover:text-white rounded-xl px-6 py-3 font-semibold"
    //         >
    //           Envoyer
    //         </button>
    //       </form>
    //     </div>
    //   </section>

      <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif text-[#1C4A6E] mb-8">Contactez-nous</h2>
        <p className="text-gray-600 mb-12">
          Pour toute question ou demande, n’hésitez pas à nous contacter :
        </p>

        <div className="grid gap-6 sm:grid-cols-3 text-left sm:text-center">
          {/* Téléphone */}
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold text-[#1C4A6E]">📞 Téléphone</span>
            <a
              href="tel:+33123456789"
              className="mt-2 text-gray-700 hover:text-[#1C4A6E] transition"
            >
              +33 1 23 45 67 89
            </a>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold text-[#1C4A6E]">✉️ Email</span>
            <a
              href="mailto:contact@falow-energies.fr"
              className="mt-2 text-gray-700 hover:text-[#1C4A6E] transition"
            >
              contact@falow-energies.fr
            </a>
          </div>

          {/* Adresse */}
          <div className="flex flex-col items-center">
            <span className="text-xl font-semibold text-[#1C4A6E]">📍 Adresse</span>
            <p className="mt-2 text-gray-700">
              123 Rue Exemple <br /> 75000 Paris
            </p>
          </div>
        </div>
      </div>
    </section>




  );
}