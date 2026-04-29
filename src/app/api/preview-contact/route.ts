import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
      <h2 style="color: #000; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px;">
        Messaggio dal Sito Murgia
      </h2>
      <p style="margin-top: 20px;"><strong>Mittente:</strong> Luigi Bianchi</p>
      <p><strong>Email:</strong> luigi.bianchi@example.com</p>
      
      <div style="margin-top: 30px; background: #f9f9f9; padding: 15px; border-left: 4px solid #000;">
        <p><strong>Messaggio:</strong></p>
        <p>Buongiorno, vorrei ricevere maggiori informazioni sulla vostra collezione storica e sulla disponibilità dei pezzi rari.</p>
      </div>
      
      <p style="font-size: 10px; color: #999; margin-top: 40px;">
        Inviato tramite la pagina Contatti di Murgia Liquori
      </p>
    </div>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
