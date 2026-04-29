/**
 * @file visit.ts
 * @description The Source of Truth for the Murgia Factory Visit ritual.
 */

export const VISIT_MANIFEST = {
  // The scheduled date of the next ritual
  date: "2026-05-04", 
  
  // Starting price for the experience
  price: "15",
  
  // Emergency override: set to false to hide the landing pathways regardless of date
  active: true,

  // Localized Editorial Manifest
  it: {
    displayDate: "4 Maggio",
    displayFullDate: "Lunedì 4 Maggio 2026",
    title: "Vieni a scoprire l'essenza",
    subtitle: "Visita la nostra distilleria",
    cta: "Prenota",
  },
  en: {
    displayDate: "May 4th",
    displayFullDate: "Monday, May 4th 2026",
    title: "Come discover the essence",
    subtitle: "Experience the Distillery",
    cta: "Book",
  }
};

export type VisitManifest = typeof VISIT_MANIFEST;
