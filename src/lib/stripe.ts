import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing from environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-01-27-ac' as any, // Using the latest stable version
  appInfo: {
    name: 'Murgia Liquori Shop',
    version: '0.1.0',
  },
});
