import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Papa from "papaparse";

// 🔹 Lire un CSV
async function readCsv(file: string) {
  const filePath = path.join(process.cwd(), "public/data", file);
  const csv = fs.readFileSync(filePath, "utf8");
  return Papa.parse(csv, { header: true, skipEmptyLines: true }).data;
}

// 🔹 Écrire un CSV
async function writeCsv(file: string, data: any[]) {
  const filePath = path.join(process.cwd(), "public/data", file);
  const csv = Papa.unparse(data);
  fs.writeFileSync(filePath, csv, "utf8");
}

// 🔹 GET → lire le fichier
export async function GET(req: NextRequest) {
  const file = req.nextUrl.searchParams.get("file");
  if (!file) {
    return NextResponse.json({ error: "Paramètre 'file' manquant" }, { status: 400 });
  }
  const data = await readCsv(file);
  return NextResponse.json(data);
}

// 🔹 POST → écrire le fichier
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { file, data } = body;

  if (!file || !data) {
    return NextResponse.json({ error: "Paramètres 'file' et 'data' requis" }, { status: 400 });
  }

  await writeCsv(file, data);
  return NextResponse.json({ success: true });
}
