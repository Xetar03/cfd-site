"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // ⚡ Auth basique : remplace par un vrai système (JWT / NextAuth)
    if (email === "admin@cfd.com" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Identifiants incorrects");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center text-[#1C4A6E] mb-6">
          Connexion Admin
        </h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1C4A6E]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1C4A6E]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#1C4A6E] text-white py-2 rounded-lg font-semibold hover:bg-[#163a56]"
        >
          Se connecter
        </button>
        
      <a href="/">Retour</a>
      </form>
    </div>
  );
}
