import BiancoHero from "@/components/BiancoHero";
import BiancoRitual from "@/components/BiancoRitual";
import BiancoSpecs from "@/components/BiancoSpecs";
// import BiancoCocktails from "@/components/BiancoCocktails";
import ProductDiscovery from "@/components/ProductDiscovery";
import Footer from "@/components/Footer";
import { getLiveProducts } from "@/lib/stripe-sync";
import { PRODUCTS_MANIFEST } from "@/manifest/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Murgia Bianco | L'Essenza della Sardegna",
  description: "Scopri Murgia Bianco: un liquore di erbe selvatiche sarde. Freschezza e intensità in ogni sorso.",
  openGraph: {
    title: "Murgia Bianco | Murgia Liquori",
    description: "Il gusto autentico della macchia mediterranea.",
    images: ["/images/bianco_product.png"],
  },
};

export default async function MurgiaBiancoPage() {
  const liveProducts = await getLiveProducts();
  const liveBianco = liveProducts?.[PRODUCTS_MANIFEST.bianco.priceId];

  return (
    <main className="bg-noir min-h-screen selection:bg-white selection:text-noir overflow-x-hidden relative">
      
      {/* Cinematic Phase 1: The Arrival */}
      <BiancoHero />

      {/* Cinematic Phase 2: The Anatomy */}
      <BiancoSpecs />

      {/* Cinematic Phase 3: The White Immersion Ritual */}
      <BiancoRitual 
        liveProducts={liveProducts} 
      />

      {/* Cinematic Phase 4: Modern Mixology (Signature Serves) */}
      {/* <BiancoCocktails /> */}

      {/* Collection Discovery */}
      <ProductDiscovery 
        exclude="Murgia Bianco" 
        liveProducts={liveProducts} 
      />

      <Footer />
    </main>
  );
}
