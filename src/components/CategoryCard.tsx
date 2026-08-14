import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  image: string;
  count: number;
}

const CategoryCard = ({ name, image, count }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/shop?category=${encodeURIComponent(name)}`} className="group block">
        <div className="card-hover rounded-xl overflow-hidden relative aspect-square">
          <div className="image-zoom absolute inset-0">
            <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-display text-xl font-semibold text-background mb-1">{name}</h3>
            <div className="flex items-center justify-between">
              <span className="font-body text-xs text-background/70">{count} products</span>
              <div className="w-8 h-8 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-background group-hover:text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
