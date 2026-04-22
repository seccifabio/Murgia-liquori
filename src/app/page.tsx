import Hero from "@/components/Hero";
import NarrativeFlow from "@/components/NarrativeFlow";
import AperitivoSection from "@/components/AperitivoSection";
import LocationsSection from "@/components/LocationsSection";
import Footer from "@/components/Footer";
import LaunchBanner from "@/components/LaunchBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eccellenza Liquoristica dal 1882",
  description: "Dall'antica distilleria Murgia, una collezione di liquori artigianali che racchiudono l'anima della Sardegna.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const liveProducts = undefined; // Ritual for potential future Stripe integration

  return (
    <main className="relative flex min-h-screen flex-col bg-noir">
      <Hero />

      {/* Content that scrolls over the fixed Hero */}
      <div className="relative z-10 mt-[100vh] bg-black">
        <NarrativeFlow liveProducts={liveProducts} />
        <LaunchBanner variant="discovery" />
        <AperitivoSection />
        <LocationsSection />
        <Footer />
      </div>
    </main>
  );
}
