import React from "react";
import { Heart } from "lucide-react";
import { Product } from "../types";
import { ProductCard } from "./ProductCard";

interface SavedTabProps {
  isDarkMode: boolean;
  savedProductIds: string[];
  productsList: Product[];
  toggleSaveProduct: (id: string, e: React.MouseEvent) => void;
  navigateToProduct: (id: string) => void;
  handleRedirect: (asin: string, link: string, e: React.MouseEvent) => void;
  setCurrentTab: (tab: "home" | "shop" | "saved" | "search" | "admin") => void;
}

export const SavedTab: React.FC<SavedTabProps> = ({
  isDarkMode,
  savedProductIds,
  productsList,
  toggleSaveProduct,
  navigateToProduct,
  handleRedirect,
  setCurrentTab,
}) => {
  const savedProducts = productsList.filter(p => savedProductIds.includes(p.id));

  return (
    <div>
      <div className="mb-8 border-b border-neutral-500/10 pb-4 text-center md:text-left">
        <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-wide">Your Saved Boards</h2>
        <p className="text-xs text-muted-gray mt-1">Designs you found inspiring and saved to buy later on Amazon.</p>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gold-leaf/10 text-gold-leaf flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <p className="font-serif text-lg font-bold">Your saves are currently empty.</p>
            <p className="font-sans text-xs text-muted-gray mt-1 max-w-xs mx-auto">Save your favorites by clicking the heart icon as you browse design albums and interactive lookbooks.</p>
          </div>
          <button 
            onClick={() => setCurrentTab("home")}
            className="bg-charcoal text-sand hover:bg-gold-leaf hover:text-white py-2.5 px-6 rounded font-sans text-xs uppercase tracking-widest font-bold transition-transform active:scale-95 duration-200"
          >
            EXPLORE DESIGNS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {savedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSaved={true}
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
