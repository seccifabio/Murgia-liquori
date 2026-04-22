"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LiquidImage from "./LiquidImage";

interface Product {
  name: string;
  price: string;
  img: string;
  href: string;
}

interface NarrativeMobileProps {
  t: any;
  products: Product[];
}

export default function NarrativeMobile({ t, products }: NarrativeMobileProps) {
  return (
    <div className="md:hidden flex flex-col gap-32 pt-32 pb-0 px-6">
      <div className="space-y-8">
        <span className="text-primary font-heading text-xl tracking-widest block uppercase">{t.origins.title}</span>
        <h2 className="text-white font-heading text-[2.5rem] leading-[1.2] md:leading-none uppercase">
          {t.origins.subtitle} <br /> <span className="text-primary italic">{t.origins.subtitleAccent}</span>
        </h2>
        <div className="aspect-[4/5] relative overflow-hidden rounded-[2vw] border border-white/10">
          <LiquidImage src="/images/products/VillacidroMurgia02.png" alt="Murgia Heritage Still" />
        </div>
        <p className="text-white/60 font-body text-lg max-w-md leading-relaxed">
          {t.origins.description}
        </p>
      </div>

      <div className="space-y-8">
        <span className="text-primary font-heading text-xl tracking-widest block uppercase underline decoration-primary underline-offset-8">{t.origins.heritage.title}</span>
        <h2 className="text-white font-heading text-[2.5rem] leading-[1.2] md:leading-none uppercase">
          {t.origins.heritage.subtitle} <br /> <span className="text-primary italic">{t.origins.heritage.subtitleAccent}</span>
        </h2>
        <div className="aspect-[4/5] relative overflow-hidden rounded-[2vw] border border-white/10">
          <LiquidImage src="/images/giallo.webp" alt="Murgia Giallo" />
        </div>
        <p className="text-white/60 font-body text-lg max-w-md leading-relaxed">
          {t.origins.heritage.description}
        </p>
      </div>

      {/* Collection fallback for mobile */}
      <div className="bg-primary -mx-6 px-6 py-20">
        <div className="flex flex-col items-center">
          <span className="text-noir/40 font-heading text-[10px] tracking-[0.4em] uppercase mb-4">{t.collection.title}</span>
          <h3 className="text-noir font-heading text-4xl uppercase tracking-tighter mb-12 text-center">
            {t.collection.subtitle} <br /> {t.collection.subtitleAccent}
          </h3>

          <div className="grid grid-cols-1 gap-12 max-w-7xl w-full">
            {products.map((p) => (
              <Link key={p.name} href={p.href} className="group relative block">
                <div className="aspect-[4/5] bg-noir rounded-[2vw] overflow-hidden relative border border-white/5 shadow-2xl">
                  <LiquidImage src={p.img} alt={p.name} className="object-contain p-8" />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <h4 className="text-white font-heading text-2xl uppercase tracking-tighter">{p.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                       <span className="text-primary font-heading text-sm">{p.price}</span>
                       <span className="text-white/40 font-heading text-[10px] tracking-[0.2em] uppercase">{t.products.common.discover}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
