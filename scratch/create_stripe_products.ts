
import Stripe from 'stripe';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

async function manifestProducts() {
  console.log("🌑 Starting Stripe Treasury Manifestation...");

  const productsToCreate = [
    {
      name: "Villacidro Giallo - 50 CL",
      description: "L'Anima Storica di Villacidro. Un'alchimia di zafferano e herbe selvatiche in formato 50cl.",
      amount: 2100, // 21€
    },
    {
      name: "Villacidro Giallo - 5 CL",
      description: "Il Sigillo del Viaggiatore. L'essenza di Villacidro Giallo in formato miniatura 5cl.",
      amount: 500, // 5€
    },
    {
       name: "Villacidro Giallo - 70 CL",
       description: "Il Formato Sovrano. La massima espressione del Villacidro Giallo in formato 70cl.",
       amount: 2600, // 26€
    }
  ];

  for (const p of productsToCreate) {
    try {
      console.log(`✨ Manifesting Product: ${p.name}...`);
      const product = await stripe.products.create({
        name: p.name,
        description: p.description,
      });

      console.log(`💰 Anchoring Price for ${p.name}: ${p.amount/100}€...`);
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: p.amount,
        currency: 'eur',
      });

      console.log(`✅ SUCCESS: ${p.name}`);
      console.log(`   Product ID: ${product.id}`);
      console.log(`   Price ID: ${price.id}`);
      console.log('---');
    } catch (err: any) {
      console.error(`❌ FAILED to manifest ${p.name}:`, err.message);
    }
  }

  console.log("🌑 Treasury Manifestation Complete.");
}

manifestProducts();
