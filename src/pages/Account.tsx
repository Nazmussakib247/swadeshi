import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCollection } from "@/contexts/CollectionContext";
import { api } from "@/lib/api";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}
interface Order {
  id: number;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

const Account = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  const { savedProducts } = useCollection();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/login", { replace: true });
  }, [loading, user, navigate]);

  useEffect(() => {
    let cancelled = false;
    if (!user) return;
    (async () => {
      try {
        const data = await api.get<Order[]>("/orders");
        if (!cancelled) setOrders(data);
      } catch {
        if (!cancelled) setOrders([]);
      } finally {
        if (!cancelled) setOrdersLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center py-40">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" role="status" aria-label="Loading account" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      {/* Header band */}
      <div className="bg-craft-cream border-b border-border">
        <div className="section-container section-padding py-12 lg:py-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Your account</span>
                <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">{user.name}</h1>
                <p className="font-body text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={logout}>Log out</Button>
          </div>
        </div>
      </div>

      <main className="flex-1 section-container section-padding py-12 lg:py-16">

        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Saved collection</h2>
          {savedProducts.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground">
              Nothing saved yet. Open a{" "}
              <Link to="/shop" className="text-primary hover:underline">craft record</Link>{" "}
              and choose “Save to collection”.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {savedProducts.map((p) => <ProductCard key={p.id} {...p} />)}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Order history</h2>
          {ordersLoading ? (
            <p className="font-body text-sm text-muted-foreground">Loading orders…</p>
          ) : orders.length === 0 ? (
            <p className="font-body text-sm text-muted-foreground">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-display text-lg font-semibold text-card-foreground">Order #{order.id}</span>
                    <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()} · {order.status}
                    </span>
                  </div>
                  <ul className="space-y-1 mb-3">
                    {order.items.map((item) => (
                      <li key={item.productId} className="flex justify-between font-body text-sm text-muted-foreground">
                        <span>{item.name} × {item.quantity}</span>
                        <span>৳{(item.price * item.quantity).toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between border-t border-border pt-3 font-body text-sm font-semibold text-card-foreground">
                    <span>Total</span>
                    <span>৳{order.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="font-body text-xs text-muted-foreground mt-4">
            Orders are recorded for demonstration only. This prototype does not process payments.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
