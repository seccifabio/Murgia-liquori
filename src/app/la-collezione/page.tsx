import { getLiveProducts } from "@/lib/stripe-sync";
import CollectionPageClient from "./CollectionPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Collezione | Liquori d'Autore",
  description: "Esplora la nostra selezione curata di spirits sardi: La Sbagliata, Murgia Bianco e Murgia Giallo. L'arte dei liquoristi dal 1882.",
  openGraph: {
    title: "La Collezione Murgia Liquori",
    description: "I nostri spirits artigianali: un'unione di tradizione e modernità.",
    images: ["/images/lasbagliata.webp"],
  },
};

export default async function ProdottiPage() {
  const liveProducts = await getLiveProducts();

  return <CollectionPageClient liveProducts={liveProducts} />;
}
