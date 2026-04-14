"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/context/LanguageContext";
import { VISIT_MANIFEST } from "@/manifest/visit";

export default function VisitBanner() {
  const { setIsVisitOpen, isMenuOpen, isBagOpen, isVisitOpen } = useCart();
  const pathname = usePathname();
  const { language } = useTranslation();

  const manifest = VISIT_MANIFEST[language];

  // Visibility Manifest: Only on "Dove Ci Trovi" page and when no taking-overs are active
  const isEligiblePage = pathname === "/dove-ci-trovi";

  // Temporal Gate: Hide if today is the visit date or has passed, or if inactive
  const visitDate = new Date(`${VISIT_MANIFEST.date}T00:00:00`);
  const isExpired = new Date().getTime() >= visitDate.getTime();
  const isInactive = !VISIT_MANIFEST.active;

  if (!isEligiblePage || isMenuOpen || isBagOpen || isVisitOpen || isExpired || isInactive) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setIsVisitOpen(true)}
        className="bg-noir border-b border-white/10 w-full min-h-[52px] md:h-[52px] py-4 md:py-0 px-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 cursor-pointer group relative overflow-hidden z-[10002]"
      >
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-12 text-white">
          {/* Core Proposal */}
          <span className="font-heading text-[10px] md:text-sm lg:text-base tracking-[0.2em] uppercase font-bold text-center">
            {manifest.title}: <span className="text-white/60 hidden md:inline">{manifest.subtitle}</span>
          </span>

          <div className="h-4 w-px bg-white/10 hidden md:block" />

          {/* Combined Manifest: Date + Price + CTA */}
          <div className="flex items-center gap-4 md:gap-8">
            <span className="font-heading text-xs md:text-sm tracking-[0.2em] uppercase text-primary font-bold">
              {manifest.displayDate}
            </span>
            
            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-3">
              <span className="font-heading text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40">{language === "it" ? "Da" : "From"} &euro;{VISIT_MANIFEST.price}</span>
              <span className="font-heading text-xs md:text-base uppercase tracking-[0.3em] font-bold group-hover:text-primary transition-colors">{manifest.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 group-hover:text-primary transition-all" />
            </div>
          </div>
        </div>

        {/* Cinematic Scanline Effect Layer */}
        <div className="absolute inset-0 bg-white/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-700 pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
