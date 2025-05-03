/*
  # Add sample products

  1. Changes
    - Insert sample products with realistic data
    - Each product has:
      - name
      - description
      - price
      - image_url (using Pexels stock photos)
      - stock quantity
      - category assignment

  2. Data
    - Adding 10 eco-friendly products
    - Prices range from $10 to $200
    - Stock quantities between 5-50
*/

-- Insert sample products
INSERT INTO products (name, description, price, image_url, stock, category_id)
VALUES
  (
    'Bamboo Water Bottle',
    'Eco-friendly bamboo water bottle with stainless steel interior. Keeps drinks cold for 24 hours.',
    24.99,
    'https://images.pexels.com/photos/1342529/pexels-photo-1342529.jpeg',
    35,
    (SELECT id FROM categories WHERE name = 'Accessories' LIMIT 1)
  ),
  (
    'Organic Cotton Tote',
    'Durable organic cotton tote bag perfect for shopping. Reduces plastic bag waste.',
    19.99,
    'https://images.pexels.com/photos/5706040/pexels-photo-5706040.jpeg',
    50,
    (SELECT id FROM categories WHERE name = 'Bags' LIMIT 1)
  ),
  (
    'Solar Power Bank',
    'Portable solar-powered charger with dual USB ports. Perfect for outdoor adventures.',
    49.99,
    'https://images.pexels.com/photos/6970069/pexels-photo-6970069.jpeg',
    25,
    (SELECT id FROM categories WHERE name = 'Electronics' LIMIT 1)
  ),
  (
    'Bamboo Cutlery Set',
    'Portable bamboo cutlery set including fork, knife, spoon, and chopsticks.',
    14.99,
    'https://images.pexels.com/photos/5908226/pexels-photo-5908226.jpeg',
    45,
    (SELECT id FROM categories WHERE name = 'Kitchen' LIMIT 1)
  ),
  (
    'Recycled Glass Vase',
    'Beautiful handcrafted vase made from recycled glass. Each piece is unique.',
    34.99,
    'https://images.pexels.com/photos/6957650/pexels-photo-6957650.jpeg',
    15,
    (SELECT id FROM categories WHERE name = 'Home Decor' LIMIT 1)
  ),
  (
    'Hemp Backpack',
    'Durable hemp backpack with laptop compartment. Water-resistant and eco-friendly.',
    79.99,
    'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg',
    20,
    (SELECT id FROM categories WHERE name = 'Bags' LIMIT 1)
  ),
  (
    'Bamboo Toothbrush Set',
    'Pack of 4 biodegradable bamboo toothbrushes with charcoal-infused bristles.',
    12.99,
    'https://images.pexels.com/photos/3737595/pexels-photo-3737595.jpeg',
    40,
    (SELECT id FROM categories WHERE name = 'Personal Care' LIMIT 1)
  ),
  (
    'Reusable Coffee Cup',
    'Insulated reusable coffee cup made from recycled materials. Keeps drinks hot for 4 hours.',
    29.99,
    'https://images.pexels.com/photos/1207918/pexels-photo-1207918.jpeg',
    30,
    (SELECT id FROM categories WHERE name = 'Kitchen' LIMIT 1)
  ),
  (
    'Solar Garden Lights',
    'Set of 4 solar-powered garden lights. Automatically illuminates at dusk.',
    44.99,
    'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg',
    25,
    (SELECT id FROM categories WHERE name = 'Garden' LIMIT 1)
  ),
  (
    'Recycled Paper Journal',
    'Handmade journal with 100% recycled paper. Includes 200 unlined pages.',
    19.99,
    'https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg',
    35,
    (SELECT id FROM categories WHERE name = 'Stationery' LIMIT 1)
  );