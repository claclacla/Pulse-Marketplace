import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Shopping Cart</h2>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <Button variant="outline" size="sm" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4 flex-1">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </div>
              <p className="font-semibold w-20 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-primary">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        <Button className="w-full text-black bg-gray-200 hover:bg-gray-300">Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;

