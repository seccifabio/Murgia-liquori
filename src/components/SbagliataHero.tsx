"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SbagliataHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

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
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/videos/sbagliata.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-noir/80 via-transparent to-noir" />
      </motion.div>

      {/* Narrative HUD */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-primary font-heading text-xs tracking-[0.6em] uppercase mb-4"
        >
          Edizione Limitata & Numerata
        </motion.span>
        
        <h1 className="font-heading text-6xl md:text-[10rem] lg:text-[14rem] text-white uppercase tracking-tighter leading-[0.8] mb-6 drop-shadow-2xl overflow-hidden py-4">
          {"La".split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: i * 0.05, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-4"
            >
              {char}
            </motion.span>
          ))}
          <br />
          {"Sbagliata".split("").map((char, i) => (
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
          Omaggio all&apos;Imperfezione
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
        initial={{ y: 80, opacity: 0, x: 50 }}
        animate={{ y: 0, opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1 }}
        className="absolute bottom-[-5%] right-[5%] z-20 pointer-events-none hidden md:block"
      >
        <img 
          src="/images/products/sbagliata.png" 
          alt="La Sbagliata Villacidro Murgia" 
          className="h-[75vh] w-auto drop-shadow-[-40px_0_100px_rgba(0,0,0,0.8)]"
        />
      </motion.div>

      {/* Numbering Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-20 left-10 md:left-20 z-20"
      >
        <div className="border border-primary/30 p-4 backdrop-blur-md">
          <span className="text-primary font-heading text-[10px] tracking-widest block uppercase opacity-60">Status</span>
          <span className="text-white font-heading text-xl uppercase tracking-tighter italic">200 Bottles Only</span>
        </div>
      </motion.div>
    </section>
  );
}
