import { Product, Collection } from "./types";
import RAW_PRODUCTS from "./data/products.json";

export const PRODUCTS: Product[] = (RAW_PRODUCTS as Omit<Product, "affiliateLink" | "pinterestTitle" | "pinterestDescription" | "pinterestMetadata">[]).map((p) => {
  const affiliateTag = "curatedpin-20";
  const affiliateLink = `https://www.amazon.com/dp/${p.asin}?tag=${affiliateTag}`;
  return {
    ...p,
    affiliateLink,
    pinterestTitle: `${p.name} - Zen Home Organization`,
    pinterestDescription: `${p.description} Click to find this item and alternatives on Amazon.`,
    pinterestMetadata: `og:product:brand=${p.designer};og:product:price:currency=USD`
  } as Product;
});

export const COLLECTIONS: Collection[] = [
  {
    id: "zen-lighting",
    name: "Zen Lighting",
    subtitle: "Collection",
    description: "Aligning ambient light with functionality to calm your focus zones.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600",
    productIds: ["minimalist-led-desk-lamp", "smart-rgb-floor-lamp"]
  },
  {
    id: "serene-office",
    name: "Serene Office",
    subtitle: "Collection",
    description: "High-grade structural essentials crafted for deep focus and clean workspaces.",
    image: "https://images.unsplash.com/photo-1632292224971-0d45778b3002?auto=format&fit=crop&q=80&w=600",
    productIds: ["wood-monitor-riser", "felt-desk-pad", "under-desk-cable-tray", "lumbar-support-pillow"]
  },
  {
    id: "mindful-home",
    name: "Mindful Home",
    subtitle: "Collection",
    description: "Decluttering landing zones with functional organic materials.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600",
    productIds: ["magnetic-key-holder", "bamboo-monitor-stand", "desk-organizer-set"]
  }
];

export const CATEGORIES = ["All", "Home", "Office", "Lighting"];

export const RECENT_SEARCHES_DEFAULT = [
  "Minimalist LED Desk Lamp",
  "Felt Desk Pad",
  "Acoustic Wall Panels",
  "Bamboo Monitor Stand"
];
