import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Authentification via service account (clé JSON)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    // Exemple : on récupère les évènements du calendrier principal sur 7 jours
    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);

    const res = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID, // ton ID de calendrier
      timeMin: now.toISOString(),
      timeMax: oneWeekLater.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    // Exemple de slots "libres" : ici on retourne simplement les events
    const slots = res.data.items
    ?.filter(event => event.summary === "Créneau libre")  // Filtre pour créneaux libres
    .map(event => ({
      id: event.id,
      start: event.start?.dateTime,
      end: event.end?.dateTime,
      summary: event.summary,
    }));

    return NextResponse.json({ slots });
  } catch (err) {
    console.error("❌ Google Calendar API error:", err);
    return NextResponse.json({ error: "Erreur Google Calendar" }, { status: 500 });
  }
}
