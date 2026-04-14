"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export default function FactoryVisitBanner() {
  const { setIsVisitDrawerOpen, isMenuOpen } = useCart();
  const pathname = usePathname();

  // Visibility Manifest: Only on "Dove Ci Trovi" page
  const isEligiblePage = pathname === "/dove-ci-trovi";

  if (!isEligiblePage || isMenuOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setIsVisitDrawerOpen(true)}
        className="bg-noir border-b border-white/10 w-full h-[var(--banner-height)] px-6 flex items-center justify-center gap-4 cursor-pointer group relative overflow-hidden z-[10002]"
      >
        <div className="flex items-center gap-6 md:gap-12 text-white overflow-hidden whitespace-nowrap">
          {/* Core Proposal */}
          <span className="font-heading text-[10px] md:text-base tracking-[0.2em] uppercase font-bold">
            Vieni a scoprire l&apos;alchimia: <span className="text-white/60 hidden md:inline">Visita la nostra distilleria storica</span>
          </span>

          <div className="h-4 w-px bg-white/10 hidden md:block" />

          {/* Date Manifest */}
          <div className="flex items-center gap-2">
            <span className="font-heading text-xs md:text-sm tracking-[0.2em] uppercase text-primary font-bold">
              Prossima Data: 21 Aprile
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-white/10 pl-4 md:pl-8 ml-2 md:ml-4">
          <div className="flex items-center gap-3">
            <span className="font-heading text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40">Da &euro;15</span>
            <span className="font-heading text-xs md:text-sm uppercase tracking-[0.3em] font-bold group-hover:text-primary transition-colors">Prenota Visita</span>
          </div>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 group-hover:text-primary transition-all" />
        </div>

        {/* Cinematic Scanline Effect Layer */}
        <div className="absolute inset-0 bg-white/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
