import { describe, expect, it } from "vitest";
import { filterAndSortProducts } from "./shop";
import type { Product } from "@/data/mockData";

const make = (id: string, category: string, region: string, technique: string): Product => ({
  id,
  name: `Record ${id}`,
  price: 0,
  image: `${id}.jpg`,
  artisan: "Context",
  rating: 0,
  category,
  description: "",
  region,
  material: "Test material",
  technique,
  source: { label: "Test source", url: "https://example.com" },
  imageCredit: "Test credit",
  contentStatus: "research-backed context",
});

const catalog = [
  make("1", "Textiles", "Dhaka", "Weaving"),
  make("2", "Pottery", "Rajshahi", "Shaping"),
  make("3", "Textiles", "Barisal", "Embroidery"),
  make("4", "Metalwork", "Sylhet", "Engraving"),
];

describe("filterAndSortProducts", () => {
  it("returns everything when no category is selected", () => {
    expect(filterAndSortProducts(catalog, null, "featured")).toHaveLength(4);
  });

  it("returns only records in the selected category", () => {
    expect(filterAndSortProducts(catalog, "Textiles", "featured").map((record) => record.id)).toEqual(["1", "3"]);
  });

  it("returns an empty array for a category with no records", () => {
    expect(filterAndSortProducts(catalog, "Missing", "featured")).toEqual([]);
  });

  it("sorts by region", () => {
    expect(filterAndSortProducts(catalog, null, "region").map((record) => record.id)).toEqual(["3", "1", "2", "4"]);
  });

  it("sorts by technique", () => {
    expect(filterAndSortProducts(catalog, null, "technique").map((record) => record.id)).toEqual(["3", "4", "2", "1"]);
  });

  it("does not mutate the source array order", () => {
    const before = catalog.map((record) => record.id);
    filterAndSortProducts(catalog, null, "region");
    expect(catalog.map((record) => record.id)).toEqual(before);
  });
});
