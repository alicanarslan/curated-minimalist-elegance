import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { CATEGORIES } from "../constants";

interface NavigationDrawerProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  isDarkMode: boolean;
  currentTab: string;
  setCurrentTab: (tab: "home" | "shop" | "saved" | "search" | "admin" | "about" | "contact" | "privacy") => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  setSelectedProductId: (id: string | null) => void;
  savedProductIdsCount: number;
  setShowDisclaimerBubble: (show: boolean) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  menuOpen,
  setMenuOpen,
  isDarkMode,
  currentTab,
  setCurrentTab,
  activeCategory,
  setActiveCategory,
  setSelectedProductId,
  savedProductIdsCount,
  setShowDisclaimerBubble,
}) => {
  return (
    <AnimatePresence>
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Dark backing overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black backdrop-blur-xs"
          />
          {/* Drawer */}
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className={`absolute left-0 top-0 bottom-0 w-80 shadow-2xl flex flex-col p-6 z-10 ${
              isDarkMode ? "bg-charcoal text-[#e8e6e3]" : "bg-[#f5f2ee] text-charcoal"
            }`}
          >
            <div className="flex justify-between items-center pb-6 border-b border-neutral-500/10">
              <div className="font-serif text-2xl tracking-widest font-bold">CURATED</div>
              <button 
                onClick={() => setMenuOpen(false)}
                className="p-1 hover:bg-neutral-500/15 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-8 overflow-y-auto">
              <ul className="flex flex-col space-y-4">
                <li>
                  <button 
                    onClick={() => {
                      setCurrentTab("home");
                      setSelectedProductId(null);
                      setMenuOpen(false);
                    }}
                    className={`font-serif text-xl text-left block w-full transition-all hover:translate-x-1.5 hover:text-gold-leaf ${
                      currentTab === "home" ? "text-gold-leaf font-bold" : "text-current"
                    }`}
                  >
                    Home Board
                  </button>
                </li>
                {CATEGORIES.slice(1).map((category, index) => (
                  <li key={index}>
                    <button 
                      onClick={() => {
                        setActiveCategory(category);
                        setCurrentTab("shop");
                        setSelectedProductId(null);
                        setMenuOpen(false);
                      }}
                      className={`font-serif text-xl text-left block w-full transition-all hover:translate-x-1.5 hover:text-gold-leaf ${
                        currentTab === "shop" && activeCategory === category 
                          ? "text-gold-leaf font-bold" 
                          : "text-current"
                      }`}
                    >
                      {category} Catalog
                    </button>
                  </li>
                ))}
                <li>
                  <button 
                    onClick={() => {
                      setCurrentTab("saved");
                      setSelectedProductId(null);
                      setMenuOpen(false);
                    }}
                    className={`font-serif text-xl text-left block w-full transition-all hover:translate-x-1.5 hover:text-gold-leaf ${
                      currentTab === "saved" ? "text-gold-leaf font-bold" : "text-current"
                    }`}
                  >
                    Saved ({savedProductIdsCount})
                  </button>
                </li>
                
                <li className="pt-4 border-t border-neutral-500/10">
                  <div className="text-[10px] uppercase tracking-widest font-bold font-mono opacity-50 mb-2">Information</div>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => {
                          setCurrentTab("about");
                          setSelectedProductId(null);
                          setMenuOpen(false);
                        }}
                        className="font-sans text-sm text-left block w-full hover:text-gold-leaf"
                      >
                        About Us
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setCurrentTab("contact");
                          setSelectedProductId(null);
                          setMenuOpen(false);
                        }}
                        className="font-sans text-sm text-left block w-full hover:text-gold-leaf"
                      >
                        Contact Us
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setCurrentTab("privacy");
                          setSelectedProductId(null);
                          setMenuOpen(false);
                        }}
                        className="font-sans text-sm text-left block w-full hover:text-gold-leaf"
                      >
                        Privacy Policy
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>

            <div className="pt-6 border-t border-neutral-500/10 text-xs text-opacity-70 leading-relaxed font-mono space-y-4">
              <a 
                href="https://tr.pinterest.com/zenhomeorganizer/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-center bg-[#E60023] hover:bg-[#ad001a] text-white text-xs font-sans font-bold py-2 px-4 rounded transition-colors"
              >
                Follow us on Pinterest
              </a>
              <div 
                onClick={() => {
                  setShowDisclaimerBubble(true);
                  setMenuOpen(false);
                }}
                className="bg-gold-leaf/10 p-3 rounded border border-gold-leaf/20 cursor-pointer hover:bg-gold-leaf/20 text-current font-sans text-center tracking-normal font-medium leading-normal text-[10px]"
              >
                📣 As an Amazon Associate I earn from qualifying purchases.
              </div>
              <div className="text-[9px] text-center">© 2026 CURATED COLLECTIVE</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
