import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import artisan1 from "@/assets/artisan-1.jpg";
import artisan2 from "@/assets/artisan-2.jpg";
import artisan3 from "@/assets/artisan-3.jpg";
import categoryTextiles from "@/assets/category-textiles.jpg";
import categoryPottery from "@/assets/category-pottery.jpg";
import categoryJute from "@/assets/category-jute.jpg";

export interface ResearchSource {
  label: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  /** Retained temporarily for the legacy demo cart; not presented as a live price. */
  price: number;
  image: string;
  artisan: string;
  /** Retained temporarily for the legacy demo cart; not presented as a review score. */
  rating: number;
  category: string;
  description: string;
  region: string;
  material: string;
  technique: string;
  source: ResearchSource;
  imageCredit: string;
  contentStatus: "research-backed context" | "illustrative image";
}

export interface Artisan {
  id: string;
  name: string;
  photo: string;
  location: string;
  craft: string;
  story: string;
  products: string[];
  source: ResearchSource;
  imageCredit: string;
  contentStatus: "research-backed context" | "illustrative image";
}

export interface Category {
  name: string;
  image: string;
  count: number;
}

const jamdaniSource: ResearchSource = {
  label: "UNESCO — Traditional art of Jamdani weaving",
  url: "https://ich.unesco.org/en/RL/traditional-art-of-jamdani-weaving-00879",
};

const shitalPatiSource: ResearchSource = {
  label: "UNESCO — Traditional art of Shital Pati weaving of Sylhet",
  url: "https://ich.unesco.org/en/RL/traditional-art-of-shital-pati-weaving-of-sylhet-01112",
};

const nakshiKanthaSource: ResearchSource = {
  label: "Banglapedia — Nakshi Kantha",
  url: "https://en.banglapedia.org/index.php?title=Nakshi_Kantha",
};

const nakshiPatiSource: ResearchSource = {
  label: "Banglapedia — Nakshi Pati",
  url: "https://en.banglapedia.org/index.php/Nakshi_Pati",
};

const repositoryImageCredit =
  "Illustrative repository asset — original source and licence require verification.";

/**
 * Editorial prototype records. The cultural context is source-linked; images
 * and object-specific details are explicitly illustrative rather than claims
 * about inventory or an identified maker.
 */
