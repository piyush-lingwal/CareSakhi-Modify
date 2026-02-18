import { ShoppingCart, Star, ArrowRight, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CareSakhiKits = () => {
  const { addItem } = useCart();

  const kits = [
    {
      id: 101,
      name: 'Heavy-Flow Kit',
      price: 1499,
      originalPrice: 1999,
      rating: 4.9,
      reviews: 2156,
      image: '/heavy flow kit.png',
      description: 'Everything you need for a complete sustainable period experience.',
      includes: ['1 Menstrual Cup', '2 High Absorbency Underwear', '3 Large Cloth Pads', 'Large Wet Bag', 'pH Balanced Wipes', 'Sanitizer'],
      badge: 'Most Popular',
      accent: 'from-rose-500 to-pink-600',
      accentLight: 'bg-rose-50 text-rose-600 border-rose-100',
    },
    {
      id: 102,
      name: 'Beginner Starter Kit',
      price: 999,
      originalPrice: 1500,
      rating: 4.8,
      reviews: 1834,
      image: '/beginners kit.png',
      description: 'The perfect kit for your first step into sustainable wellness.',
      includes: ['1 Menstrual Cup', '2 Period Underwear', '1 Cloth Pad', '1 Wet Bag', 'pH Balanced Wipes', 'Sanitizer', 'Guide'],
      badge: 'Best for Beginners',
      accent: 'from-emerald-500 to-teal-600',
      accentLight: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      id: 103,
      name: 'Post-Partum Kit',
      price: 1499,
      originalPrice: 1999,
      rating: 4.7,
      reviews: 1245,
      image: '/travel kit.png',
      description: 'Designed with care for the post-pregnancy recovery phase.',
      includes: ['1 Menstrual Cup', '3 Large Pads', '2 Period Underwear', 'Large Wet Bag', 'pH Balanced Wipes', 'Sanitizer', 'Wellness Guide'],
      badge: 'After Pregnancy',
      accent: 'from-sky-500 to-blue-600',
      accentLight: 'bg-sky-50 text-sky-600 border-sky-100',
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
      badge: 'Premium Choice',
      accent: 'from-violet-500 to-purple-600',
      accentLight: 'bg-violet-50 text-violet-600 border-violet-100',
    },
  ];

  const handleAddToCart = (kit: typeof kits[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ productId: kit.id, name: kit.name, price: kit.price, image: kit.image });
  };

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f7] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-100/40 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-pink-600 bg-pink-50 border border-pink-100 px-4 py-1.5 rounded-full mb-4">
            Curated Collections
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'DM Serif Display', serif" }}>
            CareSakhi Kits
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Thoughtfully designed bundles for every woman's unique needs — because wellness deserves to be personal.
          </p>
        </div>

        {/* Kits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {kits.map((kit) => {
            const savedPercent = Math.round(((kit.originalPrice - kit.price) / kit.originalPrice) * 100);
            return (
              <Link to={`/product/${kit.id}`} key={kit.id} className="group block">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden h-full flex flex-col hover:-translate-y-1">
                  {/* Image section */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-50">
                    <img
                      src={kit.image}
                      alt={kit.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`bg-gradient-to-r ${kit.accent} text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg tracking-wide`}>
                        {kit.badge}
                      </span>
                    </div>

                    {/* Discount badge */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                        {savedPercent}% OFF
                      </span>
                    </div>

                    {/* Quick action on hover */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-800 px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
                        View Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-grow">
                    {/* Title + Rating */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900" style={{ fontFamily: "'DM Serif Display', serif" }}>
                        {kit.name}
                      </h3>
                      <div className="flex items-center gap-1 shrink-0 ml-3">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-sm text-gray-800">{kit.rating}</span>
                        <span className="text-xs text-gray-400">({kit.reviews.toLocaleString()})</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-500 mb-5 leading-relaxed">{kit.description}</p>

                    {/* Includes — compact chip layout */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {kit.includes.map((item, idx) => (
                        <span key={idx} className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${kit.accentLight}`}>
                          <Check className="w-3 h-3" />
                          {item}
                        </span>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="mt-auto flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-gray-900">₹{kit.price.toLocaleString()}</span>
                          <span className="text-base text-gray-400 line-through">₹{kit.originalPrice.toLocaleString()}</span>
                        </div>
                        <p className="text-xs font-semibold text-emerald-600 mt-0.5">You save ₹{(kit.originalPrice - kit.price).toLocaleString()}</p>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(kit, e)}
                        className={`bg-gradient-to-r ${kit.accent} text-white px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 shrink-0`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CareSakhiKits;
