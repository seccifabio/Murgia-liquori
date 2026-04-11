"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#000000] text-white py-40 px-6 overflow-hidden border-t border-white/5">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-7xl mx-auto flex flex-col items-center"
      >
        {/* BRAND CROWN: Centered Identity */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="font-heading text-8xl md:text-[14rem] text-primary tracking-tighter leading-none mb-6">
            MURGIA
          </h2>
          <p className="font-heading text-xl md:text-3xl tracking-[0.3em] uppercase italic text-white/40">
            L&apos;Arte della Distillazione in Sardegna
          </p>
        </motion.div>

        {/* UTILITY GRID: Centered Info */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-20 text-center md:text-left mb-24 items-start justify-center w-full max-w-4xl">
          <div className="flex-1 space-y-6">
            <h4 className="font-heading text-xs tracking-widest text-primary uppercase">Contatti</h4>
            <div className="space-y-2 font-body text-sm tracking-widest text-white/30 uppercase leading-loose">
              <p>Email: murglialiquori@gmail.com</p>
              <p>Tel: +39 070 931 52 09</p>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <h4 className="font-heading text-xs tracking-widest text-primary uppercase">Social</h4>
            <div className="flex flex-col gap-2 font-body text-sm tracking-widest text-white/30 uppercase leading-loose">
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">Facebook</a>
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            <h4 className="font-heading text-xs tracking-widest text-primary uppercase">Sede</h4>
            <div className="space-y-2 font-body text-sm tracking-widest text-white/30 uppercase leading-loose">
              <p>Via Nazionale 213</p>
              <p>09039 Villacidro (SU)</p>
            </div>
          </div>
        </motion.div>

        {/* METADATA: Centered row above line */}
        <motion.div variants={itemVariants} className="w-full flex flex-col items-center gap-8 mb-12">
           <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-[10px] tracking-[0.5em] text-white/20 uppercase">
                P.IVA: 00065810921 — © 2024 Murgia Liquori
              </p>
              <p className="text-[10px] tracking-[0.4em] text-white/10 uppercase">
                Gennaro Murgia eredi Alessandro Pietro Murgia S.a.s
              </p>
           </div>
           
           <div className="w-full h-px bg-white/5" />
        </motion.div>

        {/* BACK TO TOP: Centered Bridge */}
        <motion.div variants={itemVariants} className="pt-8">
          <button 
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-4 text-primary transition-transform hover:-translate-y-2 duration-500"
          >
            <span className="font-heading text-[10px] tracking-[0.5em] uppercase text-primary/40 group-hover:text-primary">Tornas&ugrave;</span>
            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors duration-500">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </motion.div>

      </motion.div>
    </footer>
  );
}
