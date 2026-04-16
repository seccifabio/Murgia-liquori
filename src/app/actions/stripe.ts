"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";

const apiKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build";

// Initialize Stripe with the Secret Key from environment
const stripe = new Stripe(apiKey, {
  apiVersion: "2023-10-16" as any, // Standard stable version
});

export async function createCheckoutSession(items: any[], appliedCode?: string | null) {
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

  console.log("Stripe Ritual: Initiating with items:", line_items, "Applied Code:", appliedCode);

  try {
    // Calculate Alchemical Threshold for Shipping (Free over 80€)
    const subtotalCents = items.reduce((acc, item) => {
      const priceNum = parseFloat(item.price.replace("€", "").replace(",", "."));
      return acc + (priceNum * 100 * item.quantity);
    }, 0);

    const shippingAmount = subtotalCents >= 8000 ? 0 : 1000;

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded' as any,
      line_items,
      mode: "payment",
      allow_promotion_codes: true, // Allows user to enter codes manually in terminal
      shipping_address_collection: {
        allowed_countries: ["IT", "GB", "FR", "DE", "ES", "CH", "US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: shippingAmount,
              currency: 'eur',
            },
            display_name: shippingAmount === 0 ? 'Trasporto Heritage (Gratuito)' : 'Trasporto Standard',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 3,
              },
              maximum: {
                unit: 'business_day',
                value: 5,
              },
            },
          },
        },
      ],
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        order_type: "Murgia Heritage Purchase",
        items_summary: items.map(i => `${i.name} (${i.format})`).join(", "),
        applied_promo: appliedCode || "none",
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

