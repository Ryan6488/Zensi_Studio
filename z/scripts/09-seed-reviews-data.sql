INSERT INTO reviews (product_id, reviewer_name, rating, comment) VALUES
((SELECT id FROM products WHERE name = 'Handcrafted Ceramic Mug'), 'Alice B.', 5.0, 'This mug is absolutely beautiful and feels great in hand. Perfect for my morning coffee!'),
((SELECT id FROM products WHERE name = 'Handcrafted Ceramic Mug'), 'John D.', 4.5, 'Lovely design and good quality. A bit smaller than I expected, but still very happy.'),
((SELECT id FROM products WHERE name = 'Woven Macrame Wall Hanging'), 'Sophia M.', 5.0, 'Stunning piece! It transformed my living room. The craftsmanship is incredible.'),
((SELECT id FROM products WHERE name = 'Artisan Leather Wallet'), 'Michael P.', 5.0, 'Best wallet I''ve ever owned. The leather is premium, and it''s very well made. Will last for years.'),
((SELECT id FROM products WHERE name = 'Hand-Poured Soy Candle'), 'Olivia T.', 4.0, 'Nice scent, but it burns a bit fast. Still, a lovely addition to my home.'),
((SELECT id FROM products WHERE name = 'Knitted Wool Scarf'), 'Liam G.', 4.5, 'Very warm and soft. Great quality wool. Perfect for winter.'),
((SELECT id FROM products WHERE name = 'Minimalist Silver Ring'), 'Emma W.', 5.0, 'Elegant and simple, exactly what I was looking for. Fits perfectly and looks great.'),
((SELECT id FROM products WHERE name = 'Abstract Canvas Painting'), 'Noah C.', 4.0, 'A vibrant piece that adds character to my office. The colors are fantastic, but it arrived a day late.');
