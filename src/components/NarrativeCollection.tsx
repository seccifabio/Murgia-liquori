"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LiquidImage from "./LiquidImage";

interface Product {
  name: string;
  price: string;
  img: string;
  href: string;
}

interface NarrativeCollectionProps {
  isSealed: boolean;
  t: any;
  products: Product[];
}

export default function NarrativeCollection({ isSealed, t, products }: NarrativeCollectionProps) {
  return (
    <motion.div
      animate={{ opacity: isSealed ? 1 : 0 }}
      className={`absolute inset-0 z-30 flex flex-col items-center justify-center pt-24 pb-20 bg-primary transition-opacity duration-700 ${isSealed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      <header className="text-center mb-16 mt-10">
        <span className="text-noir font-heading text-xs md:text-sm tracking-[0.4em] uppercase underline decoration-noir/30 underline-offset-8 italic mb-4 block font-bold">
          {t.origins.products.title}
        </span>
      </header>

      <div className="grid grid-cols-3 gap-8 px-20 max-w-6xl w-full">
        {products.map((p, i) => (
          <Link key={p.name} href={p.href} className="group relative block cursor-pointer">
            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
              <div className="aspect-[4/5] max-h-[60vh] bg-noir rounded-[2vw] overflow-hidden relative border border-white/5 shadow-2xl">
                <LiquidImage src={p.img} alt={p.name} className="object-contain p-4" />
                <div className="absolute inset-x-0 bottom-6 text-center">
                  <h4 className="text-white font-heading text-2xl uppercase tracking-tighter">{p.name}</h4>
                  <p className="text-primary font-heading text-xl">{p.price}</p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
      
      <Link href="/la-collezione" className="murgia-btn-noir mt-12 px-16 py-6 text-sm tracking-[0.4em] transform hover:scale-105">
        <span className="murgia-btn-text">{t.origins.products.cta}</span>
        <ArrowRight className="murgia-btn-icon" />
        <div className="murgia-btn-hover-wipe" />
      </Link>
    </motion.div>
  );
}
