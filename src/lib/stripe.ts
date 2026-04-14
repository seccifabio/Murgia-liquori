import Stripe from 'stripe';

const apiKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_build';

export const stripe = new Stripe(apiKey, {
  apiVersion: '2025-01-27-ac' as any, // Using the latest stable version
  appInfo: {
    name: 'Murgia Liquori Shop',
    version: '0.1.0',
  },
});
