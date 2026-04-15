"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MARKETING_MANIFEST } from "@/manifest/marketing";

interface CartItem {
  id: string;
  name: string;
  price: string;
  priceId: string;
  quantity: number;
  format: string; // New: 70cl, 20cl, etc.
  img: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (id: string, oldFormat: string, updates: Partial<CartItem>) => void;
  removeItem: (id: string, format: string) => void;
  clearCart: () => void;
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  total: number;
  appliedCode: string | null;
  setAppliedCode: (code: string | null) => void;
  discount: number;
  isBannerVisible: boolean;
  setIsBannerVisible: (visible: boolean) => void;
  isVisitOpen: boolean;
  setIsVisitOpen: (open: boolean) => void;
  isPartnerOpen: boolean;
  setIsPartnerOpen: (open: boolean) => void;
  isPreLaunchOpen: boolean;
  setIsPreLaunchOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);
  const [isPreLaunchOpen, setIsPreLaunchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Persistence Ritual: Hydrate from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("murgia_bag");
    const savedCode = localStorage.getItem("murgia_promo");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to hydrate bag manifest:", e);
      }
    }
    if (savedCode) setAppliedCode(savedCode);
    setMounted(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("murgia_bag", JSON.stringify(items));
      if (appliedCode) {
        localStorage.setItem("murgia_promo", appliedCode);
      } else {
        localStorage.removeItem("murgia_promo");
      }
    }
  }, [items, appliedCode, mounted]);

  const addItem = React.useCallback((newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id && i.format === newItem.format);
      if (existing) {
        return prev.map((i) =>
          (i.id === newItem.id && i.format === newItem.format) ? { ...i, quantity: i.quantity + newItem.quantity } : i
        );
      }
      return [...prev, { ...newItem }];
    });
    
    // Manifest Toast notification instead of opening drawer
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Self-liquidation after 3s
  }, []);

  const updateItem = React.useCallback((id: string, oldFormat: string, updates: Partial<CartItem>) => {
    setItems((prev) => {
      // If we are updating format, we might need to merge with an existing item
      if (updates.format && updates.format !== oldFormat) {
        const existing = prev.find((i) => i.id === id && i.format === updates.format);
        const itemToMove = prev.find((i) => i.id === id && i.format === oldFormat);
        
        if (existing && itemToMove) {
          return prev
            .filter((i) => !(i.id === id && i.format === oldFormat))
            .map((i) => (i.id === id && i.format === updates.format) 
              ? { ...i, quantity: i.quantity + (updates.quantity || itemToMove.quantity) } 
              : i
            );
        }
      }

      return prev.map((i) => 
        (i.id === id && i.format === oldFormat) ? { ...i, ...updates } : i
      );
    });
  }, []);

  const removeItem = React.useCallback((id: string, format: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.format === format)));
  }, []);

  const clearCart = React.useCallback(() => {
    setItems([]);
    setAppliedCode(null);
  }, []);


  const total = items.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace("€", "").replace(",", "."));
    return acc + priceNum * item.quantity;
  }, 0);

  const discount = appliedCode === MARKETING_MANIFEST.promo.code ? total * MARKETING_MANIFEST.promo.discount : 0;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        isBagOpen,
        setIsBagOpen,
        isMenuOpen,
        setIsMenuOpen,
        showToast,
        setShowToast,
        total,
        appliedCode,
        setAppliedCode,
        discount,
        isBannerVisible,
        setIsBannerVisible,
        isVisitOpen,
        setIsVisitOpen,
        isPartnerOpen,
        setIsPartnerOpen,
        isPreLaunchOpen,
        setIsPreLaunchOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
