import type { Product } from "@/data/mockData";

export type SortOption = "featured" | "region" | "technique";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "region", label: "Region: A to Z" },
  { value: "technique", label: "Technique: A to Z" },
];

/**
 * Pure filter + sort for the shop grid. Never mutates the input array. A null
 * category means "all". "featured" preserves the source order.
 */
export function filterAndSortProducts(
  products: Product[],
  selectedCategory: string | null,
  sortBy: SortOption,
): Product[] {
  const result = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : [...products];

  switch (sortBy) {
    case "region":
      return result.sort((a, b) => a.region.localeCompare(b.region));
    case "technique":
      return result.sort((a, b) => a.technique.localeCompare(b.technique));
    case "featured":
    default:
      return result;
  }
}
