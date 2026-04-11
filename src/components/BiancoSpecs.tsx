"use client";

import { motion, Variants } from "framer-motion";

const INGREDIENTS = [
  { name: "Licopodio", detail: "Spirito dei Boschi", desc: "Un'erba ancestrale che conferisce al Bianco la sua texture setosa e il suo profilo aromatico boschivo." },
  { name: "Anice Stellato", detail: "Nota di Testa", desc: "La purezza dell'anice che definisce il carattere cristallino e rinfrescante di questo distillato." },
  { name: "Erbe Aromatiche", detail: "Murgia Selection", desc: "Una sinfonia di botaniche sarde segrete, infuse per estrarre l'anima più delicata della terra." }
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  onView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function BiancoSpecs() {
  return (
    <section className="bg-noir py-32 px-6 md:px-20 relative z-10">
      <div className="max-w-7xl mx-auto">

        {/* Ingredients Grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-20 mb-40">
          {INGREDIENTS.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial="hidden"
              whileInView="onView"
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group space-y-6"
            >
              <div className="w-full h-px bg-white/10 group-hover:bg-white transition-colors duration-700" />
              <div className="space-y-4">
                <span className="text-white/40 font-heading text-xs tracking-widest uppercase">{ing.detail}</span>
                <h3 className="text-white font-heading text-4xl uppercase tracking-tighter">{ing.name}</h3>
                <p className="text-white/40 font-body text-sm leading-relaxed uppercase tracking-widest italic">
                  {ing.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Table */}
        <motion.div 
          initial="hidden"
          whileInView="onView"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-20 border-t border-white/5"
        >
          {[
            { label: "Gradazione", value: "40% Vol." },
            { label: "Formato", value: "50cl / 5cl" },
            { label: "Origine", value: "Villacidro, SU" },
            { label: "Formula", value: "Secret (1882)" }
          ].map((spec) => (
            <div key={spec.label} className="space-y-2">
              <span className="text-white/20 font-heading text-[10px] tracking-widest uppercase">{spec.label}</span>
              <p className="text-white font-heading text-2xl md:text-3xl tracking-tighter uppercase">{spec.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
