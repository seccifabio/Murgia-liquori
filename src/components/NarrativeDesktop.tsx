"use client";

import { motion, MotionValue } from "framer-motion";
import LiquidImage from "./LiquidImage";

interface NarrativeDesktopProps {
  t: any;
  p1SlideY: MotionValue<string>;
  p1Opacity: MotionValue<number>;
  p2SlideY: MotionValue<string>;
  p2Opacity: MotionValue<number>;
  children?: React.ReactNode;
}

export default function NarrativeDesktop({ 
  t, 
  p1SlideY, 
  p1Opacity, 
  p2SlideY, 
  p2Opacity,
  children
}: NarrativeDesktopProps) {
  return (
    <div className="hidden md:block min-h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col pt-32 pb-20 px-20">
        
        <div className="flex-1 relative z-10 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-24 items-center max-w-6xl w-full relative">
            
            {/* SHARED TEXT CONTENT AREA (MASKED) */}
            <div className="relative h-[500px] overflow-hidden">
              {/* Phase 1 Text (Origins) */}
              <motion.div
                style={{ y: p1SlideY, opacity: p1Opacity }}
                className="absolute inset-0 flex flex-col justify-center space-y-6"
              >
                <span className="text-primary font-heading text-xl tracking-widest block uppercase">{t.origins.title}</span>
                <h2 className="text-white font-heading text-8xl leading-none uppercase">
                  {t.origins.subtitle} <br /> <span className="text-primary italic">{t.origins.subtitleAccent}</span>
                </h2>
                <p className="text-white/60 font-body text-lg max-w-md leading-relaxed">
                  {t.origins.description}
                </p>
              </motion.div>

              {/* Phase 2 Text (Heritage) */}
              <motion.div
                style={{ y: p2SlideY, opacity: p2Opacity }}
                className="absolute inset-0 flex flex-col justify-center space-y-6"
              >
                <span className="text-primary font-heading text-xl tracking-widest block uppercase">{t.origins.heritage.title}</span>
                <h2 className="text-white font-heading text-8xl leading-none uppercase">
                  {t.origins.heritage.subtitle} <br /> <span className="text-primary italic">{t.origins.heritage.subtitleAccent}</span>
                </h2>
                <p className="text-white/60 font-body text-lg max-w-md leading-relaxed italic">
                  {t.origins.heritage.description}
                </p>
              </motion.div>
            </div>

            {/* SHARED IMAGE MASK (The Rounded Frame) */}
            <div className="relative aspect-[4/5] max-h-[65vh] w-full">
              <div className="absolute inset-0 overflow-hidden rounded-[2vw] border border-white/10 bg-noir">
                {/* Image 1 (Origins) */}
                <motion.div 
                  style={{ y: p1SlideY }}
                  className="absolute inset-0"
                >
                  <LiquidImage src="/images/products/VillacidroMurgia02.png" alt="Murgia Origins" />
                </motion.div>

                {/* Image 2 (Heritage) */}
                <motion.div 
                  style={{ y: p2SlideY }}
                  className="absolute inset-0"
                >
                  <LiquidImage src="/images/heritage-labels.jpg" alt="Murgia Legacy" />
                </motion.div>
              </div>
            </div>

          </div>
        </div>

        {/* Collection & Overlay context */}
        {children}
      </div>
    </div>
  );
}
