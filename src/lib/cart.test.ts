import { describe, it, expect } from "vitest";
import {
  addItem,
  parseStoredCart,
  removeItem,
  updateQuantity,
  totalItems,
  totalPrice,
  type CartItem,
  type NewCartItem,
} from "./cart";

const scarf: NewCartItem = {
  id: "1",
  name: "Handwoven Silk Scarf",
  price: 3500,
  image: "scarf.jpg",
  artisan: "Fatima Begum",
};

const vase: NewCartItem = {
  id: "2",
  name: "Terracotta Vase Set",
  price: 2200,
  image: "vase.jpg",
  artisan: "Kamal Mistry",
};

describe("addItem", () => {
  it("adds a new item with quantity 1", () => {
    const result = addItem([], scarf);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ id: "1", quantity: 1 });
  });

  it("increments quantity when the item already exists", () => {
    const result = addItem([{ ...scarf, quantity: 1 }], scarf);
    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
  });

  it("keeps distinct items separate", () => {
    const result = addItem(addItem([], scarf), vase);
    expect(result.map((i) => i.id)).toEqual(["1", "2"]);
  });

  it("does not mutate the input array", () => {
    const input: CartItem[] = [{ ...scarf, quantity: 1 }];
    const snapshot = structuredClone(input);
    addItem(input, vase);
    expect(input).toEqual(snapshot);
  });
});

describe("removeItem", () => {
  it("removes the matching item", () => {
    const items: CartItem[] = [
      { ...scarf, quantity: 1 },
      { ...vase, quantity: 3 },
    ];
    const result = removeItem(items, "1");
    expect(result.map((i) => i.id)).toEqual(["2"]);
  });

  it("is a no-op for an unknown id", () => {
    const items: CartItem[] = [{ ...scarf, quantity: 1 }];
    expect(removeItem(items, "999")).toHaveLength(1);
  });
});

describe("updateQuantity", () => {
  it("sets a new quantity", () => {
    const items: CartItem[] = [{ ...scarf, quantity: 1 }];
    expect(updateQuantity(items, "1", 5)[0].quantity).toBe(5);
  });

  it("removes the item when quantity drops to 0", () => {
    const items: CartItem[] = [{ ...scarf, quantity: 2 }];
    expect(updateQuantity(items, "1", 0)).toHaveLength(0);
  });

  it("removes the item for negative quantities", () => {
    const items: CartItem[] = [{ ...scarf, quantity: 2 }];
    expect(updateQuantity(items, "1", -3)).toHaveLength(0);
  });

  it("does not mutate the input array", () => {
    const input: CartItem[] = [{ ...scarf, quantity: 1 }];
    const snapshot = structuredClone(input);
    updateQuantity(input, "1", 9);
    expect(input).toEqual(snapshot);
  });
});

describe("totals", () => {
  const items: CartItem[] = [
    { ...scarf, quantity: 2 }, // 3500 * 2 = 7000
    { ...vase, quantity: 3 }, // 2200 * 3 = 6600
  ];

  it("sums quantities", () => {
    expect(totalItems(items)).toBe(5);
  });

  it("sums price * quantity", () => {
    expect(totalPrice(items)).toBe(13600);
  });

  it("returns 0 for an empty cart", () => {
    expect(totalItems([])).toBe(0);
    expect(totalPrice([])).toBe(0);
  });

  it("keeps totalItems consistent after a round-trip of add then remove", () => {
    const afterAdd = addItem([], scarf);
    const afterRemove = removeItem(afterAdd, "1");
    expect(totalItems(afterRemove)).toBe(0);
  });
});

describe("parseStoredCart", () => {
  const valid = { ...scarf, quantity: 2 };

  it("returns [] for null (nothing stored)", () => {
    expect(parseStoredCart(null)).toEqual([]);
  });

  it("returns [] for corrupt JSON", () => {
    expect(parseStoredCart("{not json")).toEqual([]);
  });

  it("returns [] when the top level is not an array", () => {
    expect(parseStoredCart(JSON.stringify({ items: [valid] }))).toEqual([]);
  });

  it("round-trips a valid cart", () => {
    expect(parseStoredCart(JSON.stringify([valid]))).toEqual([valid]);
  });

  it("drops malformed entries but keeps valid ones", () => {
    const stored = JSON.stringify([
      valid,
      null,
      42,
      { id: 7, name: "bad id type", price: 1, image: "", artisan: "", quantity: 1 },
      { ...valid, price: "3500" }, // price must be a number
      { ...valid, quantity: 0 }, // zero quantity is not a cart line
      { ...valid, quantity: 1.5 }, // quantities are integers
    ]);
    expect(parseStoredCart(stored)).toEqual([valid]);
  });

  it("never throws on hostile input", () => {
    for (const raw of ["", "null", "true", '"str"', "[{}]", "[[]]"]) {
      expect(() => parseStoredCart(raw)).not.toThrow();
    }
  });
});
