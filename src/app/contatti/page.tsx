"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { useTranslation } from "@/context/LanguageContext";
import { Phone, Mail, MessageCircle } from "lucide-react";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ContattiPage() {
  const { t } = useTranslation();
  const { setShowPartnerToast } = useCart();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Manifesting Transmission
    setShowPartnerToast(true);
    setTimeout(() => setShowPartnerToast(false), 3000);
    
    // Archiving Form
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="bg-primary min-h-screen">
      <section className="relative w-full min-h-screen flex flex-col items-center pt-32 md:pt-48 pb-20 px-6">
        {/* Interaction Sanctuary: Monolithic Terminal */}
        <div className="relative w-full max-w-4xl flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-noir font-heading text-xl tracking-[0.4em] uppercase mb-16 block border-l-2 border-noir pl-6">
              {t.contacts.title}
            </span>

            <div className="mt-16 md:mt-24">
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative group">
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.visit.drawer.form.firstName.toUpperCase()} 
                      className="w-full bg-transparent border-b border-noir/30 py-4 font-body text-xl text-noir placeholder:text-noir/50 focus:border-noir focus:outline-none transition-colors uppercase tracking-widest"
                    />
                  </div>
                  <div className="relative group">
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="EMAIL" 
                      className="w-full bg-transparent border-b border-noir/30 py-4 font-body text-xl text-noir placeholder:text-noir/50 focus:border-noir focus:outline-none transition-colors uppercase tracking-widest"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <textarea 
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.locations.partner.fields.message.toUpperCase()} 
                    className="w-full bg-transparent border-b border-noir/30 py-4 font-body text-xl text-noir placeholder:text-noir/50 focus:border-noir focus:outline-none transition-colors uppercase tracking-widest resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  className="group relative w-full overflow-hidden bg-noir text-primary font-heading text-xl py-6 uppercase tracking-[0.3em] font-bold cursor-pointer transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center border-none outline-none"
                >
                  <span className="relative z-10 transition-colors duration-300">
                    {t.common.send} {t.locations.partner.fields.message}
                  </span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
                </button>
              </form>

              {/* Quick Heritage Links: Horizontal Centered */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24">
                <a href="tel:+393791781417" className="flex flex-col items-center text-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-noir flex items-center justify-center group-hover:bg-noir transition-all duration-500">
                    <Phone size={20} strokeWidth={1.5} className="text-noir group-hover:text-white transition-colors duration-500" />
                  </div>
                  <span className="text-noir group-hover:text-noir/60 transition-colors font-body text-sm uppercase tracking-[0.2em]">+39 379 178 1417</span>
                </a>
                
                <a 
                  href="https://wa.me/393791781417" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center text-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full border border-noir flex items-center justify-center group-hover:bg-noir transition-all duration-500">
                    <MessageCircle size={20} strokeWidth={1.5} className="text-noir group-hover:text-white transition-colors duration-500" />
                  </div>
                  <span className="text-noir group-hover:text-noir/60 transition-colors font-body text-sm uppercase tracking-[0.2em]">
                    {t.contacts.info.whatsapp}
                  </span>
                </a>

                <a href="mailto:info@murgialiquori.it" className="flex flex-col items-center text-center gap-4 group">
                  <div className="w-12 h-12 rounded-full border border-noir flex items-center justify-center group-hover:bg-noir transition-all duration-500">
                    <Mail size={20} strokeWidth={1.5} className="text-noir group-hover:text-white transition-colors duration-500" />
                  </div>
                  <span className="text-noir group-hover:text-noir/60 transition-colors font-body text-sm uppercase tracking-[0.2em]">info@murgialiquori.it</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
