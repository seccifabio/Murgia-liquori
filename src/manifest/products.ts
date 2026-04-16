/**
 * @file products.ts
 * @description The Central Identity Manifest for Murgia Liquori Artifacts.
 * Link these IDs to your Stripe Dashboard >> Products >> Price ID
 */

export const PRODUCTS_MANIFEST = {
  giallo: {
    id: "villacidro-giallo",
    productId: "prod_UKhT1VSJtkQ1rJ",
    priceId: "price_1TM24YIuoh35e3roTRK2zGbp",
    price: 45,
  },
  bianco: {
    id: "murgia-bianco",
    productId: "prod_UKhTDSMW2gRaIt",
    priceId: "price_1TM24ZIuoh35e3roLsnvntfj",
    price: 45,
  },
  sbagliata: {
    id: "la-sbagliata",
    productId: "prod_UKhTea4wkJGqIq",
    priceId: "price_1TM24ZIuoh35e3rouLctnxoM",
    price: 35,
  }
};

export type ProductManifest = typeof PRODUCTS_MANIFEST;
