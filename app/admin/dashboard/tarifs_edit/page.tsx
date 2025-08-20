"use client";
import { useState } from "react";
import { useCsvApi } from "@/hooks/useCsvApi";
import Link from "next/link";

export default function TarifsCsvPage() {
  const { data, loading, saveCsv } = useCsvApi("tarifs.csv");
  const [localData, setLocalData] = useState<any[]>([]);

  // Sync des données
  if (!loading && localData.length === 0 && data.length > 0) {
    setLocalData(data);
  }

  if (loading) return <p>Chargement...</p>;

  const handleEdit = (rowIndex: number, key: string, value: string) => {
    const updated = [...localData];
    updated[rowIndex][key] = value;
    setLocalData(updated);
  };

  const handleAdd = () => {
    const newRow: Record<string, string> = {};
    Object.keys(localData[0] || { label: "", price: "" }).forEach((k) => {
      newRow[k] = "";
    });
    setLocalData([...localData, newRow]);
  };

  const handleDelete = (index: number) => {
    const updated = localData.filter((_, i) => i !== index);
    setLocalData(updated);
  };

  const handleSave = () => {
    saveCsv(localData);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-[#1C4A6E]">
        🛠 Gestion des tarifs
      </h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gray-100 text-left">
            <tr>
              {Object.keys(localData[0] || {}).map((h) => (
                <th key={h} className="border px-3 py-2 font-semibold">
                  {h}
                </th>
              ))}
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {Object.entries(row).map(([key, value], j) => (
                  <td key={j} className="border px-3 py-2">
                    <input
                      type="text"
                      value={value as string}
                      onChange={(e) => handleEdit(i, key, e.target.value)}
                      className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                ))}
                <td className="border px-3 py-2 text-center">
                  <button
                    onClick={() => handleDelete(i)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ❌ Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Boutons d'action */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          ➕ Ajouter une ligne
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          💾 Sauvegarder
        </button>
        <Link href="/admin/dashboard/" className="block">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            🔙 Retour
          </button>
        </Link>
      </div>
    </div>
  );
}
