"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import { useState, useRef } from "react";
import Image from "next/image";
import { 
  Users, 
  Clock, 
  Quote,
  ArrowRight
} from "lucide-react";
import VisitSidebarContent from "@/components/visit/VisitSidebarContent";
import { VISIT_MANIFEST } from "@/manifest/visit";

/* Visit Us Ritual: A cinematic immersion into the Murgia Laboratory */
/* Layout Refinement: Simplified Laboratory stats by removing redundant labels and elevating values to primary status */

const NARRATIVE_STAGES = [
  { id: "hero", src: "/images/visit/liquorificio_3.webp", alt: "Murgia Heritage Entrance" },
  { id: "craft", src: "/images/visit/liquorificio_2.webp", alt: "Distillation Alchemy" },
  { id: "laboratory", src: "/images/visit/laboratory.png", alt: "The Secret Laboratory" },
  { id: "tasting", src: "/images/visit/Tasting.png", alt: "The Golden Finale" }
];

export default function VisitUsPage() {
  const { t, language } = useTranslation();
  // @ts-ignore
  const manifestData = VISIT_MANIFEST[language as "it" | "en"] || VISIT_MANIFEST.it;
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Narrative State Tracking
  const [activeStage, setActiveStage] = useState(NARRATIVE_STAGES[0]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Cinematic Background Scaling & Filters
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const grayscale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1]);
  
  const filterMotion = useTransform(
    [grayscale],
    ([g]) => `grayscale(${g}) brightness(0.4)`
  );

  return (
    <div ref={containerRef} className="relative min-h-screen bg-noir text-white selection:bg-primary selection:text-black">
      
      {/* 1. Cinematic Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-noir/50 z-10" />
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeStage.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full"
          >
            <motion.div 
              style={{ 
                scale: bgScale, 
                filter: filterMotion 
              }}
              className="w-full h-full"
            >
              <Image
                src={activeStage.src}
                alt={activeStage.alt}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-noir/30 via-transparent to-noir z-15" />
      </div>

      {/* 2. Layout Structure */}
      <div className="relative z-20 flex flex-col md:flex-row min-h-screen">
        
        {/* Left Column: Narrative Stream (Controlled Spacing) */}
        <div className="flex-1 px-6 md:px-12 lg:px-24 py-32">
          
          {/* 1. Hero Entrance */}
          <section className="min-h-[100vh] flex flex-col justify-center pt-20 mb-[40vh]">
            <div className="flex flex-col gap-64 md:gap-80">
              
              {/* TIER 1: Brand Identity */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                onViewportEnter={() => setActiveStage(NARRATIVE_STAGES[0])}
                className="max-w-4xl space-y-12"
              >
                <div className="space-y-8">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
                    <div className="w-12 h-[1px] bg-primary" />
                    <span className="font-heading text-primary text-sm tracking-[0.6em] uppercase block">{t.visitPage.hero.subtitle}</span>
                  </motion.div>
                  <h1 className={`font-heading text-white leading-[0.8] uppercase italic font-black tracking-normal ${language === "en" ? "text-6xl md:text-8xl lg:text-9xl" : "text-7xl md:text-9xl lg:text-[11rem]"}`}>
                    Vieni A <br/> <span className="text-primary italic">Trovarci</span>
                  </h1>
                </div>
                <p className="font-body text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl italic tracking-wide font-light">{t.visitPage.hero.description}</p>
              </motion.div>

              {/* TIER 2: Next Visit Mural */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-end text-right relative pr-4 lg:pr-12"
              >
                <div className="relative z-10 space-y-2 max-w-4xl group">
                  <div className="space-y-0">
                    <span className="font-heading text-primary text-xl md:text-3xl tracking-[0.5em] uppercase font-bold block italic">{manifestData.displayFullDate.split(',')[0].split(' ')[0]}</span>
                    <h2 className="font-heading text-[12rem] md:text-[18rem] lg:text-[22rem] uppercase tracking-tighter leading-[0.6] italic font-black text-white mix-blend-overlay lg:mix-normal">{manifestData.displayDate.split(' ')[0]}</h2>
                    <span className="font-heading text-primary text-5xl md:text-7xl lg:text-9xl uppercase tracking-tighter leading-[0.8] italic font-black block">{manifestData.displayDate.split(' ').slice(1).join(' ')}</span>
                  </div>
                  <div className="pt-8 border-t border-primary/20 w-full text-right">
                    <p className="font-heading text-primary text-[10px] md:text-xs tracking-[0.6em] uppercase italic">{language === "it" ? "Prossima Esperienza" : "Next Experience"}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* 2. Craft Section */}
          <section className="min-h-[80vh] flex flex-col justify-center mb-[40vh]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              onViewportEnter={() => setActiveStage(NARRATIVE_STAGES[1])}
              className="space-y-12 max-w-3xl"
            >
              <div className="space-y-6">
                <span className="font-heading text-primary text-sm tracking-[0.6em] uppercase">Distillation Mastery</span>
                <h2 className="font-heading text-6xl md:text-8xl uppercase italic tracking-normal leading-tight font-black">L'Arte Del <br/> <span className="text-primary italic">Sapere</span></h2>
              </div>
              <p className="font-body text-xl md:text-2xl text-white/90 italic leading-relaxed font-light">Ogni fase della nostra produzione è un rituale di precisione, dove le materie prime sarde incontrano il fuoco della nostra caldaia a vapore del 1882.</p>
            </motion.div>
          </section>

          {/* 3. Laboratory Section: Stats elevated to primary lines */}
          <section id="booking-anchor" className="min-h-[100vh] flex flex-col justify-center mb-[40vh]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              onViewportEnter={() => setActiveStage(NARRATIVE_STAGES[2])}
              className="space-y-32"
            >
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="h-[2px] w-16 bg-primary" />
                  <span className="font-heading text-primary text-sm tracking-[0.8em] uppercase font-bold">The Heart of Murgia</span>
                </div>
                <h2 className="font-heading text-6xl md:text-9xl uppercase italic tracking-tight leading-none font-black">Il Nostro <br/> <span className="text-primary italic">Laboratorio</span></h2>
              </div>
              
              {/* Elevated Primary Stats (Labels removed as per request) */}
              <div className="flex flex-col gap-10 md:gap-14">
                {[
                  { icon: Clock, value: t.visitPage.expectations.duration.value },
                  { icon: Users, value: t.visitPage.expectations.capacity.value },
                  { icon: ArrowRight, value: t.visitPage.expectations.groups.value }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-8 group">
                    <div className="flex-shrink-0">
                       <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                    </div>
                    <p className="font-heading text-xl md:text-3xl uppercase tracking-[0.3em] italic font-black text-primary leading-tight">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
                  {t.visitPage.expectations.highlights.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-6 group">
                      <span className="font-heading text-primary text-2xl md:text-3xl font-black italic">0{i+1}</span>
                      <p className="font-body text-base md:text-lg text-white italic font-light leading-snug pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* 4. Tasting Finale */}
          <section className="min-h-[60vh] flex flex-col justify-center pb-[40px]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              onViewportEnter={() => setActiveStage(NARRATIVE_STAGES[3])}
              className="space-y-12"
            >
              <div className="space-y-4">
                <span className="text-primary font-heading text-sm md:text-xl tracking-[0.4em] uppercase block font-bold">The Laboratory Finale</span>
                <h2 className="font-heading text-7xl md:text-[10rem] uppercase tracking-normal leading-[0.7] italic font-black">{t.visitPage.tasting.title}</h2>
              </div>
              <p className="font-body text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed italic border-l-4 border-primary/40 pl-12 font-light">{t.visitPage.tasting.description}</p>
            </motion.div>
          </section>

        </div>

        {/* Right Column: Sticky Form Terminal */}
        <SidebarScrollVisibility>
          <div className="w-full h-full relative overflow-hidden border-l border-white/5 shadow-2xl">
             <VisitSidebarContent showCloseButton={false} />
          </div>
        </SidebarScrollVisibility>

      </div>
    </div>
  );
}

function SidebarScrollVisibility({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 100);
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 100,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full md:w-[550px] bg-[#050505] md:h-screen md:sticky md:top-0 z-[10000]"
    >
      {children}
    </motion.div>
  );
}
