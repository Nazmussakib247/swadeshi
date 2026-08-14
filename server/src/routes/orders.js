import { Router } from "express";
import { z } from "zod";
import db, { transaction } from "../db.js";
import { requireAuth } from "../auth.js";

const router = Router();
router.use(requireAuth);

const orderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().trim().min(1).max(64),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1, "An order needs at least one item.")
    .max(50),
});

// Create an order. Prices are re-read from the database, never taken from the
// client, so the recorded total cannot be tampered with. No payment is taken.
router.post("/", (req, res) => {
  const parsed = orderSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }

  const getProduct = db.prepare("SELECT id, name, price FROM products WHERE id = ?");
  const lines = [];
  for (const item of parsed.data.items) {
    const product = getProduct.get(item.productId);
    if (!product) {
      return res.status(404).json({ error: `Unknown product: ${item.productId}` });
    }
    lines.push({ ...product, quantity: item.quantity });
  }
  const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

  const create = () => transaction(() => {
    const order = db
      .prepare("INSERT INTO orders (user_id, total, status) VALUES (?, ?, 'recorded')")
      .run(req.userId, total);
    const insertItem = db.prepare(
      "INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES (?, ?, ?, ?, ?)",
    );
    for (const l of lines) {
      insertItem.run(order.lastInsertRowid, l.id, l.name, l.price, l.quantity);
    }
    return order.lastInsertRowid;
  });

  const id = create();
  res.status(201).json({
    id,
    total,
    status: "recorded",
    items: lines.map((l) => ({ productId: l.id, name: l.name, price: l.price, quantity: l.quantity })),
    note: "Order recorded. This prototype does not process payments; no money was charged.",
  });
});

// List the current user's orders, newest first, with their line items.
router.get("/", (req, res) => {
  const orders = db
    .prepare("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC")
    .all(req.userId);
  const getItems = db.prepare("SELECT product_id AS productId, name, price, quantity FROM order_items WHERE order_id = ?");
  res.json(
    orders.map((o) => ({
      id: o.id,
      total: o.total,
      status: o.status,
      createdAt: o.created_at,
      items: getItems.all(o.id),
    })),
  );
});

export default router;
