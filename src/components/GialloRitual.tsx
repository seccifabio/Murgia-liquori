"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/context/LanguageContext";
import { PRODUCTS_MANIFEST } from "@/manifest/products";

interface GialloRitualProps {
  livePrice?: number;
  liveName?: string;
}

export default function GialloRitual({ livePrice, liveName }: GialloRitualProps) {
  const { t } = useTranslation();
  const { addItem } = useCart();
  const [selectedFormat, setSelectedFormat] = useState("70cl");
  const [quantity, setQuantity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayPrice = livePrice || PRODUCTS_MANIFEST.giallo.price;
  const displayName = liveName || t.products.giallo.name;

  const handleAddToCart = () => {
    addItem({
      id: PRODUCTS_MANIFEST.giallo.id,
      name: displayName,
      price: `${displayPrice}€`,
      priceId: PRODUCTS_MANIFEST.giallo.priceId,
      quantity: quantity,
      format: selectedFormat,
      img: "/images/giallo_sovereign.png"
    });
  };


  // Section-aware scroll orchestration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Kinetic Scale Ritual: Arrive large (1.2), shrink to standard (1.0) on scroll
  const scale = useTransform(scrollYProgress, [0.2, 0.5], [1.2, 1.0]);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <section 
      ref={containerRef}
      className="bg-primary py-24 md:py-40 px-6 md:px-20 relative z-20 overflow-hidden"
    >
      
      {/* Background Graphic Element */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4 scale-150">
        <h2 className="font-heading text-[30rem] text-noir leading-none uppercase">{t.products.common.ritual}</h2>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 md:gap-20">
        
        {/* Narrative Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-10 relative z-10"
        >
          <span className="text-noir font-heading text-xl tracking-[0.5em] uppercase underline decoration-noir underline-offset-8">{t.products.common.ritual}</span>
          
          <p className="text-noir font-body text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed uppercase tracking-widest italic pt-8 border-t border-noir/10">
            {t.products.giallo.ritualDescription}
          </p>
        </motion.div>

        <motion.div
          style={{ scale }}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative md:absolute md:bottom-[-35px] md:right-0 z-20 pointer-events-none mt-6 md:mt-0"
        >
          <img 
            src="/images/giallo_sovereign.png" 
            alt="Murgia Giallo" 
            className="h-[40vh] md:h-[60vh] w-auto drop-shadow-[-40px_0_100px_rgba(0,0,0,0.6)] mx-auto" 
          />
        </motion.div>

        {/* Selection HUD & Conversion Anchor */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="w-full flex flex-col items-center gap-12 pt-10 md:pt-20"
        >
          {/* Variant Selectors */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Format Selection */}
            <div className="flex flex-col items-center gap-4">
              <span className="font-heading text-[10px] text-noir/40 tracking-widest uppercase italic">{t.products.common.selectFormat}</span>
              <div className="flex gap-2">
                {["50cl", "70cl"].map((size) => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedFormat(size)}
                    className={`px-6 py-3 border border-noir/10 font-heading text-xs tracking-widest uppercase transition-all ${selectedFormat === size ? "bg-noir text-primary" : "bg-transparent text-noir hover:bg-noir/5"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col items-center gap-4">
              <span className="font-heading text-[10px] text-noir/40 tracking-widest uppercase italic">{t.products.common.quantity}</span>
              <div className="flex items-center gap-6 border border-noir/10 px-6 py-3 bg-white/5">
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

          {/* Primary CTA */}
          <button 
            onClick={handleAddToCart}
            className="murgia-btn-noir px-20 py-8 md:px-32 transform hover:scale-105 active:scale-95"
          >
            <span className="murgia-btn-text">{t.products.common.addToCart} &mdash; &euro;{(displayPrice * quantity).toFixed(2)}</span>

            <div className="murgia-btn-hover-wipe" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
