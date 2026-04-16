import SbagliataHero from "@/components/SbagliataHero";
import SbagliataRitual from "@/components/SbagliataRitual";
import SbagliataSpecs from "@/components/SbagliataSpecs";
import SbagliataCocktails from "@/components/SbagliataCocktails";
import ProductDiscovery from "@/components/ProductDiscovery";
import Footer from "@/components/Footer";
import { getLiveProducts } from "@/lib/stripe-sync";
import { PRODUCTS_MANIFEST } from "@/manifest/products";

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
        livePrice={liveSbagliata?.price} 
        liveName={liveSbagliata?.name} 
      />

      {/* Cinematic Phase 4: Modern Mixology (Collector Ed.) */}
      <SbagliataCocktails />

      {/* Collection Discovery */}
      <ProductDiscovery 
        exclude="La Sbagliata" 
        liveProducts={liveProducts} 
      />

      <Footer />
    </main>
  );
}
