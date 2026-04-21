"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import LiquidImage from "./LiquidImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";

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

  useEffect(() => {
    if (isSealed && hasMounted && window.innerWidth > 768) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 1500);
      return () => {
        document.body.style.overflow = "auto";
        clearTimeout(timer);
      };
    }
  }, [isSealed, hasMounted]);

    // Phase visibility and scrolling position maps for Slide-Push effect
  const p1SlideY = useTransform(scrollYProgress, [0.15, 0.3], ["0%", "-100%"]);
  const p1Opacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);
  
  const p2SlideY = useTransform(scrollYProgress, [0.15, 0.3], ["100%", "0%"]);
  const p2Opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);

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
      {/* 📱 MOBILE: Simple Vertical Manifest */}
      <div className="md:hidden flex flex-col gap-32 pt-32 pb-0 px-6">
        <div className="space-y-8">
          <span className="text-primary font-heading text-xl tracking-widest block uppercase">{t.origins.title}</span>
          <h2 className="text-white font-heading text-[2.5rem] leading-[1.2] md:leading-none uppercase">
            {t.origins.subtitle} <br /> <span className="text-primary italic">{t.origins.subtitleAccent}</span>
          </h2>
          <div className="aspect-[4/5] relative overflow-hidden rounded-[2vw] border border-white/10">
            <LiquidImage src="/images/products/VillacidroMurgia02.png" alt="Murgia Heritage Still" />
          </div>
          <p className="text-white/60 font-body text-lg max-w-md leading-relaxed">
            {t.origins.description}
          </p>
        </div>

        <div className="space-y-8">
          <span className="text-primary font-heading text-xl tracking-widest block uppercase underline decoration-primary underline-offset-8">{t.origins.heritage.title}</span>
          <h2 className="text-white font-heading text-[2.5rem] leading-[1.2] md:leading-none uppercase">
            {t.origins.heritage.subtitle} <br /> <span className="text-primary italic">{t.origins.heritage.subtitleAccent}</span>
          </h2>
          <div className="aspect-[4/5] relative overflow-hidden rounded-[2vw] border border-white/10">
            <LiquidImage src="/images/giallo.webp" alt="Murgia Giallo" />
          </div>
          <p className="text-white/60 font-body text-lg max-w-md leading-relaxed">
            {t.origins.heritage.description}
          </p>
        </div>

        {/* Collection fallback for mobile */}
        <div className="bg-primary -mx-6 px-6 py-20">
          <div className="text-center mb-10">
            <span className="text-noir font-heading text-lg tracking-widest block uppercase underline decoration-noir underline-offset-8">
              {t.origins.products.title}
            </span>
          </div>
          <div className="grid grid-cols-1 gap-12 max-w-7xl w-full">
            {products.map((p) => (
              <Link key={p.name} href={p.href} className="group relative block">
                <div className="aspect-[4/5] bg-noir rounded-[2vw] overflow-hidden relative border border-white/5 shadow-2xl">
                  <LiquidImage src={p.img} alt={p.name} className="object-contain p-8" />
                  <div className="absolute inset-x-0 bottom-8 text-center px-4">
                    <h4 className="text-white font-heading text-2xl uppercase tracking-tighter">{p.name}</h4>
                    <p className="text-primary font-heading text-xl">{p.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link href="/la-collezione" className="murgia-btn-noir px-12 py-5 text-xs tracking-[0.3em] uppercase transform active:scale-95">
              <span className="murgia-btn-text">{t.origins.products.cta}</span>
              <ArrowRight className="murgia-btn-icon" />
              <div className="murgia-btn-hover-wipe" />
            </Link>
          </div>
        </div>
      </div>

      {/* 🖥️ DESKTOP: Unified Cinematic Flow */}
      <div className="hidden md:block min-h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-32 pb-20 px-20">
          
          <div className="flex-1 relative z-10 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-24 items-center max-w-6xl w-full relative">
              
              {/* SHARED TEXT CONTENT AREA (MASKED) */}
              <div className="relative h-[500px] overflow-hidden">
                {/* Phase 1 Text (Origins) */}
                <motion.div
                  style={{ y: p1SlideY, opacity: p1Opacity }}
                  className="absolute inset-0 flex flex-col justify-center space-y-6"
                >
                  <span className="text-primary font-heading text-xl tracking-widest block uppercase">{t.origins.title}</span>
                  <h2 className="text-white font-heading text-8xl leading-none uppercase">
                    {t.origins.subtitle} <br /> <span className="text-primary italic">{t.origins.subtitleAccent}</span>
                  </h2>
                  <p className="text-white/60 font-body text-lg max-w-md leading-relaxed">
                    {t.origins.description}
                  </p>
                </motion.div>

                {/* Phase 2 Text (Heritage) */}
                <motion.div
                  style={{ y: p2SlideY, opacity: p2Opacity }}
                  className="absolute inset-0 flex flex-col justify-center space-y-6"
                >
                  <span className="text-primary font-heading text-xl tracking-widest block uppercase">{t.origins.heritage.title}</span>
                  <h2 className="text-white font-heading text-8xl leading-none uppercase">
                    {t.origins.heritage.subtitle} <br /> <span className="text-primary italic">{t.origins.heritage.subtitleAccent}</span>
                  </h2>
                  <p className="text-white/60 font-body text-lg max-w-md leading-relaxed italic">
                    {t.origins.heritage.description}
                  </p>
                </motion.div>
              </div>

              {/* SHARED IMAGE MASK (The Rounded Frame) */}
              <div className="relative aspect-[4/5] max-h-[65vh] w-full">
                <div className="absolute inset-0 overflow-hidden rounded-[2vw] border border-white/10 bg-noir">
                  {/* Image 1 (Origins) */}
                  <motion.div 
                    style={{ y: p1SlideY }}
                    className="absolute inset-0"
                  >
                    <LiquidImage src="/images/products/VillacidroMurgia02.png" alt="Murgia Origins" />
                  </motion.div>

                  {/* Image 2 (Heritage) */}
                  <motion.div 
                    style={{ y: p2SlideY }}
                    className="absolute inset-0"
                  >
                    <LiquidImage src="/images/giallo.webp" alt="Murgia Legacy" />
                  </motion.div>
                </div>
              </div>

            </div>
          </div>

          <motion.div initial={false} animate={{ height: isSealed ? "51%" : "0%" }} className="absolute top-0 left-0 w-full bg-primary z-20" />
          <motion.div initial={false} animate={{ height: isSealed ? "51%" : "0%" }} className="absolute bottom-0 left-0 w-full bg-primary z-20" />

          <motion.div
            animate={{ opacity: isSealed ? 1 : 0 }}
            className={`absolute inset-0 z-30 flex flex-col items-center justify-center pt-24 pb-20 bg-primary transition-opacity duration-700 ${isSealed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <header className="text-center mb-16 mt-10">
              <span className="text-noir font-heading text-xs md:text-sm tracking-[0.4em] uppercase underline decoration-noir/30 underline-offset-8 italic mb-4 block font-bold">
                {t.origins.products.title}
              </span>
            </header>

            <div className="grid grid-cols-3 gap-8 px-20 max-w-6xl w-full">
              {products.map((p, i) => (
                <Link key={p.name} href={p.href} className="group relative block cursor-pointer">
                  <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
                    <div className="aspect-[4/5] max-h-[60vh] bg-noir rounded-[2vw] overflow-hidden relative border border-white/5 shadow-2xl">
                      <LiquidImage src={p.img} alt={p.name} className="object-contain p-4" />
                      <div className="absolute inset-x-0 bottom-6 text-center">
                        <h4 className="text-white font-heading text-2xl uppercase tracking-tighter">{p.name}</h4>
                        <p className="text-primary font-heading text-xl">{p.price}</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            
            <Link href="/la-collezione" className="murgia-btn-noir mt-12 px-16 py-6 text-sm tracking-[0.4em] transform hover:scale-105">
              <span className="murgia-btn-text">{t.origins.products.cta}</span>
              <ArrowRight className="murgia-btn-icon" />
              <div className="murgia-btn-hover-wipe" />
            </Link>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
