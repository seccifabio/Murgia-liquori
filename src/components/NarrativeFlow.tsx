"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "@/context/LanguageContext";
import NarrativeMobile from "./NarrativeMobile";
import NarrativeDesktop from "./NarrativeDesktop";
import NarrativeCollection from "./NarrativeCollection";

import { PRODUCTS_MANIFEST } from "@/manifest/products";

export default function NarrativeFlow({ liveProducts }: { liveProducts?: any }) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const [isSealed, setIsSealed] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const getLivePrice = (priceId: string, fallback: string) => {
    const live = liveProducts?.[priceId]?.price;
    return live ? `${live}€` : fallback;
  };

  const getLiveName = (priceId: string, fallback: string) => {
    return liveProducts?.[priceId]?.name || fallback;
  };

  useEffect(() => {
    if (isSealed && hasMounted && typeof window !== "undefined" && window.innerWidth > 768) {
      if ("vibrate" in navigator) {
        navigator.vibrate(20);
      }
    }
  }, [isSealed, hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.70) setIsSealed(true);
    else if (latest < 0.68) setIsSealed(false);
  });

  // Phase visibility and scrolling position maps for Slide-Push effect
  // Phase 1: Origins (Distillation)
  const p1SlideY = useTransform(scrollYProgress, [0.25, 0.4], ["0%", "-100%"]);
  const p1Opacity = useTransform(scrollYProgress, [0.25, 0.35], [1, 0]);
  
  // Phase 2: Heritage (The Legacy)
  // Starts below (100%), slides to center (0%) as P1 leaves, then slides out to reveal collection
  const p2SlideY = useTransform(scrollYProgress, [0.25, 0.4, 0.65, 0.8], ["100%", "0%", "0%", "-100%"]);
  const p2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.65, 0.75], [0, 1, 1, 0]);

  const products = [
    { 
      name: getLiveName(PRODUCTS_MANIFEST.bianco.priceId, "Villacidro Bianco"), 
      price: getLivePrice(PRODUCTS_MANIFEST.bianco.priceId, "5€"), 
      img: "/images/bianco_product.png", 
      href: "/shop/murgia-bianco" 
    },
    { 
      name: getLiveName(PRODUCTS_MANIFEST.giallo.priceId, "Murgia Giallo"), 
      price: getLivePrice(PRODUCTS_MANIFEST.giallo.priceId, "26€"), 
      img: "/images/giallo.webp", 
      href: "/shop/murgia-giallo" 
    },
    { 
      name: getLiveName(PRODUCTS_MANIFEST.sbagliata.priceId, "La Sbagliata"), 
      price: getLivePrice(PRODUCTS_MANIFEST.sbagliata.priceId, "15€"), 
      img: "/images/sbagliata_product.png", 
      href: "/shop/la-sbagliata" 
    },
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative bg-noir z-10"
    >
      {/* Mobile manifest remains static and high-fidelity */}
      <NarrativeMobile t={t} products={products} />
      
      <NarrativeDesktop 
        t={t} 
        p1SlideY={p1SlideY} 
        p1Opacity={p1Opacity} 
        p2SlideY={p2SlideY} 
        p2Opacity={p2Opacity} 
      >
        <div className="hidden md:block">
          <motion.div initial={false} animate={{ height: isSealed ? "51%" : "0%" }} className="absolute top-0 left-0 w-full bg-primary z-20 pointer-events-none" />
          <motion.div initial={false} animate={{ height: isSealed ? "51%" : "0%" }} className="absolute bottom-0 left-0 w-full bg-primary z-20 pointer-events-none" />
          
          <NarrativeCollection isSealed={isSealed} t={t} products={products} />
        </div>
      </NarrativeDesktop>
    </motion.section>
  );
}
