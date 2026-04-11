"use client";

import Navbar from "@/components/Navbar";
import SbagliataHero from "@/components/SbagliataHero";
import SbagliataRitual from "@/components/SbagliataRitual";
import SbagliataSpecs from "@/components/SbagliataSpecs";
import SbagliataCocktails from "@/components/SbagliataCocktails";
import GialloNextProducts from "@/components/GialloNextProducts";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function LaSbagliataPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-noir min-h-screen selection:bg-primary selection:text-noir overflow-x-hidden relative">
      <Navbar />
      
      {/* Cinematic Phase 1: The Arrival */}
      <SbagliataHero />

      {/* Cinematic Phase 2: The Anatomy of an Error */}
      <SbagliataSpecs />

      {/* Cinematic Phase 3: The Limited Ritual */}
      <SbagliataRitual />

      {/* Cinematic Phase 4: Modern Mixology (Collector Ed.) */}
      <SbagliataCocktails />

      {/* Collection Discovery */}
      <GialloNextProducts exclude="La Sbagliata" />

      <Footer />
    </main>
  );
}
