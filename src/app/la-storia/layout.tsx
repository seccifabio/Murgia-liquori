import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "La Storia | Un'Eredità dal 1882",
  description: "Dalle origini nel cuore della Sardegna alla rinascita contemporanea. Scopri il viaggio secolare della famiglia Murgia.",
  openGraph: {
    title: "La Storia di Murgia Liquori | Eredità dal 1882",
    description: "Un viaggio attraverso cinque generazioni di maestri liquoristi sardi.",
    images: ["/images/storia/murgia_bianco_storia-1024x622.webp"],
  },
};

export default function StoriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
