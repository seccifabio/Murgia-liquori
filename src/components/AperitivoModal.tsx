"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Droplets, Flame, Wind, Utensils } from "lucide-react";
import { useEffect } from "react";

interface RitualItem {
  id: string;
  name: string;
  tagline: string;
  img: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  type?: 'cocktail' | 'recipe';
}

interface AperitivoModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: RitualItem[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export default function AperitivoModal(props: AperitivoModalProps) {
  const {
    isOpen,
    onClose,
    items,
    activeIndex,
    setActiveIndex
  } = props;
  const item = items[activeIndex];

  // Lock scroll and hide global nav when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("ritual-open");
    } else {
      document.body.style.overflow = "unset";
      document.body.classList.remove("ritual-open");
    }
    
    return () => {
      document.body.style.overflow = "unset";
      document.body.classList.remove("ritual-open");
    };
  }, [isOpen]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[20000] flex items-stretch justify-center bg-noir/95 backdrop-blur-2xl px-0 md:px-0"
        >
          {/* Modal Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="relative w-full h-full bg-noir overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-[114px] md:top-8 right-8 z-50 p-4 rounded-full bg-black md:bg-white/5 border border-white/10 hover:bg-primary hover:text-noir transition-all duration-500 group shadow-2xl"
            >
              <X className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-500 text-white" />
            </button>

            {/* Visual Panel (Left/Top) - Narrower for more content focus */}
            <div className="relative w-full md:w-[40%] h-[40%] md:h-full overflow-hidden border-r border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <motion.img 
                    src={item.img} 
                    alt={item.name} 
                    animate={{
                      scale: [1, 1.05, 1],
                      x: [0, 20, -20, 0],
                      y: [0, -15, 15, 0],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent md:bg-gradient-to-r" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Content Panel (Right/Bottom) - Expanded for better readability */}
            <div className="relative w-full md:w-[60%] h-[60%] md:h-full flex flex-col p-8 md:p-16 lg:p-24 overflow-y-auto custom-scrollbar">
              
              {/* Navigation Chips - Wrapped for Total Visibility */}
              <div className="flex flex-wrap gap-3 mt-32 mb-16 py-2 shrink-0">
                {items.map((navItem, index) => (
                  <button
                    key={navItem.id}
                    onClick={() => setActiveIndex(index)}
                    className={`px-5 py-2.5 rounded-full border font-heading text-[10px] tracking-[0.2em] uppercase transition-all duration-500
                      ${activeIndex === index 
                        ? "bg-primary border-primary text-noir" 
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                      }`}
                  >
                    {navItem.name}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col"
                >
                  <span className="text-primary font-heading text-xs tracking-[0.4em] uppercase mb-4 block underline decoration-primary/30 underline-offset-8">
                    {item.tagline}
                  </span>
                  <h2 className="text-white font-heading text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-none mb-12 italic">
                    {item.name}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Ingredients */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <Droplets className="text-primary w-5 h-5" />
                        <h4 className="text-white font-heading text-sm tracking-widest uppercase italic">Alchemy List</h4>
                      </div>
                      <ul className="space-y-4">
                        {item.ingredients.map((ing, i) => (
                          <li key={i} className="text-white/60 font-body text-sm tracking-widest flex items-start gap-4 uppercase border-l border-white/10 pl-4 py-2 hover:border-primary transition-colors">
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ritual Steps */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <Flame className="text-primary w-5 h-5" />
                        <h4 className="text-white font-heading text-sm tracking-widest uppercase italic">The Ritual</h4>
                      </div>
                      <ol className="space-y-6">
                        {item.instructions.map((step, i) => (
                          <li key={i} className="relative pl-8 text-white/60 font-body text-xs tracking-widest uppercase leading-relaxed">
                            <span className="absolute left-0 top-0 text-primary font-heading text-[9px]">{i + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Decorative Footer */}
              <div className="mt-auto pt-16 flex items-center justify-between opacity-40 hover:opacity-100 transition-opacity">
                <span className="font-heading text-[8px] tracking-[0.5em] text-white uppercase">Murgia Heritage Laboratory</span>
                <img src="/Assets/murgia-logo.png" alt="Murgia" className="h-6 invert opacity-50" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
