"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Masonry from "./ui/Masonry";
import AperitivoModal from "./AperitivoModal";

const COCKTAIL_ITEMS = [
  { 
    id: "ap-1", 
    name: "MURGIA SPRITZ", 
    tagline: "GOLDEN HOUR RITUAL", 
    img: "/images/aperitivo/Apericidr.webp", 
    description: "Villacidro Giallo, Prosecco, Soda, Arancia. Il classico della Sardegna.", 
    height: 320,
    ingredients: ["5cl Villacidro Murgia Giallo", "10cl San Pellegrino Cocktail", "Succo di Arancia fresca", "Goccia di Miele sardo", "Seltz/Soda"],
    instructions: ["Raffreddare un calice ampiamente.", "Versare il Villacidro Giallo sul ghiaccio.", "Aggiungere l'aperitivo e la soda.", "Mescolare delicatamente.", "Guarnire con scorza d'arancia."]
  },
  { 
    id: "ap-2", 
    name: "ZAFFERANO SOUR", 
    tagline: "BOLD & SMOOTH", 
    img: "/images/aperitivo/Hot.webp", 
    description: "Giallo Murgia, Limone, Zucchero, Albume. Un'intensità vellutata.", 
    height: 400,
    ingredients: ["6cl Villacidro Murgia Giallo", "3cl Succo di Lime fresco", "1.5cl Sciroppo di Zucchero", "Zenzero fresco a fette", "Albume/Aquafaba"],
    instructions: ["Pestare lo zenzero nel fondo dello shaker.", "Aggiungere i restanti ingredienti.", "Effettuare una 'Dry Shake' senza ghiaccio.", "Aggiungere ghiaccio e shakerare vigorosamente.", "Filtrare in una coppa fredda."]
  },
  { 
    id: "ap-3", 
    name: "GIALLO TONIC", 
    tagline: "PURE REFRESH", 
    img: "/images/aperitivo/Limone.webp", 
    description: "Giallo Murgia, Tonica Premium, Scorza di Limone. Freschezza pura.", 
    height: 280,
    ingredients: ["5cl Villacidro Murgia Giallo", "15cl Acqua Tonica Premium", "Spicchio di Lime", "Scorza di Limone", "Ramoscello di Timo"],
    instructions: ["Riempire un bicchiere Highball di ghiaccio cristallino.", "Versare il Villacidro Giallo.", "Colmare con la tonica versandola delicatamente.", "Spremere leggermente il lime nel drink.", "Guarnire e servire."]
  },
  { 
    id: "ap-4", 
    name: "MEDITERRANEO", 
    tagline: "HERBAL JOURNEY", 
    img: "/images/aperitivo/zz.webp", 
    description: "Murgia Bianco, Gin, Vermouth, Menta. L'anima delle erbe sarde.", 
    height: 380,
    ingredients: ["4cl Murgia Bianco", "3cl Dry Gin Sardo", "2cl Vermouth Bianco", "Foglie di Menta fresca", "Cetriolo per guarnizione"],
    instructions: ["Gently clap the mint leaves to release oils.", "Aggiungere tutti gli ingredienti in un Mixing Glass.", "Miscelare con ghiaccio per ottenere la giusta diluizione.", "Filtrare in una coppa cocktail fredda.", "Aggiungere la menta e il cetriolo."]
  },
  { 
    id: "ap-5", 
    name: "BLACK GOLD", 
    tagline: "INTENSE AFTERDARK", 
    img: "/images/aperitivo/Chicco.webp", 
    description: "Giallo Murgia, Espresso, Liquore al Caffè. L'alchimia della notte.", 
    height: 340,
    ingredients: ["4cl Villacidro Murgia Giallo", "3cl Caffè Espresso ristretto", "2cl Liquore al Caffè", "Chicchi di Caffè per guarnizione"],
    instructions: ["Shakerare energicamente tutti gli ingredienti con molto ghiaccio.", "Filtrare in doppiocing (double strain) in un bicchiere da Martini.", "Guarnire con tre chicchi di caffè posizionati a triangolo."]
  }
];

