import React from "react";
import { Info } from "lucide-react";

interface FooterProps {
  isDarkMode: boolean;
  setCurrentTab: (tab: "home" | "shop" | "saved" | "search" | "admin") => void;
  setSelectedProductId: (id: string | null) => void;
  setShowDisclaimerBubble: (show: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({
  isDarkMode,
  setCurrentTab,
  setSelectedProductId,
  setShowDisclaimerBubble,
}) => {
  return (
    <footer className={`border-t py-16 px-6 md:px-12 mt-auto transition-colors duration-300 ${
      isDarkMode ? "bg-[#111312] border-white/5 text-[#a8a6a2]" : "bg-[#f5f2ee] border-charcoal/5 text-charcoal/70"
    }`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand & legal tag links */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h2 className="font-serif text-2xl font-bold tracking-wider text-current uppercase">CURATED</h2>
          <p className="font-sans text-xs leading-relaxed opacity-85">
            Curated is an independent discovery library cataloging exclusive pieces in the world of home and living design. Recommendations and aesthetics featured on our platform are inspired entirely by our premium interior designer collections.
          </p>
          <p className="font-sans text-[11px] font-medium text-gold-leaf">
            * We are an Amazon Associate.
          </p>
        </div>

        {/* Legal Associates affiliate compliance statements */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-current">Affiliate Disclaimer</h3>
          <p className="font-sans text-[11px] leading-relaxed opacity-75">
            Legal Disclaimer: Curated is an active participant in the Amazon Services LLC Associates Program. When you click dynamic redirect links here like "GO TO AMAZON TO BUY" or contextual affiliate triggers and complete orders, our studio receives a minor commission at zero extra expense to you. This support assists in funding our free visual library. Final purchase terms remain governed by Amazon.com.
          </p>
        </div>

        {/* Links structure */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-current">Quick Navigation</h3>
          <ul className="space-y-2 text-xs font-mono font-medium">
            <li>
              <button 
                onClick={() => {
                  setCurrentTab("home");
                  setSelectedProductId(null);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
                className="hover:text-gold-leaf transition-colors underline"
              >
                Category Bento
              </button>
            </li>
            <li>
              <button 
                onClick={() => setShowDisclaimerBubble(true)}
                className="hover:text-gold-leaf transition-colors underline flex items-center gap-1 text-gold-leaf"
              >
                Transparency Policy <Info className="w-3.5 h-3.5" />
              </button>
            </li>
            <li>
              <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-leaf transition-colors underline">
                Official Amazon Site
              </a>
            </li>
          </ul>
          <div className="pt-4 text-[10px] font-mono opacity-60">
            © 2026 CURATED CO. • ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};
