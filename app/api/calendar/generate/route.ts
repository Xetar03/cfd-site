import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);

    // Horaires de travail : 9h à 17h, slots de 2h
    const hours = [9, 11, 14, 16];

    const eventsToInsert = [];

    for (
      let d = new Date(now);
      d < oneWeekLater;
      d.setDate(d.getDate() + 1)
    ) {
      // uniquement en semaine
      if (d.getDay() === 0 || d.getDay() === 6) continue;

      for (let h of hours) {
        const start = new Date(d);
        start.setHours(h, 0, 0, 0);
        const end = new Date(start);
        end.setHours(h + 2);

        const event = {
          summary: "Créneau libre",
          description: "Disponible pour dépannage",
          start: { dateTime: start.toISOString(), timeZone: "Europe/Paris" },
          end: { dateTime: end.toISOString(), timeZone: "Europe/Paris" },
          colorId: "8",
        };

        eventsToInsert.push(event);
      }
    }

    // insérer les events dans Google Calendar
    for (const event of eventsToInsert) {
      await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID!,
        requestBody: event,
      });
    }

    return NextResponse.json({
      success: true,
      inserted: eventsToInsert.length,
    });
  } catch (err) {
    console.error("❌ Error generating slots:", err);
    return NextResponse.json(
      { error: "Erreur génération créneaux" },
      { status: 500 }
    );
  }
}
