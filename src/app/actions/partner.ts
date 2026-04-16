"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPartnerRequest(formData: any) {
  const { name, city, shopType, phone, email, message } = formData;

  if (!email || !name) {
    throw new Error("Dati mancanti per la manifestazione d'interesse.");
  }

  try {
    const data = await resend.emails.send({
      from: "Murgia Heritage <onboarding@resend.dev>", // Transition to custom domain after verification
      to: ["murglialiquori@gmail.com"],
      subject: `Nuova Manifestazione d'Interesse: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #F4B400; text-transform: uppercase; border-bottom: 2px solid #F4B400; padding-bottom: 10px;">
            Richiesta Partnership Murgia Liquori
          </h2>
          <p style="margin-top: 20px;"><strong>Partner:</strong> ${name}</p>
          <p><strong>Città:</strong> ${city}</p>
          <p><strong>Tipologia Attività:</strong> ${shopType}</p>
          <p><strong>Telefono:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 30px; background: #f9f9f9; padding: 15px; border-left: 4px solid #F4B400;">
            <p><strong>Messaggio:</strong></p>
            <p>${message}</p>
          </div>
          <p style="font-size: 10px; color: #999; margin-top: 40px;">
            Inviato tramite il portale Murgia Heritage Laboratory
          </p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error("Partner Manifestation Failure:", error);
    throw new Error(`Errore Invio: ${error.message}`);
  }
}
