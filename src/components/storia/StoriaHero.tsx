"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function StoriaHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textX = useTransform(scrollYProgress, [0, 1], [0, -2000]);
  const maskScale = useTransform(scrollYProgress, [0, 0.8], [1, 15]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-noir">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Archival Background Photo */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/storia/storia_origins_1882_1775937746086.png" 
            alt="Murgia 1882 Laboratory" 
            className="w-full h-full object-cover opacity-60 grayscale brightness-50"
          />
        </div>

        {/* 1882 Stencil Mask */}
        <motion.div 
          style={{ scale: maskScale, opacity }}
          className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none"
        >
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <mask id="storia-mask" maskUnits="userSpaceOnUse">
                <rect width="1000" height="1000" fill="white" />
                <text 
                  x="500" 
                  y="500" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="font-heading text-[250px] font-black italic" 
                  fill="black"
                >
                  1882
                </text>
              </mask>
            </defs>
            <rect width="1000" height="1000" fill="#F4B400" mask="url(#storia-mask)" />
          </svg>
        </motion.div>

        {/* Narrative Intro Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-20 left-12 md:left-24 z-20 max-w-xl"
        >
          <span className="text-primary font-heading text-xl tracking-[0.3em] uppercase mb-4 block underline decoration-primary/30 underline-offset-8">
            L&apos;Inizio del Rito
          </span>
          <h1 className="text-white font-heading text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.8]">
            La Storia <br/> <span className="opacity-40">Murgia.</span>
          </h1>
        </motion.div>
      </div>
    </div>
  );
}
