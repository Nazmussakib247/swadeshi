import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ExternalLink, Heart, MapPin, Palette, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { useCatalog } from "@/contexts/CatalogContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCollection } from "@/contexts/CollectionContext";
import { useCart } from "@/contexts/CartContext";
import NotFound from "./NotFound";

const PageLoading = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <div className="flex justify-center py-40">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" role="status" aria-label="Loading record" />
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, artisans, loading } = useCatalog();
  const { user } = useAuth();
  const { isSaved, toggle } = useCollection();
  const { addItem, setIsCartOpen } = useCart();
  const [busy, setBusy] = useState(false);

  if (loading) return <PageLoading />;

  const product = products.find((entry) => entry.id === id);
  if (!product) return <NotFound />;

  const craftContext = artisans.find((entry) => entry.name === product.artisan);
  const relatedProducts = products
    .filter((entry) => entry.id !== product.id)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 3);

  const saved = isSaved(product.id);

  const onSave = async () => {
    if (!user) {
      toast.info("Log in to save records to your collection.");
      navigate("/login");
      return;
    }
    setBusy(true);
    try {
      await toggle(product.id);
      toast.success(saved ? "Removed from your collection." : "Saved to your collection.");
    } catch {
      toast.error("Couldn't update your collection. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const onAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      artisan: product.artisan,
    });
    setIsCartOpen(true);
  };

  const metadata = [
    { icon: MapPin, label: "Region", value: product.region },
    { icon: Palette, label: "Material", value: product.material },
    { icon: BookOpen, label: "Technique", value: product.technique },
    { icon: BookOpen, label: "Record status", value: product.contentStatus },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="section-container section-padding py-8">
        <nav aria-label="Breadcrumb" className="mb-8 font-body text-sm text-muted-foreground">
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span className="mx-2 opacity-50">/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground transition-colors">{product.category}</Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="rounded-xl overflow-hidden bg-craft-cream">
            <img src={product.image} alt={`Illustrative image for ${product.name}`} className="w-full aspect-square object-cover" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col justify-center">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">{product.category}</span>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">{product.description}</p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border">
              {metadata.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <Icon className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                  <div>
                    <dt className="font-body text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
                    <dd className="font-body text-sm text-foreground mt-1">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button size="lg" onClick={onAddToCart}>
                <ShoppingBag className="w-4 h-4 mr-2" /> Add to cart
              </Button>
              <Button size="lg" variant="outline" onClick={onSave} disabled={busy} aria-pressed={saved}>
                <Heart className={`w-4 h-4 mr-2 ${saved ? "fill-primary text-primary" : ""}`} />
                {saved ? "Saved" : "Save to collection"}
              </Button>
            </div>
            <p className="font-body text-xs text-muted-foreground mt-6">Image: {product.imageCredit}</p>
          </motion.div>
        </div>

        <section className="mt-20 lg:mt-32 bg-craft-cream rounded-2xl p-8 lg:p-12">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2 block">Research source</span>
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Context, not a product claim</h2>
          <p className="font-body text-muted-foreground leading-relaxed max-w-2xl mb-4">The cultural background for this record comes from the source below. It does not verify the individual item pictured or establish a commercial relationship with a maker.</p>
          <a href={product.source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-body text-sm text-primary hover:underline">
            {product.source.label} <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>

        {craftContext && (
          <section className="mt-12 bg-card rounded-2xl p-8 lg:p-12">
            <span className="font-body text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-2 block">Craft context</span>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">{craftContext.name}</h2>
            <p className="font-body text-sm text-muted-foreground mb-4">{craftContext.craft} · {craftContext.location}</p>
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-3xl">{craftContext.story}</p>
          </section>
        )}

        <section className="mt-20 lg:mt-32 pb-20">
          <SectionHeader subtitle="Continue exploring" title="Related craft records" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {relatedProducts.map((entry) => <ProductCard key={entry.id} {...entry} />)}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
