"use client";

import React, { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { X, Info, Truck, Store, ReceiptText, ChevronRight } from "lucide-react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/context/LanguageContext";

// Initialize Stripe with your Public Key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface EmbeddedStripeCheckoutProps {
  items: any[];
  appliedCode: string | null;
  locale: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EmbeddedStripeCheckout({ items, appliedCode, locale, onClose }: EmbeddedStripeCheckoutProps) {
  const { t } = useTranslation();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<"shipping" | "pickup">("shipping");
  const [requestInvoice, setRequestInvoice] = useState(false);
  const [invoiceInfo, setInvoiceInfo] = useState({
    companyName: "",
    vat: "",
    sdi: "",
  });
  const [isStageSelection, setIsStageSelection] = useState(true);

  const checkoutT = (t as any).checkout;

  // This function calls our API route to create a session for the entire cart
  const fetchClientSecret = useCallback(() => {
    return fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        items, 
        appliedCode, 
        locale,
        deliveryMethod,
        invoiceInfo: requestInvoice ? invoiceInfo : null
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret)
      .catch(err => {
        console.error("Stripe Manifestation Error:", err);
        throw err;
      });
  }, [items, appliedCode, deliveryMethod, requestInvoice, invoiceInfo, locale]);


  const options = { fetchClientSecret };

  const handleProceed = () => {
    setIsStageSelection(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0A0A0A] min-h-screen text-white">
      {/* Header Ritual */}
      <div className="p-8 pt-12 md:pt-20 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0A0A0A] z-50">
        <h3 className="font-heading text-2xl tracking-[0.2em] text-white uppercase">{checkoutT.proceed}</h3>

        <button 
          onClick={onClose}
          className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-2xl mx-auto w-full">
        {isStageSelection ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Delivery Selection */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Truck className="w-5 h-5 opacity-60" />
                <h4 className="font-heading text-sm uppercase tracking-widest text-white">{checkoutT.delivery.title}</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setDeliveryMethod("shipping")}
                  className={`p-6 border text-left transition-all duration-300 flex flex-col gap-4 ${
                    deliveryMethod === "shipping" 
                    ? "bg-primary text-noir border-primary shadow-xl" 
                    : "border-white/10 hover:border-white/20 bg-white/5 text-white"
                  }`}
                >
                  <Truck className="w-6 h-6" />
                  <div>
                    <span className="block font-heading uppercase tracking-widest text-xs">{checkoutT.delivery.shipping}</span>
                    <span className="text-[10px] opacity-70 font-medium">
                      {locale === 'it' ? '4-5 giorni lavorativi — €12.00' : '4-5 business days — €12.00'}
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`p-6 border text-left transition-all duration-300 flex flex-col gap-4 relative group ${
                    deliveryMethod === "pickup" 
                    ? "bg-primary text-noir border-primary shadow-xl" 
                    : "border-white/10 hover:border-white/20 bg-white/5 text-white"
                  }`}
                >
                  <Store className="w-6 h-6" />
                  <div>
                    <span className="block font-heading uppercase tracking-widest text-xs">{checkoutT.delivery.pickup}</span>
                    <span className="text-[10px] opacity-70 font-medium uppercase">Gratis / Free</span>
                  </div>
                  
                  {/* Info Tooltip (Visual) */}
                  <div className="absolute top-4 right-4 opacity-40 group-hover:opacity-100 transition-opacity">
                    <Info className="w-4 h-4" />
                  </div>
                </button>
              </div>

              {deliveryMethod === "pickup" && (
                <div className="p-6 bg-white/5 border border-white/10 rounded-sm animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="flex gap-3 items-start">
                    <Info className="w-5 h-5 shrink-0 mt-0.5 opacity-60" />
                    <p className="text-xs leading-relaxed italic opacity-90">
                      {checkoutT.delivery.pickupInfo}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Invoicing Ritual */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <ReceiptText className="w-5 h-5 opacity-60" />
                <h4 className="font-heading text-sm uppercase tracking-widest text-white">{checkoutT.invoice.title}</h4>
              </div>

              <label className="flex items-center gap-4 cursor-pointer group">
                <div className={`w-6 h-6 border flex items-center justify-center transition-all ${requestInvoice ? "bg-primary border-primary" : "border-white/20 group-hover:border-white/40"}`}>
                  {requestInvoice && <div className="w-2 h-2 bg-noir rotate-45" />}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={requestInvoice}
                  onChange={(e) => setRequestInvoice(e.target.checked)}
                />
                <span className="font-heading text-xs uppercase tracking-widest text-white opacity-70 group-hover:opacity-100 transition-opacity">
                  {checkoutT.invoice.checkbox}
                </span>
              </label>

              {requestInvoice && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white opacity-50">{checkoutT.invoice.companyName}</label>
                    <input 
                      type="text"
                      value={invoiceInfo.companyName}
                      onChange={(e) => setInvoiceInfo({...invoiceInfo, companyName: e.target.value})}
                      placeholder="ES. MURGIA SRL"
                      className="w-full bg-white/5 border-b border-white/10 p-3 text-xs focus:border-primary transition-colors outline-none text-white placeholder:text-white/30 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white opacity-50">{checkoutT.invoice.vat}</label>
                    <input 
                      type="text"
                      value={invoiceInfo.vat}
                      onChange={(e) => setInvoiceInfo({...invoiceInfo, vat: e.target.value})}
                      placeholder="IT01234567890"
                      className="w-full bg-white/5 border-b border-white/10 p-3 text-xs focus:border-primary transition-colors outline-none text-white placeholder:text-white/30 font-medium"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-white opacity-50">{checkoutT.invoice.sdi}</label>
                    <input 
                      type="text"
                      value={invoiceInfo.sdi}
                      onChange={(e) => setInvoiceInfo({...invoiceInfo, sdi: e.target.value})}
                      placeholder="ABC1234 / PEC@EXAMPLE.IT"
                      className="w-full bg-white/5 border-b border-white/10 p-3 text-xs focus:border-primary transition-colors outline-none text-white placeholder:text-white/30 font-medium"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* CTA Ritual */}
            <button
              onClick={handleProceed}
              className="w-full murgia-btn-primary py-6 px-12 text-sm tracking-[0.4em] transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl"
            >
              <span className="murgia-btn-text">{checkoutT.proceed}</span>
              <ChevronRight className="murgia-btn-icon" />
              <div className="murgia-btn-hover-wipe" />
            </button>
          </div>
        ) : (
          <div id="checkout" className="animate-in fade-in duration-1000">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
      </div>

      <p className="p-8 text-white/20 font-heading text-[10px] tracking-widest uppercase text-center">
        Encrypted & Secured by Stripe
      </p>
    </div>
  );
}
