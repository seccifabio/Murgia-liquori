"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight, Edit3, Check, MousePointer2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import EmbeddedStripeCheckout from "./EmbeddedStripeCheckout";
import { MARKETING_MANIFEST } from "@/manifest/marketing";
import { useTranslation } from "@/context/LanguageContext";


import BasketItem from "./BasketItem";
import BasketPromo from "./BasketPromo";

export default function BasketDrawer() {
  const { t, language } = useTranslation();
  const { 
    isBagOpen, 
    setIsBagOpen, 
    items, 
    updateItem, 
    removeItem, 
    clearCart, 
    total, 
    appliedCode, 
    setAppliedCode, 
    discount, 
    shipping, 
    finalTotal 
  } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Scroll Lockdown Ritual
  useEffect(() => {
    if (isBagOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isBagOpen]);

  const handleCheckout = async () => {
    if (isLoading || items.length === 0) return;
    setShowCheckout(true);
  };

  return (
    <AnimatePresence>
      {isBagOpen && (
        <>
          {/* Backdrop: Alchemical Shadow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsBagOpen(false)}
            className="fixed inset-0 bg-noir/80 backdrop-blur-sm z-[10000]"
          />

          {/* Drawer: The Basket Terminal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-[#0A0A0A] border-l border-white/5 z-[10001] flex flex-col shadow-2xl"
          >
            {/* Header: Identity */}
            <div className="p-8 pt-20 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-heading text-xl tracking-widest uppercase mb-0.5">{t.bag.title}</h2>
              </div>
              <button
                onClick={() => setIsBagOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors group relative z-10"
              >
                <X className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
              </button>
            </div>


            {/* List: Artifact Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-white/30" />
                  </div>
                  <p className="font-heading text-sm tracking-[0.3em] uppercase text-white/40">
                    {t.bag.empty}
                  </p>
                  <Link
                    href="/la-collezione"
                    onClick={() => setIsBagOpen(false)}
                    className="text-primary font-heading text-xs tracking-widest uppercase border-b border-primary/20 pb-1 hover:border-primary transition-all cursor-pointer"
                  >
                    {t.bag.shop}
                  </Link>
                </div>
              ) : (
                <>
                  {items.map((item) => (
                    <BasketItem 
                      key={`${item.id}-${item.format}`} 
                      item={item} 
                      t={t} 
                      updateItem={updateItem} 
                      removeItem={removeItem} 
                    />
                  ))}

                  <div className="pt-10 flex justify-center">
                    <button 
                      onClick={clearCart}
                      className="group flex items-center gap-3 text-white/40 hover:text-red-500 transition-all font-heading text-[10px] tracking-[0.4em] uppercase"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="border-b border-transparent group-hover:border-red-500/50 pb-0.5 transition-all">{t.bag.clear}</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Footer: Collective Total & Conversion */}
            {items.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-noir/50 backdrop-blur-xl space-y-6">
                <BasketPromo 
                  t={t} 
                  total={total} 
                  appliedCode={appliedCode} 
                  setAppliedCode={setAppliedCode} 
                  discount={discount} 
                  shipping={0} 
                />

                <button 
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className={`w-full murgia-btn-primary py-8 text-sm tracking-[0.2em] md:tracking-[0.4em] transform hover:scale-[1.02] active:scale-95 ${isLoading ? "opacity-70 cursor-wait" : ""}`}
                >
                  <span className="murgia-btn-text px-4">
                    {isLoading ? t.bag.loading : `${t.bag.checkout} — €${(total - discount).toFixed(2)}`}
                  </span>
                  {!isLoading && <ArrowRight className="murgia-btn-icon" />}
                  {isLoading && <Loader2 className="w-5 h-5 animate-spin relative z-10" />}
                  <div className="murgia-btn-hover-wipe" />
                </button>
                
              </div>
            )}

            {/* Checkout Overlay: The Payment Ritual */}
            <AnimatePresence>
              {showCheckout && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute inset-0 z-[10002] bg-primary flex flex-col overflow-y-auto custom-scrollbar"
                >
                  <EmbeddedStripeCheckout 
                    items={items} 
                    appliedCode={appliedCode}
                    locale={language}
                    onClose={() => setShowCheckout(false)} 
                    onSuccess={() => {
                      clearCart();
                      setIsBagOpen(false);
                      setShowCheckout(false);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
