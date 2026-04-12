"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";

export default function SbagliataRitual() {
  const { addItem } = useCart();
  const [selectedFormat, setSelectedFormat] = useState("50cl");
  const [quantity, setQuantity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => {
    addItem({
      id: "la-sbagliata",
      name: "La Sbagliata",
      price: "15€",
      priceId: "price_sbagliata_123",
      quantity: quantity,
      format: selectedFormat,
      img: "/images/products/sbagliata.png"
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
      className="bg-primary py-40 px-6 md:px-20 relative z-20 overflow-hidden"
    >
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4 scale-150">
        <h2 className="font-heading text-[30rem] text-noir leading-none uppercase italic">ERROR</h2>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center gap-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-10 relative z-10"
        >
          <span className="text-noir font-heading text-xl tracking-[0.5em] uppercase underline decoration-noir underline-offset-8">Limited Ritual</span>
          <p className="text-noir font-body text-lg md:text-2xl max-w-4xl mx-auto leading-relaxed uppercase tracking-widest italic pt-8 border-t border-noir/10">
            &quot;Un omaggio all&apos;imperfezione che diventa arte.&quot; <br/>
            La Sbagliata è un viaggio nel gusto stratificato del Villacidro Giallo, reso unico da una storia di artigianalità e autenticità sarda. Solo per pochi collezionisti.
          </p>
        </motion.div>

        {/* Manifestation Ritual */}
        <motion.div
          style={{ scale }}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="absolute bottom-[-60px] right-0 z-20 pointer-events-none"
        >
          <img 
            src="/images/products/sbagliata.png" 
            alt="La Sbagliata Villacidro Murgia" 
            className="h-[50vh] md:h-[70vh] w-auto drop-shadow-[-40px_0_100px_rgba(0,0,0,0.6)]" 
          />
        </motion.div>

        {/* Selection HUD */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="w-full flex flex-col items-center gap-12 pt-20"
        >
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex flex-col items-center gap-4">
              <span className="font-heading text-[10px] text-noir/40 tracking-widest uppercase italic font-bold">Collector&apos;s Edition</span>
              <div className="flex gap-2">
                {["50cl"].map((size) => (
                  <button 
                    key={size} 
                    className="px-6 py-3 border border-noir text-noir font-heading text-xs tracking-widest uppercase bg-noir text-primary"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <span className="font-heading text-[10px] text-noir/40 tracking-widest uppercase italic font-bold">Quantity</span>
              <div className="flex items-center gap-6 border border-noir/20 px-6 py-3 bg-white/5">
                <button onClick={decrement} className="text-noir hover:text-noir/60 text-xl w-8 h-8 flex items-center justify-center">-</button>
                <span className="font-heading text-lg text-noir w-8 text-center tabular-nums">{quantity}</span>
                <button onClick={increment} className="text-noir hover:text-noir/60 text-xl w-8 h-8 flex items-center justify-center">+</button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className="group relative px-20 py-8 md:px-32 overflow-hidden bg-noir text-primary hover:text-noir font-heading uppercase text-sm tracking-[0.4em] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="relative z-10">Aggiungi al carrello &mdash; &euro;{(15 * quantity).toFixed(2)}</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
