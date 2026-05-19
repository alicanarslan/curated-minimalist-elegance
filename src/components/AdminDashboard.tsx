import React, { useState } from "react";
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Layers, 
  Eye, 
  FileText, 
  TrendingUp, 
  Pin, 
  Lock, 
  Unlock,
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  Heart
} from "lucide-react";
import { Product } from "../types";

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  isDarkMode: boolean;
}

export function AdminDashboard({
  products,
  onAddProduct,
  onDeleteProduct,
  isDarkMode
}: AdminDashboardProps) {
  // Passcode gate state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>("");
  const [gateError, setGateError] = useState<string | null>(null);

  // Form Fields State
  const [asin, setAsin] = useState("");
  const [name, setName] = useState("");
  const [designer, setDesigner] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Living Room");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  
  // Custom SEO / Pinterest State
  const [pinterestTitle, setPinterestTitle] = useState("");
  const [pinterestDescription, setPinterestDescription] = useState("");
  const [pinterestMetadata, setPinterestMetadata] = useState("");

  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch Cloaking click rates
  const getClicksTracker = (): Record<string, number> => {
    try {
      return JSON.parse(localStorage.getItem("clicks_tracker") || "{}");
    } catch {
      return {};
    }
  };
  const clicksData = getClicksTracker();

  // Unlock Admin
  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "curated2026" || passcode.trim() === "") {
      setIsAuthenticated(true);
      setGateError(null);
    } else {
      setGateError("Incorrect administrative passcode. Try leaving it empty or use 'curated2026'.");
    }
  };

  // Standard ASIN metadata prefill generator helper
  const handleAutoFillAsinInspo = () => {
    if (!asin.trim()) {
      setFormError("Please enter an ASIN code first (e.g., B0B859N6XX)");
      return;
    }
    const cleanAsin = asin.trim().toUpperCase();
    setName(`Premium Scandinavian Minimalist ${category} Piece`);
    setDesigner("Nordic Atelier");
    setPrice("185");
    setDescription(`A gorgeous, visual ${category.toLowerCase()} highlight designed with stark geometry and high tactile elements.`);
    setLongDescription(`Bring the cozy, ambient aesthetic directly into your home. This piece provides visual depth and absolute luxury quality. Rest assured with quick Prime shipping.`);
    setImageUrl("https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=800");
    setAffiliateLink(`https://www.amazon.com/dp/${cleanAsin}?tag=curatedpin-20`);
    setPinterestTitle(`${cleanAsin} - Cozy Custom Interior Design & Lighting Aesthetic`);
    setPinterestDescription(`The cozy seating corners and ambient rooms that inspire you on your Pinterest feeds. Discover high quality on Amazon.`);
    setPinterestMetadata(`og:product:brand=Nordic_Atelier;og:product:price:amount=185;og:product:price:currency=USD`);
    setFormError(null);
  };

  // Submit Product Add request
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (!asin || !name || !designer || !price || !description || !affiliateLink) {
      setFormError("Please fill out all required fields marked with *");
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError("Price must be a valid positive number");
      return;
    }

    const urlValue = imageUrl.trim() || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600";

    const newProduct: Product = {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      asin: asin.trim().toUpperCase(),
      name: name.trim(),
      designer: designer.trim(),
      price: priceNum,
      category,
      description: description.trim(),
      longDescription: longDescription.trim() || undefined,
      imageUrl: urlValue,
      affiliateLink: affiliateLink.trim(),
      colorSwatches: [
        { name: "Standard", value: "#7f7f7f", images: [urlValue] }
      ],
      isNewArrival: true,
      pinterestTitle: pinterestTitle.trim() || `${name} - Minimalist Design Idea`,
      pinterestDescription: pinterestDescription.trim() || `${description} Cozy Home styling board.`,
      pinterestMetadata: pinterestMetadata.trim() || `og:product:brand=${designer};og:product:price:amount=${priceNum}`
    };

    onAddProduct(newProduct);
    setSuccessMessage(`Product "${name}" successfully registered with ASIN "${asin.toUpperCase()}"!`);
    
    // Reset Form fields
    setAsin("");
    setName("");
    setDesigner("");
    setPrice("");
    setDescription("");
    setLongDescription("");
    setImageUrl("");
    setAffiliateLink("");
    setPinterestTitle("");
    setPinterestDescription("");
    setPinterestMetadata("");
  };

  // Admin gate overlay
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-16 px-4">
        <div className={`p-8 rounded-2xl border text-center shadow-lg ${
          isDarkMode ? "bg-[#1f2120] border-neutral-800" : "bg-white border-neutral-200"
        }`}>
          <div className="w-14 h-14 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-5 text-neutral-500">
            <Lock className="w-6 h-6" />
          </div>
          
          <h2 className="font-serif text-2xl font-bold mb-2">Curator Cabinet Door</h2>
          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
            Enter administrative secret passcode to manage catalogs, optimize Pinterest SEO headers, and track internal link clicks metadata.
          </p>

          <form onSubmit={handleAuthenticate} className="space-y-4">
            <div className="text-left">
              <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-bold block mb-1.5">
                Passcode (Leave blank or enter 'curated2026')
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••••••"
                className={`w-full text-center py-3 bg-transparent border rounded font-mono text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400 ${
                  isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-900"
                }`}
              />
            </div>

            {gateError && (
              <div className="text-[11px] text-rose-500 font-sans tracking-tight">
                {gateError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-sans text-xs font-bold tracking-widest py-3 uppercase rounded transition-all active:scale-95 shadow"
            >
              Verify Credentials
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Live previews variables
  const bentoPreviewName = name || "Aura Travertine Spheres Table";
  const bentoPreviewAsin = asin || "B0B859N6XG";
  const bentoPreviewPrice = price || "350";
  const bentoPreviewImage = imageUrl || "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=800";
  const bentoPreviewDesigner = designer || "Kura Design";

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 flex flex-col gap-12">
      {/* Admin header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline border-b border-neutral-200 dark:border-neutral-800 pb-5 gap-4">
        <div>
          <span className="bg-neutral-900 dark:bg-neutral-800 text-white font-sans text-[8.5px] px-2.5 py-1 rounded-full uppercase tracking-widest font-extrabold shadow mb-2 inline-block">
            ACTIVE SYSTEM ADMINISTRATOR
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Curator Dashboard & Inventory</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Publish products to Vercel/Vite client databases, append dynamic tagging parameters, and monitor affiliate redirects.
          </p>
        </div>
        
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-xs hover:text-neutral-500 font-medium underline flex items-center gap-1.5"
        >
          <Unlock className="w-4 h-4 text-neutral-400" /> Lock Admin Pane
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Create / Add Product form (span 7) */}
        <section className={`lg:col-span-7 p-6 md:p-8 rounded-xl border shadow-sm ${
          isDarkMode ? "bg-[#1f2120] border-neutral-800" : "bg-white border-neutral-200"
        }`}>
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-neutral-100 dark:border-neutral-800">
            <h2 className="font-serif text-xl font-bold flex items-center gap-2">
              <Plus className="w-5 h-5 text-neutral-400" /> Add New Amazon Affiliate Product
            </h2>
            <button
               type="button"
               onClick={handleAutoFillAsinInspo}
               className="text-[10px] font-mono uppercase tracking-widest text-[#22) bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 px-3 py-1.5 rounded text-neutral-500 font-bold"
            >
              ⌨️ Auto-Fill Demo Data
            </button>
          </div>

          <form onSubmit={handleSubmitProduct} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold block mb-1">
                  Amazon ASIN Identifier *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., B0B859N6XG"
                  value={asin}
                  onChange={(e) => setAsin(e.target.value)}
                  className={`w-full py-2.5 px-3 bg-transparent border rounded text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 ${
                    isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-950"
                  }`}
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold block mb-1">
                  Product Title (Display) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Curved Boucle Sofa"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full py-2.5 px-3 bg-transparent border rounded text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 ${
                    isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-950"
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold block mb-1">
                  Design Studio / Brand *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Atelier Reserve"
                  value={designer}
                  onChange={(e) => setDesigner(e.target.value)}
                  className={`w-full py-2.5 px-3 bg-transparent border rounded text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 ${
                    isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-950"
                  }`}
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold block mb-1">
                  Price ($ USD) *
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g., 299"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`w-full py-2.5 px-3 bg-transparent border rounded text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 ${
                    isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-950"
                  }`}
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold block mb-1">
                  Aesthetic Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full py-2.5 px-3 bg-transparent border rounded text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:bg-neutral-900 ${
                    isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-950"
                  }`}
                >
                  <option value="Living Room">Living Room</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Office">Office</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold block mb-1">
                  Lifestyle / Product High-Res Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className={`w-full py-2.5 px-3 bg-transparent border rounded text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 ${
                    isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-950"
                  }`}
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold block mb-1">
                  Raw Amazon Affiliate Link *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://www.amazon.com/dp/B0B859N6XG?tag=..."
                  value={affiliateLink}
                  onChange={(e) => setAffiliateLink(e.target.value)}
                  className={`w-full py-2.5 px-3 bg-transparent border rounded text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 ${
                    isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-950"
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold block mb-1">
                Short Catalog Description *
              </label>
              <textarea
                required
                rows={2}
                placeholder="A brief lifestyle-focused summary of the product..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full py-2.5 px-3 bg-transparent border rounded text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 ${
                  isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-950"
                }`}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 font-semibold block mb-1">
                Detailed Product Review (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Extended specifications and placement suggestions for the detail screen..."
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                className={`w-full py-2.5 px-3 bg-transparent border rounded text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 ${
                  isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-950"
                }`}
              />
            </div>

            {/* Pinterest Optimization Fields Grid Wrapper */}
            <div className={`p-4 rounded-lg border flex flex-col gap-3.5 ${
              isDarkMode ? "bg-black/20 border-neutral-800/80" : "bg-neutral-50 border-neutral-200/80"
            }`}>
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider font-extrabold text-[#bd1c1c]">
                ⚙️ Pinterest & SEO Tags Configuration
              </div>

              <div>
                <label className="text-[9px] uppercase font-mono tracking-widest text-neutral-400 font-medium block mb-1">
                  Custom Pinterest SEO Board Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Ambient Retro Bedroom Lamp - Scandinavia Interior Concept Inspo"
                  value={pinterestTitle}
                  onChange={(e) => setPinterestTitle(e.target.value)}
                  className={`w-full py-2 px-3 bg-transparent border rounded text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:bg-neutral-900 ${
                    isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-950"
                  }`}
                />
              </div>

              <div>
                <label className="text-[9px] uppercase font-mono tracking-widest text-neutral-400 font-medium block mb-1">
                  Optimized Pinterest Description (Lifestyle Keywords)
                </label>
                <textarea
                  rows={2}
                  placeholder="Bring direct Pinterest imagery home. Discover matching items, travertine coords, and high quality Amazon links..."
                  value={pinterestDescription}
                  onChange={(e) => setPinterestDescription(e.target.value)}
                  className={`w-full py-2 px-3 bg-transparent border rounded text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:bg-neutral-900 ${
                    isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-950"
                  }`}
                />
              </div>

              <div>
                <label className="text-[9px] uppercase font-mono tracking-widest text-neutral-400 font-medium block mb-1">
                  Pinterest OpenGraph Metadata (og:product:brand, price context)
                </label>
                <input
                  type="text"
                  placeholder="og:product:brand=Atelier;og:product:price:amount=185;og:product:price:currency=USD"
                  value={pinterestMetadata}
                  onChange={(e) => setPinterestMetadata(e.target.value)}
                  className={`w-full py-2 px-3 bg-transparent border rounded text-xs focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:bg-neutral-900 ${
                    isDarkMode ? "border-neutral-800 text-white" : "border-neutral-300 text-neutral-950"
                  }`}
                />
              </div>
            </div>

            {formError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded text-xs text-rose-500 flex items-center gap-2 font-medium">
                <AlertTriangle className="w-4 h-4" /> {formError}
              </div>
            )}

            {successMessage && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs text-emerald-500 flex items-center gap-2 font-medium">
                <ShieldCheck className="w-5 h-5 text-emerald-500 animate-pulse" /> {successMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-neutral-900 dark:bg-neutral-800 text-white hover:bg-neutral-800 dark:hover:bg-neutral-700 font-sans text-xs font-bold tracking-widest py-3.5 uppercase rounded transition-all duration-300 cursor-pointer shadow-md text-center"
            >
              REGISTER PRODUCT IN VERCEL CLIENT DATABASE
            </button>
          </form>
        </section>

        {/* Right Side: Bento Preview / Real-Time redirect clicks analytics stats (span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          
          {/* Bento Preview Module */}
          <section className={`p-6 rounded-xl border shadow-sm ${
            isDarkMode ? "bg-[#1f2120] border-neutral-800" : "bg-white border-neutral-200"
          }`}>
            <h2 className="font-serif text-lg font-bold mb-4 pb-2.5 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
              <Eye className="w-4 h-4 text-neutral-400" /> Bento Card Live Preview
            </h2>

            <div className="w-full h-fit flex justify-center">
              {/* Preview product card resembling design aesthetic grid */}
              <div className="w-full max-w-xs relative rounded-lg border overflow-hidden select-none bg-neutral-500/5 border-neutral-500/15 flex flex-col justify-between">
                <div className="aspect-[4/5] w-full overflow-hidden bg-sand relative shrink-0">
                  <img 
                    src={bentoPreviewImage} 
                    alt="Current card Preview focus" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                    <span className="bg-[#111] text-white font-mono text-[7px] px-1.5 py-0.5 rounded uppercase font-bold">
                      ASIN: {bentoPreviewAsin.toUpperCase()}
                    </span>
                    <span className="bg-neutral-900 text-white font-sans text-[7px] px-1.5 py-0.5 rounded uppercase font-bold">
                      PREVIEW
                    </span>
                  </div>

                  <button className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 text-neutral-400 flex items-center justify-center border border-neutral-200">
                    <Heart className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 font-semibold block">{bentoPreviewDesigner}</span>
                    <h3 className="font-serif text-sm font-bold mt-0.5 leading-tight">{bentoPreviewName}</h3>
                    <p className="font-sans text-[11px] text-neutral-500 mt-1 line-clamp-1">{description || "Visual preview summary description details..."}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-sans text-sm font-extrabold text-neutral-700 dark:text-neutral-200">${bentoPreviewPrice}</span>
                      <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-bold">Prime Fast</span>
                    </div>

                    <div className="w-full bg-neutral-900 dark:bg-neutral-800 text-white font-sans text-[9px] font-bold tracking-widest py-2 rounded uppercase flex items-center justify-center gap-1">
                      VIEW ON AMAZON <ExternalLink className="w-3 h-3 text-neutral-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-neutral-400 text-center mt-3 leading-normal font-mono px-4">
              * Inspect layout visual proportions before deploying to production.
            </p>
          </section>

          {/* Cloaking click trackers table analytics */}
          <section className={`p-6 rounded-xl border shadow-sm ${
            isDarkMode ? "bg-[#1f2120] border-neutral-800" : "bg-white border-neutral-200"
          }`}>
            <h2 className="font-serif text-lg font-bold mb-4 pb-2.5 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0" /> Cloaked Link Click Analytics
            </h2>

            {products.length === 0 ? (
              <p className="text-xs text-neutral-500 py-6 text-center italic">No products registered to log clicks.</p>
            ) : (
              <div className="overflow-x-auto max-h-80 overflow-y-auto no-scrollbar">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-400 font-mono text-[9px] uppercase tracking-wider">
                      <th className="py-2 font-bold">Design Piece</th>
                      <th className="py-2 text-center font-bold">ASIN</th>
                      <th className="py-2 text-right font-gold-leaf font-bold">Clicks Tracker</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/40">
                    {products.map((p) => {
                      const count = clicksData[p.asin] || 0;
                      return (
                        <tr key={p.id} className="hover:bg-neutral-500/5 transition-colors">
                          <td className="py-2.5 font-medium pr-2 block truncate max-w-28 text-[11px]" title={p.name}>
                            {p.name}
                          </td>
                          <td className="py-2.5 font-mono text-center text-[10px] uppercase">
                            {p.asin}
                          </td>
                          <td className="py-2.5 text-right font-bold text-[11px]">
                            <span className={`px-2 py-0.5 rounded font-mono ${
                              count > 0 
                                ? "bg-emerald-500/10 text-emerald-500" 
                                : isDarkMode ? "bg-white/5 text-neutral-400" : "bg-neutral-100 text-neutral-500"
                            }`}>
                              {count} Clicks
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 p-3 bg-neutral-500/5 border border-dashed border-neutral-500/20 rounded text-[10px] text-neutral-400 leading-normal">
              <strong>Redirect Mechanism:</strong> When visual consumers hit <code>/go/:asin</code>, standard tracking fires dynamically prior to Amazon routing. Supports zero-friction SEO tracking on Pinterest.
            </div>
          </section>

          {/* Catalog stats block */}
          <section className={`p-6 rounded-xl border shadow-sm ${
            isDarkMode ? "bg-[#1f2120] border-neutral-800" : "bg-white border-neutral-200"
          }`}>
            <h2 className="font-serif text-lg font-bold mb-4 pb-2.5 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-neutral-400" /> Catalog Inventory List ({products.length})
            </h2>

            <div className="flex flex-col gap-2 max-h-80 overflow-y-auto no-scrollbar">
              {products.map((p) => (
                <div key={p.id} className="flex justify-between items-center bg-neutral-500/5 hover:bg-neutral-500/10 p-2.5 rounded transition-colors duration-200">
                  <div className="flex items-center gap-2.5">
                    <img src={p.imageUrl || p.colorSwatches[0]?.images[0]} alt={p.name} className="w-8.5 h-10 object-cover rounded bg-neutral-200 shrink-0" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-serif text-[11px] font-bold text-current line-clamp-1 pr-2 leading-tight">{p.name}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5 text-[9px] font-mono text-neutral-400">
                        <span>ASIN: {p.asin.toUpperCase()}</span>
                        <span>•</span>
                        <span className="text-neutral-500 text-[10px]">${p.price}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                        if (confirm(`Are you absolutely sure you want to remove ${p.name} from the library catalog?`)) {
                          onDeleteProduct(p.id);
                        }
                    }}
                    className="p-1.5 text-neutral-400 hover:text-rose-500 outline-none hover:bg-neutral-500/10 rounded-full transition-colors active:scale-95 duration-200"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
