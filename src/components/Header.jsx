import React from 'react';
import { Search, ShoppingCart, User, Package } from 'lucide-react';

// Search bar component
export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " size={20} />
      <input
        type="text"
        placeholder="Search products..."
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

// Cart button with badge
export const CartButton = ({ cartItemCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-600 hover:text-gray-900"
    >
      <ShoppingCart size={24} />
      {cartItemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartItemCount}
        </span>
      )}
    </button>
  );
};

// Main header component
export const Header = ({ searchQuery, setSearchQuery, cartItemCount, onCartClick }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">Product Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <CartButton cartItemCount={cartItemCount} onClick={onCartClick} />
            
            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={20} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};