"use client";

import { useState, useRef, useEffect } from "react";
import Masonry from "./ui/Masonry";
import AperitivoModal from "./AperitivoModal";

const GIALLO_COCKTAILS = [
  {
    id: "prod-1",
    name: "MURGIA SPRITZ",
    tagline: "GOLDEN HOUR RITUAL",
    img: "/images/aperitivo/Apericidr.webp",
    description: "Villacidro Giallo, Prosecco Extra Dry, Soda, Arancia. Il classico reinventato con il calore dello zafferano.",
    height: 420,
    ingredients: ["5cl Villacidro Murgia Giallo", "10cl San Pellegrino Cocktail", "Succo di Arancia fresca", "Goccia di Miele sardo", "Seltz/Soda"],
    instructions: ["Raffreddare un calice ampiamente.", "Versare il Villacidro Giallo sul ghiaccio.", "Aggiungere l'aperitivo e la soda.", "Mescolare delicatamente.", "Guarnire con scorza d'arancia."]
  },
  {
    id: "prod-2",
    name: "GIALLO TONIC",
    tagline: "PURE & BITTER",
    img: "/images/aperitivo/Limone.webp",
    description: "Villacidro Giallo, Acqua Tonica Premium, Scorza di Limone Sardo. Essenza vibrante per un finale pulito.",
    height: 350,
    ingredients: ["5cl Villacidro Murgia Giallo", "15cl Acqua Tonica Premium", "Spicchio di Lime", "Scorza di Limone", "Ramoscello di Timo"],
    instructions: ["Riempire un bicchiere Highball di ghiaccio cristallino.", "Versare il Villacidro Giallo.", "Colmare con la tonica versandola delicatamente.", "Spremere leggermente il lime nel drink.", "Guarnire e servire."]
  },
  {
    id: "prod-3",
    name: "MEDITERRANEO",
    tagline: "HERBAL & COMPLEX",
    img: "/images/aperitivo/zz.webp",
    description: "Villacidro Giallo, Gin Murgia, Vermouth Bianco, Menta. Un viaggio alchemico tra le erbe della Sardegna.",
    height: 480,
    ingredients: ["4cl Villacidro Murgia Giallo", "3cl Dry Gin Sardo", "2cl Vermouth Bianco", "Foglie di Menta fresca", "Cetriolo per guarnizione"],
    instructions: ["Gently clap the mint leaves to release oils.", "Aggiungere tutti gli ingredienti in un Mixing Glass.", "Miscelare con ghiaccio per ottenere la giusta diluizione.", "Filtrare in una coppa cocktail fredda.", "Aggiungere la menta e il cetriolo."]
  }
];

export default function GialloCocktails() {
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
    <section ref={sectionRef} className="bg-noir py-20 md:py-32 px-6 md:px-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="flex flex-col items-start gap-4">
            <span className={`text-primary font-heading text-sm tracking-[0.4em] uppercase underline decoration-primary/30 underline-offset-8 italic whitespace-nowrap transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              The Mixology Ritual
            </span>
            <h2 className={`text-white font-heading text-6xl md:text-9xl uppercase tracking-tighter leading-none italic pointer-events-none transition-all duration-1000 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Non solo un <span className="text-primary not-italic">liquore.</span>
            </h2>
          </div>
        </div>

        {/* GSAP Masonry Integration */}
        <div className="w-full">
          <Masonry 
            items={GIALLO_COCKTAILS} 
            isTriggered={isInView}
            stagger={0.1}
            duration={1}
            onItemClick={(id) => {
              const idx = GIALLO_COCKTAILS.findIndex(i => i.id === id);
              handleItemClick(id, idx);
            }}
          />
        </div>
      </div>

      {/* RITUAL MODAL TAKEOVER */}
      <AperitivoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={GIALLO_COCKTAILS}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </section>
  );
}
