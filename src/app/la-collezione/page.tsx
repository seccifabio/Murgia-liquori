"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import LiquidImage from "@/components/LiquidImage";

const products = [
  { name: "Murgia Bianco", price: "24€", img: "/images/products/bianco.png", href: "/shop/murgia-bianco" },
  { name: "Murgia Giallo", price: "26€", img: "/images/giallo.webp", href: "/shop/villacidro-giallo" },
  { name: "La Sbagliata", price: "15€", img: "/images/products/sbagliata.png", href: "/shop/la-sbagliata" },
];

export default function ProdottiPage() {
  return (
    <main className="bg-noir min-h-screen">
      <Navbar />
      
      <section className="relative pt-48 pb-32 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Symmetrical Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <span className="text-primary font-heading text-xl tracking-widest block uppercase mb-6">La Collezione Murgia</span>
            <div className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent mx-auto" />
          </motion.div>

          {/* The Exact Homepage Grid Manifest */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {products.map((p, i) => (
              <Link 
                key={p.name}
                href={p.href}
                className="group relative block cursor-pointer"
              >
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  <div className="aspect-[4/5] max-h-[65vh] bg-noir/40 rounded-[2vw] overflow-hidden transition-all duration-700 relative border border-white/5 group-hover:border-primary/30">
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
