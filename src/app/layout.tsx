import type { Metadata } from "next";
import { Bebas_Neue, Montserrat } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://murgialiquori.it")
  ),
  title: {
    default: "Murgia Liquori | 1882 Alchemical Heritage",
    template: "%s | Murgia Liquori",
  },
  description: "Descend into the alchemical legacy of Murgia Liquori. Artisanal Sardinian essences forged since 1882.",
  openGraph: {
    title: "Murgia Liquori | L'oro Giallo di Sardegna",
    description: "Dall'antica distilleria Murgia, una collezione di essenze artigianali che racchiudono l'anima della Sardegna.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://murgialiquori.it",
    siteName: "Murgia Liquori",
    images: [
      {
        url: "/images/og-share-v2.png",
        width: 1200,
        height: 630,
        alt: "Murgia Liquori | 1882 Alchemical Heritage",
      },
    ],
    locale: "it_IT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Murgia Liquori | 1882 Heritage Spirits",
    description: "Artisanal Sardinian spirits crafted since 1882.",
    images: ["/images/og-share-v2.png"],
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import VisitBanner from "@/components/VisitBanner";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import BasketDrawer from "@/components/BasketDrawer";
import VisitDrawer from "@/components/VisitDrawer";
import PartnerDrawer from "@/components/PartnerDrawer";
import PreLaunchDrawer from "@/components/PreLaunchDrawer";
import CartToast from "@/components/CartToast";
import PartnerToast from "@/components/PartnerToast";
import AgeVerification from "@/components/AgeVerification";
import CookieBanner from "@/components/CookieBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${bebasNeue.variable} ${montserrat.variable} bg-noir antialiased`}
    >
      <body className="relative min-h-screen overflow-x-hidden selection:bg-primary selection:text-noir">
        {/* Cinematic Grain Texture Layer */}
        <div className="bg-texture fixed inset-0 z-50 mix-blend-overlay" />
        
        <LanguageProvider>
          <CartProvider>
            <PromoBanner />
            <VisitBanner />
            <Navbar />
            <BasketDrawer />
            <VisitDrawer />
            <PartnerDrawer />
            <PreLaunchDrawer />
            <CartToast />
            <PartnerToast />
            <AgeVerification />
            <CookieBanner />
            {children}
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
