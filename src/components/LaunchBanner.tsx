import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function LaunchBanner({ variant = "hero" }: { variant?: "hero" | "discovery" }) {
  const { t } = useTranslation();
  const { setIsPreLaunchOpen } = useCart();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const saturateValue = useTransform(scrollYProgress, [0.3, 0.6], [1.4, 1]);
  const filterValue = useTransform(saturateValue, (v) => `saturate(${v})`);

  const isDiscovery = variant === "discovery";

  return (
    <section 
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-noir ${isDiscovery ? 'h-[50vh]' : 'h-[90vh] md:h-[80vh] mt-20 border-t border-white/5'}`}
    >
      {/* Background: Heritage Manifest */}
      <motion.div 
        style={{ 
          y, 
          scale: scaleValue,
          maskImage: 'linear-gradient(to right, black, black 30%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to right, black, black 30%, transparent 90%)'
        }}
        className="absolute inset-0 z-0"
      >
        <video 
          src="/images/launch/liquore.mp4"
          className="w-full h-full object-cover opacity-80 grayscale-50 saturate-75 transition-all duration-1000"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir via-transparent to-noir opacity-40" />
      </motion.div>

      {/* Content Layer: The New Artifact */}
      <div className={`relative z-10 w-full h-full max-w-7xl mx-auto px-6 py-12 md:py-0 flex flex-col md:flex-row items-center ${isDiscovery ? 'justify-center' : 'justify-between'} md:justify-between pointer-events-none`}>
        <motion.div 
          style={{ opacity }}
          className={`flex-1 flex flex-col items-center md:items-start ${isDiscovery ? 'justify-center' : 'justify-start'} text-center md:text-left ${isDiscovery ? 'space-y-2 md:space-y-4' : 'space-y-4 md:space-y-8'}`}
        >
          <span className={`text-primary font-heading tracking-[0.5em] uppercase italic ${isDiscovery ? 'text-sm md:text-lg' : 'text-lg md:text-2xl'}`}>
            {t.launchBanner.subtitle}
          </span>
          <h2 className={`text-white font-heading uppercase tracking-tighter leading-none ${isDiscovery ? 'text-3xl md:text-6xl text-center md:text-left' : 'text-5xl md:text-9xl'}`} dangerouslySetInnerHTML={{ __html: isDiscovery ? t.launchBanner.title : t.launchBanner.title.replace(' ', '<br />') }} />
          <p className="text-white/40 font-heading text-[10px] md:text-sm tracking-[0.2em] uppercase max-w-xs md:max-w-md">
            {isDiscovery ? t.launchBanner.comingSoon : t.launchBanner.description}
          </p>
          
          <div className="pt-2 md:pt-4 pointer-events-auto">
            <button 
              onClick={() => setIsPreLaunchOpen(true)}
              className="murgia-btn-primary px-8 py-4 md:px-12 md:py-6 text-sm tracking-[0.4em] transform hover:scale-105 active:scale-95"
            >
              <span className="murgia-btn-text">{t.launchBanner.cta}</span>
              <ArrowRight className="murgia-btn-icon" />
              <div className="murgia-btn-hover-wipe" />
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 200, opacity: 0, rotate: 10 }}
          whileInView={{ y: 0, opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute left-1/2 -translate-x-1/2 md:left-auto md:right-0 md:translate-x-10 bottom-[50px] w-[80vw] md:w-[40vw] h-full flex items-end justify-center md:justify-end z-10 translate-y-20 pointer-events-none ${isDiscovery ? 'hidden md:flex' : ''}`}
        >
          <motion.div 
            style={{ filter: filterValue }}
            className="relative w-full h-full transition-all duration-700 pointer-events-auto"
          >
             <Image 
               src="/images/launch/liquore.png"
               alt="New Murgia Product"
               fill
               className="object-contain object-right-bottom"
             />
          </motion.div>
        </motion.div>
      </div>

      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 bg-texture opacity-5 pointer-events-none z-20" />
    </section>
  );
}
