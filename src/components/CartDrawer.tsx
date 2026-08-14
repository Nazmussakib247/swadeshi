import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { api, ApiError } from "@/lib/api";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  const onCheckout = async () => {
    if (!user) {
      toast.info("Log in to place an order.");
      setIsCartOpen(false);
      navigate("/login");
      return;
    }
    setPlacing(true);
    try {
      const order = await api.post<{ id: number }>("/orders", {
        items: items.map((i) => ({ productId: i.id, quantity: i.quantity })),
      });
      clearCart();
      setIsCartOpen(false);
      toast.success(`Order #${order.id} recorded. This prototype takes no payment.`);
      navigate("/account");
    } catch (err) {
      const message = err instanceof ApiError ? err.message : "Couldn't place the order.";
      toast.error(message);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-display text-xl flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
            {totalItems > 0 && (
              <span className="ml-auto font-body text-sm font-normal text-muted-foreground">
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="font-display text-lg text-muted-foreground mb-2">Your cart is empty</p>
              <p className="font-body text-sm text-muted-foreground/70">Discover beautiful handcrafted products</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 py-4 border-b border-border last:border-0"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-semibold text-card-foreground truncate">{item.name}</h4>
                    <p className="font-body text-xs text-muted-foreground mb-2">by {item.artisan}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-muted rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-body text-sm font-medium w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-body text-sm font-bold text-card-foreground">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-auto flex flex-col gap-3 px-6 py-5 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-xl font-bold text-card-foreground">৳{totalPrice.toLocaleString()}</span>
            </div>
            <Button className="w-full" size="lg" onClick={onCheckout} disabled={placing}>
              {placing ? "Recording order…" : "Place order (no payment)"}
            </Button>
            <p className="font-body text-[11px] text-muted-foreground text-center">
              Orders are recorded to your account. This prototype does not process payments.
            </p>
            <button onClick={clearCart} className="w-full text-center font-body text-xs text-muted-foreground hover:text-destructive transition-colors">
              Clear cart
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
