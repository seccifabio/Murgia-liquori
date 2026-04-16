import { getLiveProducts } from "@/lib/stripe-sync";
import CollectionPageClient from "./CollectionPageClient";

export default async function ProdottiPage() {
  const liveProducts = await getLiveProducts();

  return <CollectionPageClient liveProducts={liveProducts} />;
}
