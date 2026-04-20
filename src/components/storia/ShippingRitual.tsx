"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "@/context/LanguageContext";

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
          <div key={stage.id} className="relative space-y-12">
            {/* Focal Point Indicator */}
            <div className="flex items-center gap-4">
              <span className="font-heading text-primary text-xl tracking-tighter">0{i + 1}</span>
              {!isMobile && <div className="h-px flex-1 bg-white/10" />}
              <span className="font-heading text-[10px] tracking-[0.4em] uppercase text-white/40 italic">{stage.metric}</span>
            </div>

            {/* Cinematic Asset */}
            <motion.div
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={isMobile ? { duration: 0 } : { duration: 0.8 }}
              className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10"
            >
              <img 
                src={stage.img} 
                alt={stage.title} 
                className="w-full h-full object-cover grayscale" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent" />
            </motion.div>

            {/* Narrative Context */}
            <motion.div 
              initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={isMobile ? { duration: 0 } : { duration: 0.6 }}
              className="space-y-6"
            >
              <h3 className="font-heading text-6xl uppercase tracking-tighter leading-none text-white italic">
                {stage.title.split(' ')[0]} <br/> 
                <span className="text-primary">{stage.title.split(' ').slice(1).join(' ')}</span>
              </h3>
              <p className="font-body text-white/60 text-lg italic tracking-wide leading-relaxed border-l border-primary/30 pl-6">
                {stage.description}
              </p>
            </motion.div>
          </div>
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
            <div 
              key={stage.id} 
              className="relative w-screen h-full flex items-center justify-center px-6 md:px-20"
            >
              {/* Background Archival Asset */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={stage.img} 
                  alt={stage.title} 
                  className="w-full h-full object-cover grayscale brightness-[0.3]" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-noir via-transparent to-noir" />
              </div>

              {/* Content Terminal */}
              <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-heading text-primary text-2xl tracking-tighter">0{i + 1}</span>
                    <div className="h-px w-12 bg-primary/30" />
                    <span className="font-heading text-[10px] tracking-[0.4em] uppercase text-white/40 italic">{stage.metric}</span>
                  </div>
                  
                  <h3 className="font-heading text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-[0.85] text-white italic">
                    {stage.title.split(' ')[0]} <br/> 
                    <span className="text-primary">{stage.title.split(' ').slice(1).join(' ')}</span>
                  </h3>
                  
                  <p className="font-body text-white/60 text-lg md:text-2xl italic tracking-wide leading-relaxed max-w-xl border-l border-white/10 pl-8">
                    {stage.description}
                  </p>
                </motion.div>

                {/* Focus Artifact Image */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-square md:aspect-[4/5] bg-white/5 rounded-2xl overflow-hidden shadow-2xl group border border-white/5"
                >
                  <img 
                    src={stage.img} 
                    alt={stage.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
                </motion.div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

