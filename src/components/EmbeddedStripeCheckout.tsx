"use client";

import React, { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { X } from "lucide-react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";

// Initialize Stripe with your Public Key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface EmbeddedStripeCheckoutProps {
  items: any[];
  appliedCode: string | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function EmbeddedStripeCheckout({ items, appliedCode, onClose }: EmbeddedStripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  // This function calls our API route to create a session for the entire cart
  const fetchClientSecret = useCallback(() => {
    return fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, appliedCode }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret)
      .catch(err => {
        console.error("Stripe Manifestation Error:", err);
        throw err;
      });
  }, [items, appliedCode]);


  const options = { fetchClientSecret };


  return (
    <div className="w-full h-full flex flex-col bg-[#F4B400]">
      {/* Header Ritual */}
      <div className="p-8 pt-20 border-b border-black/10 flex items-center justify-between sticky top-0 bg-[#F4B400] z-50">
        <h3 className="font-heading text-2xl tracking-[0.2em] text-black uppercase">Checkout</h3>

        <button 
          onClick={onClose}
          className="group flex items-center gap-2 text-black/60 hover:text-black transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div id="checkout" className="flex-1">
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>

      <p className="mt-8 text-white/30 font-heading text-[10px] tracking-widest uppercase">
        Encrypted & Secured by Stripe
      </p>
    </div>
  );
}
