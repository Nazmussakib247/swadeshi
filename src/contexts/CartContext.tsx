import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
  useCallback,
} from "react";
import { toast } from "sonner";
import * as cart from "@/lib/cart";
import { parseStoredCart } from "@/lib/cart";
import type { CartItem, NewCartItem } from "@/lib/cart";

export type { CartItem } from "@/lib/cart";

interface CartContextType {
  items: CartItem[];
  addItem: (item: NewCartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "swadeshi.cart.v1";

/**
 * Read the persisted cart. Returns [] on any failure (unavailable storage,
 * corrupt JSON, unexpected shape) rather than throwing, so a bad value can
 * never brick the app on load.
 */
function loadPersistedCart(): CartItem[] {
  try {
    return parseStoredCart(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadPersistedCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Only warn about a storage failure once per session, and never on the
  // initial mount (we don't want a toast just for hydrating an empty cart).
  const hasWarned = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      if (!hasWarned.current) {
        hasWarned.current = true;
        console.error("Failed to persist cart to localStorage:", err);
        toast.error(
          "Couldn't save your cart on this device — it may not survive a reload.",
        );
      }
    }
  }, [items]);

  const addItem = useCallback((item: NewCartItem) => {
    setItems((prev) => cart.addItem(prev, item));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => cart.removeItem(prev, id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) => cart.updateQuantity(prev, id, quantity));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems: cart.totalItems(items),
        totalPrice: cart.totalPrice(items),
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components -- context hook lives with its provider by convention
export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};
