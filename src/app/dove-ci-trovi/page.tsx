import LocationsSection from "@/components/LocationsSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dove Ci Trovi | Murgia Liquori",
  description: "Scopri la mappa dei partner e dei punti vendita Murgia Liquori in tutta la Sardegna e oltre. Porta l'alchimia nel tuo locale.",
  openGraph: {
    title: "Dove Trovare Murgia Liquori",
    description: "La mappa dei nostri partner e punti vendita selezionati.",
    images: ["/images/lasbagliata.webp"],
  },
  alternates: {
    canonical: "/dove-ci-trovi",
  },
};

export default function DoveCiTroviPage() {
  return (
    <main className="min-h-screen">
      <LocationsSection />
      <Footer />
    </main>
  );
}
