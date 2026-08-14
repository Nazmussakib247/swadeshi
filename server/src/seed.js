import db, { transaction } from "./db.js";
import { products, artisans } from "./data/seedData.js";

// Idempotent seed: clears catalog tables and reinserts the editorial records.
// User accounts, collections, and orders are never touched.
transaction(() => {
  db.prepare("DELETE FROM products").run();
  db.prepare("DELETE FROM artisans").run();

  const insertProduct = db.prepare(`
    INSERT INTO products
      (id, name, price, image_key, artisan, category, region, material,
       technique, description, source_label, source_url, image_credit, content_status)
    VALUES
      (@id, @name, @price, @image_key, @artisan, @category, @region, @material,
       @technique, @description, @source_label, @source_url, @image_credit, @content_status)
  `);
  for (const p of products) insertProduct.run(p);

  const insertArtisan = db.prepare(`
    INSERT INTO artisans
      (id, name, photo_key, location, craft, story,
       source_label, source_url, image_credit, content_status)
    VALUES
      (@id, @name, @photo_key, @location, @craft, @story,
       @source_label, @source_url, @image_credit, @content_status)
  `);
  for (const a of artisans) insertArtisan.run(a);
});

console.log(
  `[seed] Inserted ${products.length} products and ${artisans.length} artisans.`,
);
