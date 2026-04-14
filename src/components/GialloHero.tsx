"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "@/context/LanguageContext";

export default function GialloHero() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // TRANSFORMATIONS: The Cinematic Arrival
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-noir"
    >
      {/* Cinematic Video Layer */}
      <motion.div 
        style={{ scale: videoScale, opacity: videoOpacity }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-70"
        >
          <source src="/videos/giallo_product.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-noir/80 via-transparent to-noir" />
      </motion.div>

      {/* Narrative HUD */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 h-full flex flex-col items-center justify-start md:justify-center text-center px-6 pt-32 md:pt-0"
      >
        <h1 className="font-heading text-7xl md:text-[12rem] lg:text-[16rem] text-white uppercase tracking-tighter leading-[0.8] mb-6 drop-shadow-2xl overflow-hidden py-4">
          {"Villacidro".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: i * 0.05, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
          <br />
          {"Giallo".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-primary italic"
            >
              {char}
            </motion.span>
          ))}
        </h1>
        
        <p className="font-heading text-lg md:text-2xl text-white/40 tracking-[0.4em] uppercase italic">
          {t.products.giallo.heroTagline}
        </p>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center gap-4 text-primary"
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Hero Product Bottle - Stationary Anchor */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
        className="absolute bottom-[5%] md:bottom-[-2%] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[-2%] z-20 pointer-events-none"
      >
        <img 
          src="/images/giallo_sovereign.png" 
          alt="Villacidro Giallo Murgia" 
          className="h-[40vh] md:h-[60vh] w-auto drop-shadow-[-40px_0_100px_rgba(0,0,0,0.6)]"
        />
      </motion.div>
    </section>
  );
}
