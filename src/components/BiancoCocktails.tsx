"use client";

import { useState, useRef, useEffect } from "react";
import Masonry from "./ui/Masonry";
import AperitivoModal from "./AperitivoModal";

const BIANCO_COCKTAILS = [
  {
    id: "bianco-1",
    name: "VILLACIDRO SPRITZ",
    tagline: "REFRESHING RITUAL",
    img: "/images/aperitivo/Apericidr.webp",
    description: "Villacidro Bianco, Prosecco, spruzzata di Soda, Arancia. Una danza di bollicine e finocchio selvatico.",
    height: 400,
    ingredients: ["5cl Villacidro Murgia Bianco", "10cl Prosecco Extra Dry", "Soda Water", "Scorza d'Arancia", "Finocchietto Selvatico"],
    instructions: ["Riempire un calice di ghiaccio.", "Versare il Villacidro Bianco e il Prosecco.", "Aggiungere la soda.", "Guarnire con arancia e finocchietto."]
  },
  {
    id: "bianco-2",
    name: "BIANCO SOUR",
    tagline: "CREAMY & BOLD",
    img: "/images/aperitivo/Limone.webp",
    description: "Villacidro Bianco, Limone fresco, Zucchero, Albume. Vellutata intensità per un finale indimenticabile.",
    height: 320,
    ingredients: ["6cl Villacidro Murgia Bianco", "3cl Succo di Limone fresco", "2cl Sciroppo di Zucchero", "Albume d'uovo", "Bacche di Ginepro"],
    instructions: ["Shakerare gli ingredienti senza ghiaccio (dry shake).", "Aggiungere ghiaccio e shakerare di nuovo.", "Filtrare in una coppa fredda.", "Decorare con bacche di ginepro."]
  },
  {
    id: "bianco-3",
    name: "WILD TONIC",
    tagline: "BOTANICAL ESSENCE",
    img: "/images/aperitivo/zz.webp",
    description: "Villacidro Bianco, Acqua Tonica, rametto di Finocchio Selvatico. La purezza della Sardegna nel bicchiere.",
    height: 480,
    ingredients: ["5cl Villacidro Murgia Bianco", "15cl Acqua Tonica Mediterranea", "Rametto di Finocchietto Selvatico", "Grani di Pepe Rosa"],
    instructions: ["In un bicchiere alto colmo di ghiaccio, versare il Villacidro Bianco.", "Aggiungere la tonica lentamente.", "Guarnire con finocchietto e pepe rosa."]
  }
];

export default function BiancoCocktails() {
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
            <span className={`text-white/40 font-heading text-sm tracking-[0.4em] uppercase underline decoration-white/20 underline-offset-8 italic whitespace-nowrap transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              The Bianco Mixology
            </span>
            <h2 className={`text-white font-heading text-6xl md:text-9xl uppercase tracking-tighter leading-none italic pointer-events-none transition-all duration-1000 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Gusto <span className="text-white/80 not-italic">Sospeso.</span>
            </h2>
          </div>
        </div>

        {/* GSAP Masonry Integration */}
        <div className="w-full">
          <Masonry 
            items={BIANCO_COCKTAILS} 
            isTriggered={isInView}
            stagger={0.1}
            duration={1}
            onItemClick={(id) => {
              const idx = BIANCO_COCKTAILS.findIndex(i => i.id === id);
              handleItemClick(id, idx);
            }}
          />
        </div>
      </div>

      {/* RITUAL MODAL TAKEOVER */}
      <AperitivoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={BIANCO_COCKTAILS}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </section>
  );
}
