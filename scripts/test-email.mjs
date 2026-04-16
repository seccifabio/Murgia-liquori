import { Resend } from 'resend';
import fs from 'node:fs/promises';
import path from 'node:path';

// Note: Run this with 'node --env-file=.env.local scripts/test-email.mjs'
const resend = new Resend(process.env.RESEND_API_KEY);
const targetEmail = process.argv[2];

if (!targetEmail) {
  console.error("❌ Errore: Devi fornire un indirizzo email. Esempio: node scripts/test-email.mjs info@murgialiquori.com");
  process.exit(1);
}

async function sendTest() {
  console.log(`[ALCHEMY] Iniziando la trasmissione verso: ${targetEmail}...`);
  
  try {
    const templatePath = path.join(process.cwd(), 'src/templates/OrderConfirmation.html');
    let htmlContent = await fs.readFile(templatePath, 'utf-8');

    // MOCK DATA
    htmlContent = htmlContent
      .replace("{{ORDER_ID}}", "TEST-ALCH-2026")
      .replace("{{PRODUCT_NAME}}", "Murgia Giallo — Artifact")
      .replace("{{PRODUCT_PRICE}}", "42.00€")
      .replace("{{TOTAL_AMOUNT}}", "42.00€");

    const { data, error } = await resend.emails.send({
      from: 'Murgia Liquori <onboarding@resend.dev>',
      to: targetEmail,
      subject: 'L’Evoluzione del Rito — Test di Consegna',
      html: htmlContent,
    });

    if (error) {
      return console.error("❌ Trasmissione fallita:", error);
    }

    console.log("✅ Trasmissione completata con successo! ID:", data.id);
    console.log("Controlla la tua casella di posta (e lo spam) verso: ", targetEmail);
  } catch (err) {
    console.error("❌ Errore durante il rituale:", err);
  }
}

sendTest();
