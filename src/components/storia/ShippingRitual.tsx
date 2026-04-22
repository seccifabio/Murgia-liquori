"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "@/context/LanguageContext";

import RitualStep from "./RitualStep";

export default function ShippingRitual() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const STAGES = [
    {
      id: "preparing",
      title: t.shipping.preparing.title,
      description: t.shipping.preparing.description,
      img: "/images/storia/shipping_ritual_lab_preparing.png",
      metric: t.shipping.preparing.metric
    },
    {
      id: "sealing",
      title: t.shipping.sealing.title,
      description: t.shipping.sealing.description,
      img: "/images/storia/shipping_ritual_hand_seal.png",
      metric: t.shipping.sealing.metric
    },
    {
      id: "dispatch",
      title: t.shipping.dispatch.title,
      description: t.shipping.dispatch.description,
      img: "/images/storia/shipping_ritual_dispatch.png",
      metric: t.shipping.dispatch.metric
    }
  ];
  
  const [isMobile, setIsMobile] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track active index for the sticky progress indicator
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(Math.floor(latest * 3), 2);
    if (idx !== activeIdx) setActiveIdx(idx);
  });

  // Kinetic Horizontal Traversal: Map vertical scroll to horizontal x translation
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);
  
  // Fade out indicator when section ends
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  if (isMobile) {
    return (
      <section ref={containerRef} className="relative bg-noir py-24 space-y-32 px-6">
        {STAGES.map((stage, i) => (
          <RitualStep key={stage.id} stage={stage} i={i} isMobile={true} />
        ))}
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-noir">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Fractional Navigation Gauge: Sticky & Fade-out */}
        <motion.div 
          style={{ opacity: indicatorOpacity }}
          className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-4 z-[100]"
        >
          {STAGES.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 transition-all duration-500 shadow-sm ${activeIdx === idx ? "w-12 bg-primary" : "w-4 bg-white/30"}`}
            />
          ))}
        </motion.div>

        {/* Horizontal Manifestation Vessel */}
        <motion.div style={{ x }} className="flex h-full w-[300vw]">
          {STAGES.map((stage, i) => (
            <RitualStep key={stage.id} stage={stage} i={i} isMobile={false} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

