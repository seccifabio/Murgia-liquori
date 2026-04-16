"use client";

import { useState, useRef, useEffect } from "react";
import Masonry from "./ui/Masonry";
import AperitivoModal from "./AperitivoModal";

const SBAGLIATA_COCKTAILS = [
  {
    id: "sb-1",
    name: "THE ERROR SPRITZ",
    tagline: "UNEXPECTED TWIST",
    img: "/images/aperitivo/Apericidr.webp",
    description: "Murgia Giallo (Sbagliata Edition), Prosecco, Soda, Arancia. Perfetto per celebrare l'unicità.",
    height: 480,
    ingredients: ["5cl La Sbagliata Murgia", "10cl Prosecco DOCG", "Soda", "Zest di Limone", "Olio essenziale allo zafferano"],
    instructions: ["Mescolare delicatamente gli ingredienti nel bicchiere.", "Aggiungere una goccia di olio essenziale.", "Servire con una scorza di limone."]
  },
  {
    id: "sb-2",
    name: "NEGRONI SBAGLIATO (MURGIA)",
    tagline: "CLASSIC RE-ERROR",
    img: "/images/aperitivo/Chicco.webp",
    description: "Vermouth Rosso, Campari, Murgia Giallo (Sbagliata), Prosecco. Un omaggio doppio alla bellezza dell'errore.",
    height: 350,
    ingredients: ["3cl La Sbagliata Murgia", "3cl Vermouth Rosso", "3cl Bitter Campari", "Top di Prosecco"],
    instructions: ["Costruire il drink direttamente in un bicchiere basso con ghiaccio.", "Mescolare e guarnire con una fetta d'arancia."]
  },
  {
    id: "sb-3",
    name: "ZAFFERANO SOUR",
    tagline: "SMOOTH & SPICY",
    img: "/images/aperitivo/Hot.webp",
    description: "La Sbagliata Murgia, Limone, Zucchero, Albume, Spezie Sarde. Per un palato che cerca l'anima del Murgia.",
    height: 420,
    ingredients: ["6cl La Sbagliata Murgia", "3cl Succo di Limone", "1.5cl Sciroppo di Zucchero", "Zenzero Fresco", "Albume"],
    instructions: ["Pestare lo zenzero.", "Aggiungere gli altri ingredienti e shakerare.", "Filtrare in doppiocing."]
  }
];

export default function SbagliataCocktails() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleItemClick = (id: string, index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  return (
    <section ref={sectionRef} className="bg-noir py-32 px-6 md:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex flex-col items-start gap-4">
            <span className={`text-primary font-heading text-sm tracking-[0.4em] uppercase underline decoration-primary/30 underline-offset-8 italic whitespace-nowrap transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              The Collector Mixology
            </span>
            <h2 className={`text-white font-heading text-6xl md:text-9xl uppercase tracking-tighter leading-none italic pointer-events-none transition-all duration-1000 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Bellezza <span className="text-primary not-italic">Rara.</span>
            </h2>
          </div>
        </div>

        <div className="w-full">
          <Masonry 
            items={SBAGLIATA_COCKTAILS} 
            isTriggered={isInView}
            stagger={0.1}
            duration={1}
            onItemClick={(id) => {
              const idx = SBAGLIATA_COCKTAILS.findIndex(i => i.id === id);
              handleItemClick(id, idx);
            }}
          />
        </div>
      </div>

      {/* RITUAL MODAL TAKEOVER */}
      <AperitivoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={SBAGLIATA_COCKTAILS}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </section>
  );
}
