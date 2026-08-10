import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtisanCard from "@/components/ArtisanCard";
import { useCatalog } from "@/contexts/CatalogContext";
import workshopImage from "@/assets/workshop.jpg";

const Artisans = () => {
  const { artisans } = useCatalog();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="relative section-padding py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={workshopImage} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/70 to-foreground/80" />
        </div>
        <div className="relative section-container text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-xs uppercase tracking-[0.25em] text-background/70 mb-4 block"
          >
            The makers
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4"
          >
            Meet the makers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-background/80 max-w-lg mx-auto"
          >
            The craft communities and traditions behind each record — who works the
            loom and the needle, and where.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-container section-padding py-12 lg:py-16 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {artisans.map((artisan) => (
            <ArtisanCard key={artisan.id} {...artisan} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Artisans;
