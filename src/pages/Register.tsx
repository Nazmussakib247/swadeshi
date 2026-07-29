import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { ApiError } from "@/lib/api";
import authImage from "@/assets/category-textiles.jpg";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await register(name, email, password);
      navigate("/account", { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not create the account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 bg-background order-2 lg:order-1">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="lg:hidden inline-flex items-center gap-2 font-body text-sm text-muted-foreground mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Swadeshi
          </Link>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="font-body text-sm text-muted-foreground mb-8">Save records and keep an order history.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="font-body text-xs uppercase tracking-wider text-muted-foreground">Name</label>
              <input id="name" type="text" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={`${inputClass} mt-1.5`} />
            </div>
            <div>
              <label htmlFor="email" className="font-body text-xs uppercase tracking-wider text-muted-foreground">Email</label>
              <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputClass} mt-1.5`} />
            </div>
            <div>
              <label htmlFor="password" className="font-body text-xs uppercase tracking-wider text-muted-foreground">Password</label>
              <input id="password" type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputClass} mt-1.5`} />
              <p className="font-body text-xs text-muted-foreground mt-1.5">At least 8 characters.</p>
            </div>
            {error && <p className="font-body text-sm text-destructive" role="alert">{error}</p>}
            <Button type="submit" size="lg" className="w-full" disabled={busy}>
              {busy ? "Creating…" : "Create account"}
            </Button>
          </form>
          <p className="font-body text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>.
          </p>
        </div>
      </div>

      {/* Visual panel */}
      <div className="relative hidden lg:block order-1 lg:order-2">
        <img src={authImage} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/50 to-foreground/30" />
        <div className="absolute inset-0 flex flex-col justify-between p-12">
          <span className="font-display text-2xl font-bold text-background self-end">Swadeshi</span>
          <div>
            <p className="font-display text-3xl font-bold text-background leading-tight mb-3">
              A small, carefully explained collection.
            </p>
            <p className="font-body text-background/70 max-w-sm">
              Jamdani, Shital Pati, and Kantha — with the story behind each piece.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
