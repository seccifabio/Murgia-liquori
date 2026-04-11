"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
  {
    id: 1,
    name: "Villacidro Giallo",
    type: "Liquore Storico",
    price: "€28,00",
    color: "#F4B400",
  },
  {
    id: 2,
    name: "Villacidro Bianco",
    type: "Liquore d'Erbe",
    price: "€26,00",
    color: "#FFFFFF",
  },
  {
    id: 3,
    name: "Amaro Murgia",
    type: "Digestivo",
    price: "€32,00",
    color: "#4A2A1A",
  },
];

export default function ProductGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 md:px-20 bg-primary text-noir z-[500]"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-40%" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div>
              <span className="font-heading text-xs tracking-[0.4em] uppercase mb-4 block">
                La Collezione
              </span>
              <h2 className="font-heading text-6xl md:text-8xl uppercase leading-none">
                L&apos;Oro di <br /> Villacidro
              </h2>
            </div>
            <p className="font-body text-sm uppercase tracking-widest max-w-xs opacity-70">
              Un ventaglio di sfumature alchemiche, distillate con la stessa passione dal 1882.
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {PRODUCTS.map((product, index) => (
            <Link 
              key={product.id} 
              href={index === 0 ? "/shop/villacidro-giallo" : "/shop"}
              className="group cursor-pointer block"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-20%", once: true }}
                transition={{ 
                  duration: 1.2, 
                  delay: index * 0.15,
                  ease: [0.215, 0.61, 0.355, 1] 
                }}
              >
                <div className="aspect-[3/4] bg-noir/5 mb-8 relative overflow-hidden rounded-[1vw] group-hover:bg-noir/10 transition-all duration-700">
                  <img 
                    src={index === 0 ? "/images/giallo.webp" : `https://images.unsplash.com/photo-1592318963503-61a7a008c266?auto=format&fit=crop&q=80&w=800`} 
                    alt={product.name} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000 p-8"
                  />
                  <div className="absolute top-6 left-6 font-heading text-xs opacity-30">0{index + 1}</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-noir/10 pb-4">
                    <h4 className="font-heading text-3xl uppercase tracking-tighter">{product.name}</h4>
                    <span className="font-heading text-xl">{product.price}</span>
                  </div>
                  <div className="flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="font-body text-xs uppercase tracking-widest">{product.type}</span>
                    <ArrowRight className="w-4 h-4 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
