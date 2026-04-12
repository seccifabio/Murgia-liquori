"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import LiquidImage from "./LiquidImage";
import Link from "next/link";

export default function NarrativeFlow() {
  const containerRef = useRef<HTMLElement>(null);
  const [isSealed, setIsSealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // COLLECTION TRIGGER: Reveal the curated product stage sooner
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Cross-fade reveal: accelerated for faster flow
    if (latest > 0.70) setIsSealed(true);
    else if (latest < 0.68) setIsSealed(false);
  });

  // NARRATIVE PAUSE: Momentary stop remaining consistent
  useEffect(() => {
    if (isSealed) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 1500);
      return () => {
        document.body.style.overflow = "auto";
        clearTimeout(timer);
      };
    }
  }, [isSealed]);

  // NARRATIVE PACING: Accelerated Thresholds
  // Phase 1 (Origins): Sweeps out upwards sooner
  const section1Clip = useTransform(scrollYProgress, [0.15, 0.25], ["inset(0% 0 0% 0)", "inset(0% 0 100% 0)"]);
  
  // Phase 2 (Giallo): Sweeps in from bottom, holds until accelerated reveal (0.75)
  const section2Clip = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], ["inset(100% 0 0 0)", "inset(0% 0 0 0)", "inset(0% 0 0 0)", "inset(100% 0 0 0)"]);
  
  // Alchemical Atmosphere: Accelerated
  const liquidGold = useTransform(scrollYProgress, [0, 0.2, 0.7, 0.75], ["rgba(244, 180, 0, 0)", "rgba(244, 180, 0, 0.4)", "rgba(244, 180, 0, 0.4)", "rgba(244, 180, 0, 0)"]);

  const products = [
    { name: "Murgia Bianco", price: "24€", img: "/images/products/bianco.png", href: "/shop/murgia-bianco" },
    { name: "Murgia Giallo", price: "26€", img: "/images/giallo.webp", href: "/shop/villacidro-giallo" },
    { name: "La Sbagliata", price: "15€", img: "/images/products/sbagliata.png", href: "/shop/la-sbagliata" },
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[400vh] bg-noir z-10"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-32 pb-20 px-6 md:px-20">
        
        {/* ── NARRATIVE STAGE ───────────────────────────────────────── */}
        <div className="flex-1 relative z-10">
          
          {/* Phase 1: L'Arte della Distillazione */}
          <motion.div
            style={{ clipPath: section1Clip }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-noir"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full">
              <div className="space-y-6">
                <span className="text-primary font-heading text-xl tracking-widest block uppercase">Le Origini</span>
                <h2 className="text-white font-heading text-4xl md:text-8xl leading-[1.1] md:leading-none uppercase">
                  L&apos;Arte della <br /> <span className="text-primary italic">Distillazione</span>
                </h2>
                <p className="text-white/60 font-body text-lg max-w-md leading-relaxed">
                  Dal 1882, trasformiamo i frutti della terra sarda in essenze immortali. 
                  Un rito che si tramanda, goccia dopo goccia.
                </p>
              </div>
              <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 0.35], [50, -50]) }}
                className="aspect-[4/5] max-h-[60vh] relative overflow-hidden rounded-[2vw] border border-white/10"
              >
                <LiquidImage src="/images/products/bianco.png" alt="Murgia Heritage Still" />
              </motion.div>
            </div>
          </motion.div>

          {/* Phase 2: Il Colore della Storia */}
          <motion.div
            style={{ clipPath: section2Clip }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-noir"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full">
              <div className="space-y-6">
                <span className="text-primary font-heading text-xl tracking-widest block uppercase underline decoration-primary underline-offset-8">Villacidro Murgia</span>
                <h2 className="text-white font-heading text-4xl md:text-8xl leading-[1.1] md:leading-none uppercase">
                  Il Colore <br /> della <span className="text-primary italic">Storia</span>
                </h2>
                <p className="text-white/60 font-body text-lg max-w-md leading-relaxed italic">
                  Zafferano, Anice e Segreti di Famiglia. <br/>
                  Il sapore autentico di una Sardegna che non smette di sognare.
                </p>
              </div>
              <motion.div
                style={{ y: useTransform(scrollYProgress, [0.35, 0.8], [50, -50]) }}
                className="aspect-[4/5] max-h-[60vh] relative overflow-hidden rounded-[2vw] border border-white/10"
              >
                <LiquidImage src="/images/giallo.webp" alt="Villacidro Giallo Murgia" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── ALCHEMICAL CURTAIN (z-20) ────────────────────────────── */}
        <motion.div
          initial={false}
          animate={{ height: isSealed ? "51%" : "0%" }}
          className="absolute top-0 left-0 w-full bg-primary z-20"
        />
        <motion.div
          initial={false}
          animate={{ height: isSealed ? "51%" : "0%" }}
          className="absolute bottom-0 left-0 w-full bg-primary z-20"
        />

        {/* ── THE COLLECTION REVEAL (z-30) ─────────────────────────── */}
        {isSealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-start lg:justify-center pt-24 pb-20 overflow-y-auto"
          >
            <header className="text-center mb-10 mt-10">
              <span className="text-noir font-heading text-xl tracking-widest block uppercase">La Collezione Murgia</span>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20 max-w-6xl w-full">
              {products.map((p, i) => (
                <Link 
                  key={p.name}
                  href={p.href}
                  className="group relative block cursor-pointer"
                >
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="aspect-[4/5] max-h-[55vh] bg-noir rounded-[2vw] overflow-hidden transition-all relative">
                      <div className="w-full h-full rounded-[2vw] overflow-hidden">
                        <LiquidImage src={p.img} alt={p.name} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent pointer-events-none z-10 rounded-[2vw]" />
                      <div className="absolute bottom-6 left-6 right-6 pointer-events-none text-center z-20">
                        <h4 className="text-white font-heading text-xl uppercase tracking-tighter mt-[100px]">{p.name}</h4>
                        <p className="text-primary font-heading text-lg">{p.price}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            
            <Link href="/la-collezione" className="group relative mt-12 px-16 py-6 overflow-hidden bg-noir text-primary hover:text-noir font-heading uppercase text-sm tracking-[0.4em] transition-all transform hover:scale-105 active:scale-95 z-40 block">
              <span className="relative z-10">Vedi i prodotti</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </Link>
          </motion.div>
        )}

      </div>
    </motion.section>
  );
}
