/**
 * @file marketing.ts
 * @description The Marketing & Engagement Terminal for Murgia Liquori.
 * 
 * Instructions for Management:
 * - PROMO_CODE: The code users must copy to get a discount.
 * - DISCOUNT_PERCENTAGE: Value between 0 and 1 (e.g., 0.1 for 10%).
 */

export const MARKETING_MANIFEST = {
  // Active promotion parameters
  promo: {
    code: "MURGIA1882",
    discount: 0.1, // 10%
    description: "OFFERTA ESCLUSIVA DISPONIBILE",
    fullDescription: "PER IL 10% DI SCONTO SULLA TUA COLLEZIONE",
    cta: "CLICCA PER COPIARE",
    successMsg: "COPIATO!"
  },

  // Global thresholds
  shipping: {
    freeThreshold: 80, // Free shipping if total > 80€
  }
};

export type MarketingManifest = typeof MARKETING_MANIFEST;
