import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function GET() {
  try {
    const templatePath = path.join(process.cwd(), "src/templates/OrderConfirmation.html");
    let htmlContent = await fs.readFile(templatePath, "utf-8");

    // MOCK DATA FOR PREVIEW
    htmlContent = htmlContent
      .replace("{{ORDER_ID}}", "TEST-ALCH-2026")
      .replace("{{PRODUCT_NAME}}", "Murgia Giallo")
      .replace("{{PRODUCT_PRICE}}", "42.00€")
      .replace("{{TOTAL_AMOUNT}}", "42.00€")
      .replace("{{CUSTOMER_NAME}}", "Fabio Secci")
      .replace("{{SHIPPING_ADDRESS}}", "Via Roma 123, 09039 Villacidro (IT)");

    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Template not found" }, { status: 404 });
  }
}
