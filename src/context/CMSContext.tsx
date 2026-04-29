"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getCMSConfig } from "@/actions/cms-actions";

type CMSConfig = {
  promo: {
    active: boolean;
    code: string;
    discount: number;
    expiryDate: string;
  };
  visit: {
    active: boolean;
    nextDate: string;
    displayMonth: string;
  };
};

const CMSContext = createContext<{ config: CMSConfig | null; refresh: () => Promise<void> }>({
  config: null,
  refresh: async () => {},
});

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<CMSConfig | null>(null);

  async function refresh() {
    const data = await getCMSConfig();
    setConfig(data);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <CMSContext.Provider value={{ config, refresh }}>
      {children}
    </CMSContext.Provider>
  );
}

export const useCMS = () => useContext(CMSContext);
