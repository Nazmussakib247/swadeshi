import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Heart, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useCollection } from "@/contexts/CollectionContext";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Artisans", href: "/artisans" },
  { label: "Stories", href: "/stories" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();
  const { savedProducts } = useCollection();

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setSearchOpen(false);
    setIsOpen(false);
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="section-container section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl lg:text-3xl font-bold tracking-tight text-foreground">
              Swadeshi
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/account"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
              aria-label="Saved collection"
            >
              <Heart className="w-5 h-5" />
              {savedProducts.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedProducts.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-background"
          >
            <form onSubmit={onSearch} className="section-container section-padding py-4 flex items-center gap-3">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search records by name, region, or technique…"
                aria-label="Search records"
                className="flex-1 bg-transparent font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button type="submit" className="font-body text-sm font-medium text-primary hover:underline">Search</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="section-padding py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block font-body text-base font-medium text-foreground py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/account" onClick={() => setIsOpen(false)} className="block font-body text-base font-medium text-foreground py-2">
                Account & saved
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
