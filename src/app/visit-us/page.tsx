"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";
import { VISIT_MANIFEST } from "@/manifest/visit";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  Users, 
  Clock, 
  ChevronRight, 
  Quote,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Loader2
} from "lucide-react";
import { sendVisitRequest } from "@/app/actions/visit";

/* Visit Us Ritual: A cinematic immersion into the Murgia Laboratory */
/* Inspired by 'La Storia' for layout and 'Home' for Hero typography */

const IMAGES = [
  { src: "/images/visit/hero.png", alt: "Distillery Stills" },
  { src: "/images/visit/cellar.png", alt: "Aging Cellar" },
  { src: "/images/visit/pour.png", alt: "Liquid Gold" },
  { src: "/images/visit/tasting.png", alt: "Tasting Room" }
];

export default function VisitUsPage() {
  const { t, language } = useTranslation();
  const manifest = VISIT_MANIFEST[language];
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [activeImage, setActiveImage] = useState(0);
  const { scrollY } = useScroll();

  // Background parallax/scale as in StoriaHero
  const bgScale = useTransform(scrollY, [0, 5000], [1, 1.2]);
  const bgOpacity = useTransform(scrollY, [0, 500, 1000], [0.7, 0.4, 0.3]);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    guests: "2",
    email: "",
    phone: "",
    date: VISIT_MANIFEST.date
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendVisitRequest(formData);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("Transmission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen bg-noir text-white">
      
      {/* 1. Cinematic Background Layer - Inspired by StoriaHero */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-noir/50 z-10" />
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <motion.div 
              style={{ scale: bgScale, opacity: bgOpacity }}
              className="w-full h-full"
            >
              <Image
                src={IMAGES[activeImage].src}
                alt={IMAGES[activeImage].alt}
                fill
                className="object-cover grayscale-[0.4] brightness-50"
                priority
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-noir/40 via-transparent to-noir z-15" />
      </div>

      {/* 2. Layout Structure */}
      <div className="relative z-20 flex flex-col md:flex-row min-h-screen">
        
        {/* Left Column: Narrative Stream - Fluid Width */}
        <div className="flex-1 px-6 md:px-12 lg:px-24 py-32 space-y-32">
          
          {/* Hero Section: Optimized Title (Home Style) */}
          <section className="min-h-[90vh] flex flex-col justify-center pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onViewportEnter={() => setActiveImage(0)}
              className="max-w-6xl"
            >
              <div className="space-y-6">
                <span className="font-heading text-primary text-xl md:text-2xl tracking-[0.3em] uppercase block mb-4">
                  {t.visitPage.hero.subtitle}
                </span>
                <h1 className={`font-heading text-white leading-[0.85] uppercase italic tracking-tighter font-black ${language === "en" ? "text-6xl md:text-[8rem] lg:text-[10rem]" : "text-7xl md:text-[10rem] lg:text-[12rem]"}`}>
                  Vieni <br/>
                  A <br/>
                  <span className="text-primary italic">Trovarci</span>
                </h1>
              </div>
              <p className="font-body text-xl md:text-2xl text-white/60 leading-relaxed max-w-2xl border-t border-white/10 pt-12 mt-12 italic tracking-wide">
                {t.visitPage.hero.description}
              </p>
            </motion.div>
          </section>

          {/* Info Section: Expectation Manifest */}
          <section className="space-y-24 scroll-mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Clock, label: t.visitPage.expectations.duration.label, value: t.visitPage.expectations.duration.value },
                { icon: Users, label: t.visitPage.expectations.capacity.label, value: t.visitPage.expectations.capacity.value },
                { icon: ArrowRight, label: t.visitPage.expectations.groups.label, value: t.visitPage.expectations.groups.value }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  onViewportEnter={() => i === 0 && setActiveImage(1)}
                  className="p-10 bg-noir/40 backdrop-blur-md border border-white/5 space-y-6 group hover:border-primary/20 transition-all duration-500"
                >
                  <item.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  <div className="space-y-2">
                    <h3 className="font-heading text-[11px] tracking-[0.4em] uppercase text-white/30">
                      {item.label}
                    </h3>
                    <p className="font-heading text-3xl uppercase tracking-tighter italic">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="max-w-4xl pt-16 border-t border-white/10">
              <h2 className="font-heading text-5xl md:text-7xl uppercase tracking-tighter mb-16 italic">
                {t.visitPage.expectations.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {t.visitPage.expectations.highlights.map((item: string, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-6 group"
                  >
                    <div className="w-3 h-3 bg-primary transform rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                    <p className="font-body text-sm md:text-base uppercase tracking-[0.25em] text-white/70 group-hover:text-white transition-colors italic">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Tasting Finale: The Spotlight */}
          <section className="py-32 space-y-16">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              onViewportEnter={() => setActiveImage(2)}
              className="space-y-10"
            >
              <span className="text-primary font-heading text-xl tracking-[0.3em] uppercase block mb-4">
                The Laboratory Finale
              </span>
              <h2 className="font-heading text-7xl md:text-[9rem] uppercase tracking-tighter leading-[0.8] italic">
                {t.visitPage.tasting.title}
              </h2>
              <p className="font-body text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed italic border-l-2 border-primary/30 pl-8">
                {t.visitPage.tasting.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
              {t.visitPage.tasting.reviews.map((review: any, i: number) => (
                <motion.div
                  key={i}
                  onViewportEnter={() => { if (i === 1) setActiveImage(3); }}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="p-16 bg-noir/60 backdrop-blur-2xl border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all duration-700"
                >
                  <Quote className="absolute -top-6 -right-6 w-32 h-32 text-white/[0.02] transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000" />
                  <p className="font-body italic text-xl md:text-2xl mb-12 relative z-10 leading-relaxed text-white/90">"{review.text}"</p>
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-12 h-[1px] bg-primary/40" />
                    <p className="font-heading text-[12px] tracking-[0.4em] uppercase text-primary font-bold italic">{review.author}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <div className="h-[20vh]" />
        </div>

        {/* Right Column: Sticky Form Terminal - Fixed Width [500px] */}
        <SidebarScrollVisibility>
          <aside className="w-full h-full p-8 lg:p-12 flex flex-col justify-center overflow-y-auto custom-scrollbar pt-24 md:pt-12">
            <div className="space-y-16">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-primary">
                  <Calendar className="w-6 h-6" />
                  <h2 className="font-heading text-xl md:text-2xl tracking-[0.1em] uppercase font-bold italic">
                    {manifest.displayFullDate}
                  </h2>
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-primary/20 to-transparent" />
                <p className="text-[11px] text-white/40 uppercase tracking-[0.3em] leading-relaxed font-medium italic">
                  {t.visit.drawer.footer}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-10 text-center py-20"
                  >
                    <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-primary" />
                    </div>
                    <div className="space-y-6">
                      <h3 className="font-heading text-3xl uppercase tracking-tighter italic">{t.visit.drawer.successTitle}</h3>
                      <p className="text-[12px] text-white/40 uppercase tracking-[0.2em] leading-relaxed max-w-[250px] mx-auto italic">
                        {t.visit.drawer.successText}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="space-y-8">
                      <FormInput 
                        label={t.visit.drawer.form.firstName}
                        placeholder={t.visit.drawer.form.placeholderName}
                        value={formData.firstName}
                        onChange={(val: string) => setFormData({...formData, firstName: val})}
                        required
                      />
                      <FormInput 
                        label={t.visit.drawer.form.lastName}
                        placeholder={t.visit.drawer.form.placeholderLastName}
                        value={formData.lastName}
                        onChange={(val: string) => setFormData({...formData, lastName: val})}
                        required
                      />
                      <FormInput 
                        label={t.visit.drawer.form.email}
                        placeholder={t.visit.drawer.form.placeholderEmail}
                        value={formData.email}
                        onChange={(val: string) => setFormData({...formData, email: val})}
                        required
                        type="email"
                      />
                      <FormInput 
                        label={t.visit.drawer.form.phone}
                        placeholder="+39 000 0000000"
                        value={formData.phone}
                        onChange={(val: string) => setFormData({...formData, phone: val})}
                        type="tel"
                      />
                      
                      <div className="space-y-3">
                        <label className="text-[10px] text-white/30 uppercase tracking-[0.4em] block font-bold group-focus-within:text-primary transition-colors">{t.visit.drawer.form.guests}</label>
                        <div className="relative group">
                          <select 
                            className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 text-sm font-heading tracking-[0.2em] focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer uppercase italic"
                            value={formData.guests}
                            onChange={(e) => setFormData({...formData, guests: e.target.value})}
                          >
                            {[1,2,3,4,5,6,10,12].map(n => (
                              <option key={n} value={n} className="bg-noir text-white">{n} {n === 1 ? t.visit.drawer.form.guestsLabel : t.visit.drawer.form.guestsLabelPlural}</option>
                            ))}
                          </select>
                          <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-hover:text-primary transition-colors pointer-events-none rotate-90" />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full murgia-btn-primary py-10 text-xs md:text-sm tracking-[0.4em] transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 mt-12 overflow-hidden"
                    >
                      <span className="murgia-btn-text px-6 relative z-10 font-bold uppercase">
                        {isSubmitting ? t.common.sending : t.visit.drawer.form.submit}
                      </span>
                      {!isSubmitting && <ArrowRight className="murgia-btn-icon relative z-10" />}
                      {isSubmitting && <Loader2 className="w-5 h-5 animate-spin relative z-10" />}
                      <div className="murgia-btn-hover-wipe" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </aside>
        </SidebarScrollVisibility>

      </div>
    </div>
  );
}

function FormInput({ label, placeholder, value, onChange, required = false, type = "text" }: any) {
  return (
    <div className="space-y-3 group">
      <label className="text-[10px] text-white/30 uppercase tracking-[0.4em] block font-bold group-focus-within:text-primary transition-colors">
        {label}
      </label>
      <input 
        required={required}
        type={type} 
        className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 text-sm font-heading tracking-[0.2em] focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all uppercase placeholder:text-white/10 italic"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function SidebarScrollVisibility({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show sidebar when Navbar hides (scroll > 100)
    setIsVisible(latest > 100);
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 50,
        pointerEvents: isVisible ? "auto" : "none"
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full md:w-[500px] bg-[#0A0A0A]/95 backdrop-blur-3xl border-l border-white/5 md:h-screen md:sticky md:top-0 z-[10000]"
    >
      {children}
    </motion.div>
  );
}
