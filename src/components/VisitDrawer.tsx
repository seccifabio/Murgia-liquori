"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";
import VisitSidebarContent from "./visit/VisitSidebarContent";

export default function VisitDrawer() {
  const { isVisitOpen, setIsVisitOpen } = useCart();

  // Scroll Lockdown Ritual
  useEffect(() => {
    if (isVisitOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisitOpen]);

  return (
    <AnimatePresence>
      {isVisitOpen && (
        <>
          {/* Backdrop: Alchemical Shadow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisitOpen(false)}
            className="fixed inset-0 bg-noir/80 backdrop-blur-sm z-[10000]"
          />

          {/* Drawer: The Booking Terminal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[500px] border-l border-white/5 z-[10001] flex flex-col shadow-2xl overflow-hidden"
          >
            <VisitSidebarContent 
              onClose={() => setIsVisitOpen(false)} 
              showCloseButton={true}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
