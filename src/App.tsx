import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types & Constants
import { Product } from "./types";
import { PRODUCTS, RECENT_SEARCHES_DEFAULT } from "./constants";

// Sub-components
import { SkeletonLoader } from "./components/SkeletonLoader";
import { Header } from "./components/Header";
import { SearchPanel } from "./components/SearchPanel";
import { NavigationDrawer } from "./components/NavigationDrawer";
import { PinterestBanner } from "./components/PinterestBanner";
import { ProductDetails } from "./components/ProductDetails";
import { HomeTab } from "./components/HomeTab";
import { ShopTab } from "./components/ShopTab";
import { SavedTab } from "./components/SavedTab";
import { SearchTab } from "./components/SearchTab";
import { Footer } from "./components/Footer";
import { StickyMobileCta } from "./components/StickyMobileCta";
import { AffiliateDisclosure } from "./components/AffiliateDisclosure";
import { AdminDashboard } from "./components/AdminDashboard";
import { LegalPages } from "./components/LegalPages";

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

  // Navigation / screen states (extended with "admin" and legal)
  const [currentTab, setCurrentTab] = useState<"home" | "shop" | "saved" | "search" | "admin" | "about" | "contact" | "privacy">("home");
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
  const [stickyCtaClosed, setStickyCtaClosed] = useState<boolean>(false);
  const [showDisclaimerBubble, setShowDisclaimerBubble] = useState<boolean>(false);
  
  // Pinterest Direct Referral Item state
  const [pinterestReferralProduct, setPinterestReferralProduct] = useState<Product | null>(null);
  const [showPinterestBanner, setShowPinterestBanner] = useState<boolean>(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [searchHistory, setSearchHistory] = useState<string[]>(RECENT_SEARCHES_DEFAULT);
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll Position for Sticky Mobile CTA trigger
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  const hotspotHeroRef = useRef<HTMLDivElement>(null);

  // Mock initial load to demonstrate shimmer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Check URL or hash for Pinterest parameters (dynamic referral), Cloaking Routes, and Admin Portal
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

      // Check URL parameters
      const params = new URLSearchParams(window.location.search);

      // Hidden Route to Curator / Admin Panel: check for ?admin=true or ?curator=true or hash #admin
      if (params.get("admin") === "true" || params.get("curator") === "true" || window.location.hash === "#admin") {
        setCurrentTab("admin");
        setSelectedProductId(null);
        return;
      }

      // Look for ?pin= or Hash id for Pinterest referral
      const pinId = params.get("pin") || params.get("product") || window.location.hash.replace("#", "");
      if (pinId && pinId !== "admin") {
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
          showToast(`Pinterest product loaded: ${foundProduct.name}`);
        }
      }
    };
    
    checkReferral();
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
      }, 800);
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

  // Dynamic Page Title & OpenGraph Metadata Updater for Amazon Associate approval
  useEffect(() => {
    let title = "CURATED - Minimalist Home, Lighting & Decor Inspiration";
    let desc = "Discover curated minimalist home decor, office aesthetics, and architectural lighting inspired by Pinterest boards.";
    let image = "https://lh3.googleusercontent.com/aida-public/AB6AXuCn8D3rpZzzo8bm9FQPWiuq3ZfCnfymxYMxEAeLBGtzRIrb4dvoplXMdGmKKWo-D9mF-fpWnK1wlfXTV0Ahb6rtTzBSBX57s5kXwNl8Zih66VdEDDRa8dFYlwBrFMTJjmMWuPuyRrvz4Y4DdVNb2H1Isj-tNKTNuvq7UmLkwm5kEAx77rUkek9I8L-cm2Ab3vmtAPK6BLqxzVD6wVJlspfHbAbYcw7r6PI_AAD-1JPBD3U9cC-Nwrxp6YREXSINJKZo21HyppotS4T8";
    
    if (selectedProductId) {
      const prod = productsList.find(p => p.id === selectedProductId);
      if (prod) {
        title = `${prod.name} by ${prod.designer} - CURATED`;
        desc = prod.description;
        image = prod.imageUrl || (prod.colorSwatches[0]?.images[0]) || image;
      }
    } else if (currentTab === "shop") {
      title = `${activeCategory} Design Catalog - CURATED`;
    } else if (currentTab === "saved") {
      title = "Your Saved Inspiration Boards - CURATED";
    } else if (currentTab === "about") {
      title = "About Us - CURATED Design Studio";
    } else if (currentTab === "contact") {
      title = "Contact Us - CURATED Design Studio";
    } else if (currentTab === "privacy") {
      title = "Privacy Policy - CURATED";
    }

    document.title = title;

    // Helper to dynamically update HTML meta tags
    const setMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!element) {
        element = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("twitter:")) {
          element.setAttribute("property", property);
        } else {
          element.setAttribute("name", property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    setMetaTag("description", desc);
    setMetaTag("og:title", title);
    setMetaTag("og:description", desc);
    setMetaTag("og:image", image);
    setMetaTag("og:url", window.location.href);
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", desc);
    setMetaTag("twitter:image", image);
  }, [selectedProductId, currentTab, activeCategory, productsList]);

  // Helper functions scoped to the active product color swatch
  const getProductActiveImage = (product: Product, index: number = 0) => {
    const chosenColorName = colorSelections[product.id] || product.colorSwatches[0]?.name;
    const swatch = product.colorSwatches.find(s => s.name === chosenColorName);
    const imagesArray = swatch ? swatch.images : product.colorSwatches[0]?.images || [];
    return imagesArray[index] || imagesArray[0];
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

  // Dynamic affiliate link resolver
  const getAffiliateLink = (prodName: string, designer: string) => {
    const affiliateTag = "curatedpin-20"; // Secure legal associate tag
    return `https://www.amazon.com/s?k=${encodeURIComponent(prodName + " " + designer)}&tag=${affiliateTag}`;
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
      {/* MINIMALIST REDIRECT OVERLAY */}
      {redirectAsin && (() => {
        const foundProduct = productsList.find(p => p.asin.toUpperCase() === redirectAsin.toUpperCase());
        const targetTitle = foundProduct ? foundProduct.name : "Product Page";
        const targetImage = foundProduct ? (foundProduct.imageUrl || foundProduct.colorSwatches[0]?.images[0]) : "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=200";
        const targetLink = foundProduct ? foundProduct.affiliateLink : `https://www.amazon.com/dp/${redirectAsin}?tag=curatedpin-20`;
        return (
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-6 ${
            isDarkMode ? "bg-[#111312] text-[#e8e6e3]" : "bg-[#faf9f6]"
          }`}>
            <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
              {/* Rotating minimalist loader visual */}
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border border-neutral-500/15" />
                <div className="absolute inset-0 rounded-full border border-t-neutral-800 dark:border-t-white animate-spin" />
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold tracking-tight mb-1.5">
                  Opening Amazon...
                </h2>
                <p className="text-xs text-neutral-450 leading-relaxed max-w-xs mx-auto">
                  Directing you to the official product store. Stand by, we are forwarding your browser.
                </p>
              </div>

              {/* Product Thumbnail details card */}
              <div className={`w-full p-4 rounded-lg border flex items-center gap-4 text-left ${
                isDarkMode ? "bg-white/5 border-white/5 text-white" : "bg-white border-neutral-200 text-charcoal"
              }`}>
                <div className="w-12 h-15 rounded overflow-hidden bg-surface shrink-0 border border-neutral-500/10">
                  <img src={targetImage} alt={targetTitle} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold line-clamp-1 leading-tight">{targetTitle}</h4>
                  <p className="text-[10px] text-neutral-450 dark:text-neutral-400 mt-1 font-sans">
                    Official Product Store Sourced
                  </p>
                </div>
              </div>

              {/* Compliance note */}
              <div className="mt-2 text-[10px] px-4 font-sans leading-normal text-neutral-400">
                * As an Amazon Associate, we earn from qualifying purchases. This support allows us to continue our independent styling curation.
              </div>

              {/* Safe fallback link */}
              <div className="mt-2 flex flex-col gap-2 w-full">
                <a 
                  href={targetLink}
                  target="_blank"
                  rel="sponsored nofollow"
                  className="w-full bg-neutral-900 border border-neutral-850 text-sand hover:bg-neutral-850 dark:bg-white dark:border-transparent dark:text-charcoal dark:hover:bg-neutral-100 font-sans text-xs font-bold tracking-widest py-3 rounded uppercase text-center transition-colors"
                >
                  Check Price on Amazon
                </a>
                <button 
                  onClick={() => {
                    setRedirectAsin(null);
                    window.history.pushState({}, "", "/");
                  }}
                  className="text-xs text-neutral-450 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-350 underline py-2 mt-1 transition-colors"
                >
                  Return to Curated
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
              <AffiliateDisclosure onClose={() => setShowDisclaimerBubble(false)} />
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
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        savedProductIdsCount={savedProductIds.length}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setSelectedProductId={setSelectedProductId}
        setMenuOpen={setMenuOpen}
        setIsSearchActive={setIsSearchActive}
        setShowDisclaimerBubble={setShowDisclaimerBubble}
        showToast={showToast}
        headerScrolled={headerScrolled}
        searchInputRef={searchInputRef}
      />

      {/* Global Search Panel overlay */}
      <SearchPanel
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        isDarkMode={isDarkMode}
        searchInputRef={searchInputRef}
        searchHistory={searchHistory}
        clearSearchHistory={clearSearchHistory}
        deleteHistoryItem={deleteHistoryItem}
        handleSearchSubmit={handleSearchSubmit}
        setActiveCategory={setActiveCategory}
        setCurrentTab={setCurrentTab}
      />

      {/* Side Slide-out Drawer Navigation */}
      <NavigationDrawer
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        isDarkMode={isDarkMode}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setSelectedProductId={setSelectedProductId}
        savedProductIdsCount={savedProductIds.length}
        setShowDisclaimerBubble={setShowDisclaimerBubble}
      />

      {/* Main Container Workspace */}
      <main className="flex-grow pt-20 max-w-7xl w-full mx-auto md:px-6">

        {/* Dynamic Pinterest Referral Highlight Banner */}
        <PinterestBanner
          showPinterestBanner={showPinterestBanner}
          setShowPinterestBanner={setShowPinterestBanner}
          pinterestReferralProduct={pinterestReferralProduct}
          isDarkMode={isDarkMode}
          navigateToProduct={navigateToProduct}
          getAffiliateLink={getAffiliateLink}
          getProductActiveImage={getProductActiveImage}
        />

        <AnimatePresence mode="wait">
          {selectedProductId ? (
            <motion.div 
              key="detail_sheet"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="pt-6 pb-24 px-4 md:px-6 w-full"
            >
              <ProductDetails
                productId={selectedProductId}
                onBack={() => setSelectedProductId(null)}
                isDarkMode={isDarkMode}
                savedProductIds={savedProductIds}
                toggleSaveProduct={toggleSaveProduct}
                isPageLoading={isPageLoading}
                detailActiveImageIndex={detailActiveImageIndex}
                setDetailActiveImageIndex={setDetailActiveImageIndex}
                colorSelections={colorSelections}
                setColorSelections={setColorSelections}
                handleRedirect={handleRedirect}
                productsList={productsList}
                navigateToProduct={navigateToProduct}
              />
            </motion.div>
          ) : (
            <motion.div 
              key={currentTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="px-4 md:px-6 pt-4 pb-24"
            >
              {currentTab === "home" && (
                <HomeTab
                  isDarkMode={isDarkMode}
                  hotspotHeroRef={hotspotHeroRef}
                  navigateToProduct={navigateToProduct}
                  setActiveCategory={setActiveCategory}
                  setCurrentTab={setCurrentTab}
                  activeCategory={activeCategory}
                  isPageLoading={isPageLoading}
                  filteredProducts={filteredProducts}
                  savedProductIds={savedProductIds}
                  toggleSaveProduct={toggleSaveProduct}
                  handleRedirect={handleRedirect}
                  showToast={showToast}
                />
              )}

              {currentTab === "shop" && (
                <ShopTab
                  isDarkMode={isDarkMode}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  filteredProducts={filteredProducts}
                  savedProductIds={savedProductIds}
                  toggleSaveProduct={toggleSaveProduct}
                  navigateToProduct={navigateToProduct}
                  handleRedirect={handleRedirect}
                />
              )}

              {currentTab === "saved" && (
                <SavedTab
                  isDarkMode={isDarkMode}
                  savedProductIds={savedProductIds}
                  productsList={productsList}
                  toggleSaveProduct={toggleSaveProduct}
                  navigateToProduct={navigateToProduct}
                  handleRedirect={handleRedirect}
                  setCurrentTab={setCurrentTab}
                />
              )}

              {currentTab === "search" && (
                <SearchTab
                  isDarkMode={isDarkMode}
                  searchQuery={searchQuery}
                  filteredProducts={filteredProducts}
                  savedProductIds={savedProductIds}
                  toggleSaveProduct={toggleSaveProduct}
                  navigateToProduct={navigateToProduct}
                  handleRedirect={handleRedirect}
                  setSearchQuery={setSearchQuery}
                  setCurrentTab={setCurrentTab}
                />
              )}

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

              {(currentTab === "about" || currentTab === "contact" || currentTab === "privacy") && (
                <LegalPages
                  initialSection={currentTab}
                  onBack={() => setCurrentTab("home")}
                  isDarkMode={isDarkMode}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer
        isDarkMode={isDarkMode}
        setCurrentTab={setCurrentTab}
        setSelectedProductId={setSelectedProductId}
        setShowDisclaimerBubble={setShowDisclaimerBubble}
      />

      {/* Sticky Mobile CTA */}
      <StickyMobileCta
        stickyCtaClosed={stickyCtaClosed}
        setStickyCtaClosed={setStickyCtaClosed}
        activeStickyProduct={activeStickyProduct}
        scrollPercentage={scrollPercentage}
        isDarkMode={isDarkMode}
        navigateToProduct={navigateToProduct}
        getAffiliateLink={getAffiliateLink}
        getProductActiveImage={getProductActiveImage}
      />
    </div>
  );
}
