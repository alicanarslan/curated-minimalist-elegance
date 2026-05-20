import React from "react";
import { AlertCircle } from "lucide-react";
import { Product } from "../types";
import { ProductCard } from "./ProductCard";

interface SearchTabProps {
  isDarkMode: boolean;
  searchQuery: string;
  filteredProducts: Product[];
  savedProductIds: string[];
  toggleSaveProduct: (id: string, e: React.MouseEvent) => void;
  navigateToProduct: (id: string) => void;
  handleRedirect: (asin: string, link: string, e: React.MouseEvent) => void;
  setSearchQuery: (query: string) => void;
  setCurrentTab: (tab: "home" | "shop" | "saved" | "search" | "admin") => void;
}

export const SearchTab: React.FC<SearchTabProps> = ({
  isDarkMode,
  searchQuery,
  filteredProducts,
  savedProductIds,
  toggleSaveProduct,
  navigateToProduct,
  handleRedirect,
  setSearchQuery,
  setCurrentTab,
}) => {
  return (
    <div>
      <div className="mb-8 border-b border-neutral-500/10 pb-4 text-center md:text-left">
        <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-wide">Search Results</h2>
        <p className="text-xs text-muted-gray mt-1">Product alternatives found for "{searchQuery}".</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <AlertCircle className="w-8 h-8" />
          </div>
          <div>
            <p className="font-serif text-lg font-bold">No matching aesthetic found.</p>
            <p className="font-sans text-xs text-muted-gray mt-1 max-w-xs mx-auto">Try searching for other interior parts, filters, or view our home collections.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                setSearchQuery("");
                setCurrentTab("home");
              }}
              className="bg-charcoal text-sand hover:bg-gold-leaf hover:text-white py-2.5 px-6 rounded font-sans text-xs uppercase tracking-widest font-bold"
            >
              Return to Homepage
            </button>
          </div>
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
