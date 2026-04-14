"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import LiquidImage from "./LiquidImage";
import Link from "next/link";
import { useTranslation } from "@/context/LanguageContext";

export default function NarrativeFlow() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const [isSealed, setIsSealed] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

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

  const section1Clip = useTransform(scrollYProgress, [0.15, 0.25], ["inset(0% 0 0% 0)", "inset(0% 0 100% 0)"]);
  const section2Clip = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], ["inset(100% 0 0 0)", "inset(0% 0 0 0)", "inset(0% 0 0 0)", "inset(100% 0 0 0)"]);
  const phase1Y = useTransform(scrollYProgress, [0, 0.35], [50, -50]);
  const phase2Y = useTransform(scrollYProgress, [0.35, 0.8], [50, -50]);

  const products = [
    { name: t.products.bianco.name, price: "24€", img: "/images/products/bianco.png", href: "/shop/murgia-bianco" },
    { name: t.products.giallo.name, price: "26€", img: "/images/giallo.webp", href: "/shop/villacidro-giallo" },
    { name: t.products.sbagliata.name, price: "15€", img: "/images/products/sbagliata.png", href: "/shop/la-sbagliata" },
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative bg-noir z-10"
    >
      {/* 📱 MOBILE: Simple Vertical Manifest */}
      <div className="md:hidden flex flex-col gap-32 py-24 px-6">
        <div className="space-y-8">
          <span className="text-primary font-heading text-xl tracking-widest block uppercase">{t.origins.title}</span>
          <h2 className="text-white font-heading text-[2.5rem] leading-[1.2] md:leading-none uppercase">
            {t.origins.subtitle} <br /> <span className="text-primary italic">{t.origins.subtitleAccent}</span>
          </h2>
          <div className="aspect-[4/5] relative overflow-hidden rounded-[2vw] border border-white/10">
            <LiquidImage src="/images/products/bianco.png" alt="Murgia Heritage Still" />
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
            <LiquidImage src="/images/giallo.webp" alt="Villacidro Giallo" />
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
        </div>
      </div>

      {/* 🖥️ DESKTOP: Original Cinematic Architecture */}
      <div className="hidden md:block min-h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-32 pb-20 px-20">
          
          <div className="flex-1 relative z-10">
            {/* Phase 1 */}
            <motion.div
              style={{ clipPath: section1Clip }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-noir"
            >
              <div className="grid grid-cols-2 gap-12 items-center max-w-6xl w-full">
                <div className="space-y-6">
                  <span className="text-primary font-heading text-xl tracking-widest block uppercase">{t.origins.title}</span>
                  <h2 className="text-white font-heading text-8xl leading-none uppercase">
                    {t.origins.subtitle} <br /> <span className="text-primary italic">{t.origins.subtitleAccent}</span>
                  </h2>
                  <p className="text-white/60 font-body text-lg max-w-md leading-relaxed">
                    {t.origins.description}
                  </p>
                </div>
                <motion.div style={{ y: phase1Y }} className="aspect-[4/5] max-h-[60vh] relative overflow-hidden rounded-[2vw] border border-white/10">
                  <LiquidImage src="/images/products/bianco.png" alt="Murgia Heritage Still" />
                </motion.div>
              </div>
            </motion.div>

            {/* Phase 2 */}
            <motion.div
              style={{ clipPath: section2Clip }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-noir"
            >
              <div className="grid grid-cols-2 gap-12 items-center max-w-6xl w-full">
                <div className="space-y-6">
                  <span className="text-primary font-heading text-xl tracking-widest block uppercase underline decoration-primary underline-offset-8">{t.origins.heritage.title}</span>
                  <h2 className="text-white font-heading text-8xl leading-none uppercase">
                    {t.origins.heritage.subtitle} <br /> <span className="text-primary italic">{t.origins.heritage.subtitleAccent}</span>
                  </h2>
                  <p className="text-white/60 font-body text-lg max-w-md leading-relaxed italic">
                    {t.origins.heritage.description}
                  </p>
                </div>
                <motion.div style={{ y: phase2Y }} className="aspect-[4/5] max-h-[60vh] relative overflow-hidden rounded-[2vw] border border-white/10">
                  <LiquidImage src="/images/giallo.webp" alt="Villacidro Giallo" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div initial={false} animate={{ height: isSealed ? "51%" : "0%" }} className="absolute top-0 left-0 w-full bg-primary z-20" />
          <motion.div initial={false} animate={{ height: isSealed ? "51%" : "0%" }} className="absolute bottom-0 left-0 w-full bg-primary z-20" />

          <motion.div
            animate={{ opacity: isSealed ? 1 : 0 }}
            className={`absolute inset-0 z-30 flex flex-col items-center justify-center pt-24 pb-20 bg-primary transition-opacity duration-700 ${isSealed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          >
            <header className="text-center mb-10 mt-10">
              <span className="text-noir font-heading text-xl tracking-widest block uppercase">{t.origins.products.title}</span>
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
            
            <Link href="/la-collezione" className="group relative mt-12 px-16 py-6 bg-noir text-primary font-heading uppercase text-sm tracking-[0.4em] transform hover:scale-105 duration-300">
              {t.origins.products.cta}
            </Link>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
