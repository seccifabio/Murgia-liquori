"use client";

import { useState } from "react";
import { Check, Edit3, X } from "lucide-react";
import { MARKETING_MANIFEST } from "@/manifest/marketing";

interface BasketPromoProps {
  t: any;
  total: number;
  appliedCode: string | null;
  setAppliedCode: (code: string | null) => void;
  discount: number;
  shipping: number;
}

export default function BasketPromo({ 
  t, 
  total, 
  appliedCode, 
  setAppliedCode, 
  discount, 
  shipping 
}: BasketPromoProps) {
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [promoInput, setPromoInput] = useState("");

  const applyPromo = () => {
    if (promoInput.trim()) {
      const formattedCode = promoInput.trim().toUpperCase();
      setAppliedCode(formattedCode);
      setPromoInput("");
    }
    setIsEditingCode(false);
    setPromoInput("");
  };

  return (
    <div className="flex flex-col gap-4 py-4 border-b border-white/5">
      <div className="flex items-center justify-between text-white/40">
        <span className="font-heading text-sm tracking-widest uppercase">{t.bag.subtotal}</span>
        <span className="font-heading text-base">€{total.toFixed(2)}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-white/40 font-heading text-sm tracking-[0.2em] uppercase">{t.bag.voucher}</span>
        
        {isEditingCode ? (
          <div className="flex items-center gap-2 flex-1 ml-4">
            <input
              autoFocus
              type="text"
              placeholder={t.bag.codePlaceholder}
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
              className="flex-1 bg-white/5 border border-white/10 rounded-sm px-3 py-1 text-sm font-heading tracking-widest text-primary focus:outline-none focus:border-primary/50 uppercase"
            />
            <button 
              onClick={applyPromo}
              className="text-primary hover:text-white transition-colors p-1"
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between flex-1 ml-6">
            {appliedCode ? (
              <div className="flex items-center justify-between w-full">
                <span className="text-primary font-heading text-base tracking-widest">{appliedCode}</span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setPromoInput(appliedCode);
                      setIsEditingCode(true);
                    }}
                    className="text-white/30 hover:text-white transition-colors p-1.5 bg-white/5 rounded-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setAppliedCode(null)}
                    className="text-white/30 hover:text-red-500 transition-colors p-1.5 bg-white/5 rounded-sm"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditingCode(true)}
                className="text-white/30 hover:text-primary transition-colors font-heading text-sm tracking-widest uppercase border-b border-white/10 hover:border-primary pb-0.5"
              >
                {t.bag.addCode}
              </button>
            )}
          </div>
        )}
      </div>
      
      {discount > 0 && (
        <div className="flex items-center justify-between text-primary/80 italic">
          <span className="font-heading text-sm tracking-widest uppercase">{t.bag.discountLabel} ({MARKETING_MANIFEST.promo.discount * 100}%)</span>
          <span className="font-heading text-base">- €{discount.toFixed(2)}</span>
        </div>
      )}

      <div className="flex items-center justify-between text-white/40">
        <span className="font-heading text-sm tracking-widest uppercase">Trasporto</span>
        <span className="font-heading text-base">{shipping > 0 ? `€${shipping.toFixed(2)}` : "GRATUITO"}</span>
      </div>
    </div>
  );
}
