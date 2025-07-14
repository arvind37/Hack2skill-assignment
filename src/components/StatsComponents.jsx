import React from 'react';
import { Package, DollarSign, AlertTriangle, Grid } from 'lucide-react';

// Individual stat card component
export const StatCard = ({ icon: Icon, title, value, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center">
        <Icon className={`h-10 w-10 text-${color}-600`} />
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

// Stats section with all cards
export const StatsSection = ({ totalProducts, totalRevenue, lowStockItems, categoriesCount }) => {
  const stats = [
    { icon: Package, title: 'Total Products', value: totalProducts, color: 'blue' },
    { icon: DollarSign, title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, color: 'green' },
    { icon: AlertTriangle, title: 'Low Stock Items', value: lowStockItems, color: 'yellow' },
    { icon: Grid, title: 'Categories', value: categoriesCount, color: 'purple' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};