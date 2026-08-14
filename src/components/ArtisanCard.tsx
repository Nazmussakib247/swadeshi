import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface ArtisanCardProps {
  id: string;
  name: string;
  photo: string;
  location: string;
  craft: string;
  story: string;
}

const ArtisanCard = ({ id, name, photo, location, craft, story }: ArtisanCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/artisan/${id}`} className="group block">
        <div className="card-hover rounded-xl overflow-hidden bg-card">
          <div className="image-zoom aspect-[4/5]">
            <img src={photo} alt={`Illustrative image for ${name}`} className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="p-5">
            <span className="inline-block px-2.5 py-1 bg-accent rounded-full font-body text-[11px] uppercase tracking-wider font-medium text-accent-foreground mb-3">
              {craft}
            </span>
            <h3 className="font-display text-lg font-semibold text-card-foreground mb-1 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-body text-xs">{location}</span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {story}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArtisanCard;
