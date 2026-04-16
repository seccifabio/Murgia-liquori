import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const productsData = [
  {
    name: "Villacidro Giallo",
    description: "L'Anima d'Oro della Sardegna. Un’alchimia segreta di oltre 20 erbe botaniche e puro zafferano.",
    price: 3200,
    img: "https://murgialiquori.com/images/products/giallo-bottle.png",
    metadata: {
      video_hero_url: '/videos/giallo-ritual.mp4',
      flavor_profile: 'Zafferano, Erbe Spontanee, Agrumi',
      volume: '70cl',
      brand: 'Murgia'
    }
  },
  {
    name: "Murgia Bianco",
    description: "La purezza dell'Anice Stellato. Un classico intramontabile, fresco e cristallino.",
    price: 2400,
    img: "https://murgialiquori.com/images/products/bianco-bottle.png",
    metadata: {
      video_hero_url: '/videos/bianco-ritual.mp4',
      flavor_profile: 'Anice Stellato, Liquirizia, Menta',
      volume: '50cl',
      brand: 'Murgia'
    }
  },
  {
    name: "La Sbagliata",
    description: "L'Amaro Botanico che sfida le regole. Note amare e persistenti per palati audaci.",
    price: 3600,
    img: "https://murgialiquori.com/images/products/sbagliata-bottle.png",
    metadata: {
      video_hero_url: '/videos/sbagliata-ritual.mp4',
      flavor_profile: 'Botaniche Sarde, Scorza d\'Arancia, Genziana',
      volume: '70cl',
      brand: 'Murgia'
    }
  }
];

async function seed() {
  console.log('🍷 Starting Murgia Stripe Full Catalog Seeding...');

  for (const item of productsData) {
    try {
      const product = await stripe.products.create({
        name: item.name,
        description: item.description,
        images: [item.img],
        metadata: item.metadata
      });

      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: item.price,
        currency: 'eur',
      });

      console.log(`✅ ${item.name} seeded: Product ID: ${product.id}, Price ID: ${price.id}`);
    } catch (error) {
      console.error(`❌ Failed to seed ${item.name}:`, error.message);
    }
  }

  console.log('\n🌟 Full Seeding Complete!');
}

seed();
