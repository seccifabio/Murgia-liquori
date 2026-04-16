"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import Masonry from "./ui/Masonry";
import AperitivoModal from "./AperitivoModal";
import { useTranslation } from "@/context/LanguageContext";

export default function AperitivoSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'cocktails' | 'recipes'>('cocktails');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const COCKTAIL_ITEMS = useMemo(() => [
    { id: "ap-1", ...t.aperitivo.items.spritz, img: "/images/aperitivo/Apericidr.webp", height: 320 },
    { id: "ap-2", ...t.aperitivo.items.sour, img: "/images/aperitivo/Hot.webp", height: 400 },
    { id: "ap-3", ...t.aperitivo.items.tonic, img: "/images/aperitivo/Limone.webp", height: 280 },
    { id: "ap-4", ...t.aperitivo.items.mediterraneo, img: "/images/aperitivo/zz.webp", height: 380 },
    { id: "ap-5", ...t.aperitivo.items.blackgold, img: "/images/aperitivo/Chicco.webp", height: 340 }
  ], [t]);

  const RECIPE_ITEMS = useMemo(() => [
    { id: "re-1", ...t.aperitivo.recipes.tiramisu, img: "/images/recipes/tiramisu.png", height: 380 },
    { id: "re-2", ...t.aperitivo.recipes.pere, img: "/images/recipes/pere.png", height: 320 },
    { id: "re-3", ...t.aperitivo.recipes.arance, img: "/images/recipes/arance.png", height: 420 }
  ], [t]);

  const currentItems = activeTab === 'cocktails' ? COCKTAIL_ITEMS : RECIPE_ITEMS;

  const handleItemClick = (id: string, index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  if (!mounted) return null;

  return (
    <section 
      id="aperitivo"
      ref={containerRef} 
      className={`relative bg-primary py-20 md:py-24 px-6 md:px-12 ${isModalOpen ? 'z-[100000]' : 'z-[110]'}`}
    >
      <div className="max-w-[1600px] mx-auto flex flex-col items-center">
        {/* HEADER SECTION - Always visible, clean typography */}
        <div className="text-center mb-16 md:mb-24 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-black font-heading text-[10px] md:text-sm tracking-[0.4em] uppercase underline decoration-black/30 underline-offset-8 italic mb-8 block font-bold">
              {t.aperitivo.experience}
            </span>
            <h2 className="text-black font-heading text-6xl md:text-9xl uppercase tracking-tighter leading-none italic mb-12">
              {t.aperitivo.title} <span className="opacity-40">{t.aperitivo.titleAccent}</span>
            </h2>

            <div className="flex items-center justify-center gap-4 bg-noir/5 p-2 rounded-full backdrop-blur-sm border border-noir/10 w-fit mx-auto cursor-pointer">
              <button 
                onClick={() => setActiveTab('cocktails')}
                className={`px-8 py-3 rounded-full font-heading text-[10px] md:text-xs uppercase transition-all duration-500 hover:scale-105 ${activeTab === 'cocktails' ? 'bg-noir text-primary shadow-xl' : 'text-black/60'}`}
              >
                {t.aperitivo.tabs.cocktails}
              </button>
              <button 
                onClick={() => setActiveTab('recipes')}
                className={`px-8 py-3 rounded-full font-heading text-[10px] md:text-xs uppercase transition-all duration-500 hover:scale-105 ${activeTab === 'recipes' ? 'bg-noir text-primary shadow-xl' : 'text-black/60'}`}
              >
                {t.aperitivo.tabs.recipes}
              </button>
            </div>
          </motion.div>
        </div>

        {/* MASONRY GRID - Visible by default, items staggered on reveal */}
        <div className="w-full">
          <Masonry 
            key={activeTab} 
            items={currentItems} 
            isTriggered={true} // Triggered immediately/by internal intersection
            stagger={0.08}
            onItemClick={(id) => handleItemClick(id, currentItems.findIndex(i => i.id === id))}
          />
        </div>
      </div>

      <AperitivoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        items={currentItems} 
        activeIndex={activeIndex} 
        setActiveIndex={setActiveIndex} 
      />
    </section>
  );
}
