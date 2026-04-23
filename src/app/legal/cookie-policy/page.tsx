import React from "react";
import Footer from "@/components/Footer";

export default function UnifiedLegalPage() {
  return (
    <main className="bg-noir min-h-screen pt-40 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="font-heading text-6xl md:text-8xl uppercase mb-12 text-primary italic">Note Legali & Privacy</h1>
        
          {/* Privacy Section */}
          <section id="privacy">
            <h2 className="text-white text-2xl font-heading mb-6">01. Privacy Policy</h2>
            <div className="space-y-6 text-white/60 tracking-wider leading-relaxed text-base md:text-lg">
              <p>Il Titolare del trattamento è Murgia Liquori, con sede in Villacidro, Sardegna. Per qualsiasi informazione relativa al trattamento dei dati, potete contattarci all'indirizzo email dedicato.</p>
              <p>Raccogliamo i dati necessari per l'elaborazione dei vostri ordini (Nome, Indirizzo, Email) e per garantire la sicurezza del sito. I dati di pagamento sono gestiti esclusivamente tramite la piattaforma Stripe, garantendo i massimi standard di sicurezza PCI-DSS.</p>
              <p>I vostri diritti includono l'accesso ai dati, la rettifica, la cancellazione e la portabilità, esercitabili in qualsiasi momento tramite comunicazione scritta.</p>
            </div>
          </section>

          {/* Cookie Section */}
          <section id="cookies" className="mt-20">
            <h2 className="text-white text-2xl font-heading mb-6">02. Cookie Policy</h2>
            <div className="space-y-6 text-white/60 tracking-wider leading-relaxed text-base md:text-lg">
              <p>Utilizziamo esclusivamente cookie tecnici necessari al corretto funzionamento del sito e del carrello acquisti, e cookie analitici anonimizzati per comprendere come migliorare l'esperienza utente.</p>
              <p>Non utilizziamo cookie di profilazione di terze parti senza il vostro esplicito consenso, espresso tramite il banner di benvenuto.</p>
            </div>
          </section>

          {/* Terms Section */}
          <section id="terms" className="mt-20 mb-32">
            <h2 className="text-white text-2xl font-heading mb-6">03. Termini di Servizio</h2>
            <div className="space-y-6 text-white/60 tracking-wider leading-relaxed text-base md:text-lg">
              <p>L'accesso e l'acquisto di alcolici su questo sito sono strettamente riservati ai maggiori di 18 anni. Effettuando un ordine, dichiarate di aver raggiunto l'età legale per il consumo di alcolici nel vostro paese di residenza.</p>
              <p>Diritto di Recesso: Ai sensi del Codice del Consumo, avete il diritto di recedere dal contratto entro 14 giorni dal ricevimento della merce. Per motivi igienici e di protezione della salute, il recesso è applicabile solo a prodotti con sigillo di garanzia integro.</p>
              <p>Garanzia Legale: Tutti i nostri prodotti sono coperti dalla garanzia legale di conformità prevista dagli articoli 128 e seguenti del Codice del Consumo.</p>
            </div>
          </section>
      </div>
      <Footer />
    </main>
  );
}