const RECIPE_ITEMS = [
  { 
    id: "re-1", 
    name: "TIRAMISÙ AL VILLACIDRO", 
    tagline: "DESSERT RITUAL", 
    img: "/images/recipes/tiramisu.png", 
    description: "L'alchimia del caffè incontra l'oro di Villacidro in una crema vellutata.", 
    height: 380,
    ingredients: ["500g Mascarpone", "5 Uova Fresche", "5 Cucchiai di Zucchero", "1 Busta Dolceneve o Panna Montata", "1 Bicchiere di Villacidro Giallo", "Savoiardi e Caffè amaro"],
    instructions: ["Montare gli albumi a neve ferma con un pizzico di sale.", "Lavorare i tuorli con lo zucchero e il composto Dolceneve.", "Unire delicatamente il Villacidro Giallo alla crema di tuorli.", "Incorporare gli albumi dal basso verso l'alto con gesti lenti.", "Bagnare i savoiardi nel caffè e alternarli alla crema dorata.", "Spolverare con cacao amaro e lasciar riposare in frigo."]
  },
  { 
    id: "re-2", 
    name: "CREMA DI PERE AL VILLACIDRO", 
    tagline: "FRUIT ALCHEMY", 
    img: "/images/recipes/pere.png", 
    description: "Pere Kaiser cotte a bassa temperatura, sfumate con l'essenza dello zafferano.", 
    height: 320,
    ingredients: ["600g Pere mature", "50g Zucchero integrale di canna", "70g Succo di Limone", "50g Vino Bianco Secco", "50g Villacidro Murgia Giallo", "4 Stimmi di Zafferano Murgia"],
    instructions: ["Tagliare le pere a tocchetti e cuocerle con vino e zucchero (10 min).", "Sfumare con il Villacidro Giallo e il limone, proseguendo la cottura.", "Raffreddare e unire lo zafferano precedentemente sciolto.", "Frullare il tutto fino a ottenere un'alchimia setosa.", "Servire in coppette decorate con scaglie di cioccolato."]
  },
  { 
    id: "re-3", 
    name: "ARANCE E VILLACIDRO", 
    tagline: "CITRUS RITUAL", 
    img: "/images/recipes/arance.png", 
    description: "Arance sarde a fette immerse nel puro Villacidro Giallo. Semplicità ancestrale.", 
    height: 420,
    ingredients: ["4 Arance Sarde (Tarocco o Sanguigne)", "10cl Villacidro Murgia Giallo", "Succo d'arancia fresca appena spremuta"],
    instructions: ["Pelare le arance a vivo e affettarle con spessore di 1cm.", "Disporre le fette in un recipiente di ceramica o vetro.", "Irrogare con il Villacidro Giallo e il succo d'arancia fresco.", "Lasciare macerare in frigorifero per almeno 2 ore.", "Servire freddo come dessert rigenerante o base macedonia."]
  }
];

