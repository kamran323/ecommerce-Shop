import React from 'react';
import { useCartStore } from '../store/cartStore';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = () => {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-600 mt-2">Add some products to your cart to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shopping Cart</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <Minus className="h-5 w-5 text-gray-600" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <Plus className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1 rounded-md hover:bg-gray-100 ml-4"
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
          </div>
          <button className="w-full mt-4 bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;