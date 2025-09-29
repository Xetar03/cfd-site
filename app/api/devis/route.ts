// app/api/devis/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const { operation, name, firstName, phone, email, message, callback } = body;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // ← adresse test fournie
      to: "contact@falow-energie.fr",
      subject: `Nouvelle demande de devis — ${operation}`,
      html: `
        <h2>Nouvelle demande de devis</h2>
        <p><strong>Opération :</strong> ${operation}</p>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Prénom :</strong> ${firstName}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
        <p><strong>Être rappelé :</strong> ${callback ? "✅ Oui" : "❌ Non"}</p>
      `,
    });


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Erreur envoi mail :", error);
    return NextResponse.json({ error: "Erreur envoi mail" }, { status: 500 });
  }
}
