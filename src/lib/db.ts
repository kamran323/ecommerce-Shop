import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1)
      .single();
    
    if (error) throw error;
    console.log('Database connection successful!');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

export { supabase };