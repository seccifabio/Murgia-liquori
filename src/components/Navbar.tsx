"use client";

import { useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, X, Menu as BurgerIcon } from "lucide-react";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = ["La Storia", "La Collezione", "Contatti"];

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { setIsBagOpen, items, isBannerVisible, isMenuOpen, setIsMenuOpen } = useCart();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentTop, setCurrentTop] = useState(52);

  const isEligiblePage = pathname === "/" || pathname?.includes("/shop/");

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Visibility: Show only at the top of the page
    setIsVisible(latest < 100);

    // Dynamic Top Offset
    if (isEligiblePage && isBannerVisible) {
      setCurrentTop(Math.max(0, 52 - latest));
    } else {
      setCurrentTop(0);
    }

    if (typeof window !== "undefined") {
      const vh = window.innerHeight;
      
      let entersYellow, leavesYellow;
      
      if (pathname === "/") {
        entersYellow = vh * 5.7; 
        leavesYellow = vh * 14.2; 
      } else if (pathname?.includes("/shop/villacidro-giallo")) {
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
  const isCollezionePage = pathname?.includes("/la-collezione");
  const activeTheme = (isDarkTheme || isStoriaPage || isCollezionePage) ? "dark" : "light";
  const iconColor = (isDarkTheme || isStoriaPage || isCollezionePage) ? "text-noir" : "text-white";
  
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

        <div className="flex items-center gap-8 md:gap-10 pointer-events-auto relative">
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

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10001] bg-noir flex flex-col justify-center items-start px-12 md:px-24"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-10 h-10" />
            </button>

            <div className="space-y-4 md:space-y-6 pt-12">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: i * 0.1 } }}
                  className="block cursor-pointer"
                >
                  <Link href={link === "La Storia" ? "/la-storia" : link === "La Collezione" ? "/la-collezione" : `/${link.toLowerCase().replace(" ", "-")}`} onClick={() => setIsMenuOpen(false)}>
                    <div className="font-heading text-primary hover:text-white text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-none transition-all duration-300 transform hover:translate-x-4">
                      {link}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="absolute bottom-12 left-12 md:left-24 flex gap-8 text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium">
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">Facebook</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
