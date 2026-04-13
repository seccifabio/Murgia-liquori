"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const HISTORY_PHASES = [
  {
    id: "origins",
    year: "1882-1886",
    title: "Le Origini",
    subtitle: "IL CHIMICO & IL VAPORE",
    description: "Gennaro Murgia, allievo di Antonio Pacinotti, fonda la distilleria a vapore a Villacidro. Sfruttando l'abbondanza di materie prime locali, crea le prime acquaviti e liquori che segneranno un'epoca.",
    img: "/images/storia/storia_origins_1882_1775937746086.png",
    floatingImg: "/images/storia/Villacidro-Murgia.jpg",
    color: "bg-noir"
  },
  {
    id: "giallo",
    year: "L'ORO BRILLANTE",
    title: "Villacidro Giallo",
    subtitle: "L'ALCHIMIA DELLO ZAFFERANO",
    description: "Il prodotto simbolo nasce dalla sapienza erboristica del fondatore. L'uso dello zafferano puro non solo conferisce il colore oro brillante, ma definisce l'anima aromatica di Murgia nel mondo.",
    img: "/images/storia/storia_zafferano_gold_1775937759636.png",
    floatingImg: "/images/storia/etichetta_villacidro_murgia.webp",
    color: "bg-noir-light"
  },
  {
    id: "resilience",
    year: "1940-1950",
    title: "La Resilienza",
    subtitle: "IL FUOCO di TERESITA",
    description: "Dopo le guerre mondiali, l'azienda rischia la chiusura. È la tenacia di Teresita Belingardi a salvare la produzione, mantenendo segrete le ricette e accendendo nuovamente gli alambicchi.",
    img: "/images/storia/storia_resilience_ledger_1775937773299.png",
    floatingImg: "/images/storia/image.webp",
    color: "bg-noir"
  }
];

function StoriaPhase({ 
  phase, 
  i, 
  scrollYProgress,
  isMobile
}: { 
  phase: any, 
  i: number, 
  scrollYProgress: MotionValue<number>,
  isMobile: boolean
}) {
  const start = i / HISTORY_PHASES.length;
  const end = (i + 1) / HISTORY_PHASES.length;
  
  // NARRATIVE ANIMATIONS (Desktop Only)

  const titleY = useTransform(scrollYProgress, [start, end], [40, -40]);
  const bodyY = useTransform(scrollYProgress, [start, end], [20, -20]);
  const imgScale = useTransform(scrollYProgress, [start, end], [1.1, 1]);
  const imgX = useTransform(scrollYProgress, [start, end], [30, -30]);

  const imgClipPath = useTransform(
    scrollYProgress,
    [start, start + 0.05],
    [i === 0 ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)", "inset(0% 0 0 0)"]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, i === HISTORY_PHASES.length - 1 ? 1 : 0]
  );

  return (
    <div 
      className="md:absolute inset-0 w-full md:h-full md:overflow-hidden relative mb-24 md:mb-0" 
      style={{ zIndex: i + 10, clipPath: isMobile ? 'none' : undefined }}
    >
      <div className="md:absolute inset-0 w-full h-full flex flex-col md:flex-row">
        {/* Visual Section: Monumental Stage */}
        <motion.div 
          style={{ clipPath: isMobile ? 'none' : imgClipPath }}
          className="relative h-[50vh] md:h-full overflow-hidden perspective-[1000px] w-full md:w-1/2 border-r border-white/5"
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
          <div className="absolute inset-0 z-20 flex items-center justify-center p-12">
            <motion.div 
              animate={{ x: [-10, 10, -10], y: [-5, 5, -5] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-full flex items-center justify-center pointer-events-none"
            >
              <img 
                src={phase.floatingImg} 
                alt="Archival Monument" 
                className="w-full h-full object-contain drop-shadow-[0_60px_60px_rgba(0,0,0,1)]" 
              />
              <div className="absolute inset-0 bg-primary/5 blur-[160px] rounded-full -z-10" />
            </motion.div>
          </div>

          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent to-noir" />
          <div className="md:hidden absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent" />
        </motion.div>

        {/* Narrative Section: Staggered Content */}
        <motion.div 
          style={{ opacity: isMobile ? 1 : textOpacity }}
          className="relative h-full p-8 md:p-20 lg:p-32 pt-12 md:pt-48 flex flex-col justify-start md:justify-center z-30 w-full md:w-1/2 bg-noir"
        >
          <div className="mb-12">
            <motion.span style={{ y: isMobile ? 0 : bodyY }} className="text-primary font-heading text-xl tracking-[0.4em] uppercase block mb-8 border-l-2 border-primary pl-6">
              {phase.year}
            </motion.span>
            <motion.h2 style={{ y: isMobile ? 0 : titleY }} className="text-white font-heading text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter leading-[0.9] md:leading-[0.7] italic mb-10">
              {phase.title}
            </motion.h2>
            <motion.h3 style={{ y: isMobile ? 0 : bodyY }} className="text-white/40 font-heading text-2xl md:text-3xl uppercase tracking-widest">
              {phase.subtitle}
            </motion.h3>
          </div>
          <motion.p style={{ y: isMobile ? 0 : bodyY }} className="text-white/70 font-body text-base md:text-xl lg:text-2xl leading-relaxed uppercase tracking-widest italic border-t border-white/10 pt-10 max-w-2xl">
            {phase.description}
          </motion.p>
          <div className="mt-12 md:mt-20 flex items-center gap-12 opacity-20">
            <div className="h-px flex-1 bg-white" />
            <span className="font-heading text-[10px] tracking-[0.6em] text-white uppercase whitespace-nowrap">Murgia Archivio</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default function StoriaShutter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <div ref={containerRef} className="relative h-auto md:h-[600vh] bg-noir">
      <div className="md:sticky top-0 md:h-screen w-full md:overflow-hidden">
        <div className="flex flex-col md:block">
          {HISTORY_PHASES.map((phase, i) => (
            <StoriaPhase 
              key={phase.id} 
              phase={phase} 
              i={i} 
              scrollYProgress={scrollYProgress} 
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
