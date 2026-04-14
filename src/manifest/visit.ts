/**
 * @file visit.ts
 * @description The Source of Truth for the Murgia Factory Visit ritual.
 * 
 * Instructions for Management:
 * - DATE: ISO format (YYYY-MM-DD). The banner will auto-hide on this date.
 * - DISPLAY_DATE: The human-readable string shown on the UI.
 * - PRICE: Starting price string.
 * - ACTIVE: Force hide/show regardless of date.
 */

export const VISIT_MANIFEST = {
  // The scheduled date of the next ritual
  date: "2026-04-21", 
  
  // How the date appears to humans (e.g., "21 Aprile", "Sabato 21 Aprile 2026")
  displayDate: "21 Aprile",
  displayFullDate: "Sabato 21 Aprile 2026",
  
  // Starting price for the experience
  price: "15",
  
  // Editorial manifest
  title: "Vieni a scoprire l'alchimia",
  subtitle: "Visita la nostra distilleria",
  cta: "Prenota",

  // Emergency override: set to false to hide the landing pathways regardless of date
  active: true,
};

export type VisitManifest = typeof VISIT_MANIFEST;
