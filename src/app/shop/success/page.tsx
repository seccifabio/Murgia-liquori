"use client";

import { useEffect, useState, Suspense } from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Package, Tag, Loader2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { getCheckoutSession } from "@/app/actions/stripe";
import Image from "next/image";

// Asset Manifest for Transparent Artifacts
const productImages: Record<string, string> = {
  "Villacidro Giallo": "/images/giallo_bottle.png",
  "Murgia Bianco": "/images/products/bianco.png",
  "La Sbagliata": "/images/products/sbagliata.png",
};

function SuccessContent() {
  const { clearCart, items, setIsBagOpen, setIsBannerVisible } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Purge the manifestation of the global promo banner
    setIsBannerVisible(false);

    // Only clear if the ritual was successful and items remain in the manifest
    if (items.length > 0) {
      clearCart();
      setIsBagOpen(false);
    }


    
    if (sessionId) {
      getCheckoutSession(sessionId)
        .then(setSession)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId, clearCart, items.length]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 w-full max-w-6xl space-y-16"
    >
      {/* Header Ritual */}
      <div className="text-center space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 relative">
            <CheckCircle2 className="w-10 h-10 text-primary" />
            <motion.div 
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border border-primary/40" 
            />
          </div>
        </motion.div>

        <div className="space-y-4">
          <h1 className="font-heading text-6xl md:text-8xl uppercase tracking-tighter leading-none">
            Grazie per <br /> <span className="text-primary italic">Il Tuo Ordine</span>
          </h1>
          <p className="font-body text-white/40 text-[10px] md:text-xs uppercase tracking-[0.4em]">
            Identificativo Rituale: #{sessionId?.slice(-8).toUpperCase() || "RITUAL-XXXX"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        {/* Order Summary Manifest */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/5 p-8 md:p-12 space-y-10 flex flex-col justify-between">
          <div className="space-y-10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-6">
              <Package className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-xl tracking-widest uppercase">Riepilogo Alchimia</h3>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                <p className="font-heading text-[10px] tracking-widest uppercase text-white/40">Recupero dati rituale...</p>
              </div>
            ) : session ? (
              <div className="space-y-8">
                <div className="space-y-6">
                  {session.line_items?.data.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-start group">
                      <div className="space-y-1">
                        <p className="font-heading text-primary text-xl tracking-wider uppercase">
                          {item.description}
                        </p>
                        <p className="font-body text-[10px] text-white/30 uppercase tracking-[0.2em]">
                          Quantità: {item.quantity}
                        </p>
                      </div>
                      <p className="font-heading text-white/80 text-lg">
                        €{(item.amount_total / 100).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                  <p className="font-heading text-[10px] text-white/40 uppercase tracking-[0.3em]">Totale Transazione</p>
                  <p className="font-heading text-4xl text-primary">
                    €{(session.amount_total / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-white/40 italic">Dettagli rituale non disponibili.</p>
            )}

            {/* Customer Identity Manifest */}
            {session?.customer_details && (
              <div className="space-y-6 pt-10 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="font-heading text-[10px] text-white/40 uppercase tracking-[0.3em]">Cliente</p>
                    <p className="font-heading text-xl text-white/90 tracking-wide uppercase">
                      {session.customer_details.name}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-heading text-[10px] text-white/40 uppercase tracking-[0.3em]">Identificativo Digitale</p>
                    <p className="font-body text-xs text-white/50 tracking-widest break-all">
                      {session.customer_details.email}
                    </p>
                  </div>
                </div>

                {/* Shipping Manifest */}
                {session?.shipping_details && (
                  <div className="space-y-4 pt-6 border-t border-white/5">
                    <div className="space-y-1">
                      <p className="font-heading text-[10px] text-white/40 uppercase tracking-[0.3em]">Destinazione Rituale</p>
                      <div className="font-body text-[10px] md:text-xs text-white/50 space-y-1 tracking-[0.2em] leading-relaxed uppercase">
                        <p className="text-white/80 font-heading tracking-widest">{session.shipping_details.name}</p>
                        <p>{session.shipping_details.address.line1}</p>
                        {session.shipping_details.address.line2 && <p>{session.shipping_details.address.line2}</p>}
                        <p>
                          {session.shipping_details.address.postal_code} {session.shipping_details.address.city} 
                          {session.shipping_details.address.state ? ` (${session.shipping_details.address.state})` : ""}
                        </p>
                        <p>{session.shipping_details.address.country}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Next Voucher Ritual */}
          <div className="pt-8 mt-12 border-t border-dashed border-white/10">
            <div className="bg-primary/5 border border-primary/20 p-8 space-y-6 relative overflow-hidden group">
              <div className="flex items-center gap-2 text-primary">
                <Tag className="w-4 h-4" />
                <span className="font-heading text-[10px] tracking-[0.3em] uppercase">Voucher Prossima Scelta</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-heading text-3xl tracking-[0.2em] text-white uppercase">HERITAGE10</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Usa questo sigillo per il tuo prossimo ordine</p>
                </div>
                <div className="bg-primary text-black px-3 py-1 font-heading text-sm tracking-widest">
                  -10%
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                <Tag className="w-32 h-32 rotate-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Visual Artifact Manifestation */}
        <div className="relative min-h-[500px] flex items-center justify-center bg-black/60 border border-white/5 overflow-hidden group">
           {/* Abstract Aura */}
           <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none" />
           
           {/* Grounding Ritual */}
           <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black to-transparent opacity-60 pointer-events-none" />
           
           <AnimatePresence mode="wait">
            {loading ? (
               <div className="w-24 h-24 rounded-full border border-white/10 border-t-primary animate-spin" />
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative w-full h-full flex items-center justify-center p-12"
              >
                {session?.line_items?.data.map((item: any, idx: number) => {
                  const desc = item.description || "";
                  const productName = Object.keys(productImages).find(name => desc.includes(name)) || "";
                  const imgSrc = productImages[productName];
                  
                  return imgSrc ? (
                    <motion.div
                      key={item.id}
                      initial={{ y: 100, opacity: 0, rotate: idx % 2 === 0 ? -5 : 5 }}
                      animate={{ y: 0, opacity: 1, rotate: 0 }}
                      transition={{ 
                        delay: 0.4 + (idx * 0.2),
                        type: "spring",
                        damping: 20
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ 
                        zIndex: 10 + idx,
                        left: session.line_items.data.length > 1 ? `${(idx - (session.line_items.data.length-1)/2) * 20}%` : '0'
                      }}
                    >
                      <div className="relative w-full h-full max-w-[300px] max-h-[450px]">
                        <Image
                          src={imgSrc}
                          alt={item.description}
                          fill
                          className="object-contain hover:scale-105 transition-transform duration-700"
                          priority
                        />
                      </div>
                    </motion.div>
                  ) : null;
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="pt-16 flex justify-center">
        <Link 
          href="/"
          className="group flex items-center gap-6 bg-primary text-black font-heading uppercase text-sm tracking-[0.5em] px-16 py-8 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(244,180,0,0.2)]"
        >
          <span>Torna al Manifesto</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function SuccessPage() {
  return (
    <main className="bg-noir min-h-screen selection:bg-primary selection:text-noir overflow-hidden">
      <Navbar />
      
      <section className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center min-h-screen">
        {/* Cinematic Grain Texture */}
        <div className="absolute inset-0 bg-texture opacity-[0.03] pointer-events-none" />
        
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center space-y-6">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="font-heading text-xs tracking-[0.5em] uppercase text-white/20">Sincronizzazione Rituale...</p>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </section>

      <Footer />
    </main>
  );
}

