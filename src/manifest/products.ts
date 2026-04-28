/**
 * @file products.ts
 * @description The Central Identity Manifest for Villacidro Liquori Artifacts.
 */

export const PRODUCTS_MANIFEST = {
  giallo: {
    id: "villacidro-giallo",
    productId: "prod_ULczgBX4LgqyH4", // Villacidro Giallo - 70 CL (Flagship)
    priceId: "price_1TMvj3Iuoh35e3rosej8wulP", // Default 70cl
    price: 26,
    variants: [
      { format: "5cl", priceId: "price_1TMvq2Iuoh35e3rosgZ2s5eg", price: 5 },
      { format: "50cl", priceId: "price_1TMvj1Iuoh35e3rorbbts5GN", price: 21 },
      { format: "70cl", priceId: "price_1TMvj3Iuoh35e3rosej8wulP", price: 26 },
    ]
  },
  bianco: {
    id: "villacidro-bianco",
    productId: "prod_ULd6sWWXV7xLGo",
    priceId: "price_1TMvq0Iuoh35e3roYz0KkzW7", // Default 5cl
    price: 5,
    variants: [
      { format: "5cl", priceId: "price_1TMvq0Iuoh35e3roYz0KkzW7", price: 5 },
      { format: "50cl", priceId: "price_1TMvjIIuoh35e3rovEOwjl6b", price: 21, productId: "prod_ULczzKAcJjI5bD" },
    ]
  },
  sbagliata: {
    id: "la-sbagliata",
    productId: "prod_ULczSZE8q46xuc",
    priceId: "price_1TMvjJIuoh35e3roAwERpLRS",
    price: 15,
    format: "20cl"
  }
};

export type ProductManifest = typeof PRODUCTS_MANIFEST;
