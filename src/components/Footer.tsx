import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCatalog } from "@/contexts/CatalogContext";

const Footer = () => {
  const { productCategories } = useCatalog();
  const [email, setEmail] = useState("");

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setEmail("");
    toast.success("You're on the list — thanks for subscribing.");
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="section-container section-padding py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:pr-6">
            <h3 className="font-display text-2xl font-bold mb-4">Swadeshi</h3>
            <p className="font-body text-sm opacity-70 leading-relaxed">
              Handcrafted textiles rooted in the traditions of Bangladesh —
              Jamdani, Shital Pati, and Kantha, gathered in one place with the
              stories behind them.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="mailto:hello@swadeshi.example" aria-label="Email" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest font-semibold mb-6 opacity-50">Shop</h4>
            <ul className="space-y-3">
              {productCategories.map((category) => (
                <li key={category}>
                  <Link to={`/shop?category=${encodeURIComponent(category)}`} className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">
                    {category}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop" className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">Shop all</Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest font-semibold mb-6 opacity-50">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">Our story</Link></li>
              <li><Link to="/artisans" className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">Artisans</Link></li>
              <li><Link to="/stories" className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">Stories</Link></li>
              <li><Link to="/account" className="font-body text-sm opacity-70 hover:opacity-100 transition-opacity">Your account</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body text-xs uppercase tracking-widest font-semibold mb-6 opacity-50">Stay connected</h4>
            <p className="font-body text-sm opacity-70 leading-relaxed mb-4">
              Notes from the workshop and new craft records, now and then. No spam.
            </p>
            <form onSubmit={onSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded-lg bg-background/10 border border-background/20 px-3 py-2.5 font-body text-sm text-background placeholder:text-background/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button type="submit" aria-label="Subscribe" className="shrink-0 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs opacity-50">© 2026 Swadeshi. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="font-body text-xs opacity-50 hover:opacity-100 transition-opacity">About</Link>
            <Link to="/stories" className="font-body text-xs opacity-50 hover:opacity-100 transition-opacity">Stories</Link>
            <Link to="/shop" className="font-body text-xs opacity-50 hover:opacity-100 transition-opacity">Shop</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
