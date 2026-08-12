import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { api } from "@/lib/api";
import { assetForKey } from "@/lib/assets";
import { useAuth } from "@/contexts/AuthContext";
import type { Product } from "@/data/mockData";

interface ApiCollectionProduct {
  id: string;
  name: string;
  price: number;
  imageKey: string;
  artisan: string;
  category: string;
  region: string;
  material: string;
  technique: string;
  description: string;
  source: { label: string; url: string };
  imageCredit: string;
  contentStatus: Product["contentStatus"];
}

interface CollectionContextType {
  savedIds: Set<string>;
  savedProducts: Product[];
  isSaved: (id: string) => boolean;
  toggle: (id: string) => Promise<void>;
  canSave: boolean;
}

const CollectionContext = createContext<CollectionContextType | undefined>(
  undefined,
);

function toProduct(p: ApiCollectionProduct): Product {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    image: assetForKey(p.imageKey),
    artisan: p.artisan,
    rating: 0,
    category: p.category,
    description: p.description,
    region: p.region,
    material: p.material,
    technique: p.technique,
    source: p.source,
    imageCredit: p.imageCredit,
    contentStatus: p.contentStatus,
  };
}

export const CollectionProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [savedProducts, setSavedProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;
    if (!user) {
      setSavedProducts([]);
      return;
    }
    (async () => {
      try {
        const rows = await api.get<ApiCollectionProduct[]>("/collection");
        if (!cancelled) setSavedProducts(rows.map(toProduct));
      } catch {
        if (!cancelled) setSavedProducts([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  const savedIds = new Set(savedProducts.map((p) => p.id));

  const isSaved = useCallback(
    (id: string) => savedProducts.some((p) => p.id === id),
    [savedProducts],
  );

  const toggle = useCallback(
    async (id: string) => {
      if (isSaved(id)) {
        await api.del(`/collection/${id}`);
        setSavedProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        await api.post("/collection", { productId: id });
        const product = await api.get<ApiCollectionProduct>(`/products/${id}`);
        setSavedProducts((prev) => [toProduct(product), ...prev]);
      }
    },
    [isSaved],
  );

  return (
    <CollectionContext.Provider
      value={{ savedIds, savedProducts, isSaved, toggle, canSave: !!user }}
    >
      {children}
    </CollectionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCollection = (): CollectionContextType => {
  const ctx = useContext(CollectionContext);
  if (!ctx) throw new Error("useCollection must be used within a CollectionProvider");
  return ctx;
};
