"use client";

import { useState, useMemo, useEffect } from "react";
import { MapPin, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { sendPartnerRequest } from "@/app/actions/partner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useCMS } from "@/context/CMSContext";

const STATIC_FALLBACK = [
  { name: "LA BOTTEGA DI TOMMY", city: "Alghero", address: "Via Gilbert Ferret, 76", map: "https://g.page/enoteca-la-bottega-di-tommy?share" },
];

export default function LocationsSection() {
  const { t } = useTranslation();
  const { config } = useCMS();
  const [mounted, setMounted] = useState(false);
  
  // Dynamic Locations from CMS
  const locations = config?.locations && config.locations.length > 0 
    ? config.locations 
    : STATIC_FALLBACK;

  const [activeCity, setActiveCity] = useState("Alghero");
  const cities = useMemo(() => Array.from(new Set(locations.map(l => l.city))).sort(), [locations]);
  const filtered = locations.filter(loc => loc.city === activeCity);

  // Auto-select first city if active city is not in current list
  useEffect(() => {
    if (cities.length > 0 && !cities.includes(activeCity)) {
      setActiveCity(cities[0]);
    }
  }, [cities, activeCity]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  const { isPartnerOpen, setIsPartnerOpen } = useCart();

  if (!mounted) return <div className="min-h-screen bg-primary" />;

  return (
    <section 
      id="locations-directory"
      className="relative z-[2000] bg-primary pt-32 md:pt-48 pb-40 px-6 min-h-screen text-noir isolation-auto"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="max-w-4xl mx-auto"
      >
        
        {/* Header */}
        <motion.header variants={itemVariants} className="mb-20 text-center md:text-left">
          <h2 className="text-noir font-heading text-6xl md:text-9xl uppercase tracking-tighter leading-tight">
            {t.locations.title} <span className="italic block md:inline">{t.locations.titleAccent}</span>
          </h2>
        </motion.header>

        {/* Town Chips Navigation - DESKTOP */}
        <motion.div variants={itemVariants} className="hidden md:flex flex-wrap gap-2 mb-16 justify-start">
          {cities.map((city) => (
            <button
              key={city}
              id={`chip-${city.toLowerCase().replace(" ", "-")}`}
              onClick={() => setActiveCity(city)}
              className={`px-6 py-2 rounded-full border border-noir/10 font-heading text-[12px] tracking-widest uppercase transition-colors pointer-events-auto
                ${activeCity === city 
                  ? "bg-noir border-noir text-primary" 
                  : "bg-transparent text-noir/70 hover:text-noir"
                }`}
            >
              {city}
            </button>
          ))}
        </motion.div>

        {/* Town Dropdown - MOBILE NATIVE INTEGRATION */}
        <motion.div variants={itemVariants} className="block md:hidden mb-12 relative">
          <label className="block text-noir/40 font-heading text-[12px] tracking-[0.3em] uppercase mb-4 ml-1">{t.locations.selectCity}</label>
          <div className="relative">
            <select
              value={activeCity}
              onChange={(e) => setActiveCity(e.target.value)}
              className="w-full bg-transparent border-2 border-noir p-5 pr-12 font-heading text-lg tracking-widest uppercase appearance-none focus:outline-none rounded-none text-noir pointer-events-auto"
            >
              {cities.map((city) => (
                <option key={city} value={city} className="bg-primary text-noir">
                  {city}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-noir" />
            </div>
          </div>
        </motion.div>

        {/* Location List */}
        <motion.div variants={itemVariants} className="space-y-12">
          {filtered.map((loc, i) => (
            <div 
              key={`${loc.name}-${loc.city}-${i}`}
              className="border-b border-noir/10 pb-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="pointer-events-auto">
                <span className="text-black text-[12px] tracking-[0.3em] font-heading uppercase block mb-2">
                  {loc.city}
                </span>
                <h4 className="text-black font-heading text-2xl md:text-3xl uppercase tracking-tight mb-2 leading-none">
                  {loc.name}
                </h4>
                <p className="text-black text-xs font-body tracking-[0.1em] uppercase">
                  {loc.address}
                </p>
              </div>

              <a 
                href={loc.map} 
                target="_blank" 
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-2 text-black font-heading text-sm tracking-[0.2em] uppercase hover:underline transition-all pointer-events-auto"
              >
                {t.locations.viewMap} <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* Partner Sovereign Section - Triggers Global Drawer */}
      <motion.div 
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full min-h-screen bg-noir flex flex-col items-center justify-center gap-12 text-center z-50 mt-32 relative overflow-hidden py-32"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-12 flex flex-col items-center"
        >
          <div className="space-y-6 max-w-6xl px-6">
            <h3 className="text-primary font-heading text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter leading-[0.85]">
              {t.locations.partner.title} <br/> <span className="text-white italic">{t.locations.partner.titleAccent}</span>
            </h3>
            <p className="text-white/50 font-body text-base md:text-xl uppercase tracking-[0.3em] max-w-3xl mx-auto leading-relaxed pt-8">
              {t.locations.partner.description}
            </p>
          </div>
          
          <button 
            onClick={() => setIsPartnerOpen(true)}
            className="group relative px-10 py-7 md:px-24 md:py-8 w-[85%] max-w-[300px] md:max-w-none md:w-auto overflow-hidden bg-primary text-black font-heading uppercase text-sm tracking-[0.4em] transition-all transform hover:scale-105 active:scale-95 pointer-events-auto mx-auto md:mx-0"
          >
            <span className="relative z-10">{t.locations.partner.cta}</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </motion.div>

        <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/40">
          <div className="w-20 h-px bg-white/40" />
          <span className="font-heading text-[12px] tracking-[0.8em] uppercase">{t.locations.partner.ritual}</span>
          <div className="w-20 h-px bg-white/40" />
        </div>
      </motion.div>
    </section>
  );
}
