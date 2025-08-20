"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      router.push("/admin/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1C4A6E] text-white flex flex-col">
        <div className="px-6 py-4 text-2xl font-bold border-b border-[#163a56]">
          Admin
        </div>
        <nav className="flex-1 px-4 py-6 space-y-3">
          <button className="w-full text-left px-3 py-2 rounded hover:bg-[#163a56]">
            Tableau de bord
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-[#163a56]">
            Gestion des tarifs
          </button>
          <button className="w-full text-left px-3 py-2 rounded hover:bg-[#163a56]">
            Gestion du contenu
          </button>
        </nav>
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            router.push("/admin/login");
          }}
          className="px-6 py-3 border-t border-[#163a56] hover:bg-[#163a56] text-left"
        >
          Déconnexion
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Bienvenue sur le panel de gestion</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Tarifs</h2>
            <p className="text-gray-600">
            Modifier les prix de vos préstations.
            </p>
            <Link href="/admin/dashboard/tarifs_edit" className="block">
                <button className="mt-4 px-4 py-2 bg-[#1C4A6E] text-white rounded-lg hover:shadow hover:scale-102 transition transform cursor-pointer">
                Gérer les tarifs
                </button>
            </Link>
          </div>

          <div className="italic bg-grey shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Contenu</h2>
            <p className="text-gray-600">
              Modifier les textes et informations visibles sur le site.
            </p>
            <button className="mt-4 px-4 py-2 bg-[#1C4A6E] text-white rounded-lg">
              Gérer le contenu
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
