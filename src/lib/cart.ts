export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  artisan: string;
  quantity: number;
}

export type NewCartItem = Omit<CartItem, "quantity">;

/**
 * Pure cart operations. Kept free of React so they can be unit-tested directly
 * and reasoned about in isolation. Every function returns a new array and never
 * mutates its input.
 */

export function addItem(items: CartItem[], item: NewCartItem): CartItem[] {
  const existing = items.find((i) => i.id === item.id);
  if (existing) {
    return items.map((i) =>
      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
    );
  }
  return [...items, { ...item, quantity: 1 }];
}

export function removeItem(items: CartItem[], id: string): CartItem[] {
  return items.filter((i) => i.id !== id);
}

export function updateQuantity(
  items: CartItem[],
  id: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) {
    return items.filter((i) => i.id !== id);
  }
  return items.map((i) => (i.id === id ? { ...i, quantity } : i));
}

export function totalItems(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function totalPrice(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

/**
 * Parse a raw localStorage value into a valid cart. Tolerates null, corrupt
 * JSON, wrong top-level types, and malformed entries (which are dropped).
 * Never throws.
 */
export function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(
    (i): i is CartItem =>
      !!i &&
      typeof i === "object" &&
      typeof (i as CartItem).id === "string" &&
      typeof (i as CartItem).name === "string" &&
      typeof (i as CartItem).image === "string" &&
      typeof (i as CartItem).artisan === "string" &&
      typeof (i as CartItem).price === "number" &&
      Number.isFinite((i as CartItem).price) &&
      typeof (i as CartItem).quantity === "number" &&
      Number.isInteger((i as CartItem).quantity) &&
      (i as CartItem).quantity > 0,
  );
}
