import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { api } from "@/lib/api";
import { assetForKey, assetForCategory } from "@/lib/assets";
import type { Product, Artisan, Category } from "@/data/mockData";
import * as fallback from "@/data/mockData";

interface ApiProduct {
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

interface ApiArtisan {
  id: string;
  name: string;
  photoKey: string;
  location: string;
  craft: string;
  story: string;
  source: { label: string; url: string };
  imageCredit: string;
  contentStatus: Artisan["contentStatus"];
}

interface ApiCategory {
  name: string;
  count: number;
}

interface CatalogContextType {
  products: Product[];
  artisans: Artisan[];
  categories: Category[];
  productCategories: string[];
  loading: boolean;
  offline: boolean;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

function toProduct(p: ApiProduct): Product {
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

function toArtisan(a: ApiArtisan, products: Product[]): Artisan {
  return {
    id: a.id,
    name: a.name,
    photo: assetForKey(a.photoKey),
    location: a.location,
    craft: a.craft,
    story: a.story,
    products: products.filter((p) => p.artisan === a.name).map((p) => p.id),
    source: a.source,
    imageCredit: a.imageCredit,
    contentStatus: a.contentStatus,
  };
}

export const CatalogProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<Omit<CatalogContextType, "loading">>({
    products: [],
    artisans: [],
    categories: [],
    productCategories: [],
    offline: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [apiProducts, apiArtisans, apiCategories] = await Promise.all([
          api.get<ApiProduct[]>("/products"),
          api.get<ApiArtisan[]>("/artisans"),
          api.get<ApiCategory[]>("/categories"),
        ]);
        if (cancelled) return;
        const products = apiProducts.map(toProduct);
        const artisans = apiArtisans.map((a) => toArtisan(a, products));
        const categories: Category[] = apiCategories.map((c) => ({
          name: c.name,
          image: assetForCategory(c.name),
          count: c.count,
        }));
        setState({
          products,
          artisans,
          categories,
          productCategories: categories.map((c) => c.name),
          offline: false,
        });
      } catch {
        // Server unreachable: fall back to the bundled sample records so the
        // site still renders, and flag that it is running offline.
        if (cancelled) return;
        setState({
          products: fallback.products,
          artisans: fallback.artisans,
          categories: fallback.categories,
          productCategories: fallback.productCategories,
          offline: true,
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <CatalogContext.Provider value={{ ...state, loading }}>
      {children}
    </CatalogContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCatalog = (): CatalogContextType => {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used within a CatalogProvider");
  return ctx;
};
