"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import LiquidImage from "./LiquidImage";
import Link from "next/link";

export default function NarrativeFlow() {
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
    { name: "Murgia Bianco", price: "24€", img: "/images/products/bianco.png", href: "/shop/murgia-bianco" },
    { name: "Murgia Giallo", price: "26€", img: "/images/giallo.webp", href: "/shop/villacidro-giallo" },
    { name: "La Sbagliata", price: "15€", img: "/images/products/sbagliata.png", href: "/shop/la-sbagliata" },
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative bg-noir z-10"
    >
      {/* 📱 MOBILE LAYOUT (Standard Vertical Stack) */}
      <div className="md:hidden flex flex-col gap-24 py-24 px-6 overflow-hidden">
        {/* Phase 1 */}
        <div className="space-y-8">
          <span className="text-primary font-heading text-xl tracking-widest block uppercase">Le Origini</span>
          <h2 className="text-white font-heading text-[2.5rem] leading-[1.2] uppercase">
            L&apos;Arte della <br /> <span className="text-primary italic">Distillazione</span>
          </h2>
          <div className="aspect-[4/5] relative overflow-hidden rounded-[2vw] border border-white/10">
            <LiquidImage src="/images/products/bianco.png" alt="Murgia Heritage Still" />
          </div>
          <p className="text-white/60 font-body text-lg leading-relaxed">
            Dal 1882, trasformiamo i frutti della terra sarda in essenze immortali. 
          </p>
        </div>

        {/* Phase 2 */}
        <div className="space-y-8 mt-12">
          <span className="text-primary font-heading text-xl tracking-widest block uppercase underline decoration-primary underline-offset-8">Villacidro Murgia</span>
          <h2 className="text-white font-heading text-[2.5rem] leading-[1.2] uppercase">
            Il Colore <br /> della <span className="text-primary italic">Storia</span>
          </h2>
          <div className="aspect-[4/5] relative overflow-hidden rounded-[2vw] border border-white/10">
            <LiquidImage src="/images/giallo.webp" alt="Villacidro Giallo Murgia" />
          </div>
          <p className="text-white/60 font-body text-lg leading-relaxed italic">
            Zafferano, Anice e Segreti di Famiglia.
          </p>
        </div>

        {/* Collection Grid */}
        <div className="bg-primary -mx-6 px-6 py-20 mt-12">
          <header className="text-center mb-10">
            <span className="text-noir font-heading text-xl tracking-widest block uppercase">La Collezione Murgia</span>
          </header>
          <div className="grid grid-cols-1 gap-8">
            {products.map((p) => (
              <Link key={p.name} href={p.href} className="group relative block">
                <div className="aspect-[4/5] bg-noir rounded-[2vw] overflow-hidden relative border border-white/5 shadow-2xl">
                  <LiquidImage src={p.img} alt={p.name} className="object-contain p-4" />
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <h4 className="text-white font-heading text-2xl uppercase">{p.name}</h4>
                    <p className="text-primary font-heading text-xl">{p.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/la-collezione" className="group relative mt-12 px-12 py-6 bg-noir text-primary font-heading uppercase text-sm tracking-widest text-center block">
            Vedi tutti
          </Link>
        </div>
      </div>

      {/* 🖥️ DESKTOP LAYOUT (Cinematic Scroll) */}
      <div className="hidden md:block min-h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div className="absolute inset-0 pt-32 pb-20 px-20">
            {/* Phase 1 */}
            <motion.div
              style={{ clipPath: section1Clip }}
              className="absolute inset-0 flex items-center justify-center bg-noir"
            >
              <div className="grid grid-cols-2 gap-20 items-center max-w-6xl w-full">
                <div className="space-y-6">
                  <span className="text-primary font-heading text-xl tracking-widest block uppercase">Le Origini</span>
                  <h2 className="text-white font-heading text-8xl leading-none uppercase">
                    L&apos;Arte della <br /> <span className="text-primary italic">Distillazione</span>
                  </h2>
                  <p className="text-white/60 font-body text-xl max-w-md leading-relaxed">
                    Dal 1882, trasformiamo i frutti della terra sarda in essenze immortali. 
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
              className="absolute inset-0 flex items-center justify-center bg-noir"
            >
              <div className="grid grid-cols-2 gap-20 items-center max-w-6xl w-full">
                <div className="space-y-6">
                  <span className="text-primary font-heading text-xl tracking-widest block uppercase underline decoration-primary underline-offset-8">Villacidro Murgia</span>
                  <h2 className="text-white font-heading text-8xl leading-none uppercase">
                    Il Colore <br /> della <span className="text-primary italic">Storia</span>
                  </h2>
                  <p className="text-white/60 font-body text-xl max-w-md leading-relaxed italic">
                    Zafferano, Anice e Segreti di Famiglia.
                  </p>
                </div>
                <motion.div style={{ y: phase2Y }} className="aspect-[4/5] max-h-[60vh] relative overflow-hidden rounded-[2vw] border border-white/10">
                  <LiquidImage src="/images/giallo.webp" alt="Villacidro Giallo Murgia" />
                </motion.div>
              </div>
            </motion.div>

            {/* Curtains */}
            <motion.div initial={false} animate={{ height: isSealed ? "51%" : "0%" }} className="absolute top-0 left-0 w-full bg-primary z-20" />
            <motion.div initial={false} animate={{ height: isSealed ? "51%" : "0%" }} className="absolute bottom-0 left-0 w-full bg-primary z-20" />

            {/* Collection Reveal */}
            <motion.div
              animate={{ opacity: isSealed ? 1 : 0, scale: isSealed ? 1 : 0.95 }}
              className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-primary p-20 ${isSealed ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              <header className="text-center mb-16">
                <span className="text-noir font-heading text-2xl tracking-widest block uppercase">La Collezione Murgia</span>
              </header>
              <div className="grid grid-cols-3 gap-12 max-w-7xl w-full">
                {products.map((p, i) => (
                  <Link key={p.name} href={p.href} className="group relative">
                    <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}>
                      <div className="aspect-[4/5] bg-noir rounded-[2vw] overflow-hidden relative border border-white/5 shadow-2xl">
                        <LiquidImage src={p.img} alt={p.name} className="object-contain p-8" />
                        <div className="absolute inset-x-0 bottom-8 text-center">
                          <h4 className="text-white font-heading text-3xl uppercase">{p.name}</h4>
                          <p className="text-primary font-heading text-2xl">{p.price}</p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
              <Link href="/la-collezione" className="group relative mt-16 px-16 py-6 bg-noir text-primary font-heading uppercase text-sm tracking-[0.4em] transform hover:scale-105 transition-all">
                Vedi tutti i prodotti
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
  );
}
