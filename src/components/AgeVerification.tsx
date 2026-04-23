"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";
import Logo from "./Logo";

const AGE_VERIFICATION_KEY = "murgia-age-verified";
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

const AgeVerification = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const verifiedData = localStorage.getItem(AGE_VERIFICATION_KEY);
    if (verifiedData) {
      try {
        const { timestamp } = JSON.parse(verifiedData);
        const now = new Date().getTime();
        if (now - timestamp < ONE_YEAR_MS) {
          return; // Still valid
        }
      } catch (e) {
        // Invalid data, show modal
      }
    }
    
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible || isDenied) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible, isDenied]);

  const handleVerify = () => {
    setIsExiting(true);
    setTimeout(() => {
      localStorage.setItem(
        AGE_VERIFICATION_KEY,
        JSON.stringify({ timestamp: new Date().getTime() })
      );
      window.dispatchEvent(new Event("murgia-age-verified"));
      setIsVisible(false);
    }, 800); // Match animation duration
  };

  const handleDeny = () => {
    setIsDenied(true);
  };

  if (!isVisible && !isDenied) return null;

  const ageT = t.ageVerification;

  return (
    <AnimatePresence>
      {(isVisible || isDenied) && (
        <div className="fixed inset-0 z-[20000] flex flex-col items-center justify-center overflow-hidden">
          {/* Split Shutter Background */}
          <motion.div 
            initial={{ y: 0 }}
            animate={isExiting ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-primary z-0"
          />
          <motion.div 
            initial={{ y: 0 }}
            animate={isExiting ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-primary z-0"
          />

          {/* Content Layer */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={isExiting ? { opacity: 0, scale: 0.95 } : { opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center justify-center w-full h-full"
          >
            {/* Subtle Grain Texture */}
            <div className="bg-texture absolute inset-0 opacity-[0.05] pointer-events-none" />

            {/* Screen Reader Only H1 for SEO/A11y */}
            <h1 className="sr-only">Murgia Liquori - Age Verification</h1>

            {/* Large Brand Logo Takeover */}
            <div className="mb-12 md:mb-20">
              <Logo variant="large" theme="dark" className="scale-75 md:scale-100" />
            </div>

            <div className="flex flex-col items-center px-6 text-center w-full max-w-4xl h-[450px] justify-center relative">
              <AnimatePresence mode="wait">
                {!isDenied ? (
                  <motion.div
                    key="gate"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center w-full"
                  >
                    <h3 className="mb-8 font-display text-4xl md:text-6xl text-noir leading-[0.9] italic max-w-[80%] mx-auto">
                      {ageT.subtitle}
                    </h3>
                    <p className="mb-12 max-w-xl text-noir/60 font-medium text-sm md:text-base leading-relaxed tracking-widest">
                      {ageT.description}
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
                      <button
                        onClick={handleVerify}
                        className="murgia-btn-noir group px-12 py-5 min-w-[240px]"
                      >
                        <span className="murgia-btn-text">Si</span>
                        <div className="murgia-btn-hover-wipe" />
                      </button>
                      <button
                        onClick={handleDeny}
                        className="murgia-btn-noir group px-12 py-5 min-w-[240px]"
                        style={{ backgroundColor: 'transparent', border: '1px solid rgba(0,0,0,0.3)' }}
                      >
                        <span className="murgia-btn-text !text-noir">{ageT.no}</span>
                        <div className="murgia-btn-hover-wipe" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="denied"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center w-full"
                  >
                    <h2 className="mb-6 font-display text-4xl md:text-6xl text-noir italic leading-[0.9] max-w-[80%] mx-auto">
                      {ageT.denied.title}
                    </h2>
                    <p className="mb-12 max-w-md text-noir/60 text-lg md:text-xl font-medium tracking-widest italic">
                      "{ageT.denied.message}"
                    </p>
                    <a
                      href="https://www.youtube.com/watch?v=TpAl52rlf4s"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="murgia-btn-noir group px-12 py-5"
                    >
                      <span className="murgia-btn-text">{ageT.denied.cta}</span>
                      <div className="murgia-btn-hover-wipe" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AgeVerification;
