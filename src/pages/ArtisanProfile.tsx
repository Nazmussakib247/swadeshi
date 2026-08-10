import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/contexts/CatalogContext";
import workshopImage from "@/assets/workshop.jpg";
import NotFound from "./NotFound";

const ArtisanProfile = () => {
  const { id } = useParams();
  const { products, artisans, loading } = useCatalog();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center py-40">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" role="status" aria-label="Loading context" />
        </div>
      </div>
    );
  }

  const artisan = artisans.find((a) => a.id === id);
  if (!artisan) {
    return <NotFound />;
  }

  const artisanProducts = products.filter((p) => artisan.products.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img src={workshopImage} alt="Workshop" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
      </section>

      <div className="section-container section-padding -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
          {/* Profile Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-2xl p-6 card-hover text-center lg:text-left">
              <img
                src={artisan.photo}
                alt={`Illustrative image for ${artisan.name}`}
                className="w-32 h-32 rounded-xl object-cover mx-auto lg:mx-0 mb-4"
              />
              <h1 className="font-display text-2xl font-bold text-card-foreground mb-2">{artisan.name}</h1>
              <span className="inline-block px-3 py-1 bg-accent rounded-full font-body text-xs uppercase tracking-wider font-medium text-accent-foreground mb-3">
                {artisan.craft}
              </span>
              <div className="space-y-2 text-sm text-muted-foreground font-body">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <MapPin className="w-4 h-4" /> {artisan.location}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-2xl p-8 lg:p-10 card-hover mb-12">
              <span className="font-body text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4 block">
                Research context
              </span>
              <p className="font-body text-lg text-card-foreground leading-relaxed">
                {artisan.story}
              </p>
              <p className="font-body text-xs text-muted-foreground mt-5">Image: {artisan.imageCredit}</p>
              <a href={artisan.source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-body text-sm text-primary hover:underline mt-4">
                {artisan.source.label} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Products */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">Related craft records</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {artisanProducts.map((p) => (
                  <ProductCard key={p.id} {...p} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-20" />
      <Footer />
    </div>
  );
};

export default ArtisanProfile;
