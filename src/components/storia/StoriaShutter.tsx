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
  
  // Visibility logic for the phase
  const visibilityOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.05), start, end, Math.min(1, end + 0.05)],
    [0, 1, 1, i === totalPhases - 1 ? 1 : 0]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [start, start + 0.1, end - 0.1, end],
    [0, 1, 1, i === totalPhases - 1 ? 1 : 0]
  );

  const imgClipPath = useTransform(
    scrollYProgress,
    [start, start + 0.1],
    [i === 0 ? "inset(0% 0 0 0)" : "inset(0 0 100% 0)", "inset(0% 0 0 0)"]
  );

  return (
    <motion.div 
      className="md:absolute inset-0 w-full md:h-full md:overflow-hidden relative mb-24 md:mb-0" 
      style={{ 
        zIndex: i + 10, 
        clipPath: isMobile ? 'none' : imgClipPath,
        opacity: isMobile ? 1 : visibilityOpacity 
      }}
    >
      <div className="md:absolute inset-0 w-full h-full flex flex-col md:flex-row bg-noir">
        {/* Visual Section: STATIC BACKGROUND */}
        <div className="relative h-[60vh] md:h-full w-full md:w-1/2 overflow-hidden bg-noir">
          <img 
            src={phase.floatingImg} 
            alt={phase.title} 
            className="w-full h-full object-cover grayscale brightness-50" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-noir/80" />
        </div>

        {/* Narrative Section */}
        <motion.div 
          style={{ opacity: isMobile ? 1 : textOpacity }}
          className="relative h-full p-8 md:p-20 lg:p-32 pt-24 md:pt-32 flex flex-col justify-center z-30 w-full md:w-1/2 bg-noir"
        >
          <div className="mb-8">
            <span className="text-primary font-heading text-xl tracking-[0.4em] uppercase block mb-6 border-l-2 border-primary pl-6">
              {phase.year}
            </span>
            <h2 className="text-white font-heading text-6xl md:text-8xl long:text-9xl uppercase tracking-tighter leading-[0.9] md:leading-[0.7] italic mt-8 mb-10">
              {phase.title}
            </h2>
            <h3 className="text-white/40 font-heading text-2xl md:text-3xl uppercase tracking-widest">
              {phase.subtitle}
            </h3>
          </div>
          <p className="text-white/70 font-body text-sm md:text-lg lg:text-xl leading-relaxed tracking-wide italic max-w-2xl mt-8">
            {phase.description}
          </p>
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
      floatingImg: "/images/storia/gennaro_origins.png",
      archiveLabel: t.storia.archive
    },
    {
      id: "giallo",
      ...t.storia.phases.giallo,
      floatingImg: "/images/storia/etichetta_villacidro_murgia.webp",
      archiveLabel: t.storia.archive
    },
    {
      id: "resilience",
      ...t.storia.phases.resilience,
      floatingImg: "/images/storia/storia_resilience_ledger_1775937773299.png",
      archiveLabel: t.storia.archive
    }
  ];

  return (
    <div ref={containerRef} className="relative h-auto md:h-[600vh] bg-noir z-20">
      {hasMounted && (
        <div className="md:sticky top-0 md:h-screen w-full md:overflow-hidden bg-noir">
          <div className="flex flex-col md:block h-full">
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
