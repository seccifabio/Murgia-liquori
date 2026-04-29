"use server";

import { Resend } from "resend";

export async function sendVisitRequest(formData: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { firstName, lastName, guests, email, phone } = formData;

  if (!email || !firstName) {
    throw new Error("Dati mancanti per la prenotazione della visita.");
  }

  try {
    const data = await resend.emails.send({
      from: "Murgia Distillery <info@murgialiquori.it>",
      to: ["info@murgialiquori.it"],
      subject: `Nuova Prenotazione Visita: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #000; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px; tracking-widest: 0.1em;">
            Richiesta Visita Distilleria
          </h2>
          <p style="margin-top: 20px;"><strong>Ospite:</strong> ${firstName} ${lastName}</p>
          <p><strong>Numero Persone:</strong> ${guests}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefono:</strong> ${phone || 'Non specificato'}</p>
          
          <div style="margin-top: 30px; background: #f9f9f9; padding: 15px; border-left: 4px solid #000;">
            <p>Questa richiesta è stata inviata tramite il rituale "Visit Us" del sito Murgia.</p>
          </div>
          
          <p style="font-size: 10px; color: #999; margin-top: 40px;">
            Murgia Liquori - Heritage Laboratory
          </p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error("Visit Booking Failure:", error);
    throw new Error(`Errore Invio: ${error.message}`);
  }
}
