import React from "react";
import { Menu, Sun, Moon, Search, Heart, Sparkles } from "lucide-react";

interface HeaderProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  savedProductIdsCount: number;
  currentTab: string;
  setCurrentTab: (tab: "home" | "shop" | "saved" | "search" | "admin") => void;
  setSelectedProductId: (id: string | null) => void;
  setMenuOpen: (open: boolean) => void;
  setIsSearchActive: (active: boolean) => void;
  setShowDisclaimerBubble: (show: boolean) => void;
  showToast: (msg: string) => void;
  headerScrolled: boolean;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  setIsDarkMode,
  savedProductIdsCount,
  currentTab,
  setCurrentTab,
  setSelectedProductId,
  setMenuOpen,
  setIsSearchActive,
  setShowDisclaimerBubble,
  showToast,
  headerScrolled,
  searchInputRef,
}) => {
  return (
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        headerScrolled 
          ? isDarkMode 
            ? "bg-[#181a19]/90 backdrop-blur-md shadow-md border-b border-white/5 py-3" 
            : "bg-surface/90 backdrop-blur-md shadow-sm border-b border-charcoal/5 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 w-full max-w-7xl mx-auto">
        {/* Logo & Category trigger */}
        <div className="flex items-center gap-4">
          <button 
            id="mobile-menu-trigger"
            aria-label="Menu" 
            onClick={() => setMenuOpen(true)}
            className="text-current hover:text-gold-leaf transition-colors flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-neutral-500/10 active:scale-95 duration-200"
          >
            <Menu className="w-6 h-6" />
          </button>
          <button 
            onClick={() => {
              setCurrentTab("home");
              setSelectedProductId(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-serif text-2xl md:text-3xl tracking-widest text-current hover:opacity-80 transition-opacity font-bold uppercase"
          >
            CURATED
          </button>
        </div>

        {/* Right Action Menu: Theme Toggle, Favorites, Search, Amazon Indicator */}
        <div className="flex items-center gap-2">
          {/* Amazon Associate Partnership Badge (Visible on desktop) */}
          <div 
            onClick={() => setShowDisclaimerBubble(true)}
            className="hidden lg:flex items-center gap-1.5 bg-gold-leaf/10 hover:bg-gold-leaf/20 border border-gold-leaf/30 px-3 py-1.5 rounded-full text-[10px] font-sans tracking-widest uppercase font-bold text-gold-leaf cursor-pointer transition-all active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-leaf animate-pulse" /> Amazon Associate
          </div>

          {/* Dark Mode Toggle */}
          <button 
            onClick={() => {
              setIsDarkMode(!isDarkMode);
              showToast(isDarkMode ? "Switched to Light Mode ☀️" : "Switched to Dark Mode 🌙");
            }}
            aria-label="Toggle dark mode"
            className="p-2 text-current hover:text-gold-leaf hover:bg-neutral-500/10 rounded-full transition-all active:scale-95 duration-200"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Search Trigger */}
          <button 
            aria-label="Search" 
            onClick={() => {
              setIsSearchActive(true);
              setTimeout(() => searchInputRef.current?.focus(), 150);
            }}
            className="p-2 text-current hover:text-gold-leaf hover:bg-neutral-500/10 rounded-full transition-all active:scale-95 duration-200"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Saved list heart */}
          <button 
            aria-label="Saved list"
            onClick={() => {
              setCurrentTab("saved");
              setSelectedProductId(null);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="p-2 text-current hover:text-gold-leaf hover:bg-neutral-500/10 rounded-full transition-all active:scale-95 relative duration-200"
          >
            <Heart className={`w-5 h-5 ${savedProductIdsCount > 0 ? "fill-gold-leaf text-gold-leaf" : ""}`} />
            {savedProductIdsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold-leaf" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
