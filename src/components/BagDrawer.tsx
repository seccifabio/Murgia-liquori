"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { useEffect } from "react";

export default function BagDrawer() {
  const { isBagOpen, setIsBagOpen, items, updateItem, removeItem, clearCart, total } = useCart();

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

          {/* Drawer: The Bag Terminal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-[#0A0A0A] border-l border-white/5 z-[10001] flex flex-col shadow-2xl"
          >
            {/* Header: Identity */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-heading text-xl tracking-widest uppercase">La Tua Bag</h2>
              </div>
              <button
                onClick={() => setIsBagOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
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
                    La tua collezione è vuota
                  </p>
                  <button
                    onClick={() => setIsBagOpen(false)}
                    className="text-primary font-heading text-xs tracking-widest uppercase border-b border-primary/20 pb-1 hover:border-primary transition-all"
                  >
                    Scopri i prodotti
                  </button>
                </div>
              ) : (
                <>
                  {items.map((item) => (
                    <div key={`${item.id}-${item.format}`} className="flex gap-6 group relative">
                      <div className="relative w-28 h-36 bg-white/5 rounded-lg overflow-hidden border border-white/5 flex-shrink-0">
                        <Image
                          src={item.img}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-heading text-xl uppercase tracking-tight leading-tight max-w-[200px]">{item.name}</h4>
                            <button
                              onClick={() => removeItem(item.id, item.format)}
                              className="text-white/40 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Interactive Configurator */}
                          <div className="space-y-4">
                            {/* Format Toggle */}
                            <div className="flex flex-col gap-2">
                              <span className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold">Formato</span>
                              <div className="flex gap-2">
                                {["50cl", "70cl"].map((size) => (
                                  <button
                                    key={size}
                                    onClick={() => updateItem(item.id, item.format, { format: size })}
                                    className={`px-3 py-1 text-[10px] font-heading uppercase tracking-widest border transition-all ${
                                      item.format === size 
                                        ? "bg-primary text-black border-primary font-bold" 
                                        : "bg-transparent text-white/60 border-white/10 hover:border-white/20"
                                    }`}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Quantity Action */}
                            <div className="flex flex-col gap-2">
                              <span className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold">Quantità</span>
                              <div className="flex items-center gap-4 border border-white/10 w-fit px-2 py-1 bg-white/[0.02]">
                                <button 
                                  onClick={() => item.quantity > 1 && updateItem(item.id, item.format, { quantity: item.quantity - 1 })}
                                  className="text-white/60 hover:text-white transition-colors w-6 h-6 flex items-center justify-center font-heading"
                                >
                                  -
                                </button>
                                <span className="font-heading text-lg min-w-[20px] text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateItem(item.id, item.format, { quantity: item.quantity + 1 })}
                                  className="text-white/60 hover:text-white transition-colors w-6 h-6 flex items-center justify-center font-heading"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
                          <span className="text-primary font-heading text-lg">{item.price}</span>
                          <span className="text-white/40 text-[9px] uppercase tracking-widest italic font-bold">Subtotale: &euro;{(parseFloat(item.price.replace("€", "")) * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-10 flex justify-center">
                    <button 
                      onClick={clearCart}
                      className="group flex items-center gap-3 text-white/40 hover:text-red-500 transition-all font-heading text-[10px] tracking-[0.4em] uppercase"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="border-b border-transparent group-hover:border-red-500/50 pb-0.5 transition-all">Svuota Carrello</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Footer: Collective Total & Conversion */}
            {items.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-noir/50 backdrop-blur-xl">
                <button className="w-full group relative py-8 overflow-hidden bg-primary text-black font-heading uppercase text-sm tracking-[0.4em] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4">
                  <span className="relative z-10 font-bold">Procedi al Pagamento &mdash; &euro;{total.toFixed(2)}</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                
                <p className="mt-6 text-center text-white/40 font-heading text-[9px] tracking-[0.2em] uppercase italic leading-relaxed max-w-[300px] mx-auto">
                  Tasse e spedizione calcolate al checkout. <br/>
                  Spedizione gratuita in tutta Italia.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
