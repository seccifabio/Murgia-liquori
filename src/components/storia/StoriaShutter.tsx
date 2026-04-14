"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "@/context/LanguageContext";

function StoriaPhase({ 
  phase, 
  i, 
  scrollYProgress,
  isMobile,
  totalPhases
}: { 
  phase: any, 
  i: number, 
  scrollYProgress: MotionValue<number>,
  isMobile: boolean,
  totalPhases: number
}) {
  const start = i / totalPhases;
  const end = (i + 1) / totalPhases;
  
  const titleY = useTransform(scrollYProgress, [start, end], [40, -40]);
  const bodyY = useTransform(scrollYProgress, [start, end], [20, -20]);
  const imgScale = useTransform(scrollYProgress, [start, end], [1.1, 1]);
  const imgX = useTransform(scrollYProgress, [start, end], [30, -30]);

  const imgClipPath = useTransform(
    scrollYProgress,
    [start, start + 0.05],
    [i === 0 ? "inset(0% 0 0 0)" : "inset(0 0 100% 0)", "inset(0% 0 0 0)"]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, i === totalPhases - 1 ? 1 : 0]
  );

  return (
    <motion.div 
      className="md:absolute inset-0 w-full md:h-full md:overflow-hidden relative mb-24 md:mb-0" 
      style={{ zIndex: i + 10, clipPath: isMobile ? 'none' : imgClipPath }}
    >
      <div className="md:absolute inset-0 w-full h-full flex flex-col md:flex-row">
        {/* Visual Section: Monumental Stage */}
        <motion.div 
          style={{ clipPath: isMobile ? 'none' : imgClipPath }}
          className="relative h-[50vh] md:h-full overflow-hidden perspective-[1000px] w-full md:w-1/2"
        >
          {/* Layer 1: Atmospheric Base */}
          <motion.div 
            style={{ 
              scale: isMobile ? 1 : imgScale,
              x: isMobile ? 0 : imgX
            }}
            className="absolute inset-0 w-full h-full opacity-40"
          >
            <img 
              src={phase.img} 
              alt={phase.title} 
              className="w-full h-full object-cover grayscale brightness-50" 
            />
          </motion.div>
          
          {/* Layer 2: Monumental Alchemical Fragment */}
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4 md:p-12 lg:p-16">
            <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
              {/* Structural White Frame */}
              <div className="p-4 md:p-8 bg-white shadow-[0_80px_160px_rgba(0,0,0,0.95)] transform -rotate-2 aspect-square md:aspect-[4/5] w-full max-w-[85%] md:max-w-none max-h-[70vh] md:max-h-[90vh]">
                {/* Internal Mask Terminal */}
                <div className="relative w-full h-full overflow-hidden bg-noir shadow-inner">
                  <motion.img 
                    animate={isMobile ? {} : { 
                      x: ["-5%", "5%", "-5%"], 
                      y: ["-3%", "3%", "-3%"],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 45, 
                      repeat: Infinity, 
                      ease: "linear" as const 
                    }}
                    src={phase.floatingImg} 
                    alt="Archival Monument" 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[115%] min-h-[115%] w-auto h-auto object-cover max-w-none" 
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-primary/5 blur-[200px] rounded-full -z-10" />
            </div>
          </div>

          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent to-noir" />
          <div className="md:hidden absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
        </motion.div>

        {/* Narrative Section: Staggered Content */}
        <motion.div 
          style={{ opacity: isMobile ? 1 : textOpacity }}
          className="relative h-full p-8 md:p-20 lg:p-32 pt-24 md:pt-32 flex flex-col justify-center z-30 w-full md:w-1/2 bg-noir"
        >
          <div className="mb-8">
            <motion.span 
              initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0 : 0.6 }}
              style={{ y: isMobile ? 0 : bodyY }} 
              className="text-primary font-heading text-xl tracking-[0.4em] uppercase block mb-6 border-l-2 border-primary pl-6"
            >
              {phase.year}
            </motion.span>
            <motion.h2 
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: isMobile ? 0 : 0.8, ease: "easeOut" as const }}
              style={{ y: isMobile ? 0 : titleY }} 
              className="text-white font-heading text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter leading-[0.9] md:leading-[0.7] italic mt-8 mb-10"
            >
              {phase.title}
            </motion.h2>
            <motion.h3 
              initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: isMobile ? 0 : 0.3 }}
              style={{ y: isMobile ? 0 : bodyY }} 
              className="text-white/40 font-heading text-2xl md:text-3xl uppercase tracking-widest"
            >
              {phase.subtitle}
            </motion.h3>
          </div>
          <motion.p 
            initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: isMobile ? 0 : 0.3 }}
            style={{ y: isMobile ? 0 : bodyY }} 
            className="text-white/70 font-body text-sm md:text-lg lg:text-xl leading-relaxed tracking-wide italic max-w-2xl mt-8"
          >
            {phase.description}
          </motion.p>
          <div className="mt-12 md:mt-20 flex items-center gap-12 opacity-20">
            <div className="h-px flex-1 bg-white" />
            <span className="font-heading text-[10px] tracking-[0.6em] text-white uppercase whitespace-nowrap">
                {phase.archiveLabel}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function StoriaShutter() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const HISTORY_PHASES = [
    {
      id: "origins",
      ...t.storia.phases.origins,
      img: "/images/storia/storia_origins_1882_1775937746086.png",
      floatingImg: "/images/storia/Villacidro-Murgia.jpg",
      archiveLabel: t.storia.archive
    },
    {
      id: "giallo",
      ...t.storia.phases.giallo,
      img: "/images/storia/storia_zafferano_gold_1775937759636.png",
      floatingImg: "/images/storia/etichetta_villacidro_murgia.webp",
      archiveLabel: t.storia.archive
    },
    {
      id: "resilience",
      ...t.storia.phases.resilience,
      img: "/images/storia/storia_resilience_ledger_1775937773299.png",
      floatingImg: "/images/storia/image.webp",
      archiveLabel: t.storia.archive
    }
  ];

  return (
    <div ref={containerRef} className="relative h-auto md:h-[600vh] bg-noir">
      {hasMounted && (
        <div className="md:sticky top-0 md:h-screen w-full md:overflow-hidden">
          <div className="flex flex-col md:block">
            {HISTORY_PHASES.map((phase, i) => (
              <StoriaPhase 
                key={phase.id} 
                phase={phase} 
                i={i} 
                scrollYProgress={scrollYProgress} 
                isMobile={isMobile}
                totalPhases={HISTORY_PHASES.length}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
