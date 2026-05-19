import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence 
} from "motion/react";
import { 
  Menu, 
  Search, 
  Heart, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Award,
  BookOpen,
  Moon,
  Sun,
  ShieldCheck,
  AlertCircle,
  Clock,
  Trash2,
  TrendingUp,
  Info,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { PRODUCTS, COLLECTIONS, CATEGORIES, RECENT_SEARCHES_DEFAULT } from "./constants";
import { Product, Collection } from "./types";
import { ProductCard } from "./components/ProductCard";
import { AffiliateDisclosure } from "./components/AffiliateDisclosure";
import { AdminDashboard } from "./components/AdminDashboard";

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Loading Simulation state (for showing skeleton shimmer)
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  // Dynamic products list loaded from constants or localStorage
  const [productsList, setProductsList] = useState<Product[]>(() => {
    try {
      const persisted = localStorage.getItem("curated_products");
      if (persisted) {
        return JSON.parse(persisted);
      }
    } catch (err) {
      console.error("Error loading persisted products:", err);
    }
    return PRODUCTS;
  });

  // Dynamic redirection ASIN state for secure routing
  const [redirectAsin, setRedirectAsin] = useState<string | null>(null);

  const handleAddProduct = (newProduct: Product) => {
    const updated = [newProduct, ...productsList];
    setProductsList(updated);
    try {
      localStorage.setItem("curated_products", JSON.stringify(updated));
    } catch (err) {
      console.error("Error persisting products:", err);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = productsList.filter(p => p.id !== productId);
    setProductsList(updated);
    try {
      localStorage.setItem("curated_products", JSON.stringify(updated));
    } catch (err) {
      console.error("Error persisting products:", err);
    }
  };

  // Secure Amazon Redirection event handler (Cloaking Analytics tracker)
  const handleRedirect = (asin: string, affiliateLink: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    try {
      const tracker = JSON.parse(localStorage.getItem("clicks_tracker") || "{}");
      tracker[asin] = (tracker[asin] || 0) + 1;
      localStorage.setItem("clicks_tracker", JSON.stringify(tracker));
    } catch (err) {
      console.error("Error tracker:", err);
    }
    setRedirectAsin(asin);
    window.history.pushState({}, "", `/go/${asin}`);
  };

  // Navigation / screen states (extended with "admin")
  const [currentTab, setCurrentTab] = useState<"home" | "shop" | "saved" | "search" | "admin">("home");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  // Interactive features states
  const [savedProductIds, setSavedProductIds] = useState<string[]>(["lounge-chair-no-5", "orbital-lamp"]);
  const [colorSelections, setColorSelections] = useState<Record<string, string>>({
    "velvet-accent-chair": "Emerald"
  });
  const [detailActiveImageIndex, setDetailActiveImageIndex] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [headerScrolled, setHeaderScrolled] = useState<boolean>(false);
  const [hoveredProductCardId, setHoveredProductCardId] = useState<string | null>(null);
  const [stickyCtaClosed, setStickyCtaClosed] = useState<boolean>(false);
  const [showDisclaimerBubble, setShowDisclaimerBubble] = useState<boolean>(false);
  
  // Pinterest Direct Referral Item state
  const [pinterestReferralProduct, setPinterestReferralProduct] = useState<Product | null>(null);
  const [showPinterestBanner, setShowPinterestBanner] = useState<boolean>(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>(RECENT_SEARCHES_DEFAULT);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll Position for Sticky Mobile CTA trigger
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  // Carousel Refs for navigation
  const carouselRef = useRef<HTMLDivElement>(null);
  const hotspotHeroRef = useRef<HTMLDivElement>(null);

  // Mock initial load to demonstrate shimmer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Check URL or hash for Pinterest parameters (dynamic referral) and Cloaking Routes
  useEffect(() => {
    const checkReferral = () => {
      // Look for /go/ path link cloaking
      const path = window.location.pathname;
      if (path.startsWith("/go/")) {
        const urlAsin = path.split("/")[2];
        if (urlAsin) {
          setRedirectAsin(urlAsin.toUpperCase());
          return;
        }
      }

      // Look for ?pin= or Hash id
      const params = new URLSearchParams(window.location.search);
      const pinId = params.get("pin") || params.get("product") || window.location.hash.replace("#", "");
      
      if (pinId) {
        const foundProduct = productsList.find(
          p => p.id === pinId || p.id.toLowerCase() === pinId.toLowerCase() || p.asin.toLowerCase() === pinId.toLowerCase()
        );
        if (foundProduct) {
          setPinterestReferralProduct(foundProduct);
          setShowPinterestBanner(true);
          // Auto choose color if available
          if (foundProduct.colorSwatches && foundProduct.colorSwatches.length > 0) {
            setColorSelections(prev => ({ ...prev, [foundProduct.id]: foundProduct.colorSwatches[0].name }));
          }
          // Highlight layout
          showToast(`Pinterest product loaded: ${foundProduct.name}`);
        }
      }
    };
    
    checkReferral();
    // Watch for hash changes too
    window.addEventListener("hashchange", checkReferral);
    return () => window.removeEventListener("hashchange", checkReferral);
  }, [productsList]);

  // Delayed Redirect Timer
  useEffect(() => {
    if (redirectAsin) {
      const p = productsList.find(prod => prod.asin.toUpperCase() === redirectAsin.toUpperCase());
      const destination = p ? p.affiliateLink : `https://www.amazon.com/dp/${redirectAsin}?tag=curatedpin-20`;
      
      const t = setTimeout(() => {
        window.location.href = destination;
      }, 1600);
      return () => clearTimeout(t);
    }
  }, [redirectAsin, productsList]);

  // Track page scroll to style the header and toggle state
  useEffect(() => {
    const handleScroll = () => {
      // Header transparency state
      if (window.scrollY > 30) {
        setHeaderScrolled(true);
      } else {
        setHeaderScrolled(false);
      }

      // Calculate Scroll Percentage for CTA trigger
      const h = document.documentElement, 
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
      const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
      setScrollPercentage(percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set active image with color swatch
  const getProductActiveImage = (product: Product, index: number = 0) => {
    const chosenColorName = colorSelections[product.id] || product.colorSwatches[0]?.name;
    const swatch = product.colorSwatches.find(s => s.name === chosenColorName);
    const imagesArray = swatch ? swatch.images : product.colorSwatches[0]?.images || [];
    return imagesArray[index] || imagesArray[0];
  };

  const getProductGallery = (product: Product) => {
    const chosenColorName = colorSelections[product.id] || product.colorSwatches[0]?.name;
    const swatch = product.colorSwatches.find(s => s.name === chosenColorName);
    return swatch ? swatch.images : product.colorSwatches[0]?.images || [];
  };

  // Toast notifier
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 4000);
  };

  // Toggle saved (favorite)
  const toggleSaveProduct = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const product = productsList.find(p => p.id === productId);
    if (!product) return;

    if (savedProductIds.includes(productId)) {
      setSavedProductIds(prev => prev.filter(id => id !== productId));
      showToast(`"${product.name}" removed from favorites.`);
    } else {
      setSavedProductIds(prev => [...prev, productId]);
      showToast(`"${product.name}" added to favorites! ✨`);
    }
  };

  // Handle queries
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    if (query.trim() && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 5)]);
    }
    setCurrentTab("search");
    setIsSearchActive(false);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    showToast("Search history cleared");
  };

  const deleteHistoryItem = (query: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchHistory(prev => prev.filter(q => q !== query));
  };

  // Filtering products
  const filteredProducts = productsList.filter(product => {
    if (currentTab === "search") {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return false;
      return (
        product.name.toLowerCase().includes(q) ||
        product.designer.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)
      );
    }

    if (currentTab === "saved") {
      return savedProductIds.includes(product.id);
    }

    if (activeCategory === "All") return true;
    return product.category.toLowerCase() === activeCategory.toLowerCase();
  });

  // Navigate to product detail helper
  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setDetailActiveImageIndex(0);
    // Allow Mobile Sticky CTA to pop up again for new product
    setStickyCtaClosed(false); 
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Carousel helpers
  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 340;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Dynamic affiliate link resolver
  const getAffiliateLink = (prodName: string, designer: string) => {
    const affiliateTag = "curatedpin-20"; // Secure legal associate tag
    return `https://www.amazon.com/s?k=${encodeURIComponent(prodName + " " + designer)}&tag=${affiliateTag}`;
  };

  // Skeleton shimmer placeholder component
  const SkeletonLoader = ({ className = "h-4 w-full" }: { className?: string }) => {
    return (
      <div 
        className={`shimmer-bg ${isDarkMode ? "shimmer-bg-dark" : "shimmer-bg"} rounded animate-pulse ${className}`}
        style={{
          backgroundSize: "200% 100%"
        }}
      />
    );
  };

  // Determine active product for Sticky bottom trigger on mobile
  const activeStickyProduct = selectedProductId 
    ? productsList.find(p => p.id === selectedProductId) 
    : (pinterestReferralProduct || productsList[0]);

  return (
    <div className={`min-h-screen font-sans selection:bg-gold-leaf/20 ${
      isDarkMode 
        ? "bg-[#181a19] text-[#e8e6e3]" 
        : "bg-surface text-charcoal"
      } transition-colors duration-500 flex flex-col overflow-x-hidden`}
    >
      {/* SECURE CLOAKED REDIRECTION SPLASH CARD OVERLAY */}
      {redirectAsin && (() => {
        const foundProduct = productsList.find(p => p.asin.toUpperCase() === redirectAsin.toUpperCase());
        const targetTitle = foundProduct ? foundProduct.name : `Verifying Product ASIN: ${redirectAsin}`;
        const targetImage = foundProduct ? (foundProduct.imageUrl || foundProduct.colorSwatches[0]?.images[0]) : "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=200";
        const targetLink = foundProduct ? foundProduct.affiliateLink : `https://www.amazon.com/dp/${redirectAsin}?tag=curatedpin-20`;
        return (
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-6 ${
            isDarkMode ? "bg-[#111312] text-[#e8e6e3]" : "bg-[#faf9f6]"
          }`}>
            <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
              {/* Rotating minimalist loader visual */}
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-2 border-neutral-500/15" />
                <div className="absolute inset-0 rounded-full border-2 border-t-gold-leaf animate-spin" />
              </div>

              <div>
                <span className="font-sans text-[10px] tracking-widest uppercase font-extrabold text-gold-leaf block mb-1">
                  Secure Link Cloaking Verified
                </span>
                <h2 className="font-serif text-2xl font-bold tracking-tight mb-2">
                  Connecting Securely to Amazon...
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                  Applying Amazon associate recommendation parameters. Stand by, we are forwarding you to the official checkout portal.
                </p>
              </div>

              {/* Verified Product Thumbnail details card */}
              <div className={`w-full p-4 rounded-xl border flex items-center gap-4 text-left ${
                isDarkMode ? "bg-white/5 border-white/5 text-white" : "bg-white border-neutral-200 text-charcoal"
              }`}>
                <div className="w-14 h-18 rounded overflow-hidden bg-surface shrink-0 border border-neutral-500/10">
                  <img src={targetImage} alt={targetTitle} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold line-clamp-1 leading-tight">{targetTitle}</h4>
                  <p className="font-mono text-[9px] text-neutral-400 mt-1 uppercase tracking-wider">
                    ASIN: {redirectAsin} • SECURED PIN LINK
                  </p>
                  <p className="text-[10px] text-emerald-500 font-bold font-sans mt-0.5">
                    ✓ Verified Prime Sourcing
                  </p>
                </div>
              </div>

              {/* Visual loading log lines */}
              <div className="w-full font-mono text-[9px] text-neutral-450 bg-neutral-500/5 py-3.5 px-4 rounded space-y-1.5 text-left">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>► INBOUND REDIRECT STATUS:</span>
                  <span className="text-emerald-500 font-bold uppercase tracking-wider">RESOLVED</span>
                </div>
                <div>LOG: Parsing affiliate parameters tracking click...</div>
                <div>LOG: Cloaking B0_DP path parameters successfully.</div>
                <div>LOG: Injecting Amazon.com sponsored attributes.</div>
              </div>

              {/* Compliance note */}
              <div className="mt-2 text-[10px] px-4 font-sans leading-normal text-neutral-400">
                <strong>Legal Affiliate Notice:</strong> As an Amazon Associate I earn from qualifying purchases. This secure connection supports curation visual boards.
              </div>

              {/* Safe fallback link */}
              <div className="mt-4 flex flex-col gap-2 w-full">
                <a 
                  href={targetLink}
                  target="_blank"
                  rel="sponsored nofollow"
                  className="w-full bg-neutral-900 border border-neutral-800 text-white font-sans text-xs font-bold tracking-widest py-3.5 rounded uppercase text-center"
                >
                  Click here to proceed immediately
                </a>
                <button 
                  onClick={() => {
                    setRedirectAsin(null);
                    window.history.pushState({}, "", "/");
                  }}
                  className="text-xs text-neutral-400 hover:text-neutral-500 underline py-2 mt-1"
                >
                  Cancel Connection
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Legal Disclaimer Pop-up overlay */}
      <AnimatePresence>
        {showDisclaimerBubble && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`max-w-md w-full p-6 rounded-lg shadow-xl ${
                isDarkMode ? "bg-charcoal text-[#e8e6e3] border border-white/10" : "bg-white text-charcoal border border-charcoal/5"
              }`}
            >
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gold-leaf/20">
                <div className="flex items-center gap-2 text-gold-leaf">
                  <Info className="w-5 h-5" />
                  <h3 className="font-serif font-bold text-lg">Transparent Affiliate Disclosure</h3>
                </div>
                <button 
                  onClick={() => setShowDisclaimerBubble(false)}
                  className="p-1 hover:bg-gold-leaf/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="font-sans text-sm leading-relaxed mb-4 text-opacity-90">
                We are a curation platform listing the most exclusive home decor and aesthetic lighting products from independent design studios.
              </p>
              <p className="font-sans text-sm leading-relaxed mb-4 font-medium text-gold-leaf">
                Our platform is an Amazon Associate.
              </p>
              <p className="font-sans text-xs leading-relaxed text-opacity-70 mb-5">
                When you click the referral buttons on our site to reach Amazon and make a purchase, Amazon pays our platform a small referral commission. This commission is covered entirely by Amazon's budget and <strong>adds absolutely no extra expense or cost to you.</strong> The official Amazon warranty, fast shipping, and discount coupon prices you receive are fully preserved. Thank you from the bottom of our hearts for your support!
              </p>
              <button 
                onClick={() => setShowDisclaimerBubble(false)}
                className="w-full bg-gold-leaf hover:bg-gold-leaf/80 text-white font-sans text-xs font-bold tracking-widest py-3 uppercase rounded transition-all active:scale-95"
              >
                I Understand, Thank You
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Toast System */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 md:bottom-12 left-0 right-0 mx-auto w-fit z-50 px-6 max-w-sm pointer-events-none"
          >
            <div className={`rounded-xl pl-4 pr-6 py-3 flex items-center gap-3 shadow-lg pointer-events-auto border ${
              isDarkMode 
                ? "bg-[#252826] text-[#e8e6e3] border-white/10" 
                : "bg-charcoal text-sand border-charcoal/5"
            }`}>
              <CheckCircle2 className="text-gold-leaf w-5 h-5 shrink-0" />
              <span className="font-sans text-sm tracking-wide font-medium">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Header */}
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
            {/* Admin Curator Portal Badge (Visible on desktop/tablet) */}
            <button 
              onClick={() => {
                setCurrentTab("admin");
                setSelectedProductId(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hidden sm:flex items-center gap-1.5 bg-neutral-900 text-white dark:bg-white/10 dark:text-sand border border-neutral-700/40 px-3 py-1.5 rounded-full text-[10px] font-sans tracking-widest uppercase font-bold cursor-pointer transition-all active:scale-95"
            >
              Curator Portal ⚙️
            </button>

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
              <Heart className={`w-5 h-5 ${savedProductIds.length > 0 ? "fill-gold-leaf text-gold-leaf" : ""}`} />
              {savedProductIds.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold-leaf" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Panel overlay */}
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

      {/* Side Slide-out Drawer Navigation */}
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
                <div className="font-serif text-2xl tracking-widest font-bold">CURATED SHOP</div>
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="p-1 hover:bg-neutral-500/15 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 py-8 overflow-y-auto">
                <ul className="flex flex-col space-y-5">
                  <li>
                    <button 
                      onClick={() => {
                        setCurrentTab("home");
                        setSelectedProductId(null);
                        setMenuOpen(false);
                      }}
                      className={`font-serif text-2xl text-left block w-full transition-all hover:translate-x-1.5 hover:text-gold-leaf ${
                        currentTab === "home" ? "text-gold-leaf font-bold" : "text-current"
                      }`}
                    >
                      Living Room & Explore
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
                        className={`font-serif text-2xl text-left block w-full transition-all hover:translate-x-1.5 hover:text-gold-leaf ${
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
                      className="font-serif text-2xl text-left text-current block w-full transition-all hover:translate-x-1.5 hover:text-gold-leaf font-medium"
                    >
                      Saved ({savedProductIds.length})
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        setCurrentTab("admin");
                        setSelectedProductId(null);
                        setMenuOpen(false);
                      }}
                      className={`font-serif text-2xl text-left block w-full transition-all hover:translate-x-1.5 hover:text-gold-leaf ${
                        currentTab === "admin" ? "text-gold-leaf font-bold font-semibold text-neutral-500" : "text-current"
                      }`}
                    >
                      Admin Panel ⚙️
                    </button>
                  </li>
                </ul>
              </nav>

              <div className="pt-6 border-t border-neutral-500/10 text-xs text-opacity-70 leading-relaxed font-mono space-y-4">
                <div 
                  onClick={() => {
                    setShowDisclaimerBubble(true);
                    setMenuOpen(false);
                  }}
                  className="bg-gold-leaf/10 p-3.5 rounded border border-gold-leaf/20 cursor-pointer hover:bg-gold-leaf/20 text-current font-sans text-center tracking-normal font-medium leading-normal"
                >
                  📣 We are an Amazon Associate. We may earn a small commission on purchases made through our referral links, at no extra cost to you.
                </div>
                <div>© 2026 CURATED COLLECTIVE</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Container Workspace */}
      <main className="flex-grow pt-20 max-w-7xl w-full mx-auto md:px-6">

        {/* Dynamic Pinterest Referral Highlight Banner (Zero-friction instant recognition) */}
        {showPinterestBanner && pinterestReferralProduct && (
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
        )}

        <AnimatePresence mode="wait">
          {selectedProductId ? (
            /* ============================================== */
            /* PRODUCT DETAILS VIEW (Optimized Conversion Sheet) */
            /* ============================================== */
            <motion.div 
              key="detail_sheet"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="pt-6 pb-24 px-4 md:px-6 w-full"
            >
              {(() => {
                const product = PRODUCTS.find(p => p.id === selectedProductId);
                if (!product) return <p className="p-12 text-center text-muted-gray">Product not found.</p>;

                const gallery = getProductGallery(product);
                const activeColor = colorSelections[product.id] || product.colorSwatches[0]?.name;

                return (
                  <div className="flex flex-col">
                    {/* Breadcrumbs Navigation */}
                    <div className="mb-6 flex justify-between items-center bg-sand/20 dark:bg-white/5 p-3 rounded">
                      <button 
                        onClick={() => setSelectedProductId(null)}
                        className="inline-flex items-center gap-2 font-sans text-xs tracking-wider text-current hover:text-gold-leaf uppercase font-semibold group cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Collection
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-gray hidden sm:inline">{product.category} / {product.name}</span>
                        <button 
                          onClick={(e) => toggleSaveProduct(product.id, e)}
                          className="w-10 h-10 rounded-full border border-neutral-500/15 flex items-center justify-center text-current hover:bg-neutral-500/10 transition-all active:scale-95 duration-200"
                        >
                          <Heart className={`w-5 h-5 ${savedProductIds.includes(product.id) ? "fill-gold-leaf text-gold-leaf border-none" : "text-current"}`} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
                      
                      {/* Image Gallery left column - span 7 */}
                      <div className="lg:col-span-7 flex flex-col gap-4">
                        <div className={`aspect-[4/5] object-center sm:aspect-square w-full overflow-hidden rounded relative border border-neutral-500/10 ${
                          isPageLoading ? "animate-pulse" : ""
                        }`}>
                          {isPageLoading ? (
                            <SkeletonLoader className="h-full w-full" />
                          ) : (
                            <img 
                              src={gallery[detailActiveImageIndex] || gallery[0]} 
                              alt={`${product.name} model detail`} 
                              className="w-full h-full object-cover transition-all duration-700 select-none hover:scale-102"
                              referrerPolicy="no-referrer"
                            />
                          )}

                          {/* Interactive Scarcity Overlay on top of image */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                            <span className="bg-rose-600 text-white font-sans text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest font-bold shadow-md animate-pulse">
                              🔥 Only 2 Left
                            </span>
                            {product.isNewArrival && (
                              <span className="bg-gold-leaf text-white font-sans text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest font-bold shadow-md">
                                SEASON'S PICK
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Carousel Thumbnails */}
                        {gallery.length > 1 && (
                          <div className="grid grid-cols-4 gap-3">
                            {gallery.map((imgUrl, idx) => (
                              <button 
                                key={idx}
                                onClick={() => setDetailActiveImageIndex(idx)}
                                className={`aspect-square w-full overflow-hidden bg-sand rounded border transition-all duration-200 relative ${
                                  detailActiveImageIndex === idx 
                                    ? "border-gold-leaf ring-2 ring-gold-leaf/40" 
                                    : "border-neutral-500/10 hover:border-neutral-500/30"
                                }`}
                              >
                                <img src={imgUrl} alt="gallery micro thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Specification & Direct Checkout details - span 5 */}
                      <div className="lg:col-span-5 flex flex-col">
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                          <span className={`${isDarkMode ? "bg-white/10" : "bg-sage/10"} text-current font-sans text-[10px] px-3.5 py-1 rounded-full uppercase tracking-widest font-bold`}>
                            {product.category}
                          </span>
                          <span className="bg-rose-500/10 text-rose-500 font-sans text-[12px] px-3 py-1 rounded-full font-bold">
                            💥 Deal of the Day
                          </span>
                        </div>

                        <h1 className="font-serif text-3xl md:text-4xl mb-2 font-bold leading-tight">
                          {product.name}
                        </h1>

                        <p className="font-sans text-xs text-muted-gray uppercase tracking-widest mb-4">
                          Design & Architecture: <span className="font-semibold text-gold-leaf">{product.designer}</span>
                        </p>

                        {/* Special Price Display (Scarcity layout) */}
                        <div className="flex items-baseline gap-3 mb-6 p-4 rounded-lg bg-neutral-500/5 border border-neutral-500/10">
                          <span className="font-sans text-3xl font-bold text-gold-leaf">${product.price}</span>
                          <span className="font-sans text-sm text-muted-gray line-through">${Math.round(product.price * 1.3)}</span>
                          <span className="font-sans text-[11px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded uppercase font-mono">-%24 SAVINGS</span>
                        </div>

                        {/* Active Color selected bubble bar */}
                        {product.colorSwatches.length > 1 && (
                          <div className="mb-8 p-4 bg-neutral-500/5 rounded border border-neutral-500/10">
                            <h3 className="font-sans text-xs uppercase tracking-widest font-semibold mb-3">
                              Color Option: <span className="text-gold-leaf font-sans font-bold normal-case tracking-normal ml-1">{activeColor}</span>
                            </h3>
                            <div className="flex gap-3">
                              {product.colorSwatches.map((swatch, idx) => (
                                <button 
                                  key={idx}
                                  aria-label={`Color ${swatch.name}`}
                                  onClick={() => {
                                    setColorSelections(prev => ({ ...prev, [product.id]: swatch.name }));
                                    setDetailActiveImageIndex(0);
                                  }}
                                  style={{ backgroundColor: swatch.value }}
                                  className={`w-9 h-9 rounded-full border-2 transition-all duration-200 relative ${
                                    activeColor === swatch.name 
                                      ? "ring-2 ring-offset-2 ring-gold-leaf scale-105 border-transparent" 
                                      : "border-black/10 hover:scale-105"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Core features listing */}
                        <div className="mb-6 space-y-3">
                          <p className="font-sans text-sm leading-relaxed text-opacity-80">
                            {product.longDescription || product.description}
                          </p>
                        </div>

                        {/* Amazon high conversion redirect card (Pulsing trigger) */}
                        <div className="p-5 rounded-lg border border-gold-leaf/40 bg-gold-leaf/10 relative overflow-hidden flex flex-col gap-4.5 mb-8 animate-pulse-cta shadow-[0_4px_20px_rgba(201,169,110,0.1)]">
                          
                          <div className="flex items-center gap-2 justify-between">
                            <div className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold text-gold-leaf">
                              <Sparkles className="w-4 h-4 text-gold-leaf animate-spin duration-[7s]" /> Secure Amazon Redirection
                            </div>
                            <span className="text-[10px] bg-gold-leaf text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest font-mono">ASIN VERIFIED</span>
                          </div>

                          <p className="font-sans text-xs text-opacity-80 leading-relaxed font-light">
                            This exclusive design is available for purchase on global Amazon stores. Instantly connect with reliable sellers, official Amazon warranties, and fast free shipping with our curated link.
                          </p>

                          <a 
                            href={`/go/${product.asin}`}
                            onClick={(e) => handleRedirect(product.asin, product.affiliateLink, e)}
                            target="_blank" 
                            rel="sponsored nofollow"
                            referrerPolicy="no-referrer"
                            className="w-full bg-charcoal hover:bg-gold-leaf text-sand hover:text-white font-sans text-xs font-bold tracking-widest py-4.5 rounded uppercase flex justify-center items-center gap-2.5 transition-all outline-none duration-300 text-center shadow-md shadow-black/10 transition-colors animate-pulse"
                          >
                            GO TO AMAZON TO BUY <ExternalLink className="w-4 h-4 text-gold-leaf" />
                          </a>

                          <div className="flex items-center justify-between text-[10px] text-muted-gray uppercase tracking-widest font-mono border-t border-neutral-500/10 pt-3">
                            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-gold-leaf" /> 100% Secure Payment</span>
                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-gold-leaf" /> Prime Shipping</span>
                          </div>
                        </div>

                        {/* Affiliate Disclaimer box */}
                        <div className="mb-6 text-center">
                          <AffiliateDisclosure variant="cta" isDarkMode={isDarkMode} />
                        </div>

                        {/* Specs overview drawer info lists */}
                        {product.specifications && (
                          <div className="border-t border-neutral-500/10 pt-6">
                            <h3 className="font-serif text-lg font-bold mb-3 flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-gold-leaf" /> Technical Parameters & Dimensions
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {product.specifications.map((spec, index) => (
                                <li key={index} className="flex items-center gap-2 font-sans text-xs text-opacity-75">
                                  <span className="w-1.5 h-1.5 rounded-full bg-gold-leaf shrink-0 animate-pulse" />
                                  <span>{spec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Horizontal scroll section showing similar recommended products */}
                    <div className="border-t border-neutral-500/10 pt-12">
                      <div className="flex justify-between items-baseline mb-6">
                        <h3 className="font-serif text-2xl font-bold">Complete the Similar Aesthetic</h3>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => scrollCarousel("left")}
                            className="p-1.5 rounded-full border border-neutral-500/15 text-current hover:bg-gold-leaf/20 transition-all duration-200"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => scrollCarousel("right")}
                            className="p-1.5 rounded-full border border-neutral-500/15 text-current hover:bg-gold-leaf/20 transition-all duration-200"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Side scroll carousel list container */}
                      <div 
                        ref={carouselRef}
                        className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x scroll-smooth"
                        style={{
                          scrollbarWidth: "none"
                        }}
                      >
                        {PRODUCTS.filter(p => p.id !== product.id).map((item, index) => (
                          <div 
                            key={item.id}
                            onClick={() => navigateToProduct(item.id)}
                            className="w-72 shrink-0 snap-align-start group block cursor-pointer"
                          >
                            <div className="aspect-[3/4] w-full overflow-hidden bg-sand mb-3 rounded border border-neutral-500/10 relative">
                              <img 
                                src={getProductActiveImage(item)} 
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-2.5 right-2.5">
                                <span className="bg-charcoal/80 text-white text-[9px] px-2 py-1 rounded font-bold uppercase tracking-wider">
                                  {item.category === "Living Room" ? "Living Room" : item.category === "Office" ? "Office" : "Decor"}
                                </span>
                              </div>
                            </div>
                            <h4 className="font-serif text-base font-bold group-hover:text-gold-leaf transition-colors line-clamp-1">{item.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-bold text-gold-leaf">${item.price}</span>
                              <span className="text-xs text-rose-500 font-semibold uppercase tracking-wider font-mono text-[10px]">Prime Fast</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          ) : (
            /* ============================================== */
            /* TRADITIONAL TAB WORKSPACES SECTION */
            /* ============================================== */
            <motion.div 
              key={currentTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="px-4 md:px-6 pt-4 pb-24"
            >
              {currentTab === "home" && (
                <div className="flex flex-col gap-12 md:gap-20">
                  
                  {/* Pinterest Aesthetic interactive hotspot scene */}
                  <section className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-neutral-500/10">
                    <div ref={hotspotHeroRef} className="relative w-full h-[520px] md:h-[650px]">
                      {/* High quality room image */}
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn8D3rpZzzo8bm9FQPWiuq3ZfCnfymxYMxEAeLBGtzRIrb4dvoplXMdGmKKWo-D9mF-fpWnK1wlfXTV0Ahb6rtTzBSBX57s5kXwNl8Zih66VdEDDRa8dFYlwBrFMTJjmMWuPuyRrvz4Y4DdVNb2H1Isj-tNKTNuvq7UmLkwm5kEAx77rUkek9I8L-cm2Ab3vmtAPK6BLqxzVD6wVJlspfHbAbYcw7r6PI_AAD-1JPBD3U9cC-Nwrxp6YREXSINJKZo21HyppotS4T8" 
                        alt="Scandinavia Curated design scene Room" 
                        className="w-full h-full object-cover ease-out transform scale-100 hover:scale-[1.01] transition-transform duration-[8s]"
                        referrerPolicy="no-referrer"
                        loading="eager"
                      />
                      
                      {/* Rich ambient backing gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent z-10" />

                      {/* HOTSPOT PIN A: Boucle Armchair (velvet-accent-chair or similar) */}
                      <div 
                        className="absolute group z-20"
                        style={{ top: "64%", left: "32%" }}
                      >
                        <div className="relative">
                          {/* Pulsing ring */}
                          <div className="absolute -inset-1.5 w-6 h-6 rounded-full bg-gold-leaf/40 animate-ping" />
                          {/* Inner pin point */}
                          <button 
                            onClick={() => navigateToProduct("velvet-accent-chair")}
                            className="relative w-3.5 h-3.5 rounded-full bg-gold-leaf border-2 border-white cursor-pointer shadow-md focus:outline-none"
                            aria-label="Boucle Chair Hotspot"
                          />
                          {/* Card Tooltip */}
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 xs:max-w-xs w-48 bg-charcoal/90 backdrop-blur-md rounded border border-gold-leaf/30 text-sand p-2.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 scale-95 group-hover:scale-100 shadow-xl">
                            <h4 className="font-serif text-xs font-bold leading-tight">Velvet Accent Chair</h4>
                            <p className="font-sans text-[10px] text-gold-leaf font-bold mt-0.5">$249 <span className="text-white font-normal text-opacity-70">Atelier Reserve</span></p>
                            <button className="text-[9px] font-sans font-bold flex items-center gap-1 mt-1.5 uppercase text-gold-leaf underline">
                              View Now <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* HOTSPOT PIN B: Minimalist Floor Lamp */}
                      <div 
                        className="absolute group z-20"
                        style={{ top: "36%", left: "62%" }}
                      >
                        <div className="relative">
                          <div className="absolute -inset-1.5 w-6 h-6 rounded-full bg-gold-leaf/40 animate-ping" />
                          <button 
                            onClick={() => navigateToProduct("minimalist-floor-lamp")}
                            className="relative w-3.5 h-3.5 rounded-full bg-gold-leaf border-2 border-white cursor-pointer shadow-md focus:outline-none"
                            aria-label="Lumina Floor Lamp Hotspot"
                          />
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-charcoal/90 backdrop-blur-md rounded border border-gold-leaf/30 text-sand p-2.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 scale-95 group-hover:scale-100 shadow-xl">
                            <h4 className="font-serif text-xs font-bold leading-tight">Minimalist Floor Lamp</h4>
                            <p className="font-sans text-[10px] text-gold-leaf font-bold mt-0.5">$129 <span className="text-white font-normal text-opacity-70">Lumina Brass</span></p>
                            <button className="text-[9px] font-sans font-bold flex items-center gap-1 mt-1.5 uppercase text-gold-leaf underline">
                              View Now <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* HOTSPOT PIN C: Boucle Armchair */}
                      <div 
                        className="absolute group z-20"
                        style={{ top: "54%", left: "14%" }}
                      >
                        <div className="relative">
                          <div className="absolute -inset-1.5 w-6 h-6 rounded-full bg-gold-leaf/40 animate-ping" />
                          <button 
                            onClick={() => navigateToProduct("boucle-armchair")}
                            className="relative w-3.5 h-3.5 rounded-full bg-gold-leaf border-2 border-white cursor-pointer shadow-md focus:outline-none"
                            aria-label="Teak lounge Hotspot"
                          />
                          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 bg-charcoal/90 backdrop-blur-md rounded border border-gold-leaf/30 text-sand p-2.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 scale-95 group-hover:scale-100 shadow-xl">
                            <h4 className="font-serif text-xs font-bold leading-tight">Statement Space Chair</h4>
                            <p className="font-sans text-[10px] text-gold-leaf font-bold mt-0.5">$1250 <span className="text-white font-normal text-opacity-70">Boucle Atelier</span></p>
                            <button className="text-[9px] font-sans font-bold flex items-center gap-1 mt-1.5 uppercase text-gold-leaf underline">
                              View Now <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Scene Headline / Absolute Box text */}
                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 z-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                        <div className="max-w-xl text-white">
                          <div className="flex items-center gap-1.5 text-xs text-gold-leaf font-bold tracking-widest uppercase mb-2">
                            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Carefully Curated Pinterest Rooms
                          </div>
                          <h1 className="font-serif text-3xl md:text-5xl font-bold leading-tight tracking-tight drop-shadow-sm">
                            Shop the Look: Intuitive Living Spaces
                          </h1>
                          <p className="font-sans text-xs md:text-sm text-sand/85 mt-2 max-w-md font-light">
                            By clicking on the gorgeous <strong className="text-gold-leaf font-bold">indicator rings</strong> on the images, instantly discover the elegant furniture you see on Pinterest boards with Amazon quality.
                          </p>
                        </div>
                        
                        <div className="flex shrink-0">
                          <button 
                            onClick={() => {
                              setActiveCategory("All");
                              setCurrentTab("shop");
                            }}
                            className="bg-gold-leaf hover:bg-neutral-800 text-white font-sans text-xs tracking-widest uppercase font-bold py-4 px-8 rounded transition-all active:scale-95 shadow-md shadow-charcoal/50 duration-300"
                          >
                            EXPLORE ENTIRE CATALOG NOW
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* ASYMMETRICAL CATEGORY BENTO GRID */}
                  <section>
                    <div className="mb-8 text-center md:text-left">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-wide">Category Boards</h2>
                      <p className="text-xs text-muted-gray mt-1">A curated bento flow summarizing the industry's most popular home aesthetic styles.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[220px]">
                      
                      {/* BENTO ITEM 1: Wide main Living Room card - span 7 tall 2 */}
                      <div 
                        onClick={() => {
                          setActiveCategory("Living Room");
                          setCurrentTab("shop");
                        }}
                        className="md:col-span-7 md:row-span-2 group relative rounded-xl overflow-hidden cursor-pointer border border-neutral-500/10 shadow-sm"
                      >
                        <img 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn8D3rpZzzo8bm9FQPWiuq3ZfCnfymxYMxEAeLBGtzRIrb4dvoplXMdGmKKWo-D9mF-fpWnK1wlfXTV0Ahb6rtTzBSBX57s5kXwNl8Zih66VdEDDRa8dFYlwBrFMTJjmMWuPuyRrvz4Y4DdVNb2H1Isj-tNKTNuvq7UmLkwm5kEAx77rUkek9I8L-cm2Ab3vmtAPK6BLqxzVD6wVJlspfHbAbYcw7r6PI_AAD-1JPBD3U9cC-Nwrxp6YREXSINJKZo21HyppotS4T8" 
                          alt="Living Room Aesthetics" 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent z-10" />
                        <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end text-white">
                          <span className="text-[10px] text-gold-leaf font-bold tracking-widest uppercase mb-1 font-mono">MOST POPULAR</span>
                          <h3 className="font-serif text-2xl font-bold text-white mb-2">Modern Living Room</h3>
                          <p className="text-xs text-sand/80 max-w-sm line-clamp-2">Curved boucle and velvet armchairs, organic walnut coffee tables, and stylish lighting that adds beautiful ambience.</p>
                          <div className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-gold-leaf uppercase tracking-wider mt-4">
                            Explore Room <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* BENTO ITEM 2: Tall Architectural Lighting - span 5 tall 3 (on destkop) */}
                      <div 
                        onClick={() => {
                          setActiveCategory("All");
                          setCurrentTab("shop");
                          showToast("Lighting style activated");
                        }}
                        className="md:col-span-5 md:row-span-3 group relative rounded-xl overflow-hidden cursor-pointer border border-neutral-500/10 shadow-sm"
                      >
                        <img 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtWcdnq0hJM49NcLZ6Is8GJJCtmzEqLwnADirVB0ewC9dkZhAJDnMOecBQY8fEkKoAOmZcbiiPzmr1vMC-UTtFmc0GZ-efvbNx5FAmmyHwVLutqlJ1Tbt-o1HlA57qUezB2wcdPU1Mwi0GvgowUVqKaLJyxRKQ3BsXWbmWUXCEpfoZ9qxW5_5uRay8CXwtE7DYdq5qhu_ZMif61dTRqeSJDpd_mK23cHCXzXjeaGKzI0zle5Axr0hBQ9XTRI5D7kJFPjaXPlCGIYEJ" 
                          alt="Lighting design spheres" 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/20 to-transparent z-10" />
                        <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end text-white">
                          <span className="text-[10px] text-gold-leaf font-bold tracking-widest uppercase mb-1 font-mono font-bold">RADIANCE AESTHETIC</span>
                          <h3 className="font-serif text-2xl font-bold mb-2 text-white">Architectural Lighting</h3>
                          <p className="text-xs text-sand/80 line-clamp-3">Spherical opal shades, matte brass legs, and warm floor lamps offering a cozy seating space in the evenings.</p>
                          <div className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold text-gold-leaf uppercase tracking-wider mt-4">
                            View Design <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* BENTO ITEM 3: Square Kitchen Minimalists - span 4 tall 1 */}
                      <div 
                        onClick={() => {
                          setActiveCategory("Kitchen");
                          setCurrentTab("shop");
                        }}
                        className="md:col-span-4 group relative rounded-xl overflow-hidden cursor-pointer border border-neutral-500/10 shadow-sm"
                      >
                        <img 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAUhxsV2UQlMSY8uo7JwHgjm8jlsp3DtzOdSz0uArneRnYBB1T1ltSI2x6Ik0y80ZXm7GUxoNG-owsp2XbzO8DFfCQ5kIMf6ZNZ6S4Dne_YTA1rjP4qivLjFe2Z-ulPq5YbUEk3pmRa_9ZA03_Su31XWcQ6ew1B7YKQ2n0tsNQbP62hVJUloZBUHfqj0Uxthn2yrifx4hDWuQslpAS-wH6K173qz-KT9GPr7x8OkYe7m4S55quL3uR0AbwqUm0m505IM7pFoA3YnIF" 
                          alt="Ceramic layout" 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent z-10" />
                        <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end text-white">
                          <h3 className="font-serif text-lg font-bold">Kitchen & Artisanal</h3>
                          <div className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold text-gold-leaf uppercase tracking-wider mt-1.5">
                            View Dinnerware <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>

                      {/* BENTO ITEM 4: Square Bed & Office - span 3 tall 1 */}
                      <div 
                        onClick={() => {
                          setActiveCategory("Bedroom");
                          setCurrentTab("shop");
                        }}
                        className="md:col-span-3 group relative rounded-xl overflow-hidden cursor-pointer border border-neutral-500/10 shadow-sm"
                      >
                        <img 
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCITOfAtlE2AQN5QqN118AOwxVSUdxsR0FxakLT6_aRa-zg2BE2ZlB72anMAP3spj7DjSpLYTyAlri4SHm2afEBPcGTk_GZKahhNsBRgl5gs-bYzQFfHsYIYlcVJqi64z_QcOF4DjcKCE9CaA0f7USyj_C7K7x9e6YALdrXDMm3uwthY3rUUaeGdZZil-s0yWeUMnipOVu6VtYkgpUiGdVU5V-T46sDjn_jyCrXPgFIJFxM6O3KQnA3-nGu7U-g2xWI8DT2e694Vh33" 
                          alt="Marble side tables bedside decoration" 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-103"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent z-10" />
                        <div className="absolute inset-x-0 bottom-0 p-4 z-20 flex flex-col justify-end text-white">
                          <h3 className="font-serif text-lg font-bold">Bedroom & Marble</h3>
                          <div className="inline-flex items-center gap-1 text-[10px] font-sans font-semibold text-gold-leaf uppercase tracking-wider mt-1.5">
                            Bedside Tables <ArrowRight className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* ACTIVE CATALOG COLLECTION */}
                  <section>
                    <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-neutral-500/10 pb-4">
                      <div className="text-center sm:text-left">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-wide">Featured Curation</h2>
                        <p className="text-xs text-muted-gray mt-1">Highly rated and selected highlights, a favorite of visual inspiration boards.</p>
                      </div>

                      <div className="flex overflow-x-auto gap-2 p-1 bg-neutral-500/5 rounded-full border border-neutral-500/10 max-w-full">
                        {["All", "Living Room", "Kitchen", "Bedroom", "Office"].map((cat, index) => (
                          <button 
                            key={index}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-xs px-4 py-2 rounded-full uppercase transition-all whitespace-nowrap font-bold tracking-wider ${
                              activeCategory === cat 
                                ? "bg-gold-leaf text-white shadow-sm" 
                                : "text-current opacity-70 hover:opacity-100"
                            }`}
                          >
                            {cat === "All" ? "All" : cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Show Skeleton Shimmer vs Real products Grid */}
                    {isPageLoading ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4].map((n) => (
                          <div key={n} className="flex flex-col gap-3 rounded overflow-hidden">
                            <SkeletonLoader className="aspect-[4/5] w-full" />
                            <SkeletonLoader className="h-6 w-3/4" />
                            <SkeletonLoader className="h-4 w-1/2" />
                            <SkeletonLoader className="h-10 w-full mt-2" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            isSaved={savedProductIds.includes(product.id)}
                            onToggleSave={(id, e) => {
                              e.stopPropagation();
                              toggleSaveProduct(id);
                            }}
                            onSelectProduct={(id) => navigateToProduct(id)}
                            onRedirect={(asin, link, e) => handleRedirect(asin, link, e)}
                            isDarkMode={isDarkMode}
                          />
                        ))}
                      </div>
                    )}
                  </section>

                  {/* Pinterest Aesthetic Inspirations Row - Static Looks layout with carousels */}
                  <section className="bg-neutral-500/5 -mx-4 md:-mx-12 px-4 md:px-12 py-16 rounded-2xl border border-neutral-500/10">
                    <div className="max-w-2xl text-center md:text-left mb-8">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-wide">Most Loved Aesthetics on Pinterest</h2>
                      <p className="text-xs text-muted-gray mt-1">Bring the cozy seating corners and ambient rooms that inspire you into your home.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {COLLECTIONS.map((col) => (
                        <div 
                          key={col.id}
                          onClick={() => {
                            setActiveCategory("All");
                            setCurrentTab("shop");
                            showToast(`"${col.name}" board activated.`);
                          }}
                          className="group relative block aspect-[4/5] overflow-hidden rounded-xl cursor-pointer shadow border border-neutral-500/10"
                        >
                          <img 
                            src={col.image} 
                            alt={col.name} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] z-0" 
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/30 to-transparent z-10" />
                          <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end">
                            <span className="font-sans text-[9px] text-gold-leaf uppercase tracking-widest font-bold font-mono mb-1">{col.subtitle} • PINTEREST TOP</span>
                            <h3 className="font-serif text-xl font-bold text-white mb-2">{col.name}</h3>
                            <p className="font-sans text-xs text-sand/85 line-clamp-2 mb-4 leading-relaxed">{col.description}</p>
                            <div className="inline-flex items-center gap-1.5 text-xs text-white uppercase tracking-widest font-bold group-hover:text-gold-leaf transition-colors self-start mt-2">
                              Explore Details <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {currentTab === "shop" && (
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
                          onToggleSave={(id, e) => {
                            e.stopPropagation();
                            toggleSaveProduct(id);
                          }}
                          onSelectProduct={(id) => navigateToProduct(id)}
                          onRedirect={(asin, link, e) => handleRedirect(asin, link, e)}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SAVED FAVORITES WORKSPACE */}
              {currentTab === "saved" && (
                <div>
                  <div className="mb-8 border-b border-neutral-500/10 pb-4 text-center md:text-left">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold uppercase tracking-wide">Your Saved Boards</h2>
                    <p className="text-xs text-muted-gray mt-1">Designs you found inspiring and saved to buy later on Amazon.</p>
                  </div>

                  {savedProductIds.length === 0 ? (
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
                      {productsList.filter(p => savedProductIds.includes(p.id)).map((product) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isSaved={savedProductIds.includes(product.id)}
                          onToggleSave={(id, e) => {
                            e.stopPropagation();
                            toggleSaveProduct(id);
                          }}
                          onSelectProduct={(id) => navigateToProduct(id)}
                          onRedirect={(asin, link, e) => handleRedirect(asin, link, e)}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SEARCH RESULTS TAB */}
              {currentTab === "search" && (
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
                          onToggleSave={(id, e) => {
                            e.stopPropagation();
                            toggleSaveProduct(id);
                          }}
                          onSelectProduct={(id) => navigateToProduct(id)}
                          onRedirect={(asin, link, e) => handleRedirect(asin, link, e)}
                          isDarkMode={isDarkMode}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ADMINISTRATIVE INVENTORY MANAGEMENT PANEL */}
              {currentTab === "admin" && (
                <div className="max-w-7xl mx-auto">
                  <AdminDashboard 
                    products={productsList}
                    onAddProduct={handleAddProduct}
                    onDeleteProduct={handleDeleteProduct}
                    isDarkMode={isDarkMode}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* COMPLIANT PROFESSIONAL BOTTOM DISCLAIMER SLATE */}
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

      {/* ============================================== */}
      {/* HIGH CONVERSION STICKY MOBILE CTA (Thumb-Zone Trigger) */}
      {/* ============================================== */ }
      <AnimatePresence>
        {!stickyCtaClosed && activeStickyProduct && (
          /* Triggers on scroll beyond 5% to avoid initial clutter, styled optimized for Thumb placement */
          <motion.div 
            initial={{ y: 150, opacity: 0 }}
            animate={(scrollPercentage > 8) ? { y: 0, opacity: 1 } : { y: 150, opacity: 0 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            className="fixed bottom-0 inset-x-0 z-40 p-4 md:hidden"
          >
            <div className={`rounded-2xl shadow-2xl border flex items-center justify-between p-3.5 gap-3 relative ${
              isDarkMode 
                ? "bg-charcoal/95 border-white/10 text-sand backdrop-blur-md" 
                : "bg-white/95 border-neutral-500/15 text-charcoal backdrop-blur-md"
            }`}>
              
              {/* Floating notification node indicator */}
              <div className="absolute -top-3 left-4 bg-rose-500 text-white font-sans text-[8px] px-2 py-0.5 rounded-full font-sans tracking-widest uppercase font-bold animate-pulse-cta border border-white/20">
                🔥 ONLY 2 LEFT • 24% SAVINGS
              </div>

              {/* Thumbnail and title details */}
              <div 
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigateToProduct(activeStickyProduct.id)}
              >
                <div className="w-12 h-12 bg-sand rounded-lg overflow-hidden shrink-0 border border-neutral-500/10">
                  <img 
                    src={getProductActiveImage(activeStickyProduct)} 
                    alt={activeStickyProduct.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-[13px] font-bold line-clamp-1 pr-2 leading-tight">{activeStickyProduct.name}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs font-bold text-gold-leaf">${activeStickyProduct.price}</span>
                    <span className="text-[10px] text-muted-gray line-through">${Math.round(activeStickyProduct.price * 1.3)}</span>
                  </div>
                </div>
              </div>

              {/* Main checkout action pulse button */}
              <div className="flex items-center gap-1.5 shrink-0">
                <a 
                  href={getAffiliateLink(activeStickyProduct.name, activeStickyProduct.designer)}
                  target="_blank" 
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="bg-gold-leaf text-white font-sans text-[10px] font-bold tracking-widest px-4.5 py-3 rounded-xl uppercase flex items-center gap-1.5 transition-all shadow-md active:scale-95 animate-pulse-cta text-center"
                >
                  BUY NOW <ExternalLink className="w-3 h-3 text-white" />
                </a>

                {/* Retract button */}
                <button 
                  onClick={() => setStickyCtaClosed(true)}
                  className="p-1.5 rounded-full bg-neutral-500/10 hover:bg-neutral-500/25 text-current"
                  aria-label="Retract bottom CTA"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
