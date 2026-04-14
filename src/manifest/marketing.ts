/**
 * @file marketing.ts
 * @description The Marketing & Engagement Terminal for Murgia Liquori.
 */

export const MARKETING_MANIFEST = {
  // Active promotion parameters
  promo: {
    code: "MURGIA1882",
    discount: 0.1, // 10%
    
    it: {
      description: "OFFERTA ESCLUSIVA DISPONIBILE",
      fullDescription: "PER IL 10% DI SCONTO SULLA TUA COLLEZIONE",
      cta: "CLICCA PER COPIARE",
      successMsg: "COPIATO!"
    },
    en: {
      description: "AN EXCLUSIVE RITUAL AWAITS",
      fullDescription: "CLAIM 10% OFF YOUR COLLECTION",
      cta: "CLICK TO REVEAL",
      successMsg: "VOUCHER SECURED!"
    }
  },

  // Global thresholds
  shipping: {
    freeThreshold: 80, // Free shipping if total > 80€
  }
};

export type MarketingManifest = typeof MARKETING_MANIFEST;
