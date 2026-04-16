import Hero from "@/components/Hero";
import NarrativeFlow from "@/components/NarrativeFlow";
import AperitivoSection from "@/components/AperitivoSection";
import LocationsSection from "@/components/LocationsSection";
import Footer from "@/components/Footer";
import LaunchBanner from "@/components/LaunchBanner";
import { getLiveProducts } from "@/lib/stripe-sync";

export default async function Home() {
  const liveProducts = await getLiveProducts();

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
