"use server";

import Stripe from "stripe";
import { PRODUCTS_MANIFEST } from "@/manifest/products";
import { unstable_cache } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16" as any,
});

/**
 * The Alchemical Sync Ritual
 * Fetches definitive names and pricing from Stripe.
 */
export const getLiveProducts = unstable_cache(
  async () => {
    console.log("Stripe Ritual: Synchronizing with Source of Truth...");
    
    try {
      const productIds = Object.values(PRODUCTS_MANIFEST).map(p => p.priceId);
      
      const prices = await Promise.all(
        productIds.map(id => stripe.prices.retrieve(id, { expand: ["product"] }))
      );

      const liveData: Record<string, { name: string; price: number; description: string }> = {};

      prices.forEach((price) => {
        const product = price.product as Stripe.Product;
        liveData[price.id] = {
          name: product.name,
          price: (price.unit_amount || 0) / 100,
          description: product.description || "",
        };
      });

      return liveData;
    } catch (error) {
      console.error("Stripe Sync Failure:", error);
      return null;
    }
  },
  ["stripe-products"],
  { revalidate: 3600, tags: ["products"] } // Sync once per hour or on revalidate
);
