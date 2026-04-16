import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { Resend } from "resend";
import fs from "node:fs/promises";
import path from "node:path";
import { MARKETING_MANIFEST } from "@/manifest/marketing";

// ALCHEMICAL LAZY INITIALIZATION
// This prevents build-time failures when keys are absent
const getClients = () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-03-25.dahlia" as any,
  });
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  return { stripe, resend, webhookSecret };
};

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  const { stripe, resend, webhookSecret } = getClients();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`[ALCHEMY ERROR] Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // RITUAL: Handle Successful Payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    
    // JOURNEY MAPPING: Retrieve line items
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
    const customerEmail = session.customer_details?.email;

    if (customerEmail) {
      try {
        const templatePath = path.join(process.cwd(), "src/templates/OrderConfirmation.html");
        let htmlContent = await fs.readFile(templatePath, "utf-8");

        // DYNAMIC ITEMS GENERATION
        const itemsHtml = lineItems.data.map(item => `
          <tr>
            <td style="padding-top: 30px;">
              <span style="color:#FFFFFF; font-size:16px; font-weight:500; text-transform:uppercase;">${item.description}</span>
              <br/>
              <span style="color:rgba(255,255,255,0.4); font-size:12px;">Qty: ${item.quantity}</span>
            </td>
            <td align="right" style="padding-top: 30px;">
              <span style="color:#FFFFFF; font-size:16px;">${(item.amount_subtotal / 100).toFixed(2)}€</span>
            </td>
          </tr>
        `).join('') + (
          (session.total_details?.amount_shipping > 0 ? `
            <tr>
              <td style="padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
                <span style="color:rgba(255,255,255,0.6); font-size:14px; text-transform:uppercase;">Trasporto</span>
              </td>
              <td align="right" style="padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
                <span style="color:rgba(255,255,255,0.6); font-size:14px;">${(session.total_details.amount_shipping / 100).toFixed(2)}€</span>
              </td>
            </tr>
          ` : '') +
          (session.total_details?.amount_discount > 0 ? `
            <tr>
              <td style="padding-top: 10px;">
                <span style="color:#F4B400; font-size:14px; text-transform:uppercase;">Sconto Heritage</span>
              </td>
              <td align="right" style="padding-top: 10px;">
                <span style="color:#F4B400; font-size:14px;">-${(session.total_details.amount_discount / 100).toFixed(2)}€</span>
              </td>
            </tr>
          ` : '')
        );

        const productTotal = (session.amount_total! / 100).toFixed(2) + "€";
        
        // LANGUAGE AUDIT
        const locale = (session.locale || "it").split("-")[0] as "it" | "en";
        const t = (MARKETING_MANIFEST as any).email[locale] || MARKETING_MANIFEST.email.it;

        // CUSTOMER DATA RITUAL: Searching through all layers of the session for the address
        const shippingDetails = session.shipping_details;
        const customerDetails = session.customer_details;
        const addr = shippingDetails?.address || customerDetails?.address;
        
        const customerName = shippingDetails?.name || customerDetails?.name || (locale === "it" ? "Gentile Alchimista" : "Dear Alchemist");
        
        // MANIFEST: We build the address string with high-fidelity formatting
        const shippingAddress = addr && addr.line1
          ? `${addr.line1}${addr.line2 ? `, ${addr.line2}` : ""}, ${addr.postal_code || ""} ${addr.city || ""} (${addr.country || ""})`
          : (locale === "it" ? "Ritiro presso l'Atelier" : "Collection at the Atelier");

        const startTag = "<!-- ITEM REPEATABLE -->";
        const endTag = "<!-- END ITEM REPEATABLE -->";
        const regex = new RegExp(`${startTag}[\\s\\S]*${endTag}`, "g");
        
        htmlContent = htmlContent.replace(regex, itemsHtml);
        
        // NARRATIVE TRANSFORMATION
        htmlContent = htmlContent
          .replace("{{HERO_TITLE}}", t.heroTitle)
          .replace("{{HERO_SUBTITLE}}", t.heroSubtitle)
          .replace("{{ORDER_REF_LABEL}}", t.orderRef)
          .replace("{{TOTAL_AMOUNT_LABEL}}", t.orderTotal)
          .replace("{{SHIPPING_DEST_LABEL}}", t.shippingDest)
          .replace("{{CROSS_TITLE}}", t.crossTitle)
          .replace("{{CROSS_TEXT}}", t.crossText)
          .replace("{{CROSS_CTA}}", t.crossCta)
          .replace("{{SUPPORT_TEXT}}", t.supportText)
          .replace("{{CONTACT_TEXT}}", t.contactText)
          .replace("{{FOOTER_NOTE}}", t.footerNote)
          .replace("{{ORDER_ID}}", session.id.slice(-8).toUpperCase())
          .replace("{{TOTAL_AMOUNT}}", productTotal)
          .replace("{{CUSTOMER_NAME}}", customerName)
          .replace("{{SHIPPING_ADDRESS}}", shippingAddress);

        // DISPATCH RITUAL
        await resend.emails.send({
          from: "Murgia Liquori <onboarding@resend.dev>",
          to: customerEmail,
          subject: `${t.subject} #${session.id.slice(-8).toUpperCase()}`,
          html: htmlContent,
        });

        console.log(`[ALCHEMY SUCCESS] Order confirmation dispatched to ${customerEmail}`);
      } catch (error) {
        console.error("[ALCHEMY ERROR] Failed to dispatch order ritual:", error);
      }
    }
  }

  return NextResponse.json({ received: true });
}
