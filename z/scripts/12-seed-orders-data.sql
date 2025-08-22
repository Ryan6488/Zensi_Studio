-- IMPORTANT: Replace 'YOUR_USER_ID_HERE' with an actual user ID from your Supabase auth.users table
-- You can find a user ID after signing up through the /auth page.

-- Example User ID (replace with a real one after signing up)
-- For demonstration, let's assume a user with ID 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' exists.
-- You will need to replace this with an actual user ID from your Supabase auth.users table
-- after you've signed up a user through the /auth page.

DO $$
DECLARE
  user_uuid UUID := 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'; -- REPLACE THIS WITH A REAL USER ID
  order1_id UUID;
  order2_id UUID;
  product_mug_id UUID;
  product_wallet_id UUID;
  product_scarf_id UUID;
BEGIN
  -- Fetch product IDs
  SELECT id INTO product_mug_id FROM products WHERE name = 'Handcrafted Ceramic Mug';
  SELECT id INTO product_wallet_id FROM products WHERE name = 'Artisan Leather Wallet';
  SELECT id INTO product_scarf_id FROM products WHERE name = 'Knitted Wool Scarf';

  -- Insert first order
  INSERT INTO orders (user_id, total_amount, status)
  VALUES (user_uuid, 120.00, 'Delivered')
  RETURNING id INTO order1_id;

  -- Insert items for first order
  INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
  (order1_id, product_mug_id, 2, 35.00),
  (order1_id, product_wallet_id, 1, 85.00);

  -- Insert second order
  INSERT INTO orders (user_id, total_amount, status)
  VALUES (user_uuid, 70.00, 'Pending')
  RETURNING id INTO order2_id;

  -- Insert items for second order
  INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES
  (order2_id, product_scarf_id, 1, 70.00);

END $$;
