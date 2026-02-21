import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import SuccessAlert from './components/SuccessAlert';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderConfirmation from './pages/OrderConfirmation';
import PeriodTracker from './pages/PeriodTracker';
import Wallet from './pages/Wallet';
import NotFound from './pages/NotFound';
import SizeGuide from './pages/SizeGuide';
import HowToUse from './pages/HowToUse';
import CareInstructions from './pages/CareInstructions';
import FAQ from './pages/FAQ';
import Reviews from './pages/Reviews';
import Sustainability from './pages/Sustainability';
import Careers from './pages/Careers';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ShippingPolicy from './pages/ShippingPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import Accessibility from './pages/Accessibility';
import EducationDetail from './pages/EducationDetail';
import EducationCupGuide from './pages/EducationCupGuide';
import EducationSizing from './pages/EducationSizing';
import EducationCare from './pages/EducationCare';

const HIDE_CHROME_PAGES = ['/login', '/register'];

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppContent = () => {
  const { successMessage, setSuccessMessage } = useCart();
  const location = useLocation();
  const isAuthPage = HIDE_CHROME_PAGES.includes(location.pathname);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScrollToTop />
      {!isAuthPage && <Header />}
      {successMessage && <SuccessAlert message={successMessage} onClose={() => setSuccessMessage(null)} />}
      <main className={`flex-1 ${isAuthPage ? '' : 'pt-20'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/period-tracker" element={<PeriodTracker />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route path="/how-to-use" element={<HowToUse />} />
          <Route path="/care-instructions" element={<CareInstructions />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/education/:slug" element={<EducationDetail />} />
          <Route path="/education/cup-guide" element={<EducationCupGuide />} />
          <Route path="/education/sizing" element={<EducationSizing />} />
          <Route path="/education/care" element={<EducationCare />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <AppContent />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
