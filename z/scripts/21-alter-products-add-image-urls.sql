ALTER TABLE products
ADD COLUMN image_urls TEXT[];

-- Optional: Update existing products with some placeholder additional images
-- You can replace these with actual image URLs from your storage
UPDATE products SET image_urls = ARRAY[image_url, '/placeholder.svg?height=400&width=300&text=Product+View+2', '/placeholder.svg?height=400&width=300&text=Product+View+3'] WHERE image_url IS NOT NULL;
