import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ArtisanCard from "@/components/ArtisanCard";
import CategoryCard from "@/components/CategoryCard";
import SectionHeader from "@/components/SectionHeader";
import { useCatalog } from "@/contexts/CatalogContext";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-textile.jpg";
import workshopImage from "@/assets/workshop.jpg";
import artisan1 from "@/assets/artisan-1.jpg";

const Index = () => {
  const { products, artisans, categories } = useCatalog();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Bangladeshi handwoven textile" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="relative section-container section-padding py-24 lg:py-32">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block font-body text-xs uppercase tracking-[0.25em] text-background/70 mb-6"
            >
              Authentic Bangladeshi crafts
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-background leading-[1.1] mb-6"
            >
              Discover the Soul of{" "}
              <span className="italic font-normal">Handmade</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-body text-base lg:text-lg text-background/70 leading-relaxed mb-10 max-w-lg"
            >
              Every piece tells a story. Connect directly with Bangladesh's master artisans and bring home centuries of tradition.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/shop">
                  Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <Link to="/artisans">
                  Explore Artisans
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Artisans */}
      <section className="section-container section-padding py-20 lg:py-32">
        <SectionHeader
          subtitle="Meet the Makers"
          title="Featured Artisans"
          description="Behind every craft is a human story. Meet the skilled artisans keeping Bangladesh's traditions alive."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {artisans.map((artisan) => (
            <ArtisanCard key={artisan.id} {...artisan} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-craft-cream section-padding py-20 lg:py-32">
        <div className="section-container">
          <SectionHeader
            subtitle="Curated Collection"
            title="Featured Products"
            description="Handpicked treasures from our artisan community. Each piece is crafted with love and centuries of expertise."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/shop">
                View All Products <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-container section-padding py-20 lg:py-32">
        <SectionHeader
          subtitle="Browse by Craft"
          title="Shop Categories"
          description="Explore our curated collections organized by traditional craft types."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </section>

      {/* Research standard */}
      <section className="bg-foreground text-background overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className="relative">
            <img src={workshopImage} alt="Artisan workshop" className="w-full h-full object-cover min-h-[400px]" />
            <div className="absolute inset-0 bg-foreground/20" />
          </div>
          <div className="flex items-center p-8 lg:p-16 xl:p-24">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-body text-xs uppercase tracking-[0.25em] text-background/50 mb-6 block">
                Our impact
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-6">
                Every Purchase{" "}
                <span className="italic font-normal">Preserves a Legacy</span>
              </h2>
              <p className="font-body text-base text-background/70 leading-relaxed mb-8 max-w-lg">
                When you buy from Swadeshi, you're not just getting a product — you're supporting a family, sustaining a craft, and preserving a tradition that spans generations. Our artisans receive 70% of every sale directly.
              </p>
              <div className="flex items-center gap-6 mb-10">
                <div>
                  <span className="font-display text-3xl font-bold">200+</span>
                  <p className="font-body text-xs text-background/50 uppercase tracking-wider mt-1">Artisans</p>
                </div>
                <div className="w-px h-12 bg-background/20" />
                <div>
                  <span className="font-display text-3xl font-bold">15k+</span>
                  <p className="font-body text-xs text-background/50 uppercase tracking-wider mt-1">Products sold</p>
                </div>
                <div className="w-px h-12 bg-background/20" />
                <div>
                  <span className="font-display text-3xl font-bold">50+</span>
                  <p className="font-body text-xs text-background/50 uppercase tracking-wider mt-1">Villages</p>
                </div>
              </div>
              <Button variant="hero" size="lg" asChild>
                <Link to="/stories">
                  Read Their Stories <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending / Featured Artisan Highlight */}
      <section className="section-container section-padding py-20 lg:py-32">
        <SectionHeader
          subtitle="Research spotlight"
          title="Jamdani weaving"
          description="UNESCO describes Jamdani as a patterned cotton textile whose motifs are created directly on a handloom using discontinuous weft."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-xl overflow-hidden"
          >
            <img src={artisan1} alt="Illustrative image for Jamdani weaving" className="w-full h-[500px] object-cover rounded-xl" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <blockquote className="font-display text-2xl lg:text-3xl italic text-foreground leading-relaxed mb-8">
              "A patterned cotton textile whose motifs are created directly on the loom."
            </blockquote>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
              This prototype uses source-linked cultural context and illustrative imagery. It does not attribute this image or the record to a named individual maker.
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link to="/artisan/1">
                Explore Jamdani records <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
