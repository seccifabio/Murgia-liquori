import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
      <h2 style="color: #000; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px; letter-spacing: 0.1em;">
        Richiesta Visita Distilleria
      </h2>
      <p style="margin-top: 20px;"><strong>Ospite:</strong> Mario Rossi</p>
      <p><strong>Numero Persone:</strong> 4</p>
      <p><strong>Email:</strong> mario.rossi@example.com</p>
      <p><strong>Telefono:</strong> +39 333 1234567</p>
      
      <div style="margin-top: 30px; background: #f9f9f9; padding: 15px; border-left: 4px solid #000;">
        <p>Questa richiesta è stata inviata tramite il rituale "Visit Us" del sito Murgia.</p>
      </div>
      
      <p style="font-size: 10px; color: #999; margin-top: 40px;">
        Murgia Liquori - Heritage Laboratory
      </p>
    </div>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
