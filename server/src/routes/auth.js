import { Router } from "express";
import { z } from "zod";
import db from "../db.js";
import { hashPassword, verifyPassword, signToken, requireAuth } from "../auth.js";

const router = Router();

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(80),
  email: z.string().trim().toLowerCase().email("A valid email is required.").max(200),
  password: z.string().min(8, "Password must be at least 8 characters.").max(200),
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  password: z.string().min(1).max(200),
});

function publicUser(row) {
  return { id: row.id, name: row.name, email: row.email };
}

router.post("/register", (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues[0].message });
  }
  const { name, email, password } = parsed.data;

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) {
    return res.status(409).json({ error: "An account with this email already exists." });
  }

  const info = db
    .prepare("INSERT INTO users (email, name, password) VALUES (?, ?, ?)")
    .run(email, name, hashPassword(password));
  const user = { id: info.lastInsertRowid, name, email };
  res.status(201).json({ token: signToken(user), user });
});

router.post("/login", (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  const { email, password } = parsed.data;

  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
  if (!row || !verifyPassword(password, row.password)) {
    return res.status(401).json({ error: "Incorrect email or password." });
  }
  res.json({ token: signToken(publicUser(row)), user: publicUser(row) });
});

router.get("/me", requireAuth, (req, res) => {
  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId);
  if (!row) return res.status(404).json({ error: "User not found." });
  res.json({ user: publicUser(row) });
});

export default router;
