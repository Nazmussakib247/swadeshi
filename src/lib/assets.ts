// Maps the API's image/photo keys (and category names) to bundled image assets,
// so pictures stay part of the built frontend rather than being served by the API.
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import artisan1 from "@/assets/artisan-1.jpg";
import artisan2 from "@/assets/artisan-2.jpg";
import artisan3 from "@/assets/artisan-3.jpg";
import categoryTextiles from "@/assets/category-textiles.jpg";
import categoryPottery from "@/assets/category-pottery.jpg";
import categoryJute from "@/assets/category-jute.jpg";

const imageByKey: Record<string, string> = {
  "product-1": product1,
  "product-2": product2,
  "product-3": product3,
  "product-4": product4,
  "product-5": product5,
  "product-6": product6,
  "artisan-1": artisan1,
  "artisan-2": artisan2,
  "artisan-3": artisan3,
};

const imageByCategory: Record<string, string> = {
  "Jamdani weaving": categoryTextiles,
  "Shital Pati weaving": categoryJute,
  "Kantha embroidery": categoryPottery,
};

const FALLBACK = product1;

export function assetForKey(key: string): string {
  return imageByKey[key] ?? FALLBACK;
}

export function assetForCategory(name: string): string {
  return imageByCategory[name] ?? FALLBACK;
}
