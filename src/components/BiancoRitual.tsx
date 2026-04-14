"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/context/LanguageContext";

export default function BiancoRitual() {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const [selectedFormat, setSelectedFormat] = useState("70cl");
  const [quantity, setQuantity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => {
    addItem({
      id: "villacidro-bianco",
      name: t.products.bianco.name,
      price: "30€",
      priceId: "price_1TM24YIuoh35e3roTRK2zGbp",
      quantity: quantity,
      format: selectedFormat,
      img: "/images/bianco_product.png"
    });
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0.2, 0.5], [1.2, 1.0]);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <section 
      ref={containerRef}
      className="bg-white py-40 px-6 md:px-20 relative z-20 overflow-hidden"
    >
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4 scale-150">
        <h2 className="font-heading text-[30rem] text-noir leading-none uppercase">{t.products.common.ritual}</h2>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-10 relative z-10"
        >
          <span className="text-noir font-heading text-xl tracking-[0.5em] uppercase underline decoration-noir underline-offset-8">{t.products.common.ritual}</span>
          
          <p className="text-noir font-body text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed uppercase tracking-widest italic pt-8 border-t border-noir/10">
            {t.products.bianco.ritualDescription}
          </p>
        </motion.div>

        <motion.div
          style={{ scale }}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative md:absolute md:bottom-[-35px] md:right-0 z-20 pointer-events-none mt-10 md:mt-0"
        >
          <img 
            src="/images/bianco_product.png" 
            alt="Villacidro Bianco Murgia" 
            className="h-[40vh] md:h-[60vh] w-auto drop-shadow-[-40px_0_100px_rgba(0,0,0,0.6)] mx-auto" 
          />
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="w-full flex flex-col items-center gap-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex flex-col items-center gap-4">
              <span className="font-heading text-[10px] text-noir/40 tracking-widest uppercase italic">{t.products.common.selectFormat}</span>
              <div className="flex gap-2">
                {["50cl", "70cl"].map((size) => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedFormat(size)}
                    className={`px-6 py-3 border border-noir/10 font-heading text-xs tracking-widest uppercase transition-all ${selectedFormat === size ? "bg-noir text-white" : "bg-transparent text-noir hover:bg-noir/5"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <span className="font-heading text-[10px] text-noir/40 tracking-widest uppercase italic">{t.products.common.quantity}</span>
              <div className="flex items-center gap-6 border border-noir/10 px-6 py-3 bg-noir/5">
                <button 
                  onClick={decrement}
                  className="text-noir hover:text-noir/60 text-xl w-8 h-8 flex items-center justify-center transition-opacity"
                >
                  -
                </button>
                <span className="font-heading text-lg text-noir w-8 text-center tabular-nums">{quantity}</span>
                <button 
                  onClick={increment}
                  className="text-noir hover:text-noir/60 text-xl w-8 h-8 flex items-center justify-center transition-opacity"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="group relative px-20 py-8 md:px-32 overflow-hidden bg-noir text-white font-heading uppercase text-sm tracking-[0.4em] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black font-bold">{t.products.common.addToCart} &mdash; &euro;{(30 * quantity).toFixed(2)}</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
