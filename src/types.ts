export interface ColorSwatch {
  name: string;
  value: string; // hex color for background bubble
  images: string[]; // gallery images for this specific color swatch
}

export interface Product {
  id: string;
  asin: string; // ASIN primary key
  name: string; // Title
  designer: string;
  price: number;
  category: string;
  description: string;
  longDescription?: string;
  imageUrl?: string; // local or CDN image URL fallback
  affiliateLink: string; //raw Amazon Affiliate Link
  colorSwatches: ColorSwatch[];
  specifications?: string[];
  isNewArrival?: boolean;
  pinterestTitle?: string; // optimized title for Pinterest
  pinterestDescription?: string; // optimized description for Pinterest
  pinterestMetadata?: string; // dynamic og:product tags / keywords
}

export interface Collection {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  productIds: string[];
}

export interface SearchHistoryItem {
  id: string;
  query: string;
}
