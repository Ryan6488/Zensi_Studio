-- Add payment_method column to orders
ALTER TABLE orders
ADD COLUMN payment_method TEXT NOT NULL DEFAULT 'cash_on_delivery';
