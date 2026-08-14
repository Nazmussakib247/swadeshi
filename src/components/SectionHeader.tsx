import { motion } from "framer-motion";

interface SectionHeaderProps {
  subtitle: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeader = ({ subtitle, title, description, align = "center" }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 lg:mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      <span className="font-body text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3 block">
        {subtitle}
      </span>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className={`font-body text-base text-muted-foreground max-w-2xl leading-relaxed ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
