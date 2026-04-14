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
  title: "Murgia Liquori | 1882 Heritage Spirits",
  description: "Experience the golden legacy of Villacidro Murgia. Artisanal Sardinian spirits crafted since 1882.",
};

import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import FactoryVisitBanner from "@/components/FactoryVisitBanner";
import { CartProvider } from "@/context/CartContext";
import BagDrawer from "@/components/BagDrawer";
import VisitBookingDrawer from "@/components/VisitBookingDrawer";
import CartToast from "@/components/CartToast";

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
        
        <CartProvider>
          <PromoBanner />
          <FactoryVisitBanner />
          <Navbar />
          <BagDrawer />
          <VisitBookingDrawer />
          <CartToast />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
