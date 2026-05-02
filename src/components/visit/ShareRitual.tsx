"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";

interface ShareRitualProps {
  t: any;
  variant?: 'list' | 'highlight';
  className?: string;
  title?: string;
  subtitle?: string;
  cta?: string;
}

export default function ShareRitual({ t, variant = 'list', className = "", title, subtitle, cta }: ShareRitualProps) {
  const [copied, setCopied] = useState(false);
  const isHighlight = variant === "highlight";

  const handleShare = async () => {
    const shareData = {
      title: "Murgia Distillery - Visit Us",
      text: t.visitPage.share.subtitle,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share failed", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error("Copy failed", err);
      }
    }
  };

  return (
    <div className={`group relative ${className} ${isHighlight ? "py-24 bg-primary text-noir w-full overflow-hidden" : ""}`}>
      <div className={`space-y-10 ${isHighlight ? "max-w-7xl mx-auto px-8 md:px-20" : ""}`}>
        <div className="space-y-6">
          {!isHighlight && (
            <span className={`font-heading text-[10px] tracking-[0.6em] uppercase block font-bold italic ${isHighlight ? "text-noir/60" : "text-primary"}`}>
              {title || t.visitPage.share.title}
            </span>
          )}
          {isHighlight ? (
            <h2 
              className="font-heading text-5xl md:text-[8rem] uppercase tracking-normal leading-[0.8] italic font-black text-noir"
              dangerouslySetInnerHTML={{ __html: title || t.visitPage.share.title }}
            />
          ) : null}
        </div>

        <p className={`font-body text-sm md:text-lg italic max-w-md ${isHighlight ? "text-noir/70" : "text-white/60"}`}>
          {subtitle || t.visitPage.share.subtitle}
        </p>

        <button
          onClick={handleShare}
          className="flex items-center gap-6 group/btn"
        >
          <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
            isHighlight 
              ? "border-noir bg-transparent text-noir group-hover/btn:bg-noir group-hover/btn:text-primary" 
              : "border-primary/30 group-hover/btn:border-primary group-hover/btn:bg-primary/10"
          }`}>
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Check className={`w-5 h-5 ${isHighlight ? "text-primary group-hover/btn:text-primary" : "text-primary"}`} />
                </motion.div>
              ) : (
                <motion.div
                  key="share"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Share2 className={`w-6 h-6 transition-colors ${
                    isHighlight 
                      ? "text-noir group-hover/btn:text-primary" 
                      : "text-primary group-hover/btn:text-noir"
                  }`} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <span className={`font-heading text-sm tracking-[0.4em] uppercase transition-colors italic font-bold ${
            isHighlight ? "text-noir/60 group-hover/btn:text-noir" : "text-white/40 group-hover/btn:text-primary"
          }`}>
            {copied ? t.visitPage.share.copied : (cta || t.visitPage.share.cta)}
          </span>
        </button>
      </div>
    </div>
  );
}
