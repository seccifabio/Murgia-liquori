import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti | Entra in Contatto",
  description: "Hai domande sulla nostra collezione o vuoi diventare partner? Contatta Murgia Liquori. La nostra eredità è a tua disposizione.",
  openGraph: {
    title: "Contatta Murgia Liquori",
    description: "Siamo pronti ad accoglierti nel nostro mondo di spirits artigianali.",
    images: ["/images/lasbagliata.webp"],
  },
};

export default function ContattiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
