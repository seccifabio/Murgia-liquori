"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";

import { MARKETING_MANIFEST } from "@/manifest/marketing";

const apiKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build";

// Initialize Stripe with the Secret Key from environment
const stripe = new Stripe(apiKey, {
  apiVersion: "2023-10-16" as any, // Standard stable version
});

export async function createCheckoutSession(items: any[], appliedCode?: string | null, locale: string = "it") {
  if (!items || items.length === 0) {
    throw new Error("Il carrello è vuoto.");
  }

  try {
    // RITUAL: Fetch authoritative prices from Stripe to calculate threshold
    // Do not trust the string provided by the client
    const priceObjects = await Promise.all(
      items.map(item => stripe.prices.retrieve(item.priceId))
    );

    // RITUAL: Fetch the authoritative Shipping Rate price from the Stripe Registry
    const shippingRate: any = await stripe.shippingRates.retrieve('shr_1TMqYNIuoh35e3rojDnMfvtb');
    const standardShippingCents = (shippingRate as any).fixed_amount?.amount || 1200; // Authoritative default (12€)

    let subtotalCents = 0;
    items.forEach((item, index) => {
      const stripePrice: any = priceObjects[index];
      subtotalCents += (stripePrice.unit_amount || 0) * item.quantity;
    });

    const discountCents = appliedCode === MARKETING_MANIFEST.promo.code 
      ? Math.round(subtotalCents * MARKETING_MANIFEST.promo.discount)
      : 0;

    // Evaluate Heritage Shipping Threshold (Free > 80€)
    const shippingAmount = (subtotalCents - discountCents) >= 8000 ? 0 : standardShippingCents;

    const line_items = items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    console.log("Stripe Ritual: Calculating threshold with Subtotal:", subtotalCents / 100, "Discount:", discountCents / 100);

    // Search for the Promotion Code ID or Coupon ID in Stripe to pre-apply it
    let discounts: any[] = [];
    if (appliedCode) {
      const formattedCode = appliedCode.trim();
      try {
        console.log("Stripe Ritual: Target Discovery for Code:", formattedCode);
        
        // RITUAL 1: Direct Discovery via Native Stripe Code Filter
        const promoCodes = await stripe.promotionCodes.list({
          code: formattedCode,
          active: true,
          limit: 1,
        }) as any;
        
        if (promoCodes.data && promoCodes.data.length > 0) {
          const matchedPromo = promoCodes.data[0];
          // ALCHEMY: Accessing the coupon ID safely to satisfy the Type Architect
          const couponId = typeof matchedPromo.coupon === 'string' 
            ? matchedPromo.coupon 
            : (matchedPromo.coupon as any).id;
            
          discounts = [{ coupon: couponId }];
          console.log("Stripe Ritual: Targeted Coupon ID Manifested via Promo Code:", couponId);
        } else {
          // RITUAL 2: Fallback Discovery via Coupon Treasury
          try {
            const coupon = await stripe.coupons.retrieve(formattedCode);
            if (coupon.valid) {
              discounts = [{ coupon: coupon.id }];
              console.log("Stripe Ritual: Targeted Coupon ID Manifested via ID Search:", coupon.id);
            }
          } catch (couponErr) {
            console.warn(`Stripe Ritual: Voucher "${formattedCode}" remains elusive in the registry.`);
          }
        }
      } catch (err) {
        console.error("Stripe Ritual: Discovery process interrupted:", err);
      }
    }

    const sessionConfig: any = {
      ui_mode: 'embedded' as any,
      line_items,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["IT", "DE", "FR", "ES", "GB", "CH", "US"],
      },
      shipping_options: shippingAmount === 0 ? [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'eur',
            },
            display_name: 'Trasporto Heritage (Gratuito)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 5 },
            },
          },
        },
      ] : [
        { shipping_rate: 'shr_1TMqYNIuoh35e3rojDnMfvtb' }
      ],
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        order_type: "Murgia Heritage Purchase",
        items_summary: items.map(i => `${i.name} (${i.format})`).join(", "),
        applied_promo: appliedCode || "none",
      },
      locale: locale as any,
    };

    // 🪙 RITUAL: Exclusivity Rule for Discounts vs. Promotion Search
    if (discounts.length > 0) {
      sessionConfig.discounts = discounts;
    } else {
      sessionConfig.allow_promotion_codes = true;
    }

    try {
      const session = await stripe.checkout.sessions.create(sessionConfig);
      console.log("Stripe Ritual: Session Manifested Successfully:", session.id);
      return { 
        clientSecret: session.client_secret,
        diagnosis: discounts.length > 0 ? `SUCCESS: Voucher "${appliedCode}" Manifested in Treasury.` : "NORMAL: Interactive search allowed."
      };
    } catch (err) {
      console.warn("Stripe Ritual: Primary manifestation failed. Falling back.");
      
      const fallbackConfig = {
        ...sessionConfig,
        discounts: undefined,
        allow_promotion_codes: true,
        locale: locale as any,
      };

      const fallbackSession = await stripe.checkout.sessions.create(fallbackConfig as any);
      return { 
        clientSecret: fallbackSession.client_secret,
        diagnosis: `FALLBACK: Primary ritual failed. Reason: ${err instanceof Error ? err.message : "Unknown"}`
      };
    }
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

