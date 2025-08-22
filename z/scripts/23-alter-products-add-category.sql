ALTER TABLE products
ADD COLUMN category TEXT;

-- Optional: You might want to update existing products with a default category
-- or populate them based on your data.
-- For example:
-- UPDATE products SET category = 'Uncategorized' WHERE category IS NULL;
