"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";

// Initialize Stripe with the Secret Key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as any, // Standard stable version
});

export async function createCheckoutSession(items: any[]) {
  if (!items || items.length === 0) {
    throw new Error("Il carrello è vuoto.");
  }

  // Transform internal CartItems into Stripe Line Items
  const line_items = items.map((item) => {
    // If we have a priceId from the Stripe Dashboard, we use it directly.
    // Otherwise, we could manifest price data on the fly (if enabled by Stripe).
    // For Murgia, we prioritize using Stripe Price IDs for financial authority.
    return {
      price: item.priceId,
      quantity: item.quantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop`,
      shipping_address_collection: {
        allowed_countries: ["IT"], // Restricting to Italy for the initial launch
      },
      // Note: We can add metadata for tracking the specific "Format" (50cl/70cl) 
      // if it's not already encoded in the Price ID.
      metadata: {
        order_type: "Murgia Heritage Purchase",
        items_summary: items.map(i => `${i.name} (${i.format})`).join(", "),
      },
    });

    if (!session.url) {
      throw new Error("Impossibile generare la sessione di pagamento.");
    }

    return { url: session.url };
  } catch (error: any) {
    console.error("Stripe Session Manifestation Failure:", error);
    throw new Error(`Errore Stripe: ${error.message}`);
  }
}
