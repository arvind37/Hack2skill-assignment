import React, { useState, useMemo, useCallback } from 'react';

// Import utility functions and hooks
import { generateMockProducts, useDebounce, usePagination } from './utils/hooks';

// Import components
import { CartModal } from './components/Cart';
import { Header } from './components/Header';
import { StatsSection } from './components/StatsComponents';
import { FilterSection } from './components/Filter';
import { ProductTable } from './components/Table';

const ProductDashboard = () => {
  // State management
  const [products] = useState(() => generateMockProducts(1000));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [columns, setColumns] = useState([
    { id: 'id', label: 'ID', sortable: true },
    { id: 'image', label: 'Image', sortable: false },
    { id: 'name', label: 'Name', sortable: true },
    { id: 'category', label: 'Category', sortable: true },
    { id: 'price', label: 'Price', sortable: true },
    { id: 'stock', label: 'Stock', sortable: true },
    { id: 'status', label: 'Status', sortable: true },
    { id: 'actions', label: 'Actions', sortable: false },
  ]);

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                           product.category.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, debouncedSearch, selectedCategory]);

  // Sort products
  const sortedProducts = useMemo(() => {
    if (!sortConfig.key) return filteredProducts;

    return [...filteredProducts].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredProducts, sortConfig]);

  const { currentData, currentPage, totalPages, goToPage, nextPage, prevPage } = usePagination(sortedProducts, 10);

  // Cart functions
  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  }, []);

  // Calculated values
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalProducts = products.length;
  const totalRevenue = products.reduce((sum, product) => sum + product.price, 0);
  const lowStockItems = products.filter(product => product.stock < 20).length;
  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsSection
          totalProducts={totalProducts}
          totalRevenue={totalRevenue}
          lowStockItems={lowStockItems}
          categoriesCount={categories.length}
        />

        <FilterSection
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          currentDataLength={currentData.length}
          totalDataLength={filteredProducts.length}
        />

        <ProductTable
          columns={columns}
          currentData={currentData}
          addToCart={addToCart}
          onReorder={setColumns}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </main>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default ProductDashboard;