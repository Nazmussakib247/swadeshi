import { Router } from "express";
import db from "../db.js";
import { serializeProduct, serializeArtisan } from "../serializers.js";

const router = Router();

router.get("/products", (_req, res) => {
  const rows = db.prepare("SELECT * FROM products ORDER BY id").all();
  res.json(rows.map(serializeProduct));
});

router.get("/products/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Product not found." });
  res.json(serializeProduct(row));
});

router.get("/artisans", (_req, res) => {
  const rows = db.prepare("SELECT * FROM artisans ORDER BY id").all();
  res.json(rows.map(serializeArtisan));
});

router.get("/artisans/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM artisans WHERE id = ?").get(req.params.id);
  if (!row) return res.status(404).json({ error: "Artisan not found." });
  res.json(serializeArtisan(row));
});

// Categories with counts computed from the real product list.
router.get("/categories", (_req, res) => {
  const rows = db
    .prepare(
      "SELECT category AS name, COUNT(*) AS count FROM products GROUP BY category ORDER BY name",
    )
    .all();
  res.json(rows);
});

export default router;
