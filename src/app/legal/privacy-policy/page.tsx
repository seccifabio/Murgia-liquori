import React from "react";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-noir min-h-screen pt-40 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-white">
        <h1 className="font-heading text-6xl md:text-8xl uppercase mb-12 text-primary italic">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none font-body text-white/60 tracking-widest leading-loose uppercase text-sm">
          <p className="mb-8">[Placeholder for Murgia Liquori Privacy Policy]</p>
          <p>La tua privacy è fondamentale per noi. Questa pagina conterrà i dettagli su come trattiamo i tuoi dati nel rispetto della normativa vigente.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
