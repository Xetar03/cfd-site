import { google } from "googleapis";
import { NextResponse } from "next/server";

// Mapping operation → couleur
const operationColors: Record<string, string> = {
  "Dépannage-chaudiere": "1",   /*/ bleu
  "Installation": "2", // vert
  "Entretien": "7",    // orange
  "Inspection": "3",   // violet*/
};


function getCalendar() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return google.calendar({ version: "v3", auth });
}


async function findEventBySlot(
  slot: string,
  options?: { summaryFilter?: string; toleranceMs?: number }
) {
  const calendar = getCalendar();

  const start = new Date(slot); // "+02:00" est géré correctement par Date
  const tolerance = options?.toleranceMs ?? 60_000; // 60 secondes
  const timeMin = new Date(start.getTime() - tolerance).toISOString();
  const timeMax = new Date(start.getTime() + tolerance).toISOString();

  const res = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 50,
    // Astuce: si tu sais que c'est un "Créneau libre", tu peux filtrer côté API :
    // q: options?.summaryFilter,
  });

  const items = res.data.items ?? [];

  // Important : ne compare pas les strings (décalage de fuseau possible),
  // compare les timestamps numériques.
  const targetTs = start.getTime();

  const match = items.find((e) => {
    const evStartStr = e.start?.dateTime ?? e.start?.date; // (date si "journée entière")
    if (!evStartStr) return false;
    const evTs = new Date(evStartStr).getTime();

    const sameStart = evTs === targetTs; // début EXACT au même instant
    const summaryOk = options?.summaryFilter
      ? e.summary === options.summaryFilter
      : true;

    return sameStart && summaryOk;
  });

  return match ?? null;
}

async function deleteEventBySlot(
  slot: string,
  options?: { summaryFilter?: string; toleranceMs?: number }
) {
  const calendar = getCalendar();
  const event = await findEventBySlot(slot, options);
  if (!event || !event.id) {
    return { deleted: false, reason: "not_found" as const };
  }

  await calendar.events.delete({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    eventId: event.id,
  });

  return { deleted: true as const, eventId: event.id };
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, address, slot, operation, description } = body;

    if (!name || !phone || !slot) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Auth Google
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });
    
    console.log(deleteEventBySlot(slot))

    // Création de l’événement
    const event = {
      summary: `🔧 Dépannage - ${name}`,
      description: `operation: ${operation || "Non précisé"}\nNom: ${name}\nTel: ${phone}\nAdresse: ${address || "Non précisée"}\nDescription: ${description || "Non précisée"}`,
      start: { dateTime: slot, timeZone: "Europe/Paris" },
      end: {
        dateTime: new Date(new Date(slot).getTime() + 60 * 60 * 1000).toISOString(),
        timeZone: "Europe/Paris",
      },
      colorId: "1",
    };

    await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID!,
      requestBody: event,
    });

    return NextResponse.json({ success: true, message: "Réservation confirmée ✅" });
  } catch (err: any) {
    console.error("❌ Booking error:", err);
    return NextResponse.json({ error: "Erreur lors de la réservation" }, { status: 500 });
  }
}
