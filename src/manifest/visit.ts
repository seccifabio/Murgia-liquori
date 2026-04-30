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

  // Primary store for scheduled experiences
  visits: [
    { date: "2026-05-04", active: true }
  ],

  // Localized Editorial Manifest
  // Localized Editorial Manifest
  it: {
    displayDate: "4 Maggio",
    displayFullDate: "Lunedì 4 Maggio 2026",
    title: "Vieni a scoprire l'essenza",
    subtitle: "Visita la nostra distilleria",
    cta: "Prenota",
    visitPage: {
      hero: {
        subtitle: "La storia del Liquorificio",
        title: "5",
        titleAccent: "Generazioni",
        description: "Un viaggio nei luoghi in cui la famiglia Murgia ha lavorato e creato per oltre 140 anni"
      },
      expectations: {
        craftTitle: "L'Arte",
        craftTitleAccent: "Dei Liquori",
        craftDescription: "Scopri i processi che ci accompagnano da sempre. Stessi segreti diverse mani.",
        title: "Il Nostro",
        titleAccent: "Laboratorio",
        duration: { value: "90 MINUTI" },
        capacity: { value: "MAX 12 PERSONE" },
        groups: { value: "PRIVATI & GRUPPI" },
        noVisits: "Nessuna visita programmata per questo mese",
        highlights: [
          "Percorso storico attraverso l'eredità Murgia",
          "Spiegazione dei processi produttivi",
          "I nostri archivi esposti.",
          "Accesso esclusivo alle aree di affinamento e produzione."
        ]
      },
      tasting: {
        title: "La Degustazione",
        description: "Il culmine dell'esperienza: una selezione guidata delle nostre esclusive specialità."
      }
    }
  },
  en: {
    displayDate: "4 May",
    displayFullDate: "Monday, 4 May 2026",
    title: "Come discover the essence",
    subtitle: "Experience the Distillery",
    cta: "Book",
    visitPage: {
      hero: {
        subtitle: "The history of the Distillery",
        title: "5",
        titleAccent: "Generations",
        description: "A journey in the places where the Murgia family has worked and created for over 140 years"
      },
      expectations: {
        craftTitle: "The Art of",
        craftTitleAccent: "Distillation",
        craftDescription: "Witness how Sardinian essences are forged in the heart of our distillery, following methods that defy time.",
        title: "Our",
        titleAccent: "Laboratory",
        duration: { value: "90 MINUTES" },
        capacity: { value: "MAX 12 PEOPLE" },
        groups: { value: "PRIVATE & GROUPS" },
        noVisits: "No visits planned for this month",
        highlights: [
          "Historical journey through the Murgia legacy",
          "Demonstration of alchemical processes",
          "Curated selection of local botanicals",
          "Exclusive access to maturation areas"
        ]
      },
      tasting: {
        title: "The Tasting",
        description: "The peak of the experience: a guided selection of our most iconic spirits, paired with local delicacies."
      }
    }
  }
};

export type VisitManifest = typeof VISIT_MANIFEST;
