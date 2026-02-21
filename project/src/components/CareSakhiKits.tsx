import { useState, useRef } from 'react';
import { ShoppingCart, Star, ArrowRight, Check, Sparkles, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CareSakhiKits = () => {
  const { addItem } = useCart();
  const [addedKit, setAddedKit] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.85;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const kits = [
    {
      id: 101,
      name: 'Heavy-Flow Kit',
      price: 1499,
      originalPrice: 1999,
      rating: 4.9,
      reviews: 2156,
      image: '/heavy flow kit.png',
      description: 'Complete sustainable period solution for heavy flow days.',
      includes: ['1 Menstrual Cup', '2 High Absorbency Underwear', '3 Large Cloth Pads', 'Large Wet Bag', 'pH Balanced Wipes', 'Sanitizer'],
      badge: '🔥 Most Popular',
      gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
      bgTint: 'bg-rose-50',
      chipStyle: 'bg-rose-50 text-rose-700 border-rose-100',
    },
    {
      id: 102,
      name: 'Beginner Starter Kit',
      price: 999,
      originalPrice: 1500,
      rating: 4.8,
      reviews: 1834,
      image: '/beginners kit.png',
      description: 'Your first step into sustainable, comfortable wellness.',
      includes: ['1 Menstrual Cup', '2 Period Underwear', '1 Cloth Pad', '1 Wet Bag', 'pH Balanced Wipes', 'Sanitizer', 'Guide'],
      badge: '✨ Best for Beginners',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      bgTint: 'bg-emerald-50',
      chipStyle: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      id: 103,
      name: 'Post-Partum Kit',
      price: 1499,
      originalPrice: 1999,
      rating: 4.7,
      reviews: 1245,
      image: '/travel kit.png',
      description: 'Designed with care for post-pregnancy recovery phase.',
      includes: ['1 Menstrual Cup', '3 Large Pads', '2 Period Underwear', 'Large Wet Bag', 'pH Balanced Wipes', 'Sanitizer', 'Wellness Guide'],
      badge: '💜 After Pregnancy',
      gradient: 'from-sky-500 via-blue-500 to-indigo-500',
      bgTint: 'bg-sky-50',
      chipStyle: 'bg-sky-50 text-sky-700 border-sky-100',
    },
    {
      id: 104,
      name: 'All-in-One Kit',
      price: 1799,
      originalPrice: 2499,
      rating: 4.9,
      reviews: 987,
      image: '/light flow kit.png',
      description: 'The ultimate kit — ready for every condition, every day.',
      includes: ['1 Menstrual Cup', '2 Comfort Briefs', '1 Wet Bag', 'pH Balanced Wipes', 'Sanitizer', 'Wellness Guide'],
      badge: '👑 Premium Choice',
      gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
      bgTint: 'bg-violet-50',
      chipStyle: 'bg-violet-50 text-violet-700 border-violet-100',
    },
  ];

  const handleAddToCart = (kit: typeof kits[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ productId: kit.id, name: kit.name, price: kit.price, image: kit.image });
    setAddedKit(kit.id);
    setTimeout(() => setAddedKit(null), 1500);
  };

  return (
    <section className="py-14 sm:py-24 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-80 h-80 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-50/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* ─── Section Header ─── */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 rounded-full px-4 py-1.5 mb-4 text-pink-600 text-sm font-semibold">
            <Package className="w-4 h-4" />
            Curated Collections
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight" style={{ fontFamily: "'DM Serif Display', serif" }}>
            CareSakhi <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Kits</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Thoughtfully designed bundles for every woman's unique needs.
          </p>
        </div>

        {/* ─── Kits Grid — 2x2 on desktop, horizontal scroll on mobile ─── */}
        <div className="relative max-w-6xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-50 hover:border-pink-200 transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-50 hover:border-pink-200 transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          <div ref={scrollRef} className="flex gap-4 lg:gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory px-1">
            {kits.map((kit) => {
              const savedPercent = Math.round(((kit.originalPrice - kit.price) / kit.originalPrice) * 100);
              const isAdded = addedKit === kit.id;

              return (
                <Link to={`/product/${kit.id}`} key={kit.id} className="group block flex-shrink-0 w-[80vw] sm:w-[calc(50%-0.5rem)] lg:w-[calc(50%-0.625rem)] snap-center">
                  <div className="bg-white rounded-3xl border border-gray-100/80 hover:border-pink-200/60 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col hover:-translate-y-1.5">

                    {/* ─── Image ─── */}
                    <div className="relative h-52 sm:h-60 lg:h-64 overflow-hidden bg-gray-50">
                      <img
                        src={kit.image}
                        alt={kit.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`bg-gradient-to-r ${kit.gradient} text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold shadow-lg tracking-wide`}>
                          {kit.badge}
                        </span>
                      </div>

                      {/* Discount */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm">
                          {savedPercent}% OFF
                        </span>
                      </div>

                      {/* Hover CTA */}
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
                        <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-5 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-lg">
                          View Details <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* ─── Content ─── */}
                    <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
                      {/* Title + Rating */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-snug" style={{ fontFamily: "'DM Serif Display', serif" }}>
                          {kit.name}
                        </h3>
                        <div className="flex items-center gap-1 shrink-0 ml-2 bg-amber-50 px-2 py-0.5 rounded-lg">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-xs text-gray-800">{kit.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500 mb-3 leading-relaxed">{kit.description}</p>

                      {/* Includes — compact chips */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {kit.includes.slice(0, 4).map((item, idx) => (
                          <span key={idx} className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${kit.chipStyle}`}>
                            <Check className="w-2.5 h-2.5" />
                            {item}
                          </span>
                        ))}
                        {kit.includes.length > 4 && (
                          <span className="text-[10px] font-semibold text-gray-400 px-2 py-0.5">
                            +{kit.includes.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Price + CTA */}
                      <div className="mt-auto flex items-end justify-between gap-3">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl sm:text-2xl font-extrabold text-gray-900">₹{kit.price.toLocaleString()}</span>
                            <span className="text-sm text-gray-400 line-through">₹{kit.originalPrice.toLocaleString()}</span>
                          </div>
                          <p className="text-[10px] font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Save ₹{(kit.originalPrice - kit.price).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleAddToCart(kit, e)}
                          className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-300 shrink-0 shadow-md hover:shadow-lg hover:scale-105 ${isAdded
                            ? 'bg-emerald-500 text-white'
                            : `bg-gradient-to-r ${kit.gradient} text-white`
                            }`}
                        >
                          {isAdded ? (
                            <><Check className="w-3.5 h-3.5" /> Added!</>
                          ) : (
                            <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareSakhiKits;
