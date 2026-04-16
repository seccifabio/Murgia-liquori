import Stripe from 'stripe';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '../.env.local');

// Manual env loader
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.join('=').trim().replace(/^["']|["']$/g, '');
    }
  });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function syncProducts() {
  console.log('✨ Starting Form Factor Realignment...');

  const products = [
    {
      key: 'bianco_5cl',
      name: 'Villacidro Bianco - 5cl',
      description: 'Liquore Villacidro Bianco - Tradizione e Purezza. Formato 5cl.',
      amount: 500, // 5€
      metadata: { brand: 'Villacidro', type: 'bianco', format: '5cl' }
    },
    {
      key: 'sbagliata_20cl',
      name: 'La Sbagliata - 20cl',
      description: "L'Amaro Botanico che sfida le regole. Formato 20cl.",
      amount: 1500, // 15€
      metadata: { brand: 'Villacidro', type: 'sbagliata', format: '20cl' }
    },
    {
      key: 'giallo_5cl',
      name: 'Villacidro Giallo - 5cl',
      description: 'Villacidro Giallo - Formato 5cl.',
      amount: 500, // 5€
      metadata: { brand: 'Villacidro', type: 'giallo', format: '5cl' }
    }
  ];

  const manifest = {};

  for (const p of products) {
    console.log(`🌑 Manifesting ${p.name}...`);
    const product = await stripe.products.create({
      name: p.name,
      description: p.description,
      metadata: p.metadata
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: p.amount,
      currency: 'eur',
    });

    manifest[p.key] = {
      productId: product.id,
      priceId: price.id,
      amount: p.amount / 100
    };
    
    console.log(`✅ ${p.name}: ${price.id}`);
  }

  console.log('\n--- NEW MANIFEST NODES ---');
  console.log(JSON.stringify(manifest, null, 2));
}

syncProducts().catch(console.error);
