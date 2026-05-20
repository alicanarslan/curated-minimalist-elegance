import React, { useRef } from "react";
import { ArrowLeft, Heart, Sparkles, ExternalLink, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "../types";
import { SkeletonLoader } from "./SkeletonLoader";

interface ProductDetailsProps {
  productId: string;
  onBack: () => void;
  isDarkMode: boolean;
  savedProductIds: string[];
  toggleSaveProduct: (id: string, e?: React.MouseEvent) => void;
  isPageLoading: boolean;
  detailActiveImageIndex: number;
  setDetailActiveImageIndex: (idx: number) => void;
  colorSelections: Record<string, string>;
  setColorSelections: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleRedirect: (asin: string, link: string, e: React.MouseEvent) => void;
  productsList: Product[];
  navigateToProduct: (id: string) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  productId,
  onBack,
  isDarkMode,
  savedProductIds,
  toggleSaveProduct,
  isPageLoading,
  detailActiveImageIndex,
  setDetailActiveImageIndex,
  colorSelections,
  setColorSelections,
  handleRedirect,
  productsList,
  navigateToProduct,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const product = productsList.find(p => p.id === productId);
  if (!product) return <p className="p-12 text-center text-muted-gray">Product not found.</p>;

  // Helper functions scoped to the active product color swatch
  const getProductActiveImage = (prod: Product, index: number = 0) => {
    const chosenColorName = colorSelections[prod.id] || prod.colorSwatches[0]?.name;
    const swatch = prod.colorSwatches.find(s => s.name === chosenColorName);
    const imagesArray = swatch ? swatch.images : prod.colorSwatches[0]?.images || [];
    return imagesArray[index] || imagesArray[0];
  };

  const getProductGallery = (prod: Product) => {
    const chosenColorName = colorSelections[prod.id] || prod.colorSwatches[0]?.name;
    const swatch = prod.colorSwatches.find(s => s.name === chosenColorName);
    return swatch ? swatch.images : prod.colorSwatches[0]?.images || [];
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 340;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const gallery = getProductGallery(product);
  const activeColor = colorSelections[product.id] || product.colorSwatches[0]?.name;

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs Navigation */}
      <div className="mb-6 flex justify-between items-center bg-sand/20 dark:bg-white/5 p-3 rounded">
        <button 
          onClick={onBack}
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
              <SkeletonLoader className="h-full w-full" isDarkMode={isDarkMode} />
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

          {/* Amazon Product Purchase Info card */}
          <div className={`p-5 rounded-lg border flex flex-col gap-4 mb-6 ${
            isDarkMode ? "bg-neutral-900/40 border-neutral-850" : "bg-neutral-50/50 border-neutral-200"
          }`}>
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest font-bold text-neutral-450 dark:text-neutral-400">
                Official Sourcing
              </div>
              <span className="text-[9px] text-emerald-555 font-bold uppercase tracking-widest font-mono">In Stock</span>
            </div>

            <p className="font-sans text-xs text-opacity-80 leading-relaxed font-light">
              This design is available for purchase on Amazon. Clicking below takes you to its official listing where you can place your order with standard warranties and fast shipping.
            </p>

            <a 
              href={`/go/${product.asin}`}
              onClick={(e) => handleRedirect(product.asin, product.affiliateLink, e)}
              target="_blank" 
              rel="sponsored nofollow"
              referrerPolicy="no-referrer"
              className="w-full bg-charcoal hover:bg-neutral-900 text-sand hover:text-white dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:text-charcoal font-sans text-xs font-bold tracking-widest py-4 rounded uppercase flex justify-center items-center gap-2.5 transition-all outline-none duration-300 text-center shadow-md shadow-black/10 transition-colors"
            >
              GO TO AMAZON TO BUY <ExternalLink className="w-4 h-4 opacity-75" />
            </a>

            <div className="flex items-center justify-between text-[9px] text-muted-gray uppercase tracking-widest font-mono border-t border-neutral-500/10 pt-3">
              <span className="flex items-center gap-1">Official Warranties</span>
              <span className="flex items-center gap-1">Prime Shipping</span>
            </div>
          </div>

          {/* Technical Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="border-t border-neutral-500/10 pt-6">
              <h3 className="font-sans text-xs uppercase tracking-widest font-bold mb-3 flex items-center gap-1.5">
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
          {productsList.filter(p => p.id !== product.id).map((item) => (
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
                    {item.category}
                  </span>
                </div>
              </div>
              <h4 className="font-serif text-base font-bold group-hover:text-gold-leaf transition-colors line-clamp-1">{item.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-rose-500 font-semibold uppercase tracking-wider font-mono text-[10px]">Prime Fast</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
