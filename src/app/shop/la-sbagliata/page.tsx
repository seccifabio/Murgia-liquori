import SbagliataHero from "@/components/SbagliataHero";
import SbagliataRitual from "@/components/SbagliataRitual";
import SbagliataSpecs from "@/components/SbagliataSpecs";
// import SbagliataCocktails from "@/components/SbagliataCocktails";
import ProductDiscovery from "@/components/ProductDiscovery";
import Footer from "@/components/Footer";
import { getLiveProducts } from "@/lib/stripe-sync";
import { PRODUCTS_MANIFEST } from "@/manifest/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Sbagliata | Il Vermouth d'Errore",
  description: "Scopri La Sbagliata di Murgia Liquori: un vermouth artigianale nato da un errore provvidenziale. Note di assenzio e mirto.",
  openGraph: {
    title: "La Sbagliata | Murgia Liquori",
    description: "Il Vermouth che celebra la bellezza dell'imperfezione.",
    images: ["/images/sbagliata_product.png"],
  },
};

export default async function LaSbagliataPage() {
  const liveProducts = await getLiveProducts();
  const liveSbagliata = liveProducts?.[PRODUCTS_MANIFEST.sbagliata.priceId];

  return (
    <main className="bg-noir min-h-screen selection:bg-primary selection:text-noir overflow-x-hidden relative">
      
      {/* Cinematic Phase 1: The Arrival */}
      <SbagliataHero />

      {/* Cinematic Phase 2: The Anatomy of an Error */}
      <SbagliataSpecs />

      {/* Cinematic Phase 3: The Limited Ritual */}
      <SbagliataRitual 
        liveProducts={liveProducts} 
      />

      {/* Cinematic Phase 4: Modern Mixology (Collector Ed.) */}
      {/* <SbagliataCocktails /> */}

      {/* Collection Discovery */}
      <ProductDiscovery 
        exclude="La Sbagliata" 
        liveProducts={liveProducts} 
      />

      <Footer />
    </main>
  );
}
