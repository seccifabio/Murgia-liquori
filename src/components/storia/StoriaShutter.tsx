"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "@/context/LanguageContext";
import StoriaPhase from "./StoriaPhase";

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
