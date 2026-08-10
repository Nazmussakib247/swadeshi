import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center section-padding py-24">
        <div className="text-center max-w-lg">
          <p className="font-display text-7xl lg:text-8xl font-bold text-primary/90 mb-4">404</p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            This page isn't in the collection
          </h1>
          <p className="font-body text-muted-foreground mb-8">
            The page you're looking for doesn't exist or may have moved. Let's get
            you back to the craft.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/"><Home className="w-4 h-4 mr-2" /> Home</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/shop">Explore the shop <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
