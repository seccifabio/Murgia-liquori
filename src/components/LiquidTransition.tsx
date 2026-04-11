"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// The Alchemical Path Manifest
// We define the SVG paths for the Liquid Morphing
export default function LiquidTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <main key={pathname}>
        {children}
      </main>

      {/* The Mirror Shutter Shutter: High-Fidelity Dual Wipe */}
      <div className="fixed inset-0 z-[10000] pointer-events-none flex flex-col">
        {/* Top Half */}
        <motion.div 
          initial={{ y: "-100%" }}
          animate={isTransitioning ? {
            y: ["-100%", "0%", "-100%"],
          } : { y: "-100%" }}
          transition={{
            duration: 0.8,
            times: [0, 0.4, 1],
            ease: [0.87, 0, 0.13, 1]
          }}
          className="w-full h-1/2 bg-primary"
        />
        {/* Bottom Half */}
        <motion.div 
          initial={{ y: "100%" }}
          animate={isTransitioning ? {
            y: ["100%", "0%", "100%"],
          } : { y: "100%" }}
          transition={{
            duration: 0.8,
            times: [0, 0.4, 1],
            ease: [0.87, 0, 0.13, 1]
          }}
          className="w-full h-1/2 bg-primary"
        />
      </div>
    </>
  );
}
