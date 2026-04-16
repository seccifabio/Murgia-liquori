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
      description: "AN EXCLUSIVE OFFER AWAITS",
      fullDescription: "CLAIM 10% OFF YOUR COLLECTION",
      cta: "CLICK TO COPY",
      successMsg: "VOUCHER SECURED!"
    }
  },

  // Global thresholds
  shipping: {
    freeThreshold: 80, // Free shipping if total > 80€
    standardRate: 12,  // Standard shipping rate (synchronized with Stripe)
  },

  // Transactional Email Manifest (Multilingual)
  email: {
    it: {
      subject: "Conferma Ordine - Villacidro Liquori",
      heroTitle: "L'Arte della <br/> <span style=\"font-style:italic; opacity:0.75;\">Distillazione</span> <br/> è in viaggio.",
      heroSubtitle: "Un pezzo della nostra storia sta per unirsi alla tua collezione.",
      orderRef: "Riferimento Ordine",
      orderTotal: "Totale Manifestato",
      shippingDest: "Destinazione",
      crossTitle: "Non Solo <br/> <span style=\"font-style:italic; opacity:0.75;\">Liquore</span>",
      crossText: "Scopri la nostra selezione di panettoni artigianali, dolci tipici e creazioni sartoriali forgiate nel cuore di Villacidro.",
      crossCta: "Esplora gli Archivi",
      supportText: "Hai bisogno di un supporto alchemico?",
      contactText: "Contattaci a",
      footerNote: "Villacidro Liquori &copy; 2026 — Villacidro, Sardegna"
    },
    en: {
      subject: "Order Confirmation - Villacidro Liquori",
      heroTitle: "The Art of <br/> <span style=\"font-style:italic; opacity:0.75;\">Distillation</span> <br/> is on its way.",
      heroSubtitle: "A piece of our history is about to join your collection.",
      orderRef: "Order Reference",
      orderTotal: "Total Manifested",
      shippingDest: "Destination",
      crossTitle: "Beyond <br/> <span style=\"font-style:italic; opacity:0.75;\">Liquor</span>",
      crossText: "Discover our selection of artisanal panettone, typical sweets, and bespoke creations forged in the heart of Villacidro.",
      crossCta: "Explore the Archives",
      supportText: "Need Alchemical Support?",
      contactText: "Contact us at",
      footerNote: "Villacidro Liquori &copy; 2026 — Villacidro, Sardinia"
    }
  }
};

export type MarketingManifest = typeof MARKETING_MANIFEST;
