"use client";

import { Trash2 } from "lucide-react";
import { PRODUCTS_MANIFEST } from "@/manifest/products";

interface CartItem {
  id: string;
  name: string;
  price: string;
  img: string;
  format: string;
  quantity: number;
}

interface BasketItemProps {
  item: CartItem;
  t: any;
  updateItem: (id: string, format: string, updates: Partial<CartItem>) => void;
  removeItem: (id: string, format: string) => void;
}

export default function BasketItem({ item, t, updateItem, removeItem }: BasketItemProps) {
  return (
    <div className="flex gap-6 group relative">
      <div className="relative w-28 h-36 bg-white/5 rounded-lg overflow-hidden border border-white/5 flex-shrink-0">
        <img
          src={item.img}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-heading text-xl uppercase tracking-tight leading-tight max-w-[200px]">{item.name}</h4>
            <button
              onClick={() => removeItem(item.id, item.format)}
              className="text-white/40 hover:text-red-500 transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold">{t.products.common.formato}</span>
              <div className="flex gap-2">
                {(() => {
                  // Ritual: Find the product in the manifest by its canonical ID
                  const manifestEntry = Object.values(PRODUCTS_MANIFEST).find(
                    (p: any) => p.id === item.id
                  ) as any;

                  if (!manifestEntry) return <span className="text-[10px] uppercase opacity-50">{item.format}</span>;

                  // Handle products with explicit variants (Giallo, Bianco)
                  if (manifestEntry.variants) {
                    return manifestEntry.variants.map((v: any) => (
                      <button
                        key={v.format}
                        onClick={() => updateItem(item.id, item.format, { 
                          format: v.format,
                          price: `${v.price}€`,
                          priceId: v.priceId
                        })}
                        className={`px-3 py-1 text-[10px] font-heading uppercase tracking-widest border transition-all ${
                          item.format === v.format 
                            ? "bg-primary text-black border-primary font-bold" 
                            : "bg-transparent text-white/60 border-white/10 hover:border-white/20"
                        }`}
                      >
                        {v.format}
                      </button>
                    ));
                  }

                  // Handle products with a single format (La Sbagliata)
                  return (
                    <span className="px-3 py-1 text-[10px] font-heading uppercase tracking-widest border border-white/10 bg-white/5 text-white/60">
                      {manifestEntry.format || item.format}
                    </span>
                  );
                })()}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold">{t.products.common.quantity}</span>
              <div className="flex items-center gap-4 border border-white/10 w-fit px-2 py-1 bg-white/[0.02]">
                <button 
                  onClick={() => item.quantity > 1 && updateItem(item.id, item.format, { quantity: item.quantity - 1 })}
                  className="text-white/60 hover:text-white transition-colors w-6 h-6 flex items-center justify-center font-heading"
                >
                  -
                </button>
                <span className="font-heading text-lg min-w-[20px] text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateItem(item.id, item.format, { quantity: item.quantity + 1 })}
                  className="text-white/60 hover:text-white transition-colors w-6 h-6 flex items-center justify-center font-heading"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
          <span className="text-primary font-heading text-lg">{item.price}</span>
          <span className="text-white/40 text-[9px] uppercase tracking-widest italic font-bold">
            {t.bag.subtotal}: &euro;{(parseFloat(item.price.replace("€", "")) * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
