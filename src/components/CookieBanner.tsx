"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import Link from "next/link";

const CONSENT_KEY = "murgia-consent-given";

export default function CookieBanner() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkVisibility = () => {
      const consent = localStorage.getItem(CONSENT_KEY);
      const verifiedData = localStorage.getItem("murgia-age-verified");
      
      let isAgeVerified = false;
      if (verifiedData) {
        try {
          const { timestamp } = JSON.parse(verifiedData);
          const now = new Date().getTime();
          // One year validity like in AgeVerification component
          if (now - timestamp < 365 * 24 * 60 * 60 * 1000) {
            isAgeVerified = true;
          }
        } catch (e) {
          isAgeVerified = false;
        }
      }

      if (!consent && isAgeVerified) {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
      } else {
        setIsVisible(false);
      }
    };

    checkVisibility();

    const handleAgeVerified = () => {
      checkVisibility();
    };

    window.addEventListener("murgia-age-verified", handleAgeVerified);
    return () => window.removeEventListener("murgia-age-verified", handleAgeVerified);
  }, []);

  const handleConsent = (type: "all" | "necessary") => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({
      type,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const cookieT = t.cookie;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[15000] p-4 md:p-8"
        >
          <div className="max-w-5xl mx-auto bg-noir border border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden group">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors duration-1000" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-6 md:p-10">
              {/* Icon & Title */}
              <div className="flex items-center gap-6 flex-1">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-lg md:text-xl tracking-[0.2em] uppercase text-white">
                    {cookieT.title}
                  </h3>
                  <p className="text-white/40 font-body text-[10px] md:text-sm leading-relaxed tracking-widest max-w-2xl">
                    {cookieT.description}
                  </p>
                </div>
              </div>

              {/* Actions: Re-ordered for Mobile Flow */}
              <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                <div className="flex gap-4 w-full md:w-auto order-1 md:order-2">
                  <button
                    onClick={() => handleConsent("necessary")}
                    className="flex-1 md:flex-none px-6 md:px-8 py-3 md:py-4 border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all font-heading text-[10px] tracking-[0.3em] uppercase"
                  >
                    {cookieT.reject}
                  </button>
                  <button
                    onClick={() => handleConsent("all")}
                    className="flex-1 md:flex-none murgia-btn-primary px-6 md:px-8 py-3 md:py-4 text-[10px] tracking-[0.3em]"
                  >
                    <span className="murgia-btn-text">{cookieT.acceptAll}</span>
                    <div className="murgia-btn-hover-wipe" />
                  </button>
                </div>

                <Link 
                  href="/legal/cookie-policy"
                  className="text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white transition-colors border-b border-white/5 pb-1 order-2 md:order-1"
                >
                  {cookieT.policy}
                </Link>
              </div>
            </div>

            {/* Progress Bar (Decoration) */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-primary/20 w-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
