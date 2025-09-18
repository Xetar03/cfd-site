import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-gray-800">
      {/* Header fixe */}
      <Header />

      {/* Contenu principal (prend toute la hauteur disponible) */}
      <main className="flex-grow pt-18">
        {children}
      </main>

      {/* Footer toujours collé en bas */}
      <Footer />
    </div>
  );
}
