/*
  # Create categories and add RLS policies

  1. New Tables
    - Categories table with basic fields
      - id (uuid)
      - name (text, unique)
      - description (text, nullable)
      - created_at (timestamp)

  2. Security
    - Enable RLS
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create categories if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'categories'
  ) THEN
    CREATE TABLE categories (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text UNIQUE NOT NULL,
      description text,
      created_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access on categories"
  ON categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin write access on categories"
  ON categories
  FOR ALL
  TO authenticated
  USING ((jwt() ->> 'role'::text) = 'admin'::text);

-- Insert basic categories
INSERT INTO categories (name, description)
VALUES
  ('Electronics', 'Eco-friendly electronic devices and accessories'),
  ('Kitchen', 'Sustainable kitchen and dining products'),
  ('Home Decor', 'Environmental-friendly home decoration items'),
  ('Garden', 'Sustainable gardening tools and accessories'),
  ('Personal Care', 'Natural and sustainable personal care items'),
  ('Stationery', 'Eco-friendly paper products and writing materials'),
  ('Bags', 'Sustainable bags and carrying solutions'),
  ('Accessories', 'Various eco-friendly accessories')
ON CONFLICT (name) DO NOTHING;