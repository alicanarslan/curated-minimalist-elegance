import React, { useState } from "react";
import { Heart, ExternalLink, Sparkles } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: React.Key | string;
  product: Product;
  isSaved: boolean;
  onToggleSave: (productId: string, e: React.MouseEvent) => void;
  onSelectProduct: (productId: string) => void;
  onRedirect: (asin: string, affiliateLink: string, e: React.MouseEvent) => void;
  isDarkMode: boolean;
}

export function ProductCard({
  product,
  isSaved,
  onToggleSave,
  onSelectProduct,
  onRedirect,
  isDarkMode
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeColor, setActiveColor] = useState(
    product.colorSwatches && product.colorSwatches.length > 0 
      ? product.colorSwatches[0].name 
      : ""
  );

  // Fallback direct image mapping helper
  const getDisplayImage = () => {
    if (product.imageUrl) {
      return product.imageUrl;
    }
    const swatch = product.colorSwatches.find(s => s.name === activeColor);
    const imagesArray = swatch ? swatch.images : product.colorSwatches[0]?.images || [];
    return imagesArray[0] || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600";
  };

  const displayImage = getDisplayImage();

  return (
    <div 
      onClick={() => onSelectProduct(product.id)}
      className={`group relative rounded-lg border overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
        isDarkMode 
          ? "bg-[#1f2120] border-neutral-800 hover:border-neutral-700 shadow-md" 
          : "bg-white border-neutral-200 hover:border-neutral-300 shadow-sm"
      }`}
    >
      {/* Visual Image container with layout constraint */}
      <div className={`relative aspect-[4/5] w-full overflow-hidden shrink-0 ${
        isDarkMode ? "bg-neutral-900" : "bg-neutral-100"
      }`}>
        {/* Skeleton shimmer view when loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 animate-pulse" />
        )}
        
        <img 
          src={displayImage} 
          alt={product.pinterestTitle || product.name} 
          loading="lazy"
          className={`w-full h-full object-cover select-none transition-all duration-700 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } group-hover:scale-103`}
          onLoad={() => setImageLoaded(true)}
          referrerPolicy="no-referrer"
        />

        {/* Visual tag overlay */}
        {product.isNewArrival && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
            <span className="bg-neutral-850/90 text-white font-sans text-[8px] px-2.5 py-1 rounded tracking-widest font-bold shadow uppercase">
              TRENDING
            </span>
          </div>
        )}

        {/* Saved List Heart switch button */}
        <button 
          onClick={(e) => onToggleSave(product.id, e)}
          className={`absolute top-3 right-3 w-8.5 h-8.5 rounded-full flex items-center justify-center transition-all shadow-sm active:scale-90 border z-10 ${
            isDarkMode 
              ? "bg-[#181a19]/90 border-neutral-800 hover:bg-[#1f2120] text-neutral-300"
              : "bg-white/90 border-neutral-200 hover:bg-neutral-100 text-neutral-800"
          }`}
          aria-label="Save current decor"
        >
          <Heart className={`w-4 h-4 transition-colors ${isSaved ? "fill-neutral-500 text-neutral-500" : "text-current"}`} />
        </button>
      </div>

      {/* Product Information Card Content Block */}
      <div className="p-4.5 flex-grow flex flex-col justify-between">
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 font-bold block mb-1">
            {product.designer}
          </span>
          <h3 className={`font-serif text-base font-bold line-clamp-1 group-hover:text-neutral-500 transition-colors ${
            isDarkMode ? "text-neutral-100" : "text-neutral-900"
          }`}>
            {product.name}
          </h3>
          <p className="font-sans text-xs text-neutral-500 mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-3.5 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex justify-between items-baseline mb-3.5">
            <span className="font-sans text-[10px] text-[#222] dark:text-neutral-400 uppercase tracking-widest font-semibold">
              Prime Verified
            </span>
          </div>

          {/* Color swatches selector */}
          {product.colorSwatches && product.colorSwatches.length > 1 && (
            <div className="flex gap-2 mb-3.5" onClick={(e) => e.stopPropagation()}>
              {product.colorSwatches.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setActiveColor(color.name)}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                  className={`w-4.5 h-4.5 rounded-full border border-black/10 transition-transform hover:scale-110 active:scale-90 ${
                    activeColor === color.name ? "ring-1 ring-offset-1 ring-neutral-400" : ""
                  }`}
                />
              ))}
            </div>
          )}

          {/* Redirect outbound cloak button */}
          <button 
            onClick={(e) => onRedirect(product.asin, product.affiliateLink, e)}
            className="w-full bg-neutral-900 dark:bg-neutral-800 text-white hover:bg-neutral-800 dark:hover:bg-neutral-700 font-sans text-[10px] font-bold tracking-widest py-2.5 rounded uppercase flex items-center justify-center gap-1.5 transition-colors"
          >
            CHECK PRICE ON AMAZON <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </button>

          <div className="flex justify-between items-center text-[8px] text-neutral-450 mt-2.5 uppercase tracking-widest font-mono">
            <span>
              Prime Available
            </span>
            <span>Only 3 Left</span>
          </div>
        </div>
      </div>
    </div>
  );
}
