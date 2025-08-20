"use client";
import { useCsvApi } from "@/hooks/useCsvApi";

export default function TarifsCsvPage() {
  const { data, loading, saveCsv } = useCsvApi("tarifs.csv");

  if (loading) return <p>Chargement...</p>;

  const handleAdd = () => {
    const newData = [...data, { label: "Nouvelle ligne", price: "999€" }];
    saveCsv(newData);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Gestion du CSV</h1>
      <table className="border-collapse border border-gray-400">
        <thead>
          {data.length > 0 && (
            <tr>
              {Object.keys(data[0]).map((h) => (
                <th key={h} className="border px-2 py-1">{h}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {Object.values(row).map((v, j) => (
                <td key={j} className="border px-2 py-1">{v as string}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleAdd}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        ➕ Ajouter une ligne
      </button>
    </div>
  );
}