export const products: Product[] = [
  {
    id: "1",
    name: "Jamdani textile study",
    price: 3500,
    image: product1,
    artisan: "Jamdani weaving communities",
    rating: 4.8,
    category: "Jamdani weaving",
    region: "Dhaka region",
    material: "Fine cotton",
    technique: "Discontinuous-weft handloom weaving",
    description: "A study record for Jamdani, a patterned cotton textile whose motifs are woven directly on the loom. This image represents the subject; it is not a listing for a specific object.",
    source: jamdaniSource,
    imageCredit: repositoryImageCredit,
    contentStatus: "research-backed context",
  },
  {
    id: "2",
    name: "Jamdani motif study",
    price: 2200,
    image: product2,
    artisan: "Jamdani weaving communities",
    rating: 4.9,
    category: "Jamdani weaving",
    region: "Dhaka region",
    material: "Fine cotton",
    technique: "Motif insertion on a handloom",
    description: "Jamdani's elaborate motifs are formed directly at the loom. This editorial record links to background research rather than claiming a specific workshop or maker.",
    source: jamdaniSource,
    imageCredit: repositoryImageCredit,
    contentStatus: "research-backed context",
  },
  {
    id: "3",
    name: "Shital Pati utility study",
    price: 1800,
    image: product3,
    artisan: "Shital Pati weaving communities",
    rating: 4.7,
    category: "Shital Pati weaving",
    region: "Greater Sylhet",
    material: "Murta cane",
    technique: "Split-strip mat weaving",
    description: "A study record for Shital Pati, a handwoven mat made from strips of Murta. The form is used as a sitting mat, bedspread, or prayer mat.",
    source: shitalPatiSource,
    imageCredit: repositoryImageCredit,
    contentStatus: "research-backed context",
  },
  {
    id: "4",
    name: "Nakshi Pati pattern study",
    price: 4500,
    image: product4,
    artisan: "Shital Pati weaving communities",
    rating: 5,
    category: "Shital Pati weaving",
    region: "Sylhet and Noakhali",
    material: "Murta strips",
    technique: "Patterned mat weaving",
    description: "Nakshi Pati refers to decorative mat weaving. This record focuses on the pattern language and material process, not a commercial product claim.",
    source: nakshiPatiSource,
    imageCredit: repositoryImageCredit,
    contentStatus: "research-backed context",
  },
  {
    id: "5",
    name: "Nakshi Kantha textile study",
    price: 5800,
    image: product5,
    artisan: "Kantha embroidery traditions",
    rating: 4.9,
    category: "Kantha embroidery",
    region: "Bangladesh",
    material: "Layered cloth and thread",
    technique: "Running-stitch embroidery",
    description: "A study record for Nakshi Kantha, an embroidered quilt traditionally assembled from layered cloth and worked with running stitch.",
    source: nakshiKanthaSource,
    imageCredit: repositoryImageCredit,
    contentStatus: "research-backed context",
  },
  {
    id: "6",
    name: "Kantha motif study",
    price: 2800,
    image: product6,
    artisan: "Kantha embroidery traditions",
    rating: 4.6,
    category: "Kantha embroidery",
    region: "Bangladesh",
    material: "Repurposed cloth and thread",
    technique: "Layered quilting and embroidery",
    description: "Kantha has ranged from utilitarian quilting to richly embroidered heirloom work. This record is an editorial entry, not an attributed object listing.",
    source: nakshiKanthaSource,
    imageCredit: repositoryImageCredit,
    contentStatus: "research-backed context",
  },
];

export const artisans: Artisan[] = [
  {
    id: "1",
    name: "Jamdani weaving communities",
    photo: artisan1,
    location: "Dhaka region",
    craft: "Handloom weaving",
    story: "UNESCO describes Jamdani as a fine patterned cotton textile, traditionally woven on handlooms by craftspeople and apprentices around Dhaka. Its motifs are created directly on the loom using discontinuous weft.",
    products: ["1", "2"],
    source: jamdaniSource,
    imageCredit: repositoryImageCredit,
    contentStatus: "research-backed context",
  },
  {
    id: "2",
    name: "Shital Pati weaving communities",
    photo: artisan2,
    location: "Greater Sylhet",
    craft: "Murta mat weaving",
    story: "Shital Pati is made by weaving strips of Murta. UNESCO notes that the practice is principally transmitted within families, with communities centred largely in the low-lying villages of the greater Sylhet region.",
    products: ["3", "4"],
    source: shitalPatiSource,
    imageCredit: repositoryImageCredit,
    contentStatus: "research-backed context",
  },
  {
    id: "3",
    name: "Kantha embroidery traditions",
    photo: artisan3,
    location: "Bangladesh",
    craft: "Textile embroidery",
    story: "Nakshi Kantha is an embroidered quilt associated with Bangladesh. Banglapedia describes layered cloth worked with running stitch, ranging from utilitarian quilts to richly embroidered heirlooms.",
    products: ["5", "6"],
    source: nakshiKanthaSource,
    imageCredit: repositoryImageCredit,
    contentStatus: "research-backed context",
  },
];

export const categories: Category[] = [
  { name: "Jamdani weaving", image: categoryTextiles },
  { name: "Shital Pati weaving", image: categoryJute },
  { name: "Kantha embroidery", image: categoryPottery },
].map((category) => ({
  ...category,
  count: products.filter((product) => product.category === category.name).length,
}));

export const productCategories = [...new Set(products.map((product) => product.category))];
