import { useState, type MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useCollection } from "@/contexts/CollectionContext";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  category: string;
  region: string;
  material: string;
}

const ProductCard = ({ id, name, image, category, region, material }: ProductCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isSaved, toggle } = useCollection();
  const [busy, setBusy] = useState(false);
  const saved = isSaved(id);

  const onToggleSave = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.info("Log in to save records to your collection.");
      navigate("/login");
      return;
    }
    setBusy(true);
    try {
      await toggle(id);
      toast.success(saved ? "Removed from your collection." : "Saved to your collection.");
    } catch {
      toast.error("Couldn't update your collection.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${id}`} className="group block">
        <div className="card-hover rounded-xl overflow-hidden bg-card">
          <div className="image-zoom relative aspect-[3/4]">
            <img src={image} alt={`Illustrative image for ${name}`} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
            <span className="absolute top-3 left-3 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full font-body text-[11px] uppercase tracking-wider font-medium text-muted-foreground">
              {category}
            </span>
            <button
              onClick={onToggleSave}
              disabled={busy}
              aria-label={saved ? "Remove from collection" : "Save to collection"}
              aria-pressed={saved}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 data-[saved=true]:opacity-100"
              data-saved={saved}
            >
              <Heart className={`w-4 h-4 ${saved ? "fill-primary text-primary" : ""}`} />
            </button>
          </div>
          <div className="p-4">
            <p className="font-body text-xs text-muted-foreground mb-1">{region}</p>
            <h3 className="font-display text-base font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="font-body text-xs text-muted-foreground">Material: {material}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
