"use client";

import Footer from "@/components/Footer";
import StoriaHero from "@/components/storia/StoriaHero";
import StoriaShutter from "@/components/storia/StoriaShutter";
import ShippingRitual from "@/components/storia/ShippingRitual";
import { motion } from "framer-motion";

export default function StoriaPage() {
  return (
    <main className="bg-noir min-h-screen">
      
      {/* Cinematic Hero Stencil */}
      <StoriaHero />

      <StoriaShutter />
      
      {/* The Fulfillment Manifest: Horizontal Kinetic Journey */}
      <ShippingRitual />

      {/* Closing Manifesto Ritual: Full-Stage Takeover */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative min-h-[80vh] md:min-h-screen w-full flex flex-col items-center justify-center overflow-hidden my-20 md:my-0"
      >
        {/* Archival Backdrop Manifest */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            src="/images/storia/murgia_bianco_storia-1024x622.webp" 
            alt="La Tradizione Continua" 
            className="w-full h-full object-cover grayscale brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-noir/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-noir" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 max-w-5xl px-6 text-center"
        >
          <h2 className="text-white font-heading text-6xl md:text-[10rem] uppercase tracking-tighter leading-[0.8] mb-12 italic">
            La Tradizione <br/> <span className="text-primary">Continua.</span>
          </h2>
          <div className="space-y-8">
            <span className="text-white font-heading text-xl md:text-2xl uppercase tracking-[0.4em] block">Quinta Generazione</span>
            <p className="text-white/70 font-body text-xl md:text-3xl max-w-4xl mx-auto leading-relaxed border-t border-white/10 pt-12 italic uppercase tracking-widest">
              Alessandro e Francesca Murgia rilanciano l&apos;azienda di famiglia con una visione contemporanea. Oggi la produzione continua fedele alle antiche ricette del 1882, portando sul mercato l&apos;eccellenza dell&apos;alchimia sarda contemporanea.
            </p>
          </div>
        </motion.div>

      </motion.section>

      <Footer />
    </main>
  );
}
