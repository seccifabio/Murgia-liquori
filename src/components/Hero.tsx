"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Logo from "./Logo";
import { useRef, useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/context/LanguageContext";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const { setIsBannerVisible, isBannerVisible } = useCart();
  const pathname = usePathname();
  const { t, language } = useTranslation();
  const isEligiblePage = pathname === "/" || pathname?.includes("/shop/");

  // Cinematic Performance: We use Motion Values for the top/height logic 
  // to avoid React re-renders on every scroll tick.
  const dynamicTop = useTransform(scrollY, [0, 52], [isBannerVisible && isEligiblePage ? 52 : 0, 0]);
  const dynamicHeight = useTransform(scrollY, [0, 52], [
    isBannerVisible && isEligiblePage ? "calc(100dvh - 52px)" : "100dvh", 
    "100dvh"
  ]);

  useEffect(() => {
    // Force video playback (critical for production/mobile)
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video play blocked:", err));
    }
  }, []);

  // State to trigger the smooth shutter reveal
  const [showText, setShowText] = useState(false);

  // Fade out content as we scroll
  const contentOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 100], [1, 0.95]);

  useEffect(() => {
    // Initial delay for the shutter effect
    const timer = setTimeout(() => setShowText(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.section 
      ref={containerRef}
      style={{ 
        top: dynamicTop,
        height: dynamicHeight
      }}
      className="fixed left-0 w-full overflow-hidden bg-noir flex items-center justify-center z-0"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          className="h-full w-full object-cover saturate-[0.3] brightness-75 opacity-70"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-noir/40 via-transparent to-noir" />
      </div>

      {/* Main Narrative Ritual */}
      <motion.div 
        style={{ opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6"
      >
        <div className="flex flex-col items-center max-w-7xl">

          <div className="overflow-hidden mb-6">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={showText ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className={`font-heading text-white leading-[0.8] uppercase italic ${language === "en" ? "text-5xl md:text-[7rem] lg:text-[10rem] tracking-tight" : "text-5xl md:text-[8rem] lg:text-[12rem] tracking-tighter"}`}
            >
              {t.hero.title} <br/> <span className="text-primary tracking-normal">{t.hero.subtitle}</span>
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={showText ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="text-white font-heading text-sm md:text-xl tracking-[0.4em] uppercase max-w-2xl px-4"
          >
            {t.hero.description}
          </motion.p>
        </div>

        {/* Scroll Ritual Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={showText ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
           <span className="text-white/40 text-[10px] uppercase tracking-[0.6em] font-heading">{t.hero.scroll}</span>
           <motion.div
             animate={{ y: [0, 10, 0] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           >
             <ArrowDown className="w-5 h-5 text-primary/60" />
           </motion.div>
        </motion.div>
      </motion.div>

      {/* Side HUD Details */}
      <div className="absolute left-10 bottom-10 hidden md:flex flex-col gap-6 opacity-30">
        <div className="h-px w-20 bg-white" />
        <span className="text-white text-[10px] uppercase tracking-[0.4em] origin-left rotate-90 translate-x-1 -translate-y-20 font-heading">
          {t.hero.legacy_hud}
        </span>
      </div>

      <div className="absolute right-10 bottom-10 hidden md:flex flex-col items-end gap-6 opacity-30">
        <span className="text-white text-[10px] uppercase tracking-[0.4em] origin-right -rotate-90 -translate-x-1 -translate-y-20 font-heading">
          {t.hero.craft_hud}
        </span>
        <div className="h-px w-20 bg-white" />
      </div>
    </motion.section>
  );
}
