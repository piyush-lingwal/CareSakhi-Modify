import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Download } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { state } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Period Tracker', href: '/period-tracker' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-md shadow-md z-50 border-b border-gray-100 h-20">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">

          <Link to="/" className="flex items-center group flex-shrink-0">
            <img
              src="/navbar logo3.png"
              alt="CareSakhi"
              loading="lazy"
              className="h-14 w-auto object-contain transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav role="navigation" className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link-desktop font-medium text-base px-4 py-2 rounded-full transition-all duration-150 ease-in-out active:scale-95 focus-visible:bg-pink-100 ${isActive(item.href) ? 'active bg-pink-50' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <a
                href="http://localhost:5173"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center space-x-2 border border-pink-200 text-pink-700 px-4 py-2 rounded-full font-medium text-sm hover:bg-pink-50 transition-colors"
              >
                Partner with Us
              </a>
              <a
                href="https://github.com/piyush-lingwal/Caresakhi/releases/download/v2.1/CareSakhi.Partner.2.1.apk"
                download="CareSakhi-App.apk"
                className="flex items-center space-x-2 bg-pink-600 text-white px-3 py-2 rounded-full font-medium text-sm hover:bg-pink-700 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download App</span>
              </a>
            </div>

            <Link to="/cart" aria-label="Cart" className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors rounded-full hover:bg-pink-50">
              <ShoppingCart className="w-5 h-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Desktop User/Auth - Myntra-style */}
            <div className="hidden lg:flex items-center">
              {user ? (
                <div
                  className="relative group"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  {/* Trigger */}
                  <div className="flex flex-col items-center px-3 py-1 cursor-pointer">
                    <User className="w-5 h-5 text-gray-700" />
                    <span className="text-[11px] font-bold text-gray-700 mt-0.5">Profile</span>
                    {/* Pink underline accent */}
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] bg-pink-500 rounded-full transition-all duration-200 ${isDropdownOpen ? 'w-10' : 'w-0'}`} />
                  </div>

                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full pt-1 z-50" style={{ width: '260px' }}>
                      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
                        {/* User info */}
                        <div className="px-5 py-4 border-b border-gray-100">
                          <p className="font-bold text-gray-900 text-[15px]">Hello {user.name?.split(' ')[0]}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                        </div>

                        {/* Section 1 */}
                        <div className="py-1.5 border-b border-gray-100">
                          <Link to="/account?tab=orders" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors font-medium">
                            Orders
                          </Link>
                          <Link to="/account?tab=wishlist" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors font-medium">
                            Wishlist
                          </Link>
                          <Link to="/account?tab=gift-cards" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors font-medium">
                            Gift Cards
                          </Link>
                          <Link to="/contact" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors font-medium">
                            Contact Us
                          </Link>
                        </div>

                        {/* Section 2 */}
                        <div className="py-1.5 border-b border-gray-100">
                          <Link to="/account?tab=coupons" onClick={() => setIsDropdownOpen(false)} className="flex items-center justify-between px-5 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors font-medium">
                            Coupons
                            <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full">NEW</span>
                          </Link>
                          <Link to="/account?tab=wallet" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors font-medium">
                            Wallet
                          </Link>
                          <Link to="/account?tab=saved-cards" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors font-medium">
                            Saved Cards
                          </Link>
                          <Link to="/account?tab=addresses" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors font-medium">
                            Saved Addresses
                          </Link>
                        </div>

                        {/* Section 3 */}
                        <div className="py-1.5">
                          <Link to="/account" onClick={() => setIsDropdownOpen(false)} className="flex items-center px-5 py-2.5 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors font-medium">
                            Edit Profile
                          </Link>
                          <button
                            onClick={() => { logout(); setIsDropdownOpen(false); }}
                            className="w-full text-left px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <Link to="/login" className="text-gray-700 font-medium text-base px-3 py-2 rounded-full hover:bg-gray-100">Login</Link>
                  <Link to="/register" className="bg-pink-600 text-white px-4 py-2 rounded-full font-medium text-base hover:bg-pink-700">Sign Up</Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle Mobile Menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 border-t border-gray-100 py-4 bg-white shadow-lg animate-fade-in">
            <nav className="space-y-2 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium ${isActive(item.href) ? 'bg-pink-50 text-pink-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-100 pt-4 mt-4 space-y-3">
                {user ? (
                  <>
                    <Link to="/account" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">My Account</Link>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg">Logout</button>
                  </>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center px-4 py-3 text-gray-700 bg-gray-100 rounded-lg">Login</Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex-1 text-center px-4 py-3 bg-pink-600 text-white rounded-lg font-medium">Sign Up</Link>
                  </div>
                )}
                <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center space-x-2 border border-pink-200 text-pink-700 px-4 py-3 rounded-lg font-medium hover:bg-pink-50 mb-3"><span>Partner with Us</span></a>
                <a href="https://github.com/piyush-lingwal/Caresakhi/releases/download/v2.1/CareSakhi.Partner.2.1.apk" download="CareSakhiPartner.apk" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center space-x-2 bg-pink-600 text-white px-4 py-3 rounded-lg font-medium"><Download className="w-5 h-5" /> <span>Download App</span></a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
