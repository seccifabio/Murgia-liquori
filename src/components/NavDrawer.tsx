"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

import { InstagramIcon, FacebookIcon } from "./SocialIcons";

interface NavLink {
  id: string;
  path: string;
}

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  translations: any;
}

export default function NavDrawer({ isOpen, onClose, links, translations }: NavDrawerProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10001] bg-noir flex flex-col justify-center items-start px-12 md:px-24"
        >
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-10 h-10" />
          </button>

          <div className="space-y-4 md:space-y-6 pt-12">
            {links.map((link, i) => (
              <motion.div
                key={link.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: i * 0.1 } }}
                className="block cursor-pointer"
              >
                <Link href={link.path} onClick={onClose}>
                  <div className="font-heading text-primary hover:text-white text-[44px] md:text-6xl lg:text-7xl uppercase tracking-tighter leading-none transition-all duration-300 transform hover:translate-x-4">
                    {translations.nav.links[link.id]}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="absolute bottom-12 left-12 md:left-24 flex items-center gap-12">
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/murgialiquori/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary group transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} className="text-white/40 group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://www.facebook.com/murgia.liquori" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary group transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} className="text-white/40 group-hover:text-primary transition-colors" />
              </a>
            </div>
            
            <Link href="/legal/cookie-policy" onClick={onClose} className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-medium hover:text-primary transition-colors">
              {translations.nav.social.privacy}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
