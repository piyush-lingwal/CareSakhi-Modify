import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

const Cart = () => {
  const { state, removeItem, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // Example 18% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (user) {
      navigate('/checkout');
    } else {
      // Redirect to login page, but remember where we came from
      navigate('/login', { state: { from: '/cart' } });
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <ShoppingCart className="w-24 h-24 mx-auto text-gray-300" />
        <h1 className="text-3xl font-bold mt-6">Your cart is empty</h1>
        <p className="text-gray-600 mt-2">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="mt-8 inline-block bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-6">
              {state.items.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 border-b pb-6 last:border-b-0 last:pb-0">
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                    {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                    {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                  </div>
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2"><Minus className="w-4 h-4" /></button>
                    <span className="px-4">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2"><Plus className="w-4 h-4" /></button>
                  </div>
                  <p className="font-semibold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"><Trash2 className="w-5 h-5" /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-6 border-b pb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax (18%)</span><span>₹{tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-4"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
            </div>
            <button onClick={handleCheckout} className="mt-6 w-full block text-center bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

