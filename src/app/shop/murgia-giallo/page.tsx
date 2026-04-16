import GialloHero from "@/components/GialloHero";
import GialloRitual from "@/components/GialloRitual";
import GialloSpecs from "@/components/GialloSpecs";
import GialloCocktails from "@/components/GialloCocktails";
import ProductDiscovery from "@/components/ProductDiscovery";
import Footer from "@/components/Footer";
import { getLiveProducts } from "@/lib/stripe-sync";
import { PRODUCTS_MANIFEST } from "@/manifest/products";

export default async function MurgiaGialloPage() {
  const liveProducts = await getLiveProducts();
  const liveGiallo = liveProducts?.[PRODUCTS_MANIFEST.giallo.priceId];

  return (
    <main className="bg-noir min-h-screen selection:bg-primary selection:text-noir overflow-x-hidden relative">
      
      {/* Cinematic Phase 1: The Arrival */}
      <GialloHero />

      {/* Cinematic Phase 2: The Anatomy */}
      <GialloSpecs />

      {/* Cinematic Phase 3: The Yellow Immersion Ritual */}
      <GialloRitual 
        livePrice={liveGiallo?.price} 
        liveName={liveGiallo?.name} 
      />

      {/* Cinematic Phase 4: Modern Mixology (Signature Serves) */}
      <GialloCocktails />

      {/* Terminal Phase: Collection Discovery */}
      <ProductDiscovery 
        exclude="Murgia Giallo" 
        liveProducts={liveProducts} 
      />

      <Footer />
    </main>
  );
}
