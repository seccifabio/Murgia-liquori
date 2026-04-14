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

  const line_items = items.map((item) => {
    if (!item.priceId) throw new Error(`Price ID mancante per: ${item.name}`);
    return {
      price: item.priceId,
      quantity: item.quantity,
    };
  });

  console.log("Stripe Ritual: Initiating with items:", line_items);

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items,
      mode: "payment",
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      shipping_address_collection: {
        allowed_countries: ["IT"],
      },
      metadata: {
        order_type: "Murgia Heritage Purchase",
        items_summary: items.map(i => `${i.name} (${i.format})`).join(", "),
      },
    });

    console.log("Stripe Ritual: Session Manifested:", session.id);



    return { clientSecret: session.client_secret };
  } catch (error: any) {
    console.error("Stripe Session Manifestation Failure:", error);
    throw new Error(`Errore Stripe: ${error.message}`);
  }
}

export async function getCheckoutSession(sessionId: string) {
  if (!sessionId) throw new Error("ID Sessione mancante.");

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    return JSON.parse(JSON.stringify(session)); // Plane object for client
  } catch (error: any) {
    console.error("Stripe Retrieval Failure:", error);
    throw new Error(`Errore recupero sessione: ${error.message}`);
  }
}

