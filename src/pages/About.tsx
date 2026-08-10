import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Hand, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/product-2.jpg";
import workshopImage from "@/assets/workshop.jpg";

const values = [
  {
    icon: MapPin,
    title: "Place at the centre",
    description:
      "Region, material, and technique come first — the details that tell you what a craft actually is.",
  },
  {
    icon: Hand,
    title: "Made by hand",
    description:
      "Every craft here is worked by hand on a loom or with a needle, in traditions passed down through generations.",
  },
  {
    icon: BookOpen,
    title: "Sourced, not assumed",
    description:
      "Cultural background is linked to references such as UNESCO and Banglapedia, and illustrative images are marked as such.",
  },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* Hero */}
    <section className="relative h-[50vh] min-h-[380px]">
      <img src={heroImage} alt="" aria-hidden="true" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
      <div className="absolute inset-0 flex items-center">
        <div className="section-container section-padding">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-body text-xs uppercase tracking-[0.25em] text-background/70 mb-4 block">
            Our story
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-background max-w-2xl leading-tight">
            A field guide to Bangladeshi craft
          </motion.h1>
        </div>
      </div>
    </section>

    {/* Intro */}
    <section className="section-container section-padding py-16 lg:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <span className="font-body text-xs uppercase tracking-[0.25em] text-primary font-semibold mb-4 block">What we do</span>
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">Craft you can understand, not just buy</h2>
        <p className="font-body text-lg text-muted-foreground leading-relaxed">
          Swadeshi brings together three of Bangladesh's living textile traditions —
          Jamdani, Shital Pati, and Kantha — and puts the story of each object up
          front: where it comes from, what it is made of, and how it is made. The aim
          is simple: help you understand a craft before you decide to explore, save, or
          share it.
        </p>
      </div>
    </section>

    {/* Values */}
    <section className="section-container section-padding pb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map(({ icon: Icon, title, description }) => (
          <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-card rounded-2xl p-8 card-hover text-center">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mx-auto mb-5">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold text-card-foreground mb-3">{title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Image + text */}
    <section className="section-container section-padding py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="rounded-2xl overflow-hidden">
          <img src={workshopImage} alt="A craft workshop" className="w-full h-[420px] object-cover" loading="lazy" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-5">Depth over catalogue size</h2>
          <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
            Rather than a sprawling grid of anonymous products, Swadeshi keeps a small,
            carefully explained set of craft records. Each one is treated as a document:
            a picture, a place, a material, a technique, and a link to where the context
            comes from.
          </p>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            It is a portfolio project, and it is honest about that — illustrative images
            are labelled, and nothing claims to be more than it is.
          </p>
        </motion.div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-craft-cream section-padding py-16 lg:py-24">
      <div className="section-container text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">Start exploring</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button variant="default" size="lg" asChild>
            <Link to="/shop">Explore the shop <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/artisans">Meet the makers</Link>
          </Button>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
