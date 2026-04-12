"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SuccessPage() {
  const { clearCart } = useCart();

  // Liquidation Ritual: Clear the bag after a successful alchemical conversion
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <main className="bg-noir min-h-screen">
      <Navbar />
      
      <section className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center text-center">
        {/* Decorative Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 space-y-12 max-w-2xl"
        >
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="font-heading text-6xl md:text-8xl uppercase tracking-tighter leading-none">
              Ordine <br /> <span className="text-primary italic">Confermato</span>
            </h1>
            <p className="font-body text-white/40 text-lg md:text-xl uppercase tracking-[0.2em] leading-relaxed">
              La tua selezione Murgia è ora in fase di preparazione nel nostro laboratorio di Villacidro. Riceverai presto i dettagli della spedizione.
            </p>
          </div>

          <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-8">
            <Link 
              href="/"
              className="group flex items-center gap-4 text-primary font-heading uppercase text-sm tracking-[0.4em]"
            >
              <span className="border-b border-primary/20 group-hover:border-primary pb-1 transition-all">Torna alla Home</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
