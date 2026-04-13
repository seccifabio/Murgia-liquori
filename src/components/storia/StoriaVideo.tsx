"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Play, X } from "lucide-react";

export default function StoriaVideo() {
  const [isRevealed, setIsRevealed] = useState(false);

  const videoId = "TpAl52rlf4s";
  // Sync mute state with reveal to allow audio when focused
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isRevealed ? "0" : "1"}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3`;

  return (
    <section className="relative h-[80vh] md:h-screen w-full bg-noir overflow-hidden border-t border-white/5">
      {/* Cinematic Youtube Backdrop */}
      <div className={`absolute inset-0 z-0 transition-all duration-1000 ${isRevealed ? "opacity-100 scale-100" : "opacity-60 grayscale scale-105"}`}>
        <div className="relative w-full h-full">
          <iframe
            key={isRevealed ? "revealed" : "background"}
            src={videoSrc}
            title="Murgia Cinema"
            className="w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            allow="autoplay; encrypted-media"
          />
        </div>
        
        {/* Archival Overlays - Dissolve when revealed */}
        <div className={`absolute inset-0 bg-noir/30 backdrop-blur-[2px] transition-opacity duration-1000 ${isRevealed ? "opacity-0" : "opacity-100"}`} />
        <div className={`absolute inset-0 bg-gradient-to-t from-noir via-transparent to-noir transition-opacity duration-1000 ${isRevealed ? "opacity-0" : "opacity-100"}`} />
      </div>

      {/* Narrative Overlay - Hide when revealed */}
      <AnimatePresence>
        {!isRevealed && (
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -40 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl"
            >
              <span className="text-primary font-heading text-xl md:text-2xl uppercase tracking-[0.6em] block mb-12 border-b border-primary/20 pb-8 inline-block">
                Visione Alchemica
              </span>
              <h2 className="text-white font-heading text-6xl md:text-[10rem] uppercase tracking-tighter italic leading-[0.8]">
                Vivere <br/> <span className="text-primary">l&apos;Essenza.</span>
              </h2>
              
              {/* Play Ritual Button */}
              <button 
                onClick={() => setIsRevealed(true)}
                className="mt-16 mx-auto group relative flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 blur-xl group-hover:bg-primary/40 transition-all duration-500" />
                <div className="relative flex items-center justify-center w-24 h-24 bg-primary rounded-full transition-transform duration-500 group-hover:scale-110">
                  <Play className="w-8 h-8 text-noir fill-noir ml-1" />
                </div>
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.6em] text-white/60 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500">
                  Inizia il Rito
                </span>
              </button>

              <div className="mt-24 flex items-center justify-center gap-12 opacity-40">
                <div className="h-px w-24 bg-white" />
                <span className="text-[10px] uppercase tracking-[1em] text-white">Murgia Cinema</span>
                <div className="h-px w-24 bg-white" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Close/Back Control - Manifest only when revealed */}
      <AnimatePresence>
        {isRevealed && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={() => setIsRevealed(false)}
            className="absolute top-12 right-12 z-50 flex items-center gap-4 group"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-white opacity-0 group-hover:opacity-100 transition-all duration-300">Chiudi Visione</span>
            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-noir/40 backdrop-blur-md group-hover:bg-white group-hover:border-white transition-all duration-300">
              <X className="w-5 h-5 text-white group-hover:text-noir transition-colors" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Corner Stencil Details */}
      <div className={`absolute bottom-12 left-12 z-20 hidden md:block transition-opacity duration-1000 ${isRevealed ? "opacity-0" : "opacity-100"}`}>
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-heading">Archivio Video</span>
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-heading">Ref: PV_001_1882</span>
        </div>
      </div>
    </section>
  );
}
