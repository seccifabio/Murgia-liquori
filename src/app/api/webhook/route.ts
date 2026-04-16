import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { Resend } from "resend";
import fs from "node:fs/promises";
import path from "node:path";

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
    const session = event.data.object as Stripe.Checkout.Session;
    
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
              <span style="color:#FFFFFF; font-size:16px;">${(item.amount_total / 100).toFixed(2)}€</span>
            </td>
          </tr>
        `).join('');

        const productTotal = (session.amount_total! / 100).toFixed(2) + "€";
        
        // CUSTOMER DATA
        const customerName = session.shipping_details?.name || session.customer_details?.name || "Gentile Alchimista";
        const addr = session.shipping_details?.address;
        const shippingAddress = addr 
          ? `${addr.line1}${addr.line2 ? `, ${addr.line2}` : ''}, ${addr.postal_code} ${addr.city} (${addr.country})`
          : "Ritiro presso l'Atelier";

        const startTag = "<!-- ITEM REPEATABLE -->";
        const endTag = "<!-- END ITEM REPEATABLE -->";
        const regex = new RegExp(`${startTag}[\\s\\S]*${endTag}`, "g");
        
        htmlContent = htmlContent.replace(regex, itemsHtml);
        
        htmlContent = htmlContent
          .replace("{{ORDER_ID}}", session.id.slice(-8).toUpperCase())
          .replace("{{TOTAL_AMOUNT}}", productTotal)
          .replace("{{CUSTOMER_NAME}}", customerName)
          .replace("{{SHIPPING_ADDRESS}}", shippingAddress);

        // DISPATCH RITUAL
        await resend.emails.send({
          from: "Murgia Liquori <onboarding@resend.dev>",
          to: customerEmail,
          subject: `Conferma Ordine - Murgia Liquori #${session.id.slice(-8).toUpperCase()}`,
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
