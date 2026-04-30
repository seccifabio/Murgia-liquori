"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const PHOTOS = [
  { src: "Still 2026-04-30 172111_1.2.1.jpg", aspect: "aspect-[4/5]" },
  { src: "Still 2026-04-30 172316_1.1.1.jpg", aspect: "aspect-square" },
  { src: "Still 2026-04-30 172328_1.10.1.jpg", aspect: "aspect-[3/4]" },
  { src: "Still 2026-04-30 172328_1.11.1.jpg", aspect: "aspect-[4/5]" },
  { src: "Still 2026-04-30 172328_1.12.1.jpg", aspect: "aspect-[2/3]" },
  { src: "Still 2026-04-30 172328_1.13.1.jpg", aspect: "aspect-square" },
  { src: "Still 2026-04-30 172328_1.14.1.jpg", aspect: "aspect-[3/4]" },
  { src: "Still 2026-04-30 172328_1.15.1.jpg", aspect: "aspect-[4/5]" },
  { src: "Still 2026-04-30 172328_1.16.1.jpg", aspect: "aspect-square" },
  { src: "Still 2026-04-30 172328_1.17.1.jpg", aspect: "aspect-[2/3]" },
  { src: "Still 2026-04-30 172328_1.18.1.jpg", aspect: "aspect-[3/4]" },
  { src: "Still 2026-04-30 172328_1.18.2.jpg", aspect: "aspect-[4/5]" },
  { src: "Still 2026-04-30 172328_1.19.1.jpg", aspect: "aspect-square" },
  { src: "Still 2026-04-30 172328_1.20.1.jpg", aspect: "aspect-[2/3]" },
  { src: "Still 2026-04-30 172328_1.21.1.jpg", aspect: "aspect-[3/4]" },
  { src: "Still 2026-04-30 172328_1.22.1.jpg", aspect: "aspect-[4/5]" },
  { src: "Still 2026-04-30 172328_1.23.1.jpg", aspect: "aspect-square" },
  { src: "Still 2026-04-30 172328_1.24.1.jpg", aspect: "aspect-[2/3]" },
  { src: "Still 2026-04-30 172328_1.3.1.jpg", aspect: "aspect-[3/4]" },
  { src: "Still 2026-04-30 172328_1.4.1.jpg", aspect: "aspect-[4/5]" },
  { src: "Still 2026-04-30 172328_1.5.1.jpg", aspect: "aspect-square" },
  { src: "Still 2026-04-30 172328_1.6.1.jpg", aspect: "aspect-[2/3]" },
  { src: "Still 2026-04-30 172328_1.7.1.jpg", aspect: "aspect-[3/4]" },
  { src: "Still 2026-04-30 172328_1.8.1.jpg", aspect: "aspect-[4/5]" },
  { src: "Still 2026-04-30 172328_1.9.1.jpg", aspect: "aspect-square" },
];

export default function EventGallery() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-noir overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.02] whitespace-nowrap">
        <span className="font-heading text-[20rem] uppercase italic font-black tracking-tighter">
          Murgia Events Archive 1882
        </span>
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-primary" />
            <span className="font-heading text-primary text-xs md:text-sm tracking-[0.6em] uppercase block">
              Memorie
            </span>
          </div>
        </div>

        {/* Mobile Horizontal Slider (MWEB) */}
        <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-6 pb-8 no-scrollbar -mx-6 px-6">
          {PHOTOS.map((photo, index) => (
            <motion.div
              key={`mobile-${photo.src}`}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className={`relative flex-shrink-0 w-[85vw] snap-center overflow-hidden ring-1 ring-white/10 ${photo.aspect}`}
            >
              <Image
                src={`/images/Photos_event/${photo.src}`}
                alt="Murgia Event Moment"
                fill
                className="object-cover grayscale contrast-[1.2] brightness-90"
              />
            </motion.div>
          ))}
        </div>

        {/* Desktop Masonry Grid */}
        <motion.div
          ref={containerRef}
          className="hidden md:block columns-2 lg:columns-3 gap-8 space-y-8"
        >
          {PHOTOS.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: (index % 5) * 0.1,
                ease: [0.22, 1, 0.36, 1] 
              }}
              className={`relative group break-inside-avoid overflow-hidden ring-1 ring-white/10 ${photo.aspect}`}
            >
              {/* Image Overlay (Vignette) */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-noir/40 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-700" />
              
              <Image
                src={`/images/Photos_event/${photo.src}`}
                alt="Murgia Event Moment"
                fill
                className="object-cover transition-all duration-1000 ease-[0.22, 1, 0.36, 1] grayscale contrast-[1.2] brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-105"
              />

              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-white/0 group-hover:border-primary/20 transition-all duration-700 pointer-events-none z-20" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
