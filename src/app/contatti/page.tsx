"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { useTranslation } from "@/context/LanguageContext";

export default function ContattiPage() {
  const { t } = useTranslation();

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
              <form className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="relative group">
                    <input 
                      type="text" 
                      placeholder={t.visit.drawer.form.firstName.toUpperCase()} 
                      className="w-full bg-transparent border-b border-noir/30 py-4 font-body text-xl text-noir placeholder:text-noir/50 focus:border-noir focus:outline-none transition-colors uppercase tracking-widest"
                    />
                  </div>
                  <div className="relative group">
                    <input 
                      type="email" 
                      placeholder="EMAIL" 
                      className="w-full bg-transparent border-b border-noir/30 py-4 font-body text-xl text-noir placeholder:text-noir/50 focus:border-noir focus:outline-none transition-colors uppercase tracking-widest"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <textarea 
                    rows={4}
                    placeholder={t.locations.partner.fields.message.toUpperCase()} 
                    className="w-full bg-transparent border-b border-noir/30 py-4 font-body text-xl text-noir placeholder:text-noir/50 focus:border-noir focus:outline-none transition-colors uppercase tracking-widest resize-none"
                  />
                </div>

                <div className="group relative w-full overflow-hidden bg-noir text-primary font-heading text-xl py-6 uppercase tracking-[0.3em] font-bold cursor-pointer transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center">
                  <span className="relative z-10 transition-colors duration-300">
                    {t.common.send} {t.locations.partner.fields.message}
                  </span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
                </div>
              </form>

              {/* Quick Heritage Links: Horizontal Centered */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-32 italic">
                <div className="text-left">
                  <span className="text-noir/40 font-heading text-[10px] tracking-[0.3em] uppercase block mb-4">
                    {t.contacts.info.phone}
                  </span>
                  <a href="tel:+393791781417" className="text-noir hover:text-noir/60 transition-colors font-body text-xl uppercase tracking-widest block">+39 379 178 1417</a>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-noir/40 font-heading text-[10px] tracking-[0.3em] uppercase block mb-4">
                    {t.contacts.info.email}
                  </span>
                  <a href="mailto:info@murgialiquori.com" className="text-noir hover:text-noir/60 transition-colors font-body text-xl uppercase tracking-widest block">info@murgialiquori.com</a>
                </div>
              </div>
            </div>

            {/* Subtle Corporate Manifest */}
            <div className="mt-32 pt-12 border-t border-noir/10 opacity-20 text-center">
              <p className="text-noir font-heading text-[10px] tracking-[0.3em] uppercase leading-relaxed mx-auto">
                MURGIA LIQUORI - Comm. Gennaro Murgia eredi Alessandro Pietro Murgia S.a.s - P.I. 00065810921 - Via Parrocchia 29, Villacidro (SU)
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
