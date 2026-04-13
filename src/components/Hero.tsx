"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Logo from "./Logo";
import { useRef, useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { isBannerVisible } = useCart();
  const pathname = usePathname();

  const isEligiblePage = pathname === "/" || pathname?.includes("/shop/");

  // State to trigger the smooth shutter reveal
  const [showText, setShowText] = useState(false);

  // Fade out content as we scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <section 
      ref={containerRef}
      style={{ top: (isEligiblePage && isBannerVisible) ? 'var(--banner-height)' : '0' }}
      className="fixed left-0 h-screen w-full overflow-hidden bg-noir flex items-center justify-center z-0 transition-[top] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-noir/40 z-10" /> 
        <video
          autoPlay
          muted
          loop
          playsInline
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            if (video.currentTime > 2 && !showText) setShowText(true);
          }}
          className="h-full w-full object-cover saturate-[0.3] brightness-75 opacity-70"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main Narrative Content */}
      <motion.div 
        style={{ opacity: contentOpacity, scale: contentScale }}
        className="relative z-20 text-center px-4 max-w-7xl mx-auto pt-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <Logo variant="large" />
        </motion.div>

        {/* Shutter Reveal Text Container */}
        <div className="relative overflow-hidden min-h-[6rem] flex flex-col items-center">
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: showText ? "0%" : "100%", opacity: showText ? 1 : 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <p className="text-primary/90 font-body text-xs md:text-sm max-w-md mx-auto tracking-[0.3em] uppercase leading-loose drop-shadow-xl text-center">
              L&apos;alchimia del giallo che rompe gli schemi. <br />
              Un&apos;eredit&agrave; distillata nel cuore della Sardegna.
            </p>
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: showText ? 1 : 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8 w-px h-12 bg-gradient-to-b from-primary/60 to-transparent origin-top" 
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Floating UI Elements */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-white/50 font-heading text-xs tracking-[0.3em] uppercase">
            Scopri l&apos;essenza
          </span>
          <ArrowDown className="text-primary w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Side Decorative Text */}
      <motion.div 
        style={{ opacity: contentOpacity }}
        className="absolute left-10 bottom-10 hidden lg:block z-30"
      >
        <div className="rotate-[-90deg] origin-left flex items-center gap-8">
          <span className="text-white/20 font-heading text-xs tracking-[0.2em] uppercase">
            Artigianato Sardo
          </span>
          <div className="w-12 h-[1px] bg-white/20" />
          <span className="text-white/20 font-heading text-xs tracking-[0.2em] uppercase">
            Tradizione Gennaro Murgia
          </span>
        </div>
      </motion.div>
    </section>
  );
}
