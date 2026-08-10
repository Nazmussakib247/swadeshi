import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ApiError } from "@/lib/api";
import authImage from "@/assets/hero-textile.jpg";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      navigate("/account", { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not log in.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual panel */}
      <div className="relative hidden lg:block">
        <img src={authImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/30" />
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <Link to="/" className="font-display text-2xl font-bold text-background">Swadeshi</Link>
          <div>
            <p className="font-display text-3xl font-bold text-background leading-tight mb-3">
              Craft you can understand, not just buy.
            </p>
            <p className="font-body text-background/70 max-w-sm">
              Log in to keep a saved collection and revisit your orders.
            </p>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-background">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 font-body text-sm text-muted-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Swadeshi
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Welcome back</h1>
          <p className="font-body text-sm text-muted-foreground mb-8">Log in to your account.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="font-body text-xs uppercase tracking-wider text-muted-foreground">Email</label>
              <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} mt-1.5`} />
            </div>
            <div>
              <label htmlFor="password" className="font-body text-xs uppercase tracking-wider text-muted-foreground">Password</label>
              <input id="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} mt-1.5`} />
            </div>
            {error && <p className="font-body text-sm text-destructive" role="alert">{error}</p>}
            <Button type="submit" size="lg" className="w-full" disabled={busy}>
              {busy ? "Logging in…" : "Log in"}
            </Button>
          </form>
          <p className="font-body text-sm text-muted-foreground mt-6">
            No account? <Link to="/register" className="text-primary hover:underline">Create one</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
