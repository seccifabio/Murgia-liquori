"use client";

import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  variant?: "small" | "large";
  theme?: "light" | "dark";
}

export default function Logo({ className = "", variant = "small", theme = "light" }: LogoProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "text-noir" : "text-white";
  const subColor = isDark ? "text-noir/60" : "text-primary";
  if (variant === "large") {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <h1 className={`text-[12vw] md:text-[8vw] font-heading leading-[0.8] tracking-[-0.05em] uppercase ${textColor} drop-shadow-2xl`}>
            MURGIA
          </h1>
          <div className="absolute -bottom-[2vw] left-1/2 -translate-x-1/2 w-full flex items-center justify-between px-2">
            <span className={`h-[1px] ${isDark ? "bg-noir/20" : "bg-primary/40"} flex-1`} />
            <span className={`font-heading text-[1.5vw] tracking-[0.8em] ${subColor} px-4 whitespace-nowrap`}>
              LIQUORI
            </span>
            <span className={`h-[1px] ${isDark ? "bg-noir/20" : "bg-primary/40"} flex-1`} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <span className={`font-heading text-3xl tracking-tighter ${textColor}`}>
        MURGIA
      </span>
      <span className={`font-heading text-[12px] tracking-[0.44em] ${subColor} mt-[-4px]`}>
        LIQUORI
      </span>
    </div>
  );
}
