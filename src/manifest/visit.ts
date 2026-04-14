/**
 * @file visit.ts
 * @description The Source of Truth for the Murgia Factory Visit ritual.
 */

export const VISIT_MANIFEST = {
  // The scheduled date of the next ritual
  date: "2026-04-21", 
  
  // Starting price for the experience
  price: "15",
  
  // Emergency override: set to false to hide the landing pathways regardless of date
  active: true,

  // Localized Editorial Manifest
  it: {
    displayDate: "21 Aprile",
    displayFullDate: "Sabato 21 Aprile 2026",
    title: "Vieni a scoprire l'alchimia",
    subtitle: "Visita la nostra distilleria",
    cta: "Prenota",
  },
  en: {
    displayDate: "April 21st",
    displayFullDate: "Saturday, April 21st 2026",
    title: "The Alchemy of Discovery",
    subtitle: "Experience the Distillery",
    cta: "Book Ritual",
  }
};

export type VisitManifest = typeof VISIT_MANIFEST;
