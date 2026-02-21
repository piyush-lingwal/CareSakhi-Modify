import React, { useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { CreditCard, Lock, Truck, MapPin, Coins } from 'lucide-react';
import { useCart, CartItem } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../hooks/useWallet';
import { useOrders } from '../hooks/useOrders';

const Checkout = () => {
  const { items, clearCart } = useCart();
  const { user, isLoading } = useAuth();
  const { wallet, deductCoins } = useWallet();
  const { createOrder } = useOrders();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [coinsToUse, setCoinsToUse] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Redirect to login if user is not logged in
  if (!isLoading && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to cart if cart is empty
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const subtotal = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
      const tax = subtotal * 0.18;
      const coinDiscount = coinsToUse;
      const total = Math.max(0, subtotal + tax - coinDiscount);

      const orderId = await createOrder({
        payment_method: paymentMethod,
        subtotal,
        discount: coinDiscount,
        total,
        shipping_address: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        items: items.map((item: CartItem) => ({
          product_id: item.productId,
          product_name: item.name,
          product_image: item.image,
          size: item.size || '',
          color: item.color || '',
          quantity: item.quantity,
          unit_price: item.price,
        })),
      });

      if (orderId) {
        // Deduct coins from wallet if used
        if (coinDiscount > 0) {
          await deductCoins(coinDiscount, `Coins redeemed on order ${orderId}`);
        }
        clearCart();
        navigate(`/order-confirmation/${orderId}`);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const subtotal = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const coinDiscount = coinsToUse;
  const total = Math.max(0, subtotal + tax - coinDiscount);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Checkout Form */}
              <div className="space-y-8">
                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                    Contact Information
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <Truck className="w-5 h-5 mr-2 text-emerald-600" />
                    Shipping Address
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                        placeholder="110001"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        <option value="India">India</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-emerald-600" />
                    Payment Information
                  </h2>

                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 border-2 rounded-lg transition-all ${paymentMethod === 'card'
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        <CreditCard className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                        <div className="text-sm font-medium">Credit Card</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('wallet')}
                        className={`p-4 border-2 rounded-lg transition-all ${paymentMethod === 'wallet'
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        <Coins className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                        <div className="text-sm font-medium">CareSakhi Wallet</div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required={paymentMethod === 'card'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          required={paymentMethod === 'card'}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          required={paymentMethod === 'card'}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        required={paymentMethod === 'card'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">
                      Your payment information is encrypted and secure
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item: CartItem, index: number) => (
                      <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <div className="text-sm text-gray-600">
                            {item.size && `Size: ${item.size}`}
                            {item.size && item.color && ' • '}
                            {item.color && `Color: ${item.color}`}
                          </div>
                          <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                        </div>
                        <div className="font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Totals */}
                  <div className="space-y-3 mb-6 border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (18%)</span>
                      <span className="font-semibold">₹{tax.toFixed(2)}</span>
                    </div>
                    {coinsToUse > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Coin Discount</span>
                        <span className="font-semibold text-green-600">-₹{coinsToUse}</span>
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Coin Redemption */}
                  {wallet.coins > 0 && (
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-3">
                        <Coins className="w-5 h-5 text-yellow-600" />
                        <span className="font-semibold text-gray-800">Use CareSakhi Coins</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        You have {wallet.coins} coins available (₹{wallet.coins} value) • 1 coin = ₹1
                      </p>
                      <div className="flex items-center space-x-3">
                        <input
                          type="number"
                          min="0"
                          max={Math.min(wallet.coins, Math.floor(subtotal + tax))}
                          value={coinsToUse}
                          onChange={(e) => setCoinsToUse(parseInt(e.target.value) || 0)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="Enter coins to use"
                        />
                        <button
                          type="button"
                          onClick={() => setCoinsToUse(Math.min(wallet.coins, Math.floor(subtotal + tax)))}
                          className="bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                        >
                          Use All
                        </button>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Maximum {Math.min(wallet.coins, Math.floor(subtotal + tax))} coins can be used for this order
                      </div>
                    </div>
                  )}

                  {/* Place Order Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : `Place Order - ₹${total.toFixed(2)}`}
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-600">
                    By placing your order, you agree to our Terms of Service and Privacy Policy.
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
