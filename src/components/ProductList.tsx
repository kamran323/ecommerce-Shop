import React, { useEffect, useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Product } from '../types';
import { Plus, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) throw error;
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800">No products found</h2>
        <p className="text-gray-600 mt-2">Check back later for new items!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <button
                onClick={() => addItem(product)}
                disabled={product.stock === 0}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-colors ${
                  product.stock > 0
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Plus className="h-5 w-5" />
                <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;