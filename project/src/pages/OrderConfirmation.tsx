import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface OrderData {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  discount: number;
  payment_method: string;
  shipping_address: Record<string, string>;
  created_at: string;
  items: { product_name: string; product_image: string; quantity: number; unit_price: number; size: string; color: string }[];
}

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) { setLoading(false); return; }

      const { data } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('id', orderId)
        .single();

      if (data) {
        setOrder({
          ...data,
          items: data.order_items || [],
        });
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find an order with ID: {orderId}</p>
          <Link to="/products" className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const orderDate = new Date(order.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  const getStatus = (conditions: [boolean, boolean]): 'completed' | 'current' | 'pending' => {
    if (conditions[1]) return 'current';
    if (conditions[0]) return 'completed';
    return 'pending';
  };

  const orderSteps = [
    {
      icon: CheckCircle,
      title: 'Order Confirmed',
      description: 'Your order has been received and confirmed',
      status: 'completed' as const
    },
    {
      icon: Package,
      title: 'Processing',
      description: 'We\'re preparing your items for shipment',
      status: getStatus([order.status === 'shipped' || order.status === 'delivered', order.status === 'processing'])
    },
    {
      icon: Truck,
      title: 'Shipped',
      description: 'Your order is on its way to you',
      status: getStatus([order.status === 'delivered', order.status === 'shipped'])
    },
    {
      icon: Mail,
      title: 'Delivered',
      description: 'Your order has been delivered',
      status: getStatus([false, order.status === 'delivered'])
    }
  ];

  const tax = order.total - order.subtotal + order.discount;
  const addr = order.shipping_address;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your order. We've received your payment and will begin processing your items.
            </p>
            <p className="text-gray-500">
              Order #{order.id} • Placed on {orderDate}
            </p>
          </div>

          {/* Order Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">Order Status</h2>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              <div className="space-y-8">
                {orderSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="relative flex items-center">
                      <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 ${step.status === 'completed'
                        ? 'bg-green-600 border-green-600 text-white'
                        : step.status === 'current'
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                        }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <div className="ml-6">
                        <h3 className={`text-lg font-semibold ${step.status === 'completed' || step.status === 'current'
                          ? 'text-gray-800'
                          : 'text-gray-400'
                          }`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm ${step.status === 'completed' || step.status === 'current'
                          ? 'text-gray-600'
                          : 'text-gray-400'
                          }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <img src={item.product_image} alt={item.product_name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h3 className="font-medium text-gray-800">{item.product_name}</h3>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                          {item.size && ` • Size: ${item.size}`}
                          {item.color && ` • ${item.color}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ₹{(item.unit_price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{order.subtotal.toFixed(2)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-semibold text-green-600">-₹{order.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>₹{order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Payment Method</h3>
                  <p className="text-gray-600 capitalize">{order.payment_method}</p>
                </div>

                {addr && Object.keys(addr).length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-800 mb-2">Delivery Address</h3>
                    <p className="text-gray-600">
                      {addr.firstName} {addr.lastName}<br />
                      {addr.address}<br />
                      {addr.city}, {addr.state} {addr.zipCode}<br />
                      {addr.country}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Estimated Delivery</h3>
                  <p className="text-gray-600">3-5 business days</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">What's Next?</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• You'll receive a shipping confirmation email with tracking information</li>
                  <li>• Track your order status in your account dashboard</li>
                  <li>• Contact us if you have any questions about your order</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account?tab=orders"
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>View My Orders</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/products"
                className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            <p className="text-gray-600">
              Need help? <Link to="/contact" className="text-emerald-600 hover:text-emerald-700">Contact our support team</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;