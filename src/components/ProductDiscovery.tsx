"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";
import LaunchBanner from "./LaunchBanner";

export default function ProductDiscovery({ exclude }: { exclude?: string }) {
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

  // Filtering the current product and showing the other two in a 50/50 split architecture
  const filteredProducts = PRODUCTS.filter(p => p.displayName !== exclude).slice(0, 2);

  return (
    <div className="flex flex-col w-full bg-noir overflow-hidden">
      {/* Cinematic Phase: The Extended Discovery (Collection + New Arrival) */}
      <section className="bg-noir w-full pb-20 pt-10 flex flex-col relative z-[100]">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col items-center">
          <span className="text-white/40 font-heading text-xl tracking-[0.5em] uppercase italic mb-4">
            {t.products.common.otherProducts}
          </span>
        </div>

        {/* Compact New Product Arrival Manifest */}
        <div className="w-full">
          <LaunchBanner variant="discovery" />
        </div>

        <div className="flex flex-col md:flex-row w-full">
          {filteredProducts.map((product, i) => (
            <Link 
              key={product.displayName} 
              href={product.href} 
              className="relative flex-1 group h-[500px] md:h-[800px] overflow-hidden block bg-white/[0.05] border-r border-white/5 last:border-r-0"
            >
              {/* Static High-Fidelity Preview Ritual */}
              <div className="w-full h-full relative p-12 flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-[60%] md:h-[80%] object-contain grayscale group-hover:grayscale-0 transition-all duration-1000 transform group-hover:scale-110"
                />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-sm">
                   <motion.h4 
                     initial={{ y: 20, opacity: 0 }}
                     whileInView={{ y: 0, opacity: 1 }}
                     className="text-white font-heading text-4xl lg:text-7xl uppercase tracking-tighter leading-none"
                   >
                     {product.name}
                   </motion.h4>
                   <span className="text-primary font-heading text-xs tracking-[0.4em] uppercase mt-4">
                     {t.products.common.discover}
                   </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
