"use server";

import Stripe from "stripe";
import { redirect } from "next/navigation";

import { MARKETING_MANIFEST } from "@/manifest/marketing";

const getStripe = () => {
  const apiKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build";
  return new Stripe(apiKey, {
    apiVersion: "2023-10-16" as any,
  });
};

export async function createCheckoutSession(
  items: any[], 
  appliedCode?: string | null, 
  locale: string = "it", 
  deliveryMethod: "shipping" | "pickup" = "shipping",
  invoiceInfo?: { companyName: string; vat: string; sdi: string } | null
) {
  if (!items || items.length === 0) {
    throw new Error("Il carrello è vuoto.");
  }

  try {
    const stripe = getStripe();
    // RITUAL: Fetch authoritative prices from Stripe to calculate threshold
    const priceObjects = await Promise.all(
      items.map(item => stripe.prices.retrieve(item.priceId))
    );

    // RITUAL: Fetch the authoritative Shipping Rate price from the Stripe Registry
    const shippingRate: any = await stripe.shippingRates.retrieve('shr_1TMqYNIuoh35e3rojDnMfvtb');
    const standardShippingCents = (shippingRate as any).fixed_amount?.amount || 1200; 

    let subtotalCents = 0;
    items.forEach((item, index) => {
      const stripePrice: any = priceObjects[index];
      subtotalCents += (stripePrice.unit_amount || 0) * item.quantity;
    });

    const discountCents = appliedCode === MARKETING_MANIFEST.promo.code 
      ? Math.round(subtotalCents * MARKETING_MANIFEST.promo.discount)
      : 0;

    // Evaluate Heritage Shipping Threshold (Free > 80€) - Only if NOT pickup
    const isPickup = deliveryMethod === "pickup";
    const shippingAmount = isPickup ? 0 : ((subtotalCents - discountCents) >= 8000 ? 0 : standardShippingCents);

    const line_items = items.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    // Search for the Promotion Code ID or Coupon ID in Stripe to pre-apply it
    let discounts: any[] = [];
    if (appliedCode) {
      const formattedCode = appliedCode.trim();
      try {
        const promoCodes = await stripe.promotionCodes.list({
          code: formattedCode,
          active: true,
          limit: 1,
        }) as any;
        
        if (promoCodes.data && promoCodes.data.length > 0) {
          const matchedPromo = promoCodes.data[0];
          const couponId = typeof matchedPromo.coupon === 'string' 
            ? matchedPromo.coupon 
            : (matchedPromo.coupon as any).id;
            
          discounts = [{ coupon: couponId }];
        } else {
          try {
            const coupon = await stripe.coupons.retrieve(formattedCode);
            if (coupon.valid) {
              discounts = [{ coupon: coupon.id }];
            }
          } catch (couponErr) {
            console.warn(`Stripe Ritual: Voucher "${formattedCode}" remains elusive.`);
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
      shipping_address_collection: isPickup ? undefined : {
        allowed_countries: ["IT"],
      },
      shipping_options: isPickup ? [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 0,
              currency: 'eur',
            },
            display_name: 'Ritiro in Distilleria (Villacidro)',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
      ] : (shippingAmount === 0 ? [
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
      ]),
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        order_type: "Murgia Heritage Purchase",
        delivery_method: deliveryMethod,
        items_summary: items.map(i => `${i.name} (${i.format})`).join(", "),
        applied_promo: appliedCode || "none",
        invoice_requested: !!invoiceInfo ? "YES" : "NO",
        invoice_company: invoiceInfo?.companyName || "n/a",
        invoice_vat: invoiceInfo?.vat || "n/a",
        invoice_sdi_pec: invoiceInfo?.sdi || "n/a",
      },
      locale: locale as any,
    };

    if (discounts.length > 0) {
      sessionConfig.discounts = discounts;
    } else {
      sessionConfig.allow_promotion_codes = true;
    }

    try {
      const session = await stripe.checkout.sessions.create(sessionConfig);
      return { 
        clientSecret: session.client_secret,
        diagnosis: discounts.length > 0 ? `SUCCESS: Voucher "${appliedCode}" Manifested.` : "NORMAL: Interactive search allowed."
      };
    } catch (err) {
      console.warn("Stripe Ritual: Primary manifestation failed. Falling back.");
      const fallbackConfig = { ...sessionConfig, discounts: undefined, allow_promotion_codes: true, locale: locale as any };
      const fallbackSession = await stripe.checkout.sessions.create(fallbackConfig as any);
      return { clientSecret: fallbackSession.client_secret, diagnosis: `FALLBACK: Ritual failed.` };
    }
  } catch (error: any) {
    console.error("Stripe Session Manifestation Failure:", error);
    throw new Error(`Errore Stripe: ${error.message}`);
  }
}

export async function getCheckoutSession(sessionId: string) {
  if (!sessionId) throw new Error("ID Sessione mancante.");

  const stripe = getStripe();
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

import { revalidateTag } from "next/cache";

export async function revalidateProducts() {
  console.log("Stripe Ritual: Triggering global product revalidation...");
  revalidateTag("products", "max");
}

