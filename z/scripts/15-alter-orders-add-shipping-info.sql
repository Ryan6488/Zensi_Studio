ALTER TABLE orders
ADD COLUMN shipping_info JSONB;

-- Note: The 'products[]' field requested for orders is typically handled
-- by a separate 'order_items' table (which you already have). This
-- relational approach is more flexible and efficient than storing an array
-- of products directly in the 'orders' table.
