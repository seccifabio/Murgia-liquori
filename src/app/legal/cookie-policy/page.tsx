import React from "react";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-noir text-white pt-40 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <h1 className="font-heading text-6xl tracking-tighter uppercase text-primary italic">
          Cookie Policy
        </h1>
        
        <div className="prose prose-invert max-w-none font-body text-white/60 tracking-widest leading-loose uppercase text-xs">
          <p className="text-white/80 italic mb-8">Ultimo aggiornamento: Aprile 2026</p>
          
          <section className="space-y-4">
            <h2 className="text-white font-heading text-xl tracking-widest pt-8 border-t border-white/10">1. Introduzione</h2>
            <p>
              Questa Cookie Policy spiega come Murgia Liquori utilizza i cookie e tecnologie simili per riconoscerti quando visiti il nostro sito web. Spiega cosa sono queste tecnologie e perché le utilizziamo, nonché i tuoi diritti di controllarne l'uso.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white font-heading text-xl tracking-widest pt-8 border-t border-white/10">2. Cosa sono i cookie?</h2>
            <p>
              I cookie sono piccoli file di dati che vengono posizionati sul tuo computer o dispositivo mobile quando visiti un sito web. I cookie sono ampiamente utilizzati dai proprietari di siti web per far funzionare i loro siti, o per farli funzionare in modo più efficiente, nonché per fornire informazioni di reportistica.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white font-heading text-xl tracking-widest pt-8 border-t border-white/10">3. Perché utilizziamo i cookie?</h2>
            <p>
              Utilizziamo cookie di prima e terza parte per diversi motivi. Alcuni cookie sono necessari per motivi tecnici affinché il nostro sito web funzioni, e noi li chiamiamo cookie "essenziali" o "strettamente necessari". Altri cookie ci consentono inoltre di monitorare e indirizzare gli interessi dei nostri utenti per migliorare l'esperienza sulle nostre proprietà online.
            </p>
          </section>
          
          <section className="space-y-8 pt-12">
             <p className="italic border-l-2 border-primary pl-6">
               Questa pagina è attualmente in fase di redazione legale. Per informazioni specifiche, contattate info@murgialiquori.com
             </p>
          </section>
        </div>
      </div>
    </div>
  );
}
