import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CatalogProvider } from "@/contexts/CatalogContext";
import { CollectionProvider } from "@/contexts/CollectionContext";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/CartDrawer";
import ErrorBoundary from "@/components/ErrorBoundary";

// Route-level code splitting: each page is its own chunk, so the initial
// bundle stays small and a page only loads when it's visited.
const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Artisans = lazy(() => import("./pages/Artisans"));
const ArtisanProfile = lazy(() => import("./pages/ArtisanProfile"));
const Stories = lazy(() => import("./pages/Stories"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Account = lazy(() => import("./pages/Account"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div
      className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary"
      role="status"
      aria-label="Loading page"
    />
  </div>
);

const App = () => (
  <AuthProvider>
    <CatalogProvider>
      <CollectionProvider>
        <CartProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Toaster />
              <CartDrawer />
              <Suspense fallback={<RouteFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/artisans" element={<Artisans />} />
                  <Route path="/artisan/:id" element={<ArtisanProfile />} />
                  <Route path="/stories" element={<Stories />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </CartProvider>
      </CollectionProvider>
    </CatalogProvider>
  </AuthProvider>
);

export default App;
