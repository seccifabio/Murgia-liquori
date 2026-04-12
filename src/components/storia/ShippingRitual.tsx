"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STAGES = [
  {
    id: "preparing",
    title: "Laboratory Preparing",
    description: "Ogni goccia viene distillata e perfezionata nel nostro laboratorio di Villacidro, seguendo i protocolli alchemici del 1882.",
    img: "/images/storia/shipping_ritual_lab_preparing.png",
    metric: "Alchimia Certificata"
  },
  {
    id: "sealing",
    title: "Hand-Applied Seal",
    description: "L'autenticità viene sigillata manualmente. Un rito di certificazione che garantisce l'integrità di ogni singolo artefatto Murgia.",
    img: "/images/storia/shipping_ritual_hand_seal.png",
    metric: "Sigillo di Garanzia"
  },
  {
    id: "dispatch",
    title: "Archival Dispatch",
    description: "L'ordine lascia il laboratorio in un vessel protettivo tech-noir, pronto per completare il suo viaggio verso la tua collezione.",
    img: "/images/storia/shipping_ritual_dispatch.png",
    metric: "Spedizione Tracciata"
  }
];

export default function ShippingRitual() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Kinetic Horizontal Traversal: Map vertical scroll to horizontal x translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-noir">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Header Ritual */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            className="font-heading text-[10px] tracking-[0.8em] uppercase text-white"
          >
            Fulfillment Ritual
          </motion.span>
        </div>

        {/* Horizontal Manifestation Vessel */}
        <motion.div style={{ x }} className="flex h-full w-[300vw]">
          {STAGES.map((stage, i) => (
            <div 
              key={stage.id} 
              className="relative w-screen h-full flex items-center justify-center px-6 md:px-20"
            >
              {/* Background Archival Asset */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={stage.img} 
                  alt={stage.title} 
                  className="w-full h-full object-cover grayscale brightness-[0.3]" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-noir via-transparent to-noir" />
              </div>

              {/* Content Terminal */}
              <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-heading text-primary text-2xl tracking-tighter">0{i + 1}</span>
                    <div className="h-px w-12 bg-primary/30" />
                    <span className="font-heading text-[10px] tracking-[0.4em] uppercase text-white/40 italic">{stage.metric}</span>
                  </div>
                  
                  <h3 className="font-heading text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.85] text-white italic">
                    {stage.title.split(' ')[0]} <br/> 
                    <span className="text-primary">{stage.title.split(' ')[1]}</span>
                  </h3>
                  
                  <p className="font-body text-white/60 text-lg md:text-2xl uppercase tracking-[0.2em] leading-relaxed max-w-xl border-l border-white/10 pl-8">
                    {stage.description}
                  </p>
                </motion.div>

                {/* Focus Artifact Image */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-square md:aspect-[4/5] bg-white/5 rounded-2xl overflow-hidden shadow-2xl group border border-white/5"
                >
                  <img 
                    src={stage.img} 
                    alt={stage.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
                </motion.div>
              </div>

              {/* Fractional Navigation Gauge */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
                {STAGES.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1 transition-all duration-500 ${i === idx ? "w-12 bg-primary" : "w-4 bg-white/10"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
