"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { it } from "@/dictionaries/it";
import { en } from "@/dictionaries/en";

type Language = "it" | "en";
type Dictionary = typeof it;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("it");

  // Load language from storage on hydration
  useEffect(() => {
    const savedLang = localStorage.getItem("murgia-lang") as Language;
    if (savedLang && (savedLang === "it" || savedLang === "en")) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("murgia-lang", lang);
  };

  const dictionary = language === "en" ? en : it;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: dictionary }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}
