"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function GialloNextProducts({ exclude }: { exclude?: string }) {
  const { t } = useTranslation();

  const PRODUCTS = [
    {
      name: t.products.bianco.name,
      image: "/images/products/bianco.png",
      href: "/shop/murgia-bianco",
      displayName: "Murgia Bianco"
    },
    {
      name: t.products.giallo.name,
      image: "/images/giallo_sovereign.png",
      href: "/shop/villacidro-giallo",
      displayName: "Villacidro Giallo"
    },
    {
      name: t.products.sbagliata.name,
      image: "/images/products/sbagliata.png",
      href: "/shop/la-sbagliata",
      displayName: "La Sbagliata"
    }
  ];

  const filteredProducts = PRODUCTS.filter(p => p.displayName !== exclude).slice(0, 2);

  return (
    <section className="bg-noir w-full py-20 flex flex-col relative z-[100]">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center">
        <span className="text-primary font-heading text-xl tracking-[0.5em] uppercase italic mb-4">
          {t.products.common.otherProducts}
        </span>
      </div>

      <div className="flex flex-col md:flex-row w-full">
      {filteredProducts.map((product, i) => (
        <Link 
          key={product.displayName} 
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
               <span className="text-primary font-heading text-xs tracking-[0.4em] uppercase mt-4">{t.products.common.discover}</span>
            </div>
          </div>
        </Link>
      ))}
      </div>
    </section>
  );
}
