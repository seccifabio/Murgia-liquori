"use client";

/* Navigation Ritual: Orchestration of discovery pathways */

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, X, Menu as BurgerIcon, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "@/context/LanguageContext";
import { VISIT_MANIFEST } from "@/manifest/visit";

const NAV_LINKS = [
  { id: "story", path: "/la-storia" },
  { id: "collection", path: "/la-collezione" },
  { id: "locations", path: "/dove-ci-trovi" },
  { id: "contacts", path: "/contatti" },
];

import NavDrawer from "./NavDrawer";

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { setIsBagOpen, items, isBannerVisible, isMenuOpen, setIsMenuOpen } = useCart();
  const { language, setLanguage, t } = useTranslation();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTop, setCurrentTop] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isPromoEligible = pathname === "/" || pathname?.includes("/shop/") || pathname === "/la-collezione";
  
  // Visit Expiration Manifest
  const visitDate = new Date(`${VISIT_MANIFEST.date}T00:00:00`);
  const isVisitExpired = new Date().getTime() >= visitDate.getTime();
  const isVisitEligible = pathname === "/dove-ci-trovi" && !isVisitExpired && VISIT_MANIFEST.active;

  const hasActiveBanner = (isPromoEligible && isBannerVisible) || isVisitEligible;

  // Responsive Manifest: Sync with CSS --banner-height tokens
  const getBannerHeight = () => {
    if (typeof window === "undefined") return 52;
    return window.innerWidth < 768 ? 82 : 52;
  };

  useEffect(() => {
    if (hasActiveBanner) {
      setCurrentTop(getBannerHeight());
    } else {
      setCurrentTop(0);
    }
  }, [hasActiveBanner]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Visibility: Show only at the top of the page
    setIsVisible(latest < 100);

    // Dynamic Top Offset
    if (hasActiveBanner) {
      setCurrentTop(Math.max(0, getBannerHeight() - latest));
    } else {
      setCurrentTop(0);
    }

    if (typeof window !== "undefined") {
      const vh = window.innerHeight;
      
      let entersYellow, leavesYellow;
      
      if (pathname === "/") {
        entersYellow = vh * 5.7; 
        leavesYellow = vh * 14.2; 
      } else if (pathname?.includes("/shop/murgia-giallo")) {
        entersYellow = vh * 2.0;
        leavesYellow = vh * 3.0;
      } else {
        entersYellow = 0;
        leavesYellow = 0;
      }
      
      if (latest > entersYellow && latest < leavesYellow) {
        setIsDarkTheme(true);
      } else {
        setIsDarkTheme(false);
      }
    }
  });

  const isStoriaPage = pathname?.includes("/la-storia");
  const isDoveCiTroviPage = pathname?.includes("/dove-ci-trovi");
  const isContattiPage = pathname?.includes("/contatti");
  const activeTheme = (isDarkTheme || isStoriaPage || isDoveCiTroviPage || isContattiPage) ? "dark" : "light";
  const iconColor = (isDarkTheme || isStoriaPage || isDoveCiTroviPage || isContattiPage) ? "text-noir" : "text-white";
  
  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{ top: currentTop }}
        className="fixed left-0 right-0 z-[9999] px-6 py-8 md:px-12 flex items-center justify-between pointer-events-none"
      >
        <div className="pointer-events-auto relative">
          <Link href="/" className="group">
            <Logo theme={activeTheme} />
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-10 pointer-events-auto relative">
          <div className={`hidden md:flex items-center gap-4 font-heading text-xs tracking-[0.2em] uppercase ${iconColor}`}>
            <button 
              onClick={() => setLanguage("it")}
              className={`transition-all pb-1 ${isMobile ? 'border-transparent' : 'border-b-2'} ${language === "it" ? (activeTheme === "dark" ? "border-noir text-noir font-bold" : "border-primary text-primary font-bold") : "border-transparent opacity-40 hover:opacity-100"}`}
            >
              IT
            </button>
            <span className="opacity-10">|</span>
            <button 
              onClick={() => setLanguage("en")}
              className={`transition-all pb-1 ${isMobile ? 'border-transparent' : 'border-b-2'} ${language === "en" ? (activeTheme === "dark" ? "border-noir text-noir font-bold" : "border-primary text-primary font-bold") : "border-transparent opacity-40 hover:opacity-100"}`}
            >
              EN
            </button>
          </div>

          <div className={`flex md:hidden items-center relative gap-1 font-heading text-xs tracking-[0.2em] uppercase ${iconColor}`}>
            <span className="font-bold">{language}</span>
            <ChevronDown className="w-3 h-3 opacity-40" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "it" | "en")}
              className="absolute inset-0 opacity-0 cursor-pointer appearance-none bg-transparent w-full h-full"
            >
              <option value="it">Italiano</option>
              <option value="en">English</option>
            </select>
          </div>

          <button 
            onClick={() => setIsBagOpen(true)}
            className={`relative transition-all duration-300 hover:scale-110 ${iconColor}`}
          >
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className={`transition-all duration-300 hover:rotate-90 ${iconColor}`}
          >
            <BurgerIcon className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </div>
      </motion.nav>

      <NavDrawer 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        links={NAV_LINKS} 
        translations={t} 
      />
    </>
  );
}
