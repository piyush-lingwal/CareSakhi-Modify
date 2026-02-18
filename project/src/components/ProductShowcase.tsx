import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const { addItem } = useCart();

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cups', name: 'Menstrual Cups' },
    { id: 'underwear', name: 'Reusable Sanitary Pads' },
    { id: 'accessories', name: 'Accessories' },
  ];

  const products = [
    {
      id: 1,
      name: 'EcoFlow Cup',
      category: 'cups',
      price: 499,
      originalPrice: 699,
      rating: 4.8,
      reviews: 1234,
      image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSHhhLw8RkyPjF-nGtd52lM0y8XgofEPxnNKOiGgQY-Wort52TXMqaIoqfNV08U1PXKJyQmJWVGJr5lzPgmemZe9n8bIAtXMiOnvChkuNaeufLpslpLPRFU4w',
      features: ['12hr Protection', 'Medical Grade Silicone', '10 Year Lifespan'],
      sizes: ['Small', 'Medium', 'Large'],
      colors: ['Clear', 'Pink', 'Purple']
    },
    {
      id: 2,
      name: 'Reusable Sanitary Pads',
      category: 'underwear',
      price: 259,
      originalPrice: 399,
      rating: 4.9,
      reviews: 892,
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/1/377286315/GV/IE/YY/78215961/4-piece-pink-reusable-pads.jpg',
      features: ['Ultra Absorbent', 'Leak-Proof', 'Machine Washable'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Black', 'Nude', 'Navy']
    },
    {
      id: 3,
      name: 'Travel Kit Pro',
      category: 'accessories',
      price: 999,
      originalPrice: 1199,
      rating: 4.7,
      reviews: 456,
      image: '/travel kit.png',
      features: ['Sterilizer Included', 'Compact Design', 'Travel Friendly'],
      sizes: ['One Size'],
      colors: ['Pink', 'Blue', 'Green']
    },
    {
      id: 4,
      name: 'PureFlex Cup',
      category: 'cups',
      price: 399,
      originalPrice: 699,
      rating: 4.9,
      reviews: 2156,
      image: 'https://m.media-amazon.com/images/I/71qwVrnL2mL._UF1000,1000_QL80_.jpg',
      features: ['Extra Soft', 'Easy Removal', 'Platinum Silicone'],
      sizes: ['Small', 'Medium', 'Large'],
      colors: ['Clear', 'Teal', 'Rose']
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleQuickAdd = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0]
    });
  };

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0]
    });
  };

  return (
    <section id="products" className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Revolutionary Products
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our premium collection of sustainable menstrual products, 
            designed for comfort, protection, and environmental responsibility.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex space-x-2 pb-4 sm:justify-center overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap text-sm sm:text-base ₹{
                  activeCategory === category.id
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:text-pink-600 hover:bg-pink-50 shadow-sm'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>


        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-100 aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {product.originalPrice > product.price && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Save ₹{product.originalPrice - product.price}
                  </div>
                )}

                <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ₹{
                  hoveredProduct === product.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}>
                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-pink-50 text-gray-600 hover:text-pink-600 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-pink-50 text-gray-600 hover:text-pink-600 transition-colors">
                    <Info className="w-5 h-5" />
                  </button>
                </div>

                <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ₹{
                  hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <button 
                    onClick={() => handleQuickAdd(product)}
                    className="w-full bg-pink-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Quick Add</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-700 transition-colors pr-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  {product.reviews} reviews
                </p>

                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-2xl font-bold text-gray-800">
                    ₹{product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-lg text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-pink-600 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products */}
        <div className="text-center mt-12">
          <Link 
            to="/products"
            className="inline-block bg-gradient-to-r from-pink-600 to-teal-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 transform"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
