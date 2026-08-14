import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dbFile = resolve(
  __dirname,
  "..",
  process.env.DATABASE_FILE?.replace(/^\.\//, "") ?? "data/swadeshi.db",
);

mkdirSync(dirname(dbFile), { recursive: true });

const db = new DatabaseSync(dbFile);
db.exec("PRAGMA journal_mode = WAL");
db.exec("PRAGMA foreign_keys = ON");

/**
 * Run a set of statements in a single transaction. node:sqlite has no built-in
 * transaction helper, so we wrap BEGIN/COMMIT and roll back on any error.
 */
export function transaction(fn) {
  db.exec("BEGIN");
  try {
    const result = fn();
    db.exec("COMMIT");
    return result;
  } catch (err) {
    db.exec("ROLLBACK");
    throw err;
  }
}

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    email      TEXT NOT NULL UNIQUE,
    name       TEXT NOT NULL,
    password   TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS products (
    id             TEXT PRIMARY KEY,
    name           TEXT NOT NULL,
    price          INTEGER NOT NULL,
    image_key      TEXT NOT NULL,
    artisan        TEXT NOT NULL,
    category       TEXT NOT NULL,
    region         TEXT NOT NULL,
    material       TEXT NOT NULL,
    technique      TEXT NOT NULL,
    description    TEXT NOT NULL,
    source_label   TEXT NOT NULL,
    source_url     TEXT NOT NULL,
    image_credit   TEXT NOT NULL,
    content_status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS artisans (
    id             TEXT PRIMARY KEY,
    name           TEXT NOT NULL,
    photo_key      TEXT NOT NULL,
    location       TEXT NOT NULL,
    craft          TEXT NOT NULL,
    story          TEXT NOT NULL,
    source_label   TEXT NOT NULL,
    source_url     TEXT NOT NULL,
    image_credit   TEXT NOT NULL,
    content_status TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS collection_items (
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, product_id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total      INTEGER NOT NULL,
    status     TEXT NOT NULL DEFAULT 'recorded',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS order_items (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id   INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    name       TEXT NOT NULL,
    price      INTEGER NOT NULL,
    quantity   INTEGER NOT NULL
  );
`);

export default db;
