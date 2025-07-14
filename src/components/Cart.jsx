import React from 'react';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

// Individual cart item component
export const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="flex items-center gap-3 py-3 border-b text-gray-700">
      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-medium text-sm text-gray-700">{item.name}</h3>
        <p className="text-sm text-gray-600">${item.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Plus size={16} />
        </button>
      </div>
      <button 
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700 ml-2"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

// Cart modal component
export const CartModal = ({ isOpen, onClose, cartItems, updateQuantity, removeFromCart, totalPrice }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-96 h-full overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center font-bold text-lg text-gray-900">
                  <span>Total: ${totalPrice.toFixed(2)}</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};