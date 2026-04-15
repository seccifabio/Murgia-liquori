"use client";

import BiancoHero from "@/components/BiancoHero";
import BiancoRitual from "@/components/BiancoRitual";
import BiancoSpecs from "@/components/BiancoSpecs";
import BiancoCocktails from "@/components/BiancoCocktails";
import ProductDiscovery from "@/components/ProductDiscovery";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function MurgiaBiancoPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-noir min-h-screen selection:bg-white selection:text-noir overflow-x-hidden relative">
      
      {/* Cinematic Phase 1: The Arrival */}
      <BiancoHero />

      {/* Cinematic Phase 2: The Anatomy */}
      <BiancoSpecs />

      {/* Cinematic Phase 3: The White Immersion Ritual */}
      <BiancoRitual />

      {/* Cinematic Phase 4: Modern Mixology (Signature Serves) */}
      <BiancoCocktails />

      {/* Collection Discovery */}
      <ProductDiscovery exclude="Murgia Bianco" />

      <Footer />
    </main>
  );
}
