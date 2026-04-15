"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import Image from "next/image";

export default function PreLaunchDrawer() {
  const { isPreLaunchOpen, setIsPreLaunchOpen } = useCart();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Scroll Lockdown Ritual
  useEffect(() => {
    if (isPreLaunchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPreLaunchOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;

    setIsSubmitting(true);
    
    // Alchemical Simulation of Persistence
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto-liquidation after success confirmation
      setTimeout(() => {
        setIsPreLaunchOpen(false);
        // Reset after animations finish
        setTimeout(() => {
          setIsSuccess(false);
          setEmail("");
          setSubscribed(true);
        }, 500);
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isPreLaunchOpen && (
        <>
          {/* Backdrop: Alchemical Shadow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPreLaunchOpen(false)}
            className="fixed inset-0 bg-noir/80 backdrop-blur-sm z-[10000]"
          />

          {/* Drawer: The Pre-Launch Terminal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-black border-l border-white/5 z-[10001] flex flex-col shadow-2xl"
          >
            {/* Header Ritual */}
            <div className="p-8 pt-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="font-heading text-lg md:text-xl tracking-widest uppercase text-primary font-bold">
                  {t.launchBanner.vaultTitle}
                </h2>
              </div>
              <button
                onClick={() => setIsPreLaunchOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors group relative z-10"
              >
                <X className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Content Manifest */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-primary font-heading text-3xl md:text-5xl uppercase tracking-tighter mb-4 italic">
                        {t.launchBanner.vaultSuccess}
                      </h3>
                      <p className="text-white/40 font-heading text-[10px] tracking-widest uppercase italic">
                        IL RITO È STATO SIGILLATO NELL&apos;ARCHIVIO 1882.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8 pt-2 pb-12"
                  >
                    {/* The Product Totem */}
                    <div className="relative w-full h-64 flex items-center justify-center">
                      <Image 
                        src="/images/launch/liquore.png"
                        alt="Sacred Artifact"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="space-y-6 text-center md:text-left">
                      <p className="text-primary font-heading text-xs tracking-[0.3em] uppercase italic">
                        {t.launchBanner.vaultDescription}
                      </p>
                      
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-heading tracking-[0.4em] text-white/40 uppercase pl-1">
                            MANIFESTO DIGITALE (EMAIL)
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t.launchBanner.vaultPlaceholder}
                            className="w-full bg-white/5 border border-white/10 rounded-none p-6 text-white font-heading text-xl md:text-2xl tracking-tighter placeholder:text-white/10 focus:outline-none focus:border-primary transition-all"
                            autoFocus
                          />
                        </div>

                        {/* Newsletter Commitment Ritual */}
                        <div 
                          className="flex items-start gap-4 p-4 bg-white/[0.02] border border-white/5 cursor-pointer group hover:bg-white/[0.04] transition-all"
                          onClick={() => setSubscribed(!subscribed)}
                        >
                          <div className={`mt-1 flex-shrink-0 w-5 h-5 border flex items-center justify-center transition-all duration-300 ${subscribed ? 'bg-primary border-primary' : 'border-white/20'}`}>
                            {subscribed && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 bg-noir" />}
                          </div>
                          <span className="text-[10px] md:text-xs font-heading tracking-widest text-white/50 group-hover:text-white/80 transition-colors uppercase leading-relaxed text-left">
                            {t.launchBanner.vaultSubscribe}
                          </span>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full murgia-btn-primary px-12 py-5 text-sm tracking-[0.4em]"
                        >
                          <span className="murgia-btn-text">{t.launchBanner.vaultSubmit}</span>
                          <ArrowRight className="murgia-btn-icon" />
                          <div className="murgia-btn-hover-wipe" />
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
