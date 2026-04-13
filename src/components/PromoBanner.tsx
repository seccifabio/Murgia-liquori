"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);
  const { setAppliedCode, isBannerVisible, setIsBannerVisible, isMenuOpen } = useCart();
  const pathname = usePathname();
  const promoCode = "MURGIA1882";

  // Visibility Manifest: Only on Home and Product pages
  const isEligiblePage = pathname === "/" || pathname?.includes("/shop/");

  // Hide on restricted pages or when menu/takeovers are manifest
  if (!isEligiblePage || isMenuOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setAppliedCode(promoCode);
    
    // Slide out ritual after short delay to let user see "COPIATO"
    setTimeout(() => {
      setIsBannerVisible(false);
    }, 1200);
  };

  if (!isEligiblePage) return null;

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="bg-primary w-full h-[var(--banner-height)] px-6 flex items-center justify-center gap-4 cursor-pointer group relative overflow-hidden z-[10002]"
          onClick={handleCopy}
        >
          <div className="flex items-center gap-4 text-black overflow-hidden whitespace-nowrap">
            {/* Mobile Manifest: Minimalist frequency */}
            <span className="font-heading text-xs tracking-[0.2em] uppercase font-bold md:hidden">
              SCONTO 10% &mdash; 
            </span>

            {/* Desktop Manifest: Editorial depth */}
            <span className="font-heading text-sm tracking-[0.3em] uppercase font-bold hidden md:inline">
              OFFERTA ESCLUSIVA DISPONIBILE &mdash; USA IL CODICE:
            </span>

            <div className="bg-black text-primary px-3 py-1 font-heading text-sm md:text-base tracking-[0.2em] font-black italic rounded-sm transition-transform duration-500 group-hover:scale-110 flex items-center gap-2">
              <span className="md:hidden text-[10px] opacity-70 not-italic">CODICE:</span>
              {promoCode}
            </div>

            <span className="font-heading text-[10px] md:text-sm tracking-[0.3em] uppercase font-bold hidden md:inline">
              PER IL 10% DI SCONTO SULLA TUA COLLEZIONE
            </span>
          </div>

          <div className="flex items-center gap-2 border-l border-black/10 pl-4 ml-2">
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span className="font-heading text-[10px] uppercase tracking-widest font-bold">COPIATO!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4 group-hover:scale-120 transition-transform" />
                  <span className="font-heading text-[10px] uppercase tracking-widest font-bold hidden md:inline">CLICCA PER COPIARE</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Alchemical Shine Effect */}
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
