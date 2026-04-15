"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Mail, Phone, User, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { VISIT_MANIFEST } from "@/manifest/visit";

export default function VisitDrawer() {
  const { isVisitOpen, setIsVisitOpen } = useCart();
  const { t, language } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const manifest = VISIT_MANIFEST[language];

  // Form Manifest
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    guests: "2",
    email: "",
    phone: "",
    date: VISIT_MANIFEST.date
  });

  // Scroll Lockdown Ritual
  useEffect(() => {
    if (isVisitOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisitOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Alchemical Simulation of Transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto-liquidation after success confirmation
      setTimeout(() => {
        setIsVisitOpen(false);
        // Reset after animations finish
        setTimeout(() => setIsSuccess(false), 500);
      }, 3000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isVisitOpen && (
        <>
          {/* Backdrop: Alchemical Shadow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisitOpen(false)}
            className="fixed inset-0 bg-noir/80 backdrop-blur-sm z-[10000]"
          />

          {/* Drawer: The Booking Terminal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-[#0A0A0A] border-l border-white/5 z-[10001] flex flex-col shadow-2xl"
          >
            {/* Header Ritual */}
            <div className="p-8 pt-20 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h2 className="font-heading text-lg md:text-xl tracking-widest uppercase text-primary font-bold">{manifest.displayFullDate}</h2>
              </div>
              <button
                onClick={() => setIsVisitOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors group relative z-10"
              >
                <X className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Content Manifest */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-primary" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-heading text-3xl uppercase tracking-tighter">{t.visit.drawer.successTitle}</h3>
                      <p className="font-body text-xs text-white/40 uppercase tracking-[0.2em] leading-relaxed">
                        {t.visit.drawer.successText}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-10"
                  >
                    <div className="space-y-8">
                       {/* Name Ritual */}
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">{t.visit.drawer.form.firstName}</label>
                              <div className="relative">
                                 <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                 <input 
                                   required
                                   type="text" 
                                   className="w-full bg-white/5 border border-white/10 px-10 py-4 text-sm font-heading tracking-widest focus:outline-none focus:border-primary/40 transition-colors uppercase"
                                   placeholder={t.visit.drawer.form.placeholderName}
                                   value={formData.firstName}
                                   onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                 />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">{t.visit.drawer.form.lastName}</label>
                              <input 
                                required
                                type="text" 
                                className="w-full bg-white/5 border border-white/10 px-4 py-4 text-sm font-heading tracking-widest focus:outline-none focus:border-primary/40 transition-colors uppercase"
                                placeholder={t.visit.drawer.form.placeholderLastName}
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              />
                           </div>
                        </div>

                        {/* Email Ritual */}
                        <div className="space-y-2">
                           <label className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">{t.visit.drawer.form.email}</label>
                           <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                              <input 
                                required
                                type="email" 
                                className="w-full bg-white/5 border border-white/10 px-10 py-4 text-sm font-heading tracking-widest focus:outline-none focus:border-primary/40 transition-colors uppercase"
                                placeholder={t.visit.drawer.form.placeholderEmail}
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                              />
                           </div>
                        </div>

                        {/* Phone Ritual (Optional) */}
                        <div className="space-y-2">
                           <label className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">{t.visit.drawer.form.phone}</label>
                           <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                              <input 
                                type="tel" 
                                className="w-full bg-white/5 border border-white/10 px-10 py-4 text-sm font-heading tracking-widest focus:outline-none focus:border-primary/40 transition-colors uppercase"
                                placeholder="+39 000 0000000"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              />
                           </div>
                        </div>

                        {/* Guests Ritual */}
                        <div className="space-y-2">
                           <label className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">{t.visit.drawer.form.guests}</label>
                           <div className="relative">
                              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                              <select 
                                className="w-full bg-white/5 border border-white/10 px-10 py-4 text-sm font-heading tracking-widest focus:outline-none focus:border-primary/40 transition-colors appearance-none cursor-pointer uppercase"
                                value={formData.guests}
                                onChange={(e) => setFormData({...formData, guests: e.target.value})}
                              >
                                 {[1,2,3,4,5,6,10].map(n => (
                                   <option key={n} value={n} className="bg-noir text-white">{n} {n === 1 ? t.visit.drawer.form.guestsLabel : t.visit.drawer.form.guestsLabelPlural}</option>
                                 ))}
                              </select>
                           </div>
                        </div>
                     </div>

                     <button 
                       type="submit"
                       disabled={isSubmitting}
                       className="w-full murgia-btn-primary py-8 text-sm tracking-[0.2em] md:tracking-[0.4em] transform hover:scale-[1.02] active:scale-95 disabled:opacity-70 mt-12"
                     >
                       <span className="murgia-btn-text px-4">
                         {isSubmitting ? t.common.sending : t.visit.drawer.form.submit}
                       </span>
                       {!isSubmitting && <ArrowRight className="murgia-btn-icon" />}
                       {isSubmitting && <Loader2 className="w-5 h-5 animate-spin relative z-10" />}
                       <div className="murgia-btn-hover-wipe" />
                     </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Manifest */}
            <div className="p-8 border-t border-white/5 bg-noir/50 backdrop-blur-xl">
               <p className="text-center text-white/60 font-heading text-[10px] tracking-[0.2em] uppercase italic leading-relaxed">
                  {t.visit.drawer.footer}
               </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
