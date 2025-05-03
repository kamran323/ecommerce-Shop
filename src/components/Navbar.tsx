import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import Auth from './Auth';

const Navbar = () => {
  const items = useCartStore(state => state.items);
  const { user, isAdmin } = useAuthStore();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-gray-800">
              EcoShop
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <ShoppingBag className="h-6 w-6 text-gray-600 hover:text-gray-900" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <div className="flex items-center space-x-4">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleAuth('login')}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuth('signup')}
                    className="text-sm font-medium bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showAuth && (
        <Auth mode={authMode} onClose={() => setShowAuth(false)} />
      )}
    </>
  );
};

export default Navbar;