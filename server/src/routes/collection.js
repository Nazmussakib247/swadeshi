import { Router } from "express";
import { z } from "zod";
import db from "../db.js";
import { requireAuth } from "../auth.js";
import { serializeProduct } from "../serializers.js";

const router = Router();
router.use(requireAuth);

const addSchema = z.object({ productId: z.string().trim().min(1).max(64) });

// List the current user's saved records (joined to full product data).
router.get("/", (req, res) => {
  const rows = db
    .prepare(
      `SELECT p.* FROM collection_items c
       JOIN products p ON p.id = c.product_id
       WHERE c.user_id = ? ORDER BY c.created_at DESC`,
    )
    .all(req.userId);
  res.json(rows.map(serializeProduct));
});

router.post("/", (req, res) => {
  const parsed = addSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "A productId is required." });

  const product = db.prepare("SELECT id FROM products WHERE id = ?").get(parsed.data.productId);
  if (!product) return res.status(404).json({ error: "Product not found." });

  db.prepare(
    "INSERT OR IGNORE INTO collection_items (user_id, product_id) VALUES (?, ?)",
  ).run(req.userId, parsed.data.productId);
  res.status(201).json({ saved: true, productId: parsed.data.productId });
});

router.delete("/:productId", (req, res) => {
  db.prepare(
    "DELETE FROM collection_items WHERE user_id = ? AND product_id = ?",
  ).run(req.userId, req.params.productId);
  res.json({ saved: false, productId: req.params.productId });
});

export default router;
