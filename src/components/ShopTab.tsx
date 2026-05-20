import React from "react";
import { CATEGORIES } from "../constants";
import { Product } from "../types";
import { ProductCard } from "./ProductCard";

interface ShopTabProps {
  isDarkMode: boolean;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  filteredProducts: Product[];
  savedProductIds: string[];
  toggleSaveProduct: (id: string, e: React.MouseEvent) => void;
  navigateToProduct: (id: string) => void;
  handleRedirect: (asin: string, link: string, e: React.MouseEvent) => void;
}

export const ShopTab: React.FC<ShopTabProps> = ({
  isDarkMode,
  activeCategory,
  setActiveCategory,
  filteredProducts,
  savedProductIds,
  toggleSaveProduct,
  navigateToProduct,
  handleRedirect,
}) => {
  return (
    <div>
      {/* Category Filter Navigation Sticky bar offset */}
      <nav className={`sticky top-[68px] z-30 transition-all duration-300 -mx-4 md:-mx-12 px-6 py-4.5 mb-8 border-b ${
        isDarkMode ? "bg-[#181a19]/95 border-white/10" : "bg-white/95 border-charcoal/10"
      }`}>
        <div className="flex overflow-x-auto no-scrollbar gap-5 items-center max-w-7xl mx-auto w-full whitespace-nowrap scroll-smooth">
          {CATEGORIES.map((cat, index) => (
            <button 
              key={index}
              onClick={() => {
                setActiveCategory(cat);
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
              className={`font-sans text-xs tracking-widest uppercase transition-all pb-1 select-none font-bold ${
                activeCategory === cat 
                  ? "text-gold-leaf border-b-2 border-gold-leaf font-extrabold scale-102"
                  : "text-muted-gray hover:text-current"
              }`}
            >
              {cat === "All" ? "All Designs" : cat === "Living Room" ? "Living Room" : cat === "Kitchen" ? "Kitchen & Table" : cat === "Bedroom" ? "Bedrooms" : "Office & Study"}
            </button>
          ))}
        </div>
      </nav>

      {/* Header catalog stats */}
      <div className="flex flex-col sm:flex-row justify-between items-baseline mb-8 gap-2">
        <h2 className="font-serif text-2xl font-bold uppercase tracking-wider">
          {activeCategory === "All" ? "All Designs" : activeCategory} Catalog
        </h2>
        <span className="font-sans text-xs text-muted-gray font-mono">{filteredProducts.length} curations listed</span>
      </div>

      {/* Main Grid display products */}
      {filteredProducts.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-lg text-current">There is no Pinterest aesthetic in this category yet.</p>
          <button 
            onClick={() => setActiveCategory("All")}
            className="text-xs text-gold-leaf uppercase mt-3 tracking-widest font-bold underline cursor-pointer"
          >
            RETURN TO ALL PRODUCTS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSaved={savedProductIds.includes(product.id)}
              onToggleSave={(id, e) => toggleSaveProduct(id, e)}
              onSelectProduct={(id) => navigateToProduct(id)}
              onRedirect={(asin, link, e) => handleRedirect(asin, link, e)}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};
