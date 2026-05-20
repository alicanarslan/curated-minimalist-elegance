import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Trash2, Clock } from "lucide-react";
import { CATEGORIES } from "../constants";

interface SearchPanelProps {
  isSearchActive: boolean;
  setIsSearchActive: (active: boolean) => void;
  isDarkMode: boolean;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  searchHistory: string[];
  clearSearchHistory: () => void;
  deleteHistoryItem: (query: string, e: React.MouseEvent) => void;
  handleSearchSubmit: (query: string) => void;
  setActiveCategory: (cat: string) => void;
  setCurrentTab: (tab: "home" | "shop" | "saved" | "search" | "admin") => void;
}

export const SearchPanel: React.FC<SearchPanelProps> = ({
  isSearchActive,
  setIsSearchActive,
  isDarkMode,
  searchInputRef,
  searchHistory,
  clearSearchHistory,
  deleteHistoryItem,
  handleSearchSubmit,
  setActiveCategory,
  setCurrentTab,
}) => {
  return (
    <AnimatePresence>
      {isSearchActive && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex flex-col h-screen ${isDarkMode ? "bg-[#181a19]/98 text-white" : "bg-white/98 text-charcoal"} backdrop-blur-xl`}
        >
          <div className="flex justify-between items-end px-6 md:px-12 h-26 pb-5 w-full max-w-7xl mx-auto gap-4">
            <div className="flex-1 relative flex items-center group">
              <Search className="absolute left-0 text-muted-gray group-focus-within:text-gold-leaf transition-colors w-6 h-6" />
              <input 
                ref={searchInputRef}
                type="text"
                placeholder="Search products, design styles, or lighting..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchSubmit((e.target as HTMLInputElement).value);
                  }
                }}
                className="w-full bg-transparent border-0 border-b border-neutral-500/20 py-2.5 pl-9 pr-9 font-serif text-xl focus:outline-none focus:ring-0 focus:border-gold-leaf placeholder:text-muted-gray/60 transition-colors"
              />
            </div>
            <button 
              onClick={() => setIsSearchActive(false)}
              className="font-sans text-xs tracking-widest hover:text-gold-leaf uppercase font-bold pb-2 transition-colors cursor-pointer"
            >
              CANCEL
            </button>
          </div>

          {/* Suggested Searches inside overlay */}
          <div className="flex-grow overflow-y-auto px-6 md:px-12 max-w-2xl mx-auto w-full pt-10 flex flex-col gap-10">
            {searchHistory.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline border-b border-neutral-500/10 pb-2">
                  <h2 className="font-sans text-xs text-muted-gray uppercase tracking-widest font-mono font-bold">Your Recent Searches</h2>
                  <button 
                    onClick={clearSearchHistory}
                    className="font-sans text-xs hover:text-gold-leaf transition-colors font-medium flex items-center gap-1 opacity-80"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                  </button>
                </div>
                <ul className="flex flex-col">
                  {searchHistory.map((query, index) => (
                    <li 
                      key={index}
                      onClick={() => handleSearchSubmit(query)}
                      className="group flex items-center justify-between py-3 cursor-pointer border-b border-neutral-500/5 hover:border-gold-leaf/20 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-muted-gray group-hover:text-gold-leaf transition-colors" />
                        <span className="font-sans text-base group-hover:text-gold-leaf transition-colors">{query}</span>
                      </div>
                      <button 
                        onClick={(e) => deleteHistoryItem(query, e)}
                        className="text-muted-gray hover:text-rose-500 p-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trending suggestions */}
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-xs text-muted-gray uppercase tracking-widest font-mono font-bold border-b border-neutral-500/10 pb-2">Trending Interests</h3>
              <div className="flex flex-wrap gap-2.5">
                {CATEGORIES.slice(1).map((cat, idx) => (
                  <button 
                    key={idx}
                    onClick={() => {
                      setActiveCategory(cat);
                      setCurrentTab("shop");
                      setIsSearchActive(false);
                    }}
                    className={`text-xs px-4.5 py-2.5 rounded-full transition-all uppercase font-medium tracking-wide ${
                      isDarkMode ? "bg-white/5 hover:bg-gold-leaf/20 text-[#e8e6e3]" : "bg-sand hover:bg-gold-leaf/20 text-charcoal"
                    }`}
                  >
                    {cat} Aesthetic
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
