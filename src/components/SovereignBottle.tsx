"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SovereignBottle() {
  const { scrollYProgress } = useScroll();

  // JOURNEY MAPPING: Fixed viewport positioning
  // Entrance on Hero (0) -> Transformation on Ritual (~0.7-0.9) -> Exit at Footer (0.95)
  const yDrift = useTransform(scrollYProgress, [0, 0.7, 0.9, 1], ["0%", "0%", "0%", "0%"]); // Stays fixed at baseline
  const scale = useTransform(scrollYProgress, [0.6, 0.85], [1, 1.2]); // Zoom occurs as Ritual arrives
  const opacity = useTransform(scrollYProgress, [0, 0.01, 0.9, 0.95], [1, 1, 1, 0]); // Always on, fades at Footer

  return (
    <motion.div
      style={{ 
        position: "fixed",
        bottom: "8%",
        right: "5%",
        scale,
        opacity,
        zIndex: 100,
        pointerEvents: "none",
        y: yDrift
      }}
      className="hidden md:flex flex-col items-center justify-center"
    >
      {/* Continuous Oscillating Floating Ritual */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img 
          src="/images/giallo_sovereign.png" 
          alt="Villacidro Giallo" 
          className="h-[45vh] md:h-[55vh] w-auto drop-shadow-2xl"
        />
      </motion.div>
    </motion.div>
  );
}
