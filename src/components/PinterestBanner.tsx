import React from "react";
import { motion } from "motion/react";
import { Sparkles, ExternalLink } from "lucide-react";
import { Product } from "../types";

interface PinterestBannerProps {
  showPinterestBanner: boolean;
  setShowPinterestBanner: (show: boolean) => void;
  pinterestReferralProduct: Product | null;
  isDarkMode: boolean;
  navigateToProduct: (id: string) => void;
  getAffiliateLink: (name: string, designer: string) => string;
  getProductActiveImage: (prod: Product) => string;
}

export const PinterestBanner: React.FC<PinterestBannerProps> = ({
  showPinterestBanner,
  setShowPinterestBanner,
  pinterestReferralProduct,
  isDarkMode,
  navigateToProduct,
  getAffiliateLink,
  getProductActiveImage,
}) => {
  if (!showPinterestBanner || !pinterestReferralProduct) return null;

  return (
    <div className="mx-4 md:mx-6 mt-4">
      <motion.div 
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`p-5 rounded-lg border-2 border-gold-leaf/40 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDarkMode ? "bg-gold-leaf/10 text-white" : "bg-gold-leaf/5 text-charcoal"
        }`}
      >
        {/* Decorative accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-leaf/10 rounded-full blur-2xl -z-10" />
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded overflow-hidden shrink-0 border border-gold-leaf/20 bg-sand">
            <img 
              src={getProductActiveImage(pinterestReferralProduct)} 
              alt={pinterestReferralProduct.name} 
              className="w-full h-full object-cover animate-pulse" 
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-gold-leaf font-bold tracking-widest uppercase mb-0.5">
              <Sparkles className="w-3.5 h-3.5 animate-spin duration-[6s]" /> For Pinterest Home Enthusiasts
            </div>
            <h4 className="font-serif text-lg font-bold leading-tight">We Found the Item You Were Looking For!</h4>
            <p className="text-xs text-opacity-80 mt-1">
              Check out details, alternative colors, and secure Amazon link for "{pinterestReferralProduct.name}" right now.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button 
            onClick={() => {
              navigateToProduct(pinterestReferralProduct.id);
              setShowPinterestBanner(false);
            }}
            className="bg-charcoal text-sand hover:bg-gold-leaf hover:text-white px-5 py-2.5 rounded font-sans text-xs font-bold tracking-wider uppercase transition-all duration-300"
          >
            Show Details
          </button>
          <a 
            href={getAffiliateLink(pinterestReferralProduct.name, pinterestReferralProduct.designer)}
            target="_blank" 
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="bg-gold-leaf hover:bg-gold-leaf/90 text-white px-5 py-2.5 rounded font-sans text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 transition-all animate-pulse-cta"
          >
            Get on Amazon <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};
