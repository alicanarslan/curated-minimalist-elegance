import React from "react";
import { Sparkles, ChevronRight, ArrowRight } from "lucide-react";
import { Product } from "../types";
import { COLLECTIONS } from "../constants";
import { ProductCard } from "./ProductCard";
import { SkeletonLoader } from "./SkeletonLoader";

interface HomeTabProps {
  isDarkMode: boolean;
  hotspotHeroRef: React.RefObject<HTMLDivElement | null>;
  navigateToProduct: (id: string) => void;
  setActiveCategory: (cat: string) => void;
  setCurrentTab: (tab: "home" | "shop" | "saved" | "search" | "admin") => void;
  activeCategory: string;
  isPageLoading: boolean;
  filteredProducts: Product[];
  savedProductIds: string[];
  toggleSaveProduct: (id: string, e: React.MouseEvent) => void;
  handleRedirect: (asin: string, link: string, e: React.MouseEvent) => void;
  showToast: (msg: string) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  isDarkMode,
  hotspotHeroRef,
  navigateToProduct,
  setActiveCategory,
  setCurrentTab,
  activeCategory,
  isPageLoading,
  filteredProducts,
  savedProductIds,
  toggleSaveProduct,
  handleRedirect,
  showToast,
}) => {
  return (
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
                <p className="font-sans text-[10px] text-gold-leaf font-bold mt-0.5"><span className="text-white font-normal text-opacity-70">Atelier Reserve</span></p>
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
                <p className="font-sans text-[10px] text-gold-leaf font-bold mt-0.5"><span className="text-white font-normal text-opacity-70">Lumina Brass</span></p>
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
                <p className="font-sans text-[10px] text-gold-leaf font-bold mt-0.5"><span className="text-white font-normal text-opacity-70">Boucle Atelier</span></p>
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

          {/* BENTO ITEM 2: Tall Architectural Lighting - span 5 tall 3 (on desktop) */}
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
                <SkeletonLoader className="aspect-[4/5] w-full" isDarkMode={isDarkMode} />
                <SkeletonLoader className="h-6 w-3/4" isDarkMode={isDarkMode} />
                <SkeletonLoader className="h-4 w-1/2" isDarkMode={isDarkMode} />
                <SkeletonLoader className="h-10 w-full mt-2" isDarkMode={isDarkMode} />
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
                onToggleSave={(id, e) => toggleSaveProduct(id, e)}
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
  );
};
