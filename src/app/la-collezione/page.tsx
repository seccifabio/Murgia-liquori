"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import LiquidImage from "@/components/LiquidImage";
import LaunchBanner from "@/components/LaunchBanner";
import { useTranslation } from "@/context/LanguageContext";

const products = [
  { name: "Murgia Bianco", price: "24€", img: "/images/bianco_product.png", href: "/shop/murgia-bianco" },
  { name: "Villacidro Giallo", price: "26€", img: "/images/giallo.webp", href: "/shop/villacidro-giallo" },
  { name: "La Sbagliata", price: "15€", img: "/images/sbagliata_product.png", href: "/shop/la-sbagliata" },
];

export default function ProdottiPage() {
  const { t } = useTranslation();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { y: 40, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <main className="bg-primary min-h-screen">
      
      <section className="relative pt-32 md:pt-48 pb-20 px-6 md:px-20 overflow-hidden">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-7xl mx-auto"
        >
          {/* Symmetrical Header */}
          <motion.div
            variants={item}
            className="text-center mb-8"
          >
            <h2 className="text-noir font-heading text-5xl md:text-8xl tracking-tight block uppercase mb-4 leading-none italic">
              {t.collection.title}
            </h2>
          </motion.div>

          {/* The Exact Homepage Grid Manifest */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {products.map((p, i) => (
              <Link 
                key={p.name}
                href={p.href}
                className="group relative block cursor-pointer"
              >
                <motion.div variants={item}>
                  <div className="aspect-[4/5] max-h-[55vh] mx-auto bg-noir rounded-[2vw] overflow-hidden transition-all duration-700 relative border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                    <div className="w-full h-full rounded-[2vw] overflow-hidden">
                      <LiquidImage src={p.img} alt={p.name} />
                    </div>
                    
                    {/* Atmospheric Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent pointer-events-none z-10 rounded-[2vw] opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                    
                    {/* Typographic Labeling */}
                    <div className="absolute bottom-10 left-8 right-8 pointer-events-none text-center z-20">
                      <h4 className="text-white font-heading text-3xl uppercase tracking-tighter mb-2 transform group-hover:-translate-y-2 transition-transform duration-500">{p.name}</h4>
                      <p className="text-primary font-heading text-xl opacity-80">{p.price}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

      </section>

      {/* Global Manifest: New Artifact Reveal */}
      <LaunchBanner />

      <Footer />
    </main>
  );
}
