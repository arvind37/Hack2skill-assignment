import React from 'react';
import { Filter } from 'lucide-react';

// Filter section component
export const FilterSection = ({ categories, selectedCategory, setSelectedCategory, currentDataLength, totalDataLength }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="text-sm text-gray-600">
          Showing {currentDataLength} of {totalDataLength} products
        </div>
      </div>
    </div>
  );
};