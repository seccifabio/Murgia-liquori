
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

async function main() {
  console.log("🌑 Starting Final Stripe Treasury Manifestation...");

  const productsToCreate = [
    {
      name: "Villacidro Bianco",
      description: "La purezza dell'Anice Stellato. Formato 50cl.",
      amount: 500, // 5€
      metadata: { brand: 'Villacidro', type: 'bianco' }
    },
    {
      name: "La Sbagliata",
      description: "L'Amaro Botanico che sfida le regole. Formato 50cl.",
      amount: 1500, // 15€
      metadata: { brand: 'Villacidro', type: 'sbagliata' }
    }
  ];

  for (const p of productsToCreate) {
    try {
      console.log(`✨ Manifesting Product: ${p.name}...`);
      const product = await stripe.products.create({
        name: p.name,
        description: p.description,
        metadata: p.metadata
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
    } catch (err) {
      console.error(`❌ FAILED to manifest ${p.name}:`, err.message);
    }
  }

  console.log("🌑 Final Treasury Manifestation Complete.");
}

main();
