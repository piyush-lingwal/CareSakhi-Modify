import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star, ShoppingCart, Heart, ChevronDown, SlidersHorizontal,
  X, Sparkles, ArrowRight, Search, Grid, LayoutList
} from 'lucide-react';
import { useProducts, useCategories, type Product } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { category } = useParams();
  const { addItem } = useCart();
  const { products, loading: productsLoading } = useProducts();
  const dbCategories = useCategories();

  // Build categories with counts (includes 'All Products')
  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    ...dbCategories.map(c => ({
      ...c,
      count: products.filter(p => p.category === c.id).length
    }))
  ];

  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [quickAddedId, setQuickAddedId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [quickFilter, setQuickFilter] = useState<string | null>(null);

  const pricePresets = [
    { label: 'Under ₹300', min: 0, max: 300 },
    { label: '₹300 – ₹600', min: 300, max: 600 },
    { label: '₹600 – ₹1000', min: 600, max: 1000 },
    { label: '₹1000+', min: 1000, max: 1500 }
  ];

  const ratingCountFor = (rating: number) => products.filter((p: Product) => p.rating >= rating).length;

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (category) setSelectedCategory(category); }, [category]);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

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

  const hasActiveFilters = selectedCategory !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 1500 || minRating > 0 || quickFilter !== null;

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 1500]);
    setMinRating(0);
    setSearchQuery('');
    setQuickFilter(null);
  };

  // Filter + sort logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = product.rating >= minRating;
    const matchesSearch = searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesQuick = quickFilter === null ||
      (quickFilter === 'sale' && !!product.originalPrice) ||
      (quickFilter === 'new' && !!product.isNew) ||
      (quickFilter === 'bestseller' && !!product.isBestseller);
    return matchesCategory && matchesPrice && matchesRating && matchesSearch && matchesQuick;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'newest': return b.id - a.id;
      default: return 0;
    }
  });

  const sortLabels: Record<string, string> = {
    featured: 'Featured',
    newest: 'Newest First',
    'price-low': 'Price: Low → High',
    'price-high': 'Price: High → Low',
    rating: 'Top Rated'
  };

  const getDiscountPercent = (price: number, original?: number) => {
    if (!original) return 0;
    return Math.round(((original - price) / original) * 100);
  };

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HERO BANNER ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-purple-600 to-fuchsia-700 pt-16 pb-10 sm:pb-12">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 transition-all duration-[2000ms] ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
          <div className={`absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-400/15 transition-all duration-[2500ms] delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
          <div className={`absolute top-1/3 left-1/2 w-64 h-64 rounded-full bg-pink-300/10 transition-all duration-[2000ms] delay-500 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
        </div>

        <div className={`container mx-auto px-4 relative z-10 text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-white/90 text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            {products.length}+  Premium Products
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Shop Sustainable
            <span className="block text-pink-200">Period Care</span>
          </h1>
          <p className="text-lg text-white/75 max-w-xl mx-auto mb-8 font-light">
            Premium, eco-friendly products designed for your comfort, health, and the planet.
          </p>

          {/* Search Bar */}
          <div className={`max-w-lg mx-auto relative transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cups, pads, kits..."
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl text-base"
            />
          </div>
        </div>
      </section>


      {/* ── CATEGORY PILLS ───────────────────────────────── */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300
                    ${isActive
                      ? 'bg-pink-600 text-white shadow-lg shadow-pink-200/50'
                      : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
                    }`}
                >
                  {cat.name}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold
                    ${isActive ? 'bg-white/25 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>


      {/* ── TOOLBAR ──────────────────────────────────────── */}
      <div className="container mx-auto px-4 pt-6 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left: count + filter toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-pink-300 hover:text-pink-600 transition-all shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-800">{sortedProducts.length}</span> of {products.length} products
            </p>
          </div>

          {/* Right: sort + view toggle */}
          <div className="flex items-center gap-2">
            {/* Sort Dropdown */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-pink-300 transition-all shadow-sm"
              >
                {sortLabels[sortBy]}
                <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-40 animate-fade-in">
                  {Object.entries(sortLabels).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => { setSortBy(key); setShowSortDropdown(false); }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors
                        ${sortBy === key ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-all ${viewMode === 'grid' ? 'bg-pink-600 text-white' : 'text-gray-500 hover:text-pink-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-all ${viewMode === 'list' ? 'bg-pink-600 text-white' : 'text-gray-500 hover:text-pink-600'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-8">

          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-40 space-y-5 max-h-[calc(100vh-11rem)] overflow-y-auto pr-1 scrollbar-hide">

              {/* Clear All Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-pink-600 bg-pink-50 border border-pink-200 rounded-xl hover:bg-pink-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              )}

              {/* ── Price Filter ── */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-4">Price Range</h3>

                {/* Quick-pick chips */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {pricePresets.map((preset) => {
                    const isActive = priceRange[0] === preset.min && priceRange[1] === preset.max;
                    return (
                      <button
                        key={preset.label}
                        onClick={() => setPriceRange(isActive ? [0, 1500] : [preset.min, preset.max])}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${isActive
                          ? 'bg-pink-600 text-white border-pink-600 shadow-sm shadow-pink-200/50'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300 hover:text-pink-600'
                          }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>

                {/* Min / Max inputs */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Min</label>
                    <div className="relative mt-1">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                      <input
                        type="number"
                        min={0}
                        max={priceRange[1]}
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Math.min(parseInt(e.target.value) || 0, priceRange[1]), priceRange[1]])}
                        className="w-full pl-7 pr-2 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 text-gray-800"
                      />
                    </div>
                  </div>
                  <span className="text-gray-300 mt-4">—</span>
                  <div className="flex-1">
                    <label className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Max</label>
                    <div className="relative mt-1">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                      <input
                        type="number"
                        min={priceRange[0]}
                        max={1500}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Math.max(parseInt(e.target.value) || 0, priceRange[0])])}
                        className="w-full pl-7 pr-2 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 text-gray-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Range slider */}
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-pink-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹0</span>
                  <span>₹1,500</span>
                </div>
              </div>

              {/* ── Rating Filter ── */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Customer Rating</h3>
                  {minRating > 0 && (
                    <button
                      onClick={() => setMinRating(0)}
                      className="text-xs text-pink-500 font-semibold hover:text-pink-700 transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="space-y-1">
                  {[4.5, 4, 3.5, 3].map(rating => {
                    const isActive = minRating === rating;
                    const count = ratingCountFor(rating);
                    return (
                      <button
                        key={rating}
                        onClick={() => setMinRating(isActive ? 0 : rating)}
                        className={`flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${isActive
                          ? 'bg-pink-50 border border-pink-200 shadow-sm'
                          : 'hover:bg-gray-50 border border-transparent'
                          }`}
                      >
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 transition-colors ${i < Math.floor(rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : i < rating
                                  ? 'fill-yellow-400/50 text-yellow-400/50'
                                  : 'text-gray-200'
                                }`}
                            />
                          ))}
                        </div>
                        <span className={`text-sm font-medium ${isActive ? 'text-pink-600' : 'text-gray-600'}`}>
                          {rating}+ &amp; up
                        </span>
                        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold ${isActive ? 'bg-pink-200 text-pink-700' : 'bg-gray-100 text-gray-400'
                          }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Quick Filters ── */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Quick Filters</h3>
                  {quickFilter && (
                    <button type="button" onClick={() => setQuickFilter(null)} className="text-xs text-pink-500 font-semibold hover:text-pink-700 transition-colors">Clear</button>
                  )}
                </div>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setQuickFilter(quickFilter === 'sale' ? null : 'sale')}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${quickFilter === 'sale' ? 'bg-pink-50 border border-pink-200 shadow-sm' : 'hover:bg-gray-50 border border-transparent'}`}
                  >
                    <span className={`flex items-center gap-2 font-medium ${quickFilter === 'sale' ? 'text-pink-600' : 'text-gray-700'}`}>
                      <span>🏷️</span> On Sale
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${quickFilter === 'sale' ? 'bg-pink-200 text-pink-700' : 'bg-gray-100 text-gray-400'}`}>{products.filter(p => p.originalPrice).length}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickFilter(quickFilter === 'new' ? null : 'new')}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${quickFilter === 'new' ? 'bg-pink-50 border border-pink-200 shadow-sm' : 'hover:bg-gray-50 border border-transparent'}`}
                  >
                    <span className={`flex items-center gap-2 font-medium ${quickFilter === 'new' ? 'text-pink-600' : 'text-gray-700'}`}>
                      <span>✨</span> New Arrivals
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${quickFilter === 'new' ? 'bg-pink-200 text-pink-700' : 'bg-gray-100 text-gray-400'}`}>{products.filter(p => p.isNew).length}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuickFilter(quickFilter === 'bestseller' ? null : 'bestseller')}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${quickFilter === 'bestseller' ? 'bg-pink-50 border border-pink-200 shadow-sm' : 'hover:bg-gray-50 border border-transparent'}`}
                  >
                    <span className={`flex items-center gap-2 font-medium ${quickFilter === 'bestseller' ? 'text-pink-600' : 'text-gray-700'}`}>
                      <span>🔥</span> Bestsellers
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${quickFilter === 'bestseller' ? 'bg-pink-200 text-pink-700' : 'bg-gray-100 text-gray-400'}`}>{products.filter(p => p.isBestseller).length}</span>
                  </button>
                </div>
              </div>

            </div>
          </aside>


          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {sortedProducts.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-pink-600 text-white rounded-xl font-medium hover:bg-pink-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
                }`}>
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-pink-200 transition-all duration-500 transform hover:-translate-y-1 ${viewMode === 'list' ? 'flex' : ''
                      }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onMouseEnter={() => setHoveredProduct(product.id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden bg-gray-100 ${viewMode === 'list' ? 'w-56 flex-shrink-0' : 'aspect-square'
                      }`}>
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </Link>

                      {/* Top-Left Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                        {product.originalPrice && (
                          <span className="bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg">
                            -{getDiscountPercent(product.price, product.originalPrice)}%
                          </span>
                        )}
                        {product.isNew && (
                          <span className="bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg">
                            NEW
                          </span>
                        )}
                        {product.isBestseller && (
                          <span className="bg-amber-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg">
                            ★ BEST
                          </span>
                        )}
                      </div>

                      {/* Top-Right Wishlist */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg transition-all duration-300
                          ${wishlist.includes(product.id)
                            ? 'bg-pink-500 text-white scale-110'
                            : 'bg-white/90 text-gray-500 hover:text-pink-500 hover:bg-white'
                          } ${hoveredProduct === product.id || wishlist.includes(product.id) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3 sm:opacity-0'}`}
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-white' : ''}`} />
                      </button>

                      {/* Bottom Quick Add */}
                      <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300
                        ${hoveredProduct === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <button
                          onClick={() => handleQuickAdd(product)}
                          className={`w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg backdrop-blur-sm
                            ${quickAddedId === product.id
                              ? 'bg-emerald-500 text-white'
                              : 'bg-white/95 text-gray-800 hover:bg-pink-600 hover:text-white'
                            }`}
                        >
                          {quickAddedId === product.id ? (
                            <>✓ Added!</>
                          ) : (
                            <><ShoppingCart className="w-4 h-4" /> Quick Add</>
                          )}
                        </button>
                      </div>

                      {/* Out of Stock Overlay */}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="bg-white text-gray-800 px-4 py-2 rounded-full font-bold text-sm">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className={`p-5 flex flex-col ${viewMode === 'list' ? 'flex-1 justify-center' : ''}`}>
                      {/* Category Tag */}
                      <span className="text-xs font-semibold text-pink-500 uppercase tracking-wider mb-1">
                        {categories.find(c => c.id === product.category)?.name || product.category}
                      </span>

                      <Link to={`/product/${product.id}`} className="group/title">
                        <h3 className="text-lg font-bold text-gray-900 group-hover/title:text-pink-600 transition-colors mb-1.5 leading-snug">
                          {product.name}
                        </h3>
                      </Link>

                      {viewMode === 'list' && (
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                      )}

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{product.rating}</span>
                        <span className="text-xs text-gray-400">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mt-auto">
                        <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>

                      {/* Features pills — only in list mode */}
                      {viewMode === 'list' && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {product.features.slice(0, 3).map(f => (
                            <span key={f} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{f}</span>
                          ))}
                        </div>
                      )}

                      {/* View Details — list mode */}
                      {viewMode === 'list' && (
                        <Link
                          to={`/product/${product.id}`}
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pink-600 hover:text-pink-700 group/link"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>


      {/* ── MOBILE FILTER DRAWER ──────────────────────────── */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl animate-slide-up overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Category */}
              <div>
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Category</h4>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                        ${selectedCategory === cat.id ? 'bg-pink-50 text-pink-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${selectedCategory === cat.id ? 'bg-pink-200 text-pink-700' : 'bg-gray-100 text-gray-500'}`}>{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Price Range</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {pricePresets.map((preset) => {
                    const isActive = priceRange[0] === preset.min && priceRange[1] === preset.max;
                    return (
                      <button
                        key={preset.label}
                        onClick={() => setPriceRange(isActive ? [0, 1500] : [preset.min, preset.max])}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${isActive
                          ? 'bg-pink-600 text-white border-pink-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'
                          }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
                <input
                  type="range"
                  min="0"
                  max="1500"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-pink-500"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>₹{priceRange[0]}</span>
                  <span className="font-semibold text-pink-600">₹{priceRange[1]}</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Rating</h4>
                  {minRating > 0 && (
                    <button onClick={() => setMinRating(0)} className="text-xs text-pink-500 font-semibold">Clear</button>
                  )}
                </div>
                <div className="space-y-1">
                  {[4.5, 4, 3.5, 3].map(rating => {
                    const isActive = minRating === rating;
                    return (
                      <button
                        key={rating}
                        onClick={() => setMinRating(isActive ? 0 : rating)}
                        className={`flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${isActive ? 'bg-pink-50 border border-pink-200' : 'hover:bg-gray-50 border border-transparent'
                          }`}
                      >
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : i < rating ? 'fill-yellow-400/50 text-yellow-400/50' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <span className={`text-sm ${isActive ? 'text-pink-600 font-medium' : 'text-gray-500'}`}>{rating}+ &amp; up</span>
                        <span className={`ml-auto text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-pink-200 text-pink-700' : 'bg-gray-100 text-gray-400'}`}>{ratingCountFor(rating)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Apply */}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-pink-600 text-white rounded-xl font-semibold hover:bg-pink-700 transition-colors"
              >
                Show {sortedProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
