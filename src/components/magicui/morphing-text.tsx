"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Morphing Text Component - isolation version
 * Default entrance is static/clean. Morphing only triggers on text updates (hover).
 */
interface MorphingTextProps {
  texts: string[];
  className?: string;
  currentIndex?: number;
}

export const MorphingText = ({ texts, className, currentIndex = 0 }: MorphingTextProps) => {
  const currentText = texts[currentIndex % texts.length];
  const [isMorphing, setIsMorphing] = useState(false);
  const isFirstRender = useRef(true);

  // Only trigger morphing logic if it's NOT the first render (i.e. on hover change)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setIsMorphing(true);
  }, [currentText]);

  return (
    <div className={cn("relative inline-block", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id="morph-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentText}
          // Clean entrance for the default state
          initial={{ opacity: 0, filter: "none" }}
          animate={{ opacity: 1, filter: isMorphing ? "url(#morph-goo)" : "none" }}
          exit={{ opacity: 0, filter: "url(#morph-goo)" }}
          transition={{ 
            duration: 0.5, 
            ease: [0.33, 1, 0.68, 1],
            opacity: { duration: 0.3 }
          }}
          onAnimationComplete={() => setIsMorphing(false)}
          className="inline-block origin-left"
          style={{ 
            filter: isMorphing ? "url(#morph-goo)" : "none",
            WebkitFilter: isMorphing ? "url(#morph-goo)" : "none"
          }}
        >
          {currentText}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
