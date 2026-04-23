import React from "react";
import Footer from "@/components/Footer";

export default function UnifiedLegalPage() {
  return (
    <main className="bg-noir min-h-screen pt-40 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="font-heading text-6xl md:text-8xl uppercase mb-12 text-primary italic">Note Legali & Privacy</h1>
        
        <div className="space-y-20 font-body text-white/60 tracking-widest leading-loose uppercase text-sm mb-32">
          {/* Privacy Section */}
          <section id="privacy">
            <h2 className="text-white text-2xl font-heading mb-6">01. Privacy Policy</h2>
            <p className="mb-4">Informazioni sul trattamento dei dati personali ai sensi del GDPR.</p>
            <p>[Placeholder for Murgia Liquori Privacy Content]</p>
          </section>

          {/* Cookie Section */}
          <section id="cookies">
            <h2 className="text-white text-2xl font-heading mb-6">02. Cookie Policy</h2>
            <p className="mb-4">Informazioni sull'utilizzo dei cookie su questo sito.</p>
            <p>[Placeholder for Murgia Liquori Cookie Content]</p>
          </section>

          {/* Terms Section */}
          <section id="terms">
            <h2 className="text-white text-2xl font-heading mb-6">03. Termini di Servizio</h2>
            <p className="mb-4">Condizioni d'uso del sito e termini di vendita.</p>
            <p>[Placeholder for Murgia Liquori Terms & Conditions]</p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
