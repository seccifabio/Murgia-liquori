"use client";

import { motion } from "framer-motion";

interface LiquidImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LiquidImage({ src, alt, className }: LiquidImageProps) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-[2vw] group">
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full ${className || "object-cover"}`}
        whileHover={{ scale: 1.15, x: 20, y: -15 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
