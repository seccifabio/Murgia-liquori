"use client";

import { motion, Variants } from "framer-motion";
import { useTranslation } from "@/context/LanguageContext";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  onView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function GialloSpecs() {
  const { t } = useTranslation();
  
  const specs = [
    { label: t.products.common.gradazione, value: "40% Vol." },
    { label: t.products.common.formato, value: "5cl / 50cl / 70cl" },
    { label: t.products.common.origine, value: "Villacidro, SU" },
    { label: t.products.common.formula, value: t.products.common.secret }
  ];

  return (
    <section className="bg-noir py-32 px-6 md:px-20 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Ingredients Grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-20 mb-32">
          {t.products.giallo.ingredients.map((ing: any, i: number) => (
            <motion.div
              key={ing.name}
              initial="hidden"
              whileInView="onView"
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group space-y-6"
            >
              <div className="w-full h-px bg-white/10 group-hover:bg-primary transition-colors duration-700" />
              <div className="space-y-4">
                <span className="text-primary font-heading text-xs tracking-widest uppercase">{ing.detail}</span>
                <h3 className="text-white font-heading text-4xl uppercase tracking-tighter">{ing.name}</h3>
                <p className="text-white/60 font-body text-sm leading-relaxed uppercase tracking-widest italic">
                  {ing.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Details */}
        <motion.div 
          initial="hidden"
          whileInView="onView"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-20 border-t border-white/5"
        >
          {specs.map((spec) => (
            <div key={spec.label} className="space-y-2">
              <span className="text-white/40 font-heading text-[10px] tracking-widest uppercase">{spec.label}</span>
              <p className="text-white font-heading text-2xl md:text-3xl tracking-tighter uppercase">{spec.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
