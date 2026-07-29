import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/contexts/CatalogContext";
import { filterAndSortProducts, SORT_OPTIONS, type SortOption } from "@/lib/shop";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import categoryTextiles from "@/assets/category-textiles.jpg";

const Shop = () => {
  const { products, productCategories, loading } = useCatalog();
  // The selected category lives in the URL (?category=...) so category cards
  // can deep-link into a filtered shop and the filter survives reload/share.
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCategory = searchParams.get("category");
  const selectedCategory =
    rawCategory && productCategories.includes(rawCategory) ? rawCategory : null;
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();

  const setSelectedCategory = (category: string | null) => {
    setSearchParams(category ? { category } : {}, { replace: true });
  };

  const filtered = useMemo(() => {
    const base = filterAndSortProducts(products, selectedCategory, sortBy);
    if (!query) return base;
    return base.filter((p) =>
      [p.name, p.region, p.material, p.technique, p.category]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [products, selectedCategory, sortBy, query]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="relative section-padding py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={categoryTextiles} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/70 to-foreground/80" />
        </div>
        <div className="relative section-container text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-xs uppercase tracking-[0.25em] text-background/70 mb-4 block"
          >
            Editorial craft index
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4"
          >
            Explore craft records
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-background/80 max-w-lg mx-auto"
          >
            Browse source-linked context by craft practice. Images are illustrative unless credited otherwise.
          </motion.p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="section-container section-padding py-12 lg:py-16">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground mr-1" />
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-body text-sm transition-all ${
                !selectedCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              All
            </button>
            {productCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                className={`px-4 py-2 rounded-full font-body text-sm transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-body text-sm text-muted-foreground">{filtered.length} records</span>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[180px] font-body text-sm" aria-label="Sort products">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active filter tag */}
        {selectedCategory && (
          <div className="mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full font-body text-xs"
            >
              {selectedCategory}
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" role="status" aria-label="Loading records" />
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filtered.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-display text-xl text-muted-foreground mb-2">No records found</p>
                <p className="font-body text-sm text-muted-foreground/70">Try adjusting your filters</p>
                <Button variant="outline" className="mt-4" onClick={() => setSelectedCategory(null)}>
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
