import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import { Product } from "../types";

interface StickyMobileCtaProps {
  stickyCtaClosed: boolean;
  setStickyCtaClosed: (closed: boolean) => void;
  activeStickyProduct: Product | undefined;
  scrollPercentage: number;
  isDarkMode: boolean;
  navigateToProduct: (id: string) => void;
  getAffiliateLink: (name: string, designer: string) => string;
  getProductActiveImage: (prod: Product) => string;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({
  stickyCtaClosed,
  setStickyCtaClosed,
  activeStickyProduct,
  scrollPercentage,
  isDarkMode,
  navigateToProduct,
  getAffiliateLink,
  getProductActiveImage,
}) => {
  return (
    <AnimatePresence>
      {!stickyCtaClosed && activeStickyProduct && (
        <motion.div 
          initial={{ y: 150, opacity: 0 }}
          animate={(scrollPercentage > 8) ? { y: 0, opacity: 1 } : { y: 150, opacity: 0 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 25 }}
          className="fixed bottom-0 inset-x-0 z-40 p-4 md:hidden"
        >
          <div className={`rounded-2xl shadow-2xl border flex items-center justify-between p-3.5 gap-3 relative ${
            isDarkMode 
              ? "bg-charcoal/95 border-white/10 text-sand backdrop-blur-md" 
              : "bg-white/95 border-neutral-500/15 text-charcoal backdrop-blur-md"
          }`}>
            
            {/* Floating scarcity node indicator */}
            <div className="absolute -top-3 left-4 bg-rose-500 text-white font-sans text-[8px] px-2 py-0.5 rounded-full tracking-widest uppercase font-bold animate-pulse-cta border border-white/20">
              🔥 ONLY 2 LEFT
            </div>

            {/* Thumbnail and title details */}
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => navigateToProduct(activeStickyProduct.id)}
            >
              <div className="w-12 h-12 bg-sand rounded-lg overflow-hidden shrink-0 border border-neutral-500/10">
                <img 
                  src={getProductActiveImage(activeStickyProduct)} 
                  alt={activeStickyProduct.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <div>
                <h4 className="font-serif text-[13px] font-bold line-clamp-1 pr-2 leading-tight">{activeStickyProduct.name}</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] text-[#222] dark:text-neutral-400 uppercase tracking-widest font-bold font-mono">Prime Fast</span>
                </div>
              </div>
            </div>

            {/* Main checkout action button */}
            <div className="flex items-center gap-1.5 shrink-0">
              <a 
                href={getAffiliateLink(activeStickyProduct.name, activeStickyProduct.designer)}
                target="_blank" 
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="bg-gold-leaf text-white font-sans text-[10px] font-bold tracking-widest px-4.5 py-3 rounded-xl uppercase flex items-center gap-1.5 transition-all shadow-md active:scale-95 animate-pulse-cta text-center"
              >
                BUY NOW <ExternalLink className="w-3 h-3 text-white" />
              </a>

              {/* Retract button */}
              <button 
                onClick={() => setStickyCtaClosed(true)}
                className="p-1.5 rounded-full bg-neutral-500/10 hover:bg-neutral-500/25 text-current"
                aria-label="Retract bottom CTA"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
