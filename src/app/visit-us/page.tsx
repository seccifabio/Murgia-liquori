"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import { useCMS } from "@/context/CMSContext";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  Users, 
  Clock, 
  Quote,
  ArrowRight
} from "lucide-react";
import VisitSidebarContent from "@/components/visit/VisitSidebarContent";
import { VISIT_MANIFEST } from "@/manifest/visit";
import Footer from "@/components/Footer";
import EventGallery from "@/components/EventGallery";
import { useInView } from "framer-motion";

/* Visit Us Ritual: A cinematic immersion into the Murgia Laboratory */
/* Layout Refinement: Simplified Laboratory stats by removing redundant labels and elevating values to primary status */

const NARRATIVE_STAGES = [
  { id: "hero", src: "/images/visit/liquorificio_3.webp", alt: "Murgia Heritage Entrance" },
  { id: "craft", src: "/images/visit/liquorificio_2.webp", alt: "Distillation Alchemy" },
  { id: "laboratory", src: "/images/visit/laboratory.png", alt: "The Secret Laboratory" },
  { id: "tasting", src: "/images/visit/Tasting.png", alt: "The Golden Finale" }
];

export default function VisitUsPage() {
  const { language } = useTranslation();
  const { config, loading } = useCMS();
  const t = VISIT_MANIFEST[language as "it" | "en"] || VISIT_MANIFEST.it;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  // Narrative State Tracking
  const [activeStage, setActiveStage] = useState(NARRATIVE_STAGES[0]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const isFooterInView = useInView(footerRef, { amount: 0.1 });

  useEffect(() => {
    setIsSidebarVisible(scrollYProgress.get() > 0.15);
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsSidebarVisible(latest > 0.15);
  });

  // Cinematic Background Scaling & Filters
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const grayscale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1]);
  
  const filterMotion = useTransform(
    [grayscale],
    ([g]) => `grayscale(${g}) brightness(0.4)`
  );

  if (loading) return (
    <div ref={containerRef} className="min-h-screen bg-noir flex items-center justify-center font-heading text-white tracking-[1em] uppercase italic">
      Sincronizzazione Lab...
    </div>
  );

  // Dynamic Configuration from Control Room
  const nextVisit = config?.visits?.[0];
  const visitActive = nextVisit?.active ?? VISIT_MANIFEST.active;
  const visitDateString = nextVisit?.date || VISIT_MANIFEST.date;

  // Use the manifest as a baseline but override with CMS date
  const manifestData = {
    ...t,
    displayDate: nextVisit?.date 
      ? new Date(`${nextVisit.date}T00:00:00`).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US', { day: 'numeric', month: 'short' })
      : t.displayDate,
    displayFullDate: nextVisit?.date 
      ? new Date(`${nextVisit.date}T00:00:00`).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
      : t.displayFullDate
  };

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
                    {t.visitPage.hero.title} <br/> <span className="text-primary italic">{t.visitPage.hero.titleAccent}</span>
                  </h1>
                </div>
                <p className="font-body text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl italic tracking-wide font-light">{t.visitPage.hero.description}</p>
              </motion.div>

              {/* TIER 2: Next Visit Mural or Inactive Message */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center md:items-end text-center md:text-right relative px-4 lg:pr-12"
              >
                {visitActive !== false ? (
                  <div className="relative z-10 space-y-2 max-w-4xl group">
                    <div className="space-y-0">
                      <span className="font-heading text-primary text-xl md:text-3xl tracking-[0.5em] uppercase font-bold block italic mb-2">
                        {manifestData.displayFullDate.split(' ')[0]}
                      </span>
                      <div className="flex items-start gap-4 overflow-visible">
                        <span className="font-heading text-primary text-6xl md:text-8xl lg:text-9xl uppercase italic font-black leading-tight py-4 mt-4 overflow-visible">
                          {nextVisit?.date ? nextVisit.date.split('-')[2] : VISIT_MANIFEST.date.split('-')[2]}
                        </span>
                        <h2 className="font-heading text-[10rem] md:text-[15rem] lg:text-[18rem] uppercase tracking-tighter leading-tight py-4 pr-12 italic font-black text-white mix-blend-overlay lg:mix-normal overflow-visible">
                          {new Date(`${visitDateString}T00:00:00`).toLocaleDateString('it-IT', { month: 'short' })}
                        </h2>
                      </div>
                    </div>
                    <div className="pt-8 border-t border-primary/20 w-full text-center md:text-right">
                      <p className="font-heading text-primary text-[10px] md:text-xs tracking-[0.6em] uppercase italic">{language === "it" ? "Prossima Esperienza" : "Next Experience"}</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 space-y-8 max-w-4xl">
                    <div className="pt-8 border-t border-primary/20 w-full">
                      <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.2em] font-bold text-white leading-relaxed max-w-2xl">
                        {t.visitPage.expectations.noVisits}
                      </h2>
                      <p className="font-heading text-primary text-[10px] md:text-xs tracking-[0.6em] uppercase italic mt-8">
                        {language === "it" ? "Ritorni presto per nuovi aggiornamenti" : "Check back soon for updates"}
                      </p>
                    </div>
                  </div>
                )}
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
                <h2 className="font-heading text-6xl md:text-8xl uppercase italic tracking-normal leading-tight font-black">{t.visitPage.expectations.craftTitle} <br/> <span className="text-primary italic">{t.visitPage.expectations.craftTitleAccent}</span></h2>
              </div>
              <p className="font-body text-xl md:text-2xl text-white/90 italic leading-relaxed font-light">{t.visitPage.expectations.craftDescription}</p>
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
                <h2 className="font-heading text-6xl md:text-9xl uppercase italic tracking-tight leading-none font-black">{t.visitPage.expectations.title} <br/> <span className="text-primary italic">{t.visitPage.expectations.titleAccent}</span></h2>
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

        {/* Right Column: Sticky Form Terminal (Hidden if Inactive) */}
        {visitActive !== false && (
          <SidebarScrollVisibility 
            isVisible={isSidebarVisible}
            hide={isFooterInView}
          >
            <div className="w-full h-full relative overflow-hidden border-l border-white/5 shadow-2xl">
               <VisitSidebarContent showCloseButton={false} />
            </div>
          </SidebarScrollVisibility>
        )}

      </div>

      <EventGallery />

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
}

function SidebarScrollVisibility({ children, isVisible, hide }: { children: React.ReactNode, isVisible: boolean, hide: boolean }) {
  const shouldShow = isVisible && !hide;

  return (
    <motion.div
      initial={false}
      animate={{ 
        opacity: shouldShow ? 1 : 0,
        x: shouldShow ? 0 : 50,
        pointerEvents: shouldShow ? "auto" : "none"
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full md:w-[550px] bg-[#050505] md:h-screen md:sticky md:top-0 z-[10000]"
    >
      {children}
    </motion.div>
  );
}
