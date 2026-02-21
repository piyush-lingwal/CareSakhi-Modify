import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts, useCategories, type Product } from '../hooks/useProducts';

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [quickAddedId, setQuickAddedId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const { addItem } = useCart();
  const { products: allProducts } = useProducts();
  const dbCategories = useCategories();

  useEffect(() => { setMounted(true); }, []);

  // Featured products for the home page
  const featured = allProducts.filter(p => p.isBestseller || p.isNew || p.originalPrice).slice(0, 12);

  const isFiltered = activeCategory !== 'all';

  const displayProducts = isFiltered
    ? featured.filter(p => p.category === activeCategory)
    : featured;

  // Split products into two rows for the marquee
  const half = Math.ceil(featured.length / 2);
  const row1 = featured.slice(0, half);
  const row2 = featured.slice(half);

  // Only show categories that exist in featured products
  const featuredCatIds = ['all', ...new Set(featured.map(p => p.category))];
  const allCategories = [{ id: 'all', name: 'All Products' }, ...dbCategories];
  const categories = allCategories.filter(c => featuredCatIds.includes(c.id));

  const handleQuickAdd = (product: Product) => {
    const size = product.sizes?.[0] || '';
    const color = product.colors?.[0] || '';
    addItem({
      id: `${product.id}-${size}-${color}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size,
      color
    });
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId(null), 1500);
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const getDiscountPercent = (price: number, original?: number) => {
    if (!original) return 0;
    return Math.round(((original - price) / original) * 100);
  };

  // ─── Product Card (reusable) ───
  const ProductCard = ({ product, index = 0, compact = false }: { product: typeof allProducts[0]; index?: number; compact?: boolean }) => {
    const discount = getDiscountPercent(product.price, product.originalPrice);
    const isWished = wishlist.includes(product.id);
    const justAdded = quickAddedId === product.id;

    return (
      <div
        className={`rounded-2xl p-[2px] bg-transparent hover:bg-gradient-to-br hover:from-pink-400 hover:via-purple-400 hover:to-fuchsia-400 transition-all duration-500 ${compact ? 'w-[240px] sm:w-[280px] flex-shrink-0' : ''}`}
        style={{ animationDelay: `${index * 80}ms` }}
        onMouseEnter={compact ? undefined : () => setHoveredProduct(product.id)}
        onMouseLeave={compact ? undefined : () => setHoveredProduct(null)}
      >
        <div
          className={`group bg-white rounded-[14px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 h-full`}
        >
          {/* Image */}
          <div className={`relative overflow-hidden bg-gray-50 ${compact ? 'h-[220px]' : 'aspect-square'}`}>
            <Link to={`/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </Link>

            {/* Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
              {discount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                  -{discount}%
                </span>
              )}
              {product.isNew && (
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                  NEW
                </span>
              )}
              {product.isBestseller && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                  ★ BEST
                </span>
              )}
            </div>

            {/* Wishlist — CSS-only visibility for marquee cards */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${isWished ? 'bg-pink-500 text-white' : 'bg-white/90 text-gray-400 hover:text-pink-500'
                } ${compact
                  ? (isWished ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100')
                  : (hoveredProduct === product.id || isWished ? 'opacity-100 scale-100' : 'opacity-0 scale-75')
                }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isWished ? 'fill-current' : ''}`} />
            </button>

            {/* Quick Add — CSS-only visibility for marquee cards */}
            <div className={`absolute bottom-0 left-0 right-0 p-2.5 transition-all duration-300 ${compact
              ? 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
              : (hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')
              }`}>
              <button
                type="button"
                onClick={() => handleQuickAdd(product)}
                className={`w-full py-2 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 shadow-lg ${justAdded ? 'bg-emerald-500 text-white' : 'bg-pink-600 text-white hover:bg-pink-700'
                  }`}
              >
                {justAdded ? <><Check className="w-3.5 h-3.5" /> Added!</> : <><ShoppingCart className="w-3.5 h-3.5" /> Quick Add</>}
              </button>
            </div>
          </div>

          {/* Info */}
          <div className={`${compact ? 'p-3' : 'p-4'}`}>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-pink-500 mb-0.5 block">
              {allCategories.find(c => c.id === product.category)?.name || product.category}
            </span>
            <Link to={`/products/${product.id}`} className="block">
              <h3 className={`font-bold text-gray-800 group-hover:text-pink-600 transition-colors leading-snug mb-1.5 ${compact ? 'text-sm' : 'text-[15px]'}`}>
                {product.name}
              </h3>
            </Link>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-[10px] text-gray-400 font-medium">({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className={`font-extrabold text-gray-900 ${compact ? 'text-lg' : 'text-xl'}`}>₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── Marquee Row ───
  const MarqueeRow = ({ items, direction }: { items: typeof allProducts; direction: 'left' | 'right' }) => {
    // Duplicate items for seamless loop
    const duped = [...items, ...items, ...items];
    return (
      <div className="overflow-hidden py-2 [&:hover>div]:[animation-play-state:paused]">
        <div
          className={`flex gap-4 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
            }`}
          style={{ width: 'max-content' }}
        >
          {duped.map((product, i) => (
            <ProductCard key={`${product.id}-${i}`} product={product} compact />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="products" className="py-14 sm:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-pink-50/50 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* ─── Section Header ─── */}
        <div className={`text-center mb-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 rounded-full px-4 py-1.5 mb-5 text-pink-600 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Handpicked For You
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Our Bestsellers
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Premium, eco-friendly products loved by thousands — designed for comfort, protection, and the planet.
          </p>
        </div>

        {/* ─── Category Pills ─── */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8 sm:mb-10 sm:justify-center px-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 whitespace-nowrap text-sm border ${activeCategory === cat.id
                ? 'bg-pink-600 text-white border-pink-600 shadow-lg shadow-pink-200/40'
                : 'bg-white text-gray-600 border-gray-200 hover:text-pink-600 hover:border-pink-300 shadow-sm'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* ─── Products Display ─── */}
        {isFiltered ? (
          /* FILTERED: normal responsive grid */
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {displayProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          /* UNFILTERED: two marquee rows scrolling in opposite directions — all screens */
          <div className="space-y-3 sm:space-y-4">
            <MarqueeRow items={row1} direction="left" />
            <MarqueeRow items={row2} direction="right" />
          </div>
        )}

        {/* ─── View All CTA ─── */}
        <div className={`text-center mt-12 sm:mt-14 transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <Link
            to="/products"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-base hover:shadow-xl hover:shadow-pink-200/40 transition-all duration-300 hover:scale-[1.03] transform"
          >
            Explore All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-sm text-gray-400 mt-3">{allProducts.length}+ products across {allCategories.length - 1} categories</p>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
