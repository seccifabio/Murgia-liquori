"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MapPin, MessageSquare, ArrowRight, Loader2, CheckCircle2, Building2, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { sendPartnerRequest } from "@/app/actions/partner";

export default function PartnerDrawer() {
  const { isPartnerOpen, setIsPartnerOpen } = useCart();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [shopType, setShopType] = useState("bar");

  const shopTypes = ["bar", "pub", "ristorante", "enoteca", "negozio"];

  // Form Manifest
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
    message: ""
  });

  // Scroll Lockdown Ritual
  useEffect(() => {
    if (isPartnerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPartnerOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      await sendPartnerRequest({ ...formData, shopType });
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto-liquidation after success confirmation
      setTimeout(() => {
        setIsPartnerOpen(false);
        // Reset after animations finish
        setTimeout(() => {
           setIsSuccess(false);
           setFormData({ name: "", city: "", phone: "", email: "", message: "" });
        }, 5000);
      }, 5000);
    } catch (err: any) {
      setError(err.message || t.common.error);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isPartnerOpen && (
        <>
          {/* Backdrop: Alchemical Shadow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPartnerOpen(false)}
            className="fixed inset-0 bg-noir/80 backdrop-blur-sm z-[10000]"
          />

          {/* Drawer: The Partner Terminal */}
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
                <Building2 className="w-5 h-5 text-primary" />
                <h2 className="font-heading text-lg md:text-xl tracking-widest uppercase text-primary font-bold">{t.locations.partner.ritual}</h2>
              </div>
              <button
                onClick={() => setIsPartnerOpen(false)}
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
                      <h3 className="font-heading text-3xl uppercase tracking-tighter">{t.locations.partner.successTitle}</h3>
                      <p className="font-body text-xs text-white/40 uppercase tracking-[0.2em] leading-relaxed">
                        {t.locations.partner.successText}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                        {/* Name Ritual */}
                        <div className="space-y-2">
                           <label className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">{t.locations.partner.fields.name}</label>
                           <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                              <input 
                                required
                                type="text" 
                                className="w-full bg-white/5 border border-white/10 px-10 py-4 text-sm font-heading tracking-widest focus:outline-none focus:border-primary/40 transition-colors uppercase"
                                placeholder={t.locations.partner.fields.placeholderName}
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                              />
                           </div>
                        </div>

                        {/* City Ritual */}
                        <div className="space-y-2">
                           <label className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">{t.locations.partner.fields.city}</label>
                           <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                              <input 
                                required
                                type="text" 
                                className="w-full bg-white/5 border border-white/10 px-10 py-4 text-sm font-heading tracking-widest focus:outline-none focus:border-primary/40 transition-colors uppercase"
                                placeholder={t.locations.partner.fields.placeholderCity}
                                value={formData.city}
                                onChange={(e) => setFormData({...formData, city: e.target.value})}
                              />
                           </div>
                        </div>

                        {/* Shop Type Ritual */}
                        <div className="space-y-4">
                            <label className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">{t.locations.partner.fields.type}</label>
                            
                            {/* Desktop Chips */}
                            <div className="hidden md:flex flex-wrap gap-2">
                              {shopTypes.map((type) => (
                                <button
                                  key={type}
                                  type="button"
                                  onClick={() => setShopType(type)}
                                  className={`px-4 py-2 border font-heading text-[10px] tracking-widest uppercase transition-all ${
                                    shopType === type 
                                      ? "bg-primary border-primary text-noir" 
                                      : "bg-transparent border-white/20 text-white/60 hover:border-white/40"
                                  }`}
                                >
                                  {(t.locations.partner.fields.types as any)[type] || type}
                                </button>
                              ))}
                            </div>

                            {/* Mobile Dropdown */}
                            <div className="block md:hidden relative">
                              <select 
                                value={shopType}
                                onChange={(e) => setShopType(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 px-4 py-4 pr-12 text-sm font-heading tracking-widest focus:outline-none focus:border-primary/40 transition-colors appearance-none cursor-pointer uppercase rounded-none text-white"
                              >
                                {shopTypes.map((type) => (
                                  <option key={type} value={type} className="bg-noir text-white">{(t.locations.partner.fields.types as any)[type] || type}</option>
                                ))}
                              </select>
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <ChevronDown className="w-4 h-4 text-white/40" />
                              </div>
                            </div>
                        </div>

                        {/* Email Ritual */}
                        <div className="space-y-2">
                           <label className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">{t.locations.partner.fields.email}</label>
                           <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                              <input 
                                required
                                type="email" 
                                className="w-full bg-white/5 border border-white/10 px-10 py-4 text-sm font-heading tracking-widest focus:outline-none focus:border-primary/40 transition-colors uppercase"
                                placeholder="EMAIL@PARTNER.IT"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                              />
                           </div>
                        </div>

                        {/* Phone Ritual */}
                        <div className="space-y-2">
                           <label className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">{t.locations.partner.fields.phone}</label>
                           <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                              <input 
                                required
                                type="tel" 
                                className="w-full bg-white/5 border border-white/10 px-10 py-4 text-sm font-heading tracking-widest focus:outline-none focus:border-primary/40 transition-colors uppercase"
                                placeholder="+39 000 0000000"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              />
                           </div>
                        </div>

                        {/* Message Ritual */}
                        <div className="space-y-2">
                           <label className="text-[9px] text-white/30 uppercase tracking-widest block font-bold">{t.locations.partner.fields.message}</label>
                           <div className="relative">
                              <MessageSquare className="absolute left-3 top-6 w-4 h-4 text-white/20" />
                              <textarea 
                                required
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 px-10 py-4 text-sm font-heading tracking-widest focus:outline-none focus:border-primary/40 transition-colors uppercase resize-none"
                                placeholder={t.locations.partner.fields.placeholderMessage}
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                              />
                           </div>
                        </div>
                     </div>

                     {error && (
                        <p className="text-red-500 font-heading text-[10px] tracking-widest uppercase">{error}</p>
                     )}

                     <button 
                       type="submit"
                       disabled={isSubmitting}
                       className="w-full group relative py-8 overflow-hidden bg-primary text-black font-heading uppercase text-sm tracking-[0.2em] md:tracking-[0.4em] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-wait mt-4"
                     >
                       <span className="relative z-10 font-bold px-4">
                         {isSubmitting ? t.common.sending : t.locations.partner.fields.submit}
                       </span>
                       {!isSubmitting && <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" />}
                       {isSubmitting && <Loader2 className="w-5 h-5 animate-spin relative z-10" />}
                       <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                     </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Manifest */}
            <div className="p-8 border-t border-white/5 bg-noir/50 backdrop-blur-xl">
               <p className="text-center text-white/60 font-heading text-[10px] tracking-[0.2em] uppercase italic leading-relaxed">
                  {t.locations.partner.ritual} &mdash; Murgia Liquori
               </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
