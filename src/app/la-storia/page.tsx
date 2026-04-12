"use client";

import Footer from "@/components/Footer";
import StoriaHero from "@/components/storia/StoriaHero";
import StoriaShutter from "@/components/storia/StoriaShutter";
import { motion } from "framer-motion";

export default function StoriaPage() {
  return (
    <main className="bg-noir min-h-screen">
      
      {/* Cinematic Hero Stencil */}
      <StoriaHero />

      {/* Narrative Chronology Loop */}
      <StoriaShutter />

      {/* Closing Manifesto Ritual: Full-Stage Takeover */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Archival Backdrop Manifest */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/storia/murgia_bianco_storia-1024x622.webp" 
            alt="La Tradizione Continua" 
            className="w-full h-full object-cover grayscale brightness-75"
          />
          <div className="absolute inset-0 bg-noir/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-noir/40" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-5xl px-6 text-center"
        >
          <span className="text-primary font-heading text-xl tracking-[0.4em] uppercase mb-10 block">Il Manifesto</span>
          <h2 className="text-white font-heading text-6xl md:text-9xl uppercase tracking-tighter leading-none mb-12 italic">
            La Tradizione <br/> <span className="text-primary">Continua.</span>
          </h2>
          <p className="text-white/70 font-body text-xl md:text-3xl max-w-4xl mx-auto leading-relaxed border-t border-white/10 pt-12 italic uppercase tracking-widest">
            Oggi la produzione continua fedele alle <span className="bg-primary text-noir px-2 py-0.5 not-italic">antiche ricette del 1882</span>, mantenendo viva una <span className="bg-primary text-noir px-2 py-0.5 not-italic">visione secolare</span> per le <span className="bg-primary text-noir px-2 py-0.5 not-italic">generazioni future</span>.
          </p>
        </motion.div>

      </section>

      <Footer />
    </main>
  );
}
