"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

import { useTranslation } from "@/context/LanguageContext";

export default function CartToast() {
  const { showToast, setIsBagOpen } = useCart();
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          onClick={() => setIsBagOpen(true)}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[11000] cursor-pointer"
        >
          <div className="bg-noir border border-primary/20 backdrop-blur-md px-8 py-5 flex items-center gap-6 shadow-2xl relative group overflow-hidden">
            {/* Cinematic Progress Bar (3s) */}
            <motion.div 
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3, ease: "linear" }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
            />

            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="w-5 h-5 text-primary" />
            </div>

            <div className="flex flex-col">
              <span className="text-white font-heading text-sm tracking-[0.2em] uppercase">{t.bag.added}</span>
              <span className="text-white/40 font-heading text-[10px] tracking-[0.1em] uppercase mt-0.5">{t.bag.expanded}</span>
            </div>

            <div className="ml-4 border-l border-white/10 pl-6 flex items-center gap-2 group-hover:text-primary transition-colors">
              <span className="font-heading text-xs tracking-widest uppercase">{t.bag.view}</span>
              <ShoppingBag className="w-4 h-4" />
            </div>
            
            {/* Alchemical Glow */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
