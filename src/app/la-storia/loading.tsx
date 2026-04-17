"use client";

import { motion } from "framer-motion";
import Logo from "@/components/Logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-noir z-[100] flex items-center justify-center overflow-hidden">
      {/* 📱 MOBILE ONLY LOADING RITUAL */}
      <div className="md:hidden flex flex-col items-center">
        <motion.div
          className="relative"
          animate={{ 
            scale: [0.98, 1.02, 0.98],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Base Logo (Ghost) */}
          <div className="opacity-10 grayscale">
            <Logo variant="large" theme="light" className="scale-75" />
          </div>
          
          {/* Filling Logo (Animated Mask) */}
          <motion.div 
            className="absolute inset-0 z-10 overflow-hidden"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
              repeatDelay: 0.5
            }}
          >
            <div className="relative">
              <Logo variant="large" theme="light" className="scale-75" />
            </div>
          </motion.div>
        </motion.div>

        {/* 🫧 Subtle Pulsing Label */}
        <motion.span 
          className="mt-12 text-primary/40 font-heading text-[10px] tracking-[0.5em] uppercase"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Caricamento...
        </motion.span>
      </div>

      {/* 💻 DESKTOP: Minimalist Instant Transition */}
      <div className="hidden md:block">
        <div className="w-12 h-12 border-t-2 border-primary rounded-full animate-spin" />
      </div>
    </div>
  );
}
