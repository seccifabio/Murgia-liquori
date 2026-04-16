import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { MARKETING_MANIFEST } from "@/manifest/marketing";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = (searchParams.get("lang") || "it") as "it" | "en";
    const t = (MARKETING_MANIFEST as any).email[lang] || MARKETING_MANIFEST.email.it;

    const templatePath = path.join(process.cwd(), "src/templates/OrderConfirmation.html");
    let htmlContent = await fs.readFile(templatePath, "utf-8");

    // MOCK DATA FOR PREVIEW
    const itemsHtml = `
      <tr>
        <td style="padding-top: 30px;">
          <span style="color:#FFFFFF; font-size:18px; font-weight:500; text-transform:uppercase; letter-spacing: 0.05em;">Villacidro Giallo</span>
          <br/>
          <span style="color:rgba(255,255,255,0.4); font-size:13px; font-style: italic;">70cl — Edizione Archivi</span>
        </td>
        <td align="right" style="padding-top: 30px;">
          <span style="color:#FFFFFF; font-size:18px; font-weight: 300;">45.00€</span>
        </td>
      </tr>
      <tr>
        <td style="padding-top: 20px;">
          <span style="color:#FFFFFF; font-size:18px; font-weight:500; text-transform:uppercase; letter-spacing: 0.05em;">Murgia Bianco</span>
          <br/>
          <span style="color:rgba(255,255,255,0.4); font-size:13px; font-style: italic;">70cl — Edizione Archivi</span>
        </td>
        <td align="right" style="padding-top: 20px;">
          <span style="color:#FFFFFF; font-size:18px; font-weight: 300;">45.00€</span>
        </td>
      </tr>
    `;

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
      .replace("{{ORDER_ID}}", "PREVIEW-2026")
      .replace("{{TOTAL_AMOUNT}}", "90.00€")
      .replace("{{CUSTOMER_NAME}}", lang === "it" ? "Fabio Secci" : "Alexander Sterling")
      .replace("{{SHIPPING_ADDRESS}}", lang === "it" ? "Via Roma 123, 09039 Villacidro (IT)" : "221B Baker St, London (UK)");

    return new Response(htmlContent, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to render alchemical preview" }, { status: 500 });
  }
}
