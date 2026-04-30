"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCMSConfig } from "@/actions/cms-actions";

type CMSConfig = {
  promo: {
    active: boolean;
    code: string;
    discount: number;
    expiryDate: string;
    texts?: {
      it: { description: string; fullDescription: string; cta: string; successMsg: string };
      en: { description: string; fullDescription: string; cta: string; successMsg: string };
    };
  };
  visits: Array<{
    date: string;
    active: boolean;
    texts?: {
      it: { title: string; subtitle: string; cta: string };
      en: { title: string; subtitle: string; cta: string };
    };
    price?: number;
  }>;
  locations: Array<{
    name: string;
    city: string;
    address: string;
    map: string;
  }>;
};

const CMSContext = createContext<{ 
  config: CMSConfig | null; 
  loading: boolean;
  refresh: () => Promise<void> 
}>({
  config: null,
  loading: true,
  refresh: async () => {},
});

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<CMSConfig | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const data = await getCMSConfig();
      setConfig(data);
    } catch (e) {
      console.error("CMS Provider Refresh Failed:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <CMSContext.Provider value={{ config, loading, refresh }}>
      {children}
    </CMSContext.Provider>
  );
}

export const useCMS = () => useContext(CMSContext);
