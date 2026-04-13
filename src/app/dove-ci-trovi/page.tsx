import LocationsSection from "@/components/LocationsSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dove Ci Trovi | Villacidro Murgia",
  description: "Scopri la mappa dei partner e dei punti vendita Villacidro Murgia in tutta la Sardegna e oltre. Porta l'alchimia nel tuo locale.",
};

export default function DoveCiTroviPage() {
  return (
    <main className="bg-primary min-h-screen">
      <Navbar />
      <LocationsSection />
      <Footer />
    </main>
  );
}
