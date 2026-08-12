// Editorial articles about the crafts. Grounded in the same source-linked
// context as the catalog, written as short magazine pieces. This is static
// editorial content, distinct from the maker directory on /artisans.
import story1 from "@/assets/product-1.jpg";
import story2 from "@/assets/product-3.jpg";
import story3 from "@/assets/product-5.jpg";
import story4 from "@/assets/workshop.jpg";
import story5 from "@/assets/category-pottery.jpg";

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  craft: string;
  region: string;
  readTime: string;
  image: string;
  href: string;
  source: { label: string; url: string };
}

export const stories: Story[] = [
  {
    id: "jamdani-on-the-loom",
    title: "Woven on the loom, not printed on it",
    excerpt:
      "Jamdani's fine patterns are built into the cloth as it is woven, thread by thread, using a supplementary weft added entirely by hand. There is no stencil and no print — the motif and the fabric are made at the same moment.",
    craft: "Jamdani weaving",
    region: "Dhaka region",
    readTime: "3 min read",
    image: story1,
    href: "/shop?category=Jamdani%20weaving",
    source: {
      label: "UNESCO — Traditional art of Jamdani weaving",
      url: "https://ich.unesco.org/en/RL/traditional-art-of-jamdani-weaving-00879",
    },
  },
  {
    id: "shital-pati-that-stays-cool",
    title: "A mat woven to stay cool",
    excerpt:
      "Shital Pati is made from thin strips of murta cane, split and smoothed by hand, then woven into a mat prized for staying cool to the touch. The skill passes largely within families in the low-lying villages of greater Sylhet.",
    craft: "Shital Pati weaving",
    region: "Greater Sylhet",
    readTime: "3 min read",
    image: story2,
    href: "/shop?category=Shital%20Pati%20weaving",
    source: {
      label: "UNESCO — Shital Pati weaving of Sylhet",
      url: "https://ich.unesco.org/en/RL/traditional-art-of-shital-pati-weaving-of-sylhet-01112",
    },
  },
  {
    id: "nakshi-kantha-layered-cloth",
    title: "Stitched from layered cloth",
    excerpt:
      "Nakshi Kantha begins with worn cloth layered together and worked with a simple running stitch. From that humble base come quilts whose motifs carry everyday scenes — a craft that has ranged from utilitarian bedding to treasured heirlooms.",
    craft: "Kantha embroidery",
    region: "Bangladesh",
    readTime: "4 min read",
    image: story3,
    href: "/shop?category=Kantha%20embroidery",
    source: {
      label: "Banglapedia — Nakshi Kantha",
      url: "https://en.banglapedia.org/index.php?title=Nakshi_Kantha",
    },
  },
  {
    id: "rhythm-of-the-handloom",
    title: "The rhythm of the handloom",
    excerpt:
      "Behind each textile is a loom worked by hand and a skill transmitted between generations. Understanding that process — the pace, the tools, the training — is part of understanding the object itself.",
    craft: "Handloom weaving",
    region: "Bangladesh",
    readTime: "2 min read",
    image: story4,
    href: "/artisans",
    source: {
      label: "UNESCO — Traditional art of Jamdani weaving",
      url: "https://ich.unesco.org/en/RL/traditional-art-of-jamdani-weaving-00879",
    },
  },
  {
    id: "what-a-craft-record-shows",
    title: "What a craft record shows",
    excerpt:
      "Every entry on Swadeshi names its region, material, and technique, and links the cultural background to a source. It is a small habit with a big payoff: you can see why an object matters before you decide to explore it.",
    craft: "Method",
    region: "Swadeshi",
    readTime: "2 min read",
    image: story5,
    href: "/about",
    source: {
      label: "About Swadeshi",
      url: "/about",
    },
  },
];
