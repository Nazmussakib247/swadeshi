import { describe, it, expect } from "vitest";
import { products, artisans, categories, productCategories } from "./mockData";

/**
 * Data-integrity tests. The UI relies on these cross-references (product ->
 * artisan by name, artisan -> product by id, category filters by name), and a
 * broken reference used to silently show the wrong artisan. These tests make
 * that class of bug fail loudly instead.
 */
describe("mock data integrity", () => {
  it("every product's artisan exists", () => {
    const names = new Set(artisans.map((a) => a.name));
    for (const p of products) {
      expect(names, `product ${p.id} references unknown artisan`).toContain(p.artisan);
    }
  });

  it("every artisan's product ids exist", () => {
    const ids = new Set(products.map((p) => p.id));
    for (const a of artisans) {
      for (const pid of a.products) {
        expect(ids, `artisan ${a.id} references unknown product`).toContain(pid);
      }
    }
  });

  it("product ids are unique", () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
  });

  it("category counts equal the real number of products in that category", () => {
    for (const c of categories) {
      expect(c.count).toBe(products.filter((p) => p.category === c.name).length);
    }
  });

  it("every product category has a filter entry", () => {
    for (const p of products) {
      expect(productCategories).toContain(p.category);
    }
  });

  it("every editorial record has a traceable research source and image-status note", () => {
    for (const record of [...products, ...artisans]) {
      expect(record.source.url).toMatch(/^https:\/\//);
      expect(record.source.label).not.toHaveLength(0);
      expect(record.imageCredit).toContain("Illustrative");
    }
  });
});
