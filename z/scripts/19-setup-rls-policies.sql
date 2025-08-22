-- Enable Row Level Security for all relevant tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for 'products' table
DROP POLICY IF EXISTS "Public products are viewable by everyone." ON products;
CREATE POLICY "Public products are viewable by everyone." ON products
  FOR SELECT USING (TRUE);

-- RLS Policies for 'orders' table
DROP POLICY IF EXISTS "Users can view their own orders." ON orders;
CREATE POLICY "Users can view their own orders." ON orders
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Authenticated users can create orders." ON orders;
CREATE POLICY "Authenticated users can create orders." ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for 'order_items' table
DROP POLICY IF EXISTS "Users can view their own order items." ON order_items;
CREATE POLICY "Users can view their own order items." ON order_items
  FOR SELECT USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

DROP POLICY IF EXISTS "Authenticated users can create order items." ON order_items;
CREATE POLICY "Authenticated users can create order items." ON order_items
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- RLS Policies for 'cart_items' table
DROP POLICY IF EXISTS "Users can manage their own cart items." ON cart_items;
CREATE POLICY "Users can manage their own cart items." ON cart_items
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- RLS Policies for 'reviews' table
DROP POLICY IF EXISTS "Reviews are viewable by everyone." ON reviews;
CREATE POLICY "Reviews are viewable by everyone." ON reviews
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Authenticated users can create reviews." ON reviews;
CREATE POLICY "Authenticated users can create reviews." ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for 'wishlist' table
DROP POLICY IF EXISTS "Users can manage their own wishlist." ON wishlist;
CREATE POLICY "Users can manage their own wishlist." ON wishlist
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- RLS Policies for 'contact_messages' table
DROP POLICY IF EXISTS "Anyone can submit a contact message." ON contact_messages;
CREATE POLICY "Anyone can submit a contact message." ON contact_messages
  FOR INSERT WITH CHECK (TRUE);

-- RLS Policies for 'newsletter_subscribers' table
DROP POLICY IF EXISTS "Anyone can subscribe to the newsletter." ON newsletter_subscribers;
CREATE POLICY "Anyone can subscribe to the newsletter." ON newsletter_subscribers
  FOR INSERT WITH CHECK (TRUE);
