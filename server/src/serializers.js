// Convert DB rows (snake_case) into the camelCase shapes the frontend consumes.
export function serializeProduct(row) {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    imageKey: row.image_key,
    artisan: row.artisan,
    category: row.category,
    region: row.region,
    material: row.material,
    technique: row.technique,
    description: row.description,
    source: { label: row.source_label, url: row.source_url },
    imageCredit: row.image_credit,
    contentStatus: row.content_status,
  };
}

export function serializeArtisan(row) {
  return {
    id: row.id,
    name: row.name,
    photoKey: row.photo_key,
    location: row.location,
    craft: row.craft,
    story: row.story,
    source: { label: row.source_label, url: row.source_url },
    imageCredit: row.image_credit,
    contentStatus: row.content_status,
  };
}
