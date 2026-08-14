import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { PORT, CLIENT_ORIGINS } from "./config.js";
import "./db.js";
import catalogRoutes from "./routes/catalog.js";
import authRoutes from "./routes/auth.js";
import collectionRoutes from "./routes/collection.js";
import orderRoutes from "./routes/orders.js";

const app = express();
app.disable("x-powered-by");
app.use(helmet());

// Only allow the configured browser origins. Non-browser tools (no Origin) pass.
app.use(
  cors({
    origin(origin, cb) {
      if (!origin || CLIENT_ORIGINS.includes(origin)) return cb(null, true);
      cb(new Error("Origin not allowed by CORS"));
    },
  }),
);

app.use(express.json({ limit: "10kb" }));

app.use("/api", rateLimit({ windowMs: 60_000, max: 120, standardHeaders: true, legacyHeaders: false }));
const authLimiter = rateLimit({ windowMs: 15 * 60_000, max: 20, standardHeaders: true, legacyHeaders: false });

app.get("/api/health", (_req, res) => res.json({ status: "ok", time: new Date().toISOString() }));

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api", catalogRoutes);
app.use("/api/collection", collectionRoutes);
app.use("/api/orders", orderRoutes);

app.use((_req, res) => res.status(404).json({ error: "Not found." }));

// Sanitized error handler: log details server-side, return a generic message.
app.use((err, _req, res, _next) => {
  if (err?.message === "Origin not allowed by CORS") {
    return res.status(403).json({ error: "Origin not allowed." });
  }
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body too large." });
  }
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Malformed JSON body." });
  }
  console.error("[error]", err);
  res.status(500).json({ error: "Something went wrong." });
});

app.listen(PORT, () => {
  console.log(`[swadeshi] API listening on http://localhost:${PORT}`);
});