export default function AperitivoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'cocktails' | 'recipes'>('cocktails');
  const [hasRevealed, setHasRevealed] = useState(false);
  const [showBranding, setShowBranding] = useState(true);
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const textX = useTransform(
    scrollYProgress, 
    isMobile ? [0, 0.50] : [0.05, 0.40], 
    isMobile ? [1500, -2000] : [1500, -4500]
  );
  const maskOpacity = useTransform(scrollYProgress, [0.8, 0.95], [1, 1]);
  const stageY = useTransform(scrollYProgress, [0.42, 0.90], isMobile ? ["0px", "0px"] : ["0px", "-200px"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.05 && showBranding) setShowBranding(false);
    if (v <= 0.05 && !showBranding) setShowBranding(true);
    if (v > 0.42) setHasRevealed(true);
    else if (v < 0.38) setHasRevealed(false);
  });

  const handleItemClick = (id: string, index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  if (!mounted) return <div className="h-[240vh] bg-noir" />;

  const currentItems = activeTab === 'cocktails' ? COCKTAIL_ITEMS : RECIPE_ITEMS;

  return (
    <section 
      ref={containerRef} 
      className={`relative bg-noir h-[240vh] transition-[z-index] duration-0 ${isModalOpen ? 'z-[100000]' : 'z-[100]'}`}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Step 1: Video Background */}
        <video 
          key="aperitivo-video"
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          poster="/images/aperitivo/Apericidr.webp"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/aperitivo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40 md:bg-black/20 z-[1]" />

        {/* Step 2: The Mask Stencil */}
        <motion.div style={{ opacity: maskOpacity }} className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-10 overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <svg className="w-full h-full" viewBox="0 0 3000 3000" preserveAspectRatio="xMidYMid slice">
              <defs>
                <mask id="aperitivo-stencil-mask" maskUnits="userSpaceOnUse">
                  <rect width="3000" height="3000" fill="white" />
                  <motion.text 
                    style={{ x: textX }} 
                    y="1500" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    className="font-heading text-[280px] md:text-[300px] uppercase font-black origin-center italic" 
                    fill="black"
                  >
                    <tspan x="1500" dy="-120" className="md:hidden">COCKTAIL</tspan>
                    <tspan x="1500" dy="280" className="md:hidden">& RICETTE</tspan>
                    <tspan className="hidden md:inline">COCKTAIL & RICETTE</tspan>
                  </motion.text>
                </mask>
              </defs>
              <rect width="3000" height="3000" fill="#f5b400" mask="url(#aperitivo-stencil-mask)" />
            </svg>
          </div>
        </motion.div>

        {/* Step 3: THE UNIFIED STAGE */}
        <motion.div 
          style={{ 
            opacity: hasRevealed ? 1 : 0,
            y: stageY,
            pointerEvents: hasRevealed ? 'auto' : 'none'
          }}
          className="absolute inset-x-0 top-0 h-full z-[20] bg-primary flex flex-col items-center justify-start pt-10 md:pt-32 px-6 transition-opacity duration-700 overflow-y-auto md:overflow-visible pb-20"
        >
          <div className="text-center mb-8">
            <span className="text-black font-heading text-sm tracking-[0.4em] uppercase underline decoration-black/30 underline-offset-8 italic mb-8 block font-bold">
              The Murgia Experience
            </span>
            <h2 className="text-black font-heading text-6xl md:text-8xl uppercase tracking-tighter leading-none italic mb-12">
              L&apos;Arte del <span className="opacity-40">Mixing.</span>
            </h2>

            <div className="flex items-center justify-center gap-4 bg-noir/5 p-2 rounded-full backdrop-blur-sm border border-noir/10 w-fit mx-auto pointer-events-auto">
              <button 
                onClick={() => setActiveTab('cocktails')}
                className={`px-8 py-3 rounded-full font-heading text-xs tracking-widest uppercase transition-all duration-500 ${activeTab === 'cocktails' ? 'bg-noir text-primary shadow-xl scale-105' : 'text-black/60 hover:text-black font-bold'}`}
              >
                Cocktail
              </button>
              <button 
                onClick={() => setActiveTab('recipes')}
                className={`px-8 py-3 rounded-full font-heading text-xs tracking-widest uppercase transition-all duration-500 ${activeTab === 'recipes' ? 'bg-noir text-primary shadow-xl scale-105' : 'text-black/60 hover:text-black font-bold'}`}
              >
                Ricette
              </button>
            </div>
          </div>

          <div className="w-full max-w-[1600px] mt-6 mb-0 px-4 md:px-0">
            <Masonry 
              key={activeTab} 
              items={currentItems} 
              isTriggered={hasRevealed}
              onItemClick={(id) => {
                const idx = currentItems.findIndex(i => i.id === id);
                handleItemClick(id, idx);
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* RITUAL MODAL TAKEOVER */}
      <AperitivoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={currentItems}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </section>
  );
}
