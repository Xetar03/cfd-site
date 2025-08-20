"use client";
import { useEffect, useState } from "react";

export function useCsvApi(file: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Lire CSV
  useEffect(() => {
    setLoading(true);
    fetch(`/api/csv?file=${file}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, [file]);

  // Sauvegarder CSV
  async function saveCsv(newData: any[]) {
    await fetch("/api/csv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file, data: newData }),
    });
    setData(newData);
  }

  return { data, loading, saveCsv };
}
