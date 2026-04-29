"use server";

import { Resend } from "resend";

export async function sendContactRequest(formData: any) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, message } = formData;

  if (!email || !name) {
    throw new Error("Dati mancanti per la richiesta di contatto.");
  }

  try {
    const data = await resend.emails.send({
      from: "Murgia Contact <info@murgialiquori.it>",
      to: ["info@murgialiquori.it"],
      subject: `Nuovo Messaggio Contatti: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #000; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px;">
            Messaggio dal Sito Murgia
          </h2>
          <p style="margin-top: 20px;"><strong>Mittente:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          
          <div style="margin-top: 30px; background: #f9f9f9; padding: 15px; border-left: 4px solid #000;">
            <p><strong>Messaggio:</strong></p>
            <p>${message}</p>
          </div>
          
          <p style="font-size: 10px; color: #999; margin-top: 40px;">
            Inviato tramite la pagina Contatti di Murgia Liquori
          </p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error: any) {
    console.error("Contact Transmission Failure:", error);
    throw new Error(`Errore Invio: ${error.message}`);
  }
}
