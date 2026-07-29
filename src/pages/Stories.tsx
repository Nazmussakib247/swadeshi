import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { stories } from "@/data/stories";
import heroTextile from "@/assets/hero-textile.jpg";

const [featured, ...rest] = stories;

const SourceLink = ({ label, url }: { label: string; url: string }) =>
  url.startsWith("http") ? (
    <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-body text-xs text-muted-foreground hover:text-primary transition-colors">
      {label} <ExternalLink className="w-3 h-3" />
    </a>
  ) : (
    <span className="font-body text-xs text-muted-foreground">{label}</span>
  );

const Stories = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="relative section-padding py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroTextile} alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/70 to-foreground/80" />
        </div>
        <div className="relative section-container text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-body text-xs uppercase tracking-[0.25em] text-background/70 mb-4 block"
          >
            The Journal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4"
          >
            Stories behind the craft
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-background/80 max-w-xl mx-auto"
          >
            Short reads on how these textiles are made, where they come from, and
            why the details are worth knowing.
          </motion.p>
        </div>
      </section>

      {/* Featured story */}
      <section className="section-container section-padding py-16 lg:py-20">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
        >
          <Link to={featured.href} className="group block rounded-2xl overflow-hidden">
            <div className="image-zoom aspect-[4/3]">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
            </div>
          </Link>
          <div>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full font-body text-[11px] uppercase tracking-wider font-semibold mb-4">
              Featured · {featured.craft}
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
              <Link to={featured.href} className="hover:text-primary transition-colors">{featured.title}</Link>
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-5">{featured.excerpt}</p>
            <div className="flex items-center gap-4 font-body text-xs text-muted-foreground mb-6">
              <span>{featured.region}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featured.readTime}</span>
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <Button asChild>
                <Link to={featured.href}>Read the story <ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
              <SourceLink {...featured.source} />
            </div>
          </div>
        </motion.article>
      </section>

      {/* Story grid */}
      <section className="section-container section-padding pb-20 lg:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {rest.map((story, index) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="flex flex-col rounded-xl overflow-hidden bg-card card-hover"
            >
              <Link to={story.href} className="group block">
                <div className="image-zoom aspect-[3/2]">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </Link>
              <div className="flex flex-col flex-1 p-6">
                <span className="font-body text-[11px] uppercase tracking-wider text-primary font-semibold mb-3">{story.craft}</span>
                <h3 className="font-display text-xl font-bold text-card-foreground mb-3 leading-snug">
                  <Link to={story.href} className="hover:text-primary transition-colors">{story.title}</Link>
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{story.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-body text-xs text-muted-foreground"><Clock className="w-3.5 h-3.5" /> {story.readTime}</span>
                  <Link to={story.href} className="inline-flex items-center gap-1 font-body text-sm font-medium text-primary hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-craft-cream section-padding py-16 lg:py-24">
        <div className="section-container text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">See the craft for yourself</h2>
          <p className="font-body text-muted-foreground mb-8">
            Every story connects to real records — with the region, material, and technique behind each piece.
          </p>
          <Button variant="default" size="lg" asChild>
            <Link to="/shop">Explore the shop <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stories;
