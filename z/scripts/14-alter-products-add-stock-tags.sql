ALTER TABLE products
ADD COLUMN stock INTEGER DEFAULT 0,
ADD COLUMN tags TEXT[];

-- Optional: Update existing products with some default stock and tags
UPDATE products SET stock = 10, tags = ARRAY['home', 'ceramic', 'mug'] WHERE name = 'Handcrafted Ceramic Mug';
UPDATE products SET stock = 15, tags = ARRAY['home', 'macrame', 'wall art'] WHERE name = 'Woven Macrame Wall Hanging';
UPDATE products SET stock = 8, tags = ARRAY['accessories', 'leather', 'wallet'] WHERE name = 'Artisan Leather Wallet';
UPDATE products SET stock = 20, tags = ARRAY['home', 'candle', 'soy'] WHERE name = 'Hand-Poured Soy Candle';
UPDATE products SET stock = 12, tags = ARRAY['home', 'wood', 'coasters'] WHERE name = 'Custom Engraved Wooden Coasters';
UPDATE products SET stock = 7, tags = ARRAY['clothing', 'wool', 'scarf'] WHERE name = 'Knitted Wool Scarf';
UPDATE products SET stock = 25, tags = ARRAY['jewelry', 'silver', 'ring'] WHERE name = 'Minimalist Silver Ring';
UPDATE products SET stock = 5, tags = ARRAY['art', 'canvas', 'abstract'] WHERE name = 'Abstract Canvas Painting';
