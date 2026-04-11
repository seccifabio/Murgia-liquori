import Hero from "@/components/Hero";
import NarrativeFlow from "@/components/NarrativeFlow";
import AperitivoSection from "@/components/AperitivoSection";
import LocationsSection from "@/components/LocationsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-noir">
      <Hero />

      {/* Content that scrolls over the fixed Hero */}
      <div className="relative z-10 mt-[100vh] bg-black">
        <NarrativeFlow />
        <AperitivoSection />
        <LocationsSection />
        <Footer />
      </div>
    </main>
  );
}
