"use client";

import GialloHero from "@/components/GialloHero";
import GialloRitual from "@/components/GialloRitual";
import GialloSpecs from "@/components/GialloSpecs";
import GialloCocktails from "@/components/GialloCocktails";
import GialloNextProducts from "@/components/GialloNextProducts";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function VillacidroGialloPage() {
  // Reset scroll on entry to ensure the cinematic ritual starts from Tier 0
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-noir min-h-screen selection:bg-primary selection:text-noir overflow-x-hidden relative">
      
      {/* Cinematic Phase 1: The Arrival */}
      <GialloHero />

      {/* Cinematic Phase 2: The Anatomy */}
      <GialloSpecs />

      {/* Cinematic Phase 3: The Yellow Immersion Ritual */}
      <GialloRitual />

      {/* Cinematic Phase 4: Modern Mixology (Signature Serves) */}
      <GialloCocktails />

      {/* Terminal Phase: Collection Discovery */}
      <GialloNextProducts exclude="Villacidro Giallo" />

      <Footer />
    </main>
  );
}
