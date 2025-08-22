ALTER TABLE products
ADD COLUMN review_count INTEGER DEFAULT 0;

-- Optional: You might want to populate this column for existing products
-- by counting existing reviews. This would typically be a one-time operation
-- or managed by a database trigger.
-- For example:
-- UPDATE products
-- SET review_count = (SELECT COUNT(*) FROM reviews WHERE reviews.product_id = products.id);
