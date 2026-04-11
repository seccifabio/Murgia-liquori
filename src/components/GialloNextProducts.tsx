"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const PRODUCTS = [
  {
    name: "Murgia Bianco",
    image: "/images/products/bianco.png",
    href: "/shop/murgia-bianco"
  },
  {
    name: "Villacidro Giallo",
    image: "/images/giallo_sovereign.png",
    href: "/shop/villacidro-giallo"
  },
  {
    name: "La Sbagliata",
    image: "/images/products/sbagliata.png",
    href: "/shop/la-sbagliata"
  }
];

export default function GialloNextProducts({ exclude }: { exclude?: string }) {
  const filteredProducts = PRODUCTS.filter(p => p.name !== exclude).slice(0, 2);

  return (
    <section className="bg-noir w-full py-20 flex flex-col md:flex-row relative z-[100] border-t border-white/10">
      {filteredProducts.map((product, i) => (
        <Link 
          key={product.name} 
          href={product.href} 
          className="relative flex-1 group h-[500px] md:h-[800px] overflow-hidden block bg-white/[0.05] border border-white/5"
        >
          {/* Static High-Fidelity Preview */}
          <div className="w-full h-full relative p-12">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
               <h4 className="text-white font-heading text-4xl lg:text-7xl uppercase tracking-tighter leading-none">{product.name}</h4>
               <span className="text-primary font-heading text-xs tracking-[0.4em] uppercase mt-4">Scopri Collezione</span>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
