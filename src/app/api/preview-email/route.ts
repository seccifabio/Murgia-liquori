import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const templatePath = path.join(process.cwd(), 'src/templates/OrderConfirmation.html');
    const html = fs.readFileSync(templatePath, 'utf8');
    
    // Replace placeholders with mock data for preview
    const previewHtml = html
      .replace(/{{HERO_TITLE}}/g, 'L\'Arte della Distillazione')
      .replace(/{{HERO_SUBTITLE}}/g, 'Un pezzo della nostra storia sta per unirsi alla tua collezione.')
      .replace(/{{ORDER_REF_LABEL}}/g, 'Riferimento Ordine')
      .replace(/{{ORDER_ID}}/g, 'MURGIA-2024-XP')
      .replace(/{{PRODUCT_NAME}}/g, 'VILLACIDRO GIALLO')
      .replace(/{{PRODUCT_PRICE}}/g, '€48.00')
      .replace(/{{TOTAL_AMOUNT_LABEL}}/g, 'Totale')
      .replace(/{{TOTAL_AMOUNT}}/g, '€60.00')
      .replace(/{{SHIPPING_DEST_LABEL}}/g, 'Destinazione')
      .replace(/{{CUSTOMER_NAME}}/g, 'Gennaro Murgia')
      .replace(/{{SHIPPING_ADDRESS}}/g, 'Via Parrocchia 29, Villacidro (SU)')
      .replace(/{{CROSS_TITLE}}/g, 'Non Solo Liquore')
      .replace(/{{CROSS_TEXT}}/g, 'Scopri le nostre creazioni sartoriali.')
      .replace(/{{CROSS_CTA}}/g, 'Vedi Collezione')
      .replace(/{{SUPPORT_TEXT}}/g, 'Hai bisogno di supporto?')
      .replace(/{{CONTACT_TEXT}}/g, 'Scrivici a')
      .replace(/{{PHONE_NUMBER}}/g, '+39 3791781417')
      .replace(/{{FOOTER_NOTE}}/g, 'Villacidro Liquori © 2024')
      .replace(/{{BASE_URL}}/g, '');

    return new NextResponse(previewHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }
}
