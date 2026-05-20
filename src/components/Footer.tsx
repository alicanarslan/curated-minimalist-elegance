import React from "react";
import { Info } from "lucide-react";

interface FooterProps {
  isDarkMode: boolean;
  setCurrentTab: (tab: "home" | "shop" | "saved" | "search" | "admin" | "about" | "contact" | "privacy") => void;
  setSelectedProductId: (id: string | null) => void;
  setShowDisclaimerBubble: (show: boolean) => void;
}

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={props.className} {...props}>
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.102-.947-.195-2.4.04-3.434.21-.93 1.357-5.736 1.357-5.736s-.346-.689-.346-1.713c0-1.605.932-2.802 2.085-2.802 1.028 0 1.525.771 1.525 1.697 0 1.035-.66 2.58-.999 4.02-.283 1.2.6 2.168 1.78 2.168 2.13 0 3.762-2.245 3.762-5.487 0-2.868-2.06-4.874-5.008-4.874-3.41 0-5.41 2.561-5.41 5.202 0 1.03.397 2.133.89 2.73a.363.363 0 0 1 .083.345c-.097.404-.314 1.277-.356 1.454-.056.23-.189.28-.435.166-1.613-.75-2.62-3.11-2.62-5.013 0-4.086 2.97-7.84 8.558-7.84 4.495 0 7.99 3.204 7.99 7.484 0 4.468-2.818 8.062-6.73 8.062-1.314 0-2.55-.684-2.974-1.493l-.81 3.097c-.292 1.12-1.084 2.524-1.614 3.38 1.12.346 2.3.534 3.525.534 6.623 0 11.985-5.36 11.985-11.987C23.97 5.39 18.63 0 12.017 0z"/>
  </svg>
);

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
            Curated is an independent design library cataloging exclusive pieces in the world of home and living aesthetics. We explore and select only the highest rated premium products corresponding with modern design trends.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <span className="font-sans text-[11px] font-bold text-gold-leaf uppercase tracking-wider block">
              As an Amazon Associate I earn from qualifying purchases.
            </span>
            <a 
              href="https://tr.pinterest.com/zenhomeorganizer/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold bg-[#E60023] text-white px-4 py-2.5 rounded-lg hover:bg-[#ad001a] transition-colors self-start mt-2"
            >
              <PinterestIcon className="w-4 h-4" /> Follow us on Pinterest
            </a>
            <a 
              href="mailto:alicanarslan.dev@gmail.com"
              className="text-[11px] font-mono hover:text-gold-leaf transition-colors mt-2 self-start block underline"
            >
              alicanarslan.dev@gmail.com
            </a>
          </div>
        </div>

        {/* Legal Associates affiliate compliance statements */}
        <div className="md:col-span-5 flex flex-col gap-3">
          <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-current">Affiliate Disclosure</h3>
          <p className="font-sans text-[11px] leading-relaxed opacity-75">
            Legal Statement: CURATED is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. When you click links on our site (such as "Check Price on Amazon") and complete a purchase, we earn a small referral commission at no additional cost to you. Final purchase prices and availability are determined on Amazon.com.
          </p>
        </div>

        {/* Links structure */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h3 className="font-mono text-xs uppercase tracking-widest font-bold text-current">Information & Support</h3>
          <ul className="space-y-2.5 text-xs font-mono font-medium">
            <li>
              <button 
                onClick={() => {
                  setSelectedProductId(null);
                  setCurrentTab("about");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:text-gold-leaf transition-colors underline block text-left"
              >
                About Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setSelectedProductId(null);
                  setCurrentTab("contact");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:text-gold-leaf transition-colors underline block text-left"
              >
                Contact Us
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  setSelectedProductId(null);
                  setCurrentTab("privacy");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:text-gold-leaf transition-colors underline block text-left"
              >
                Privacy Policy
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
          </ul>
          <div className="pt-4 text-[10px] font-mono opacity-60">
            © 2026 CURATED CO. • ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};
