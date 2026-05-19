import React from "react";
import { Info, ShieldAlert } from "lucide-react";

interface AffiliateDisclosureProps {
  variant?: "footer" | "cta" | "minimal";
  isDarkMode: boolean;
}

export function AffiliateDisclosure({ variant = "footer", isDarkMode }: AffiliateDisclosureProps) {
  if (variant === "cta") {
    return (
      <div className={`mt-2.5 mb-5 p-3 rounded text-[11px] font-sans flex items-start gap-2 leading-relaxed tracking-wide ${
        isDarkMode 
          ? "bg-neutral-900/40 text-neutral-400 border border-neutral-800/60" 
          : "bg-neutral-50 border border-neutral-200/50 text-neutral-500"
      }`}>
        <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block mb-0.5">Affiliate Link disclosure:</strong>
          As an Amazon Associate I earn from qualifying purchases. When you click outward checkout markers, we receive an commission entirely covered by Amazon's budget.
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <p className="text-[10px] font-sans tracking-wide text-neutral-400 font-medium my-2 text-center select-none">
        * As an Amazon Associate I earn from qualifying purchases.
      </p>
    );
  }

  // Footer default layout style
  return (
    <div className={`p-4.5 rounded-lg border flex flex-col gap-2.5 font-sans justify-between ${
      isDarkMode 
        ? "bg-[#181a19] border-neutral-800/80 text-neutral-400" 
        : "bg-neutral-50/70 border-neutral-200/80 text-neutral-600"
    }`}>
      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#222] dark:text-neutral-300">
        <ShieldAlert className="w-4 h-4 text-neutral-400" /> Compliance Transparency Card
      </div>
      <p className="text-[11px] leading-relaxed">
        <strong>Important Legal Disclaimer:</strong> Curated is a professional visual catalog and styling board. As an Amazon Associate I earn from qualifying purchases. When you click any outbound anchor redirect like "GO TO AMAZON TO BUY" or "View on Amazon" on our layout, our studio receives a minor recommendation commission at absolute zero extra expense to you. Final prices remain governed by Amazon.com.
      </p>
    </div>
  );
}
