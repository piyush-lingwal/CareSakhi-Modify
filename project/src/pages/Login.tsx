import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  const rotatingWords = ['Your Wellness', 'Eco-Friendly', 'Chemical-Free', 'Sustainable'];

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/account';

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextVisible(false);
      setTimeout(() => {
        setTextIndex(prev => (prev + 1) % rotatingWords.length);
        setTextVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(formData.email, formData.password);
    if (success) navigate(from, { replace: true });
    else setError('Invalid email or password');
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white relative">
      {/* Back */}
      <Link to="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Home</span>
      </Link>

      {/* Soft organic background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-pink-100/80 transition-all duration-[2000ms] ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
        <div className={`absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-50/80 transition-all duration-[2500ms] delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
        <div className={`absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-rose-50/60 transition-all duration-[2000ms] delay-500 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
      </div>

      {/* Left: Brand */}
      <div className={`hidden lg:flex lg:w-1/2 flex-col items-center justify-center relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
        <div className="text-center px-16 max-w-lg">
          <div className="mb-10">
            <img src="/navbar logo2.png" alt="CareSakhi" className="h-28 w-auto mx-auto mb-8" />
          </div>

          <h1 className="text-6xl font-extrabold text-black-200 leading-[1.05] tracking-tight mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
            <span
              className={`block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent transition-all duration-300 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
              style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' }}
            >
              {rotatingWords[textIndex]}
            </span>
            Partner
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed max-w-sm mx-auto mb-10 font-light tracking-wide">
            Sustainable period care for a healthier you and a better planet
          </p>

          <div className="flex items-center justify-center gap-5">
            {['50K+ Users', '4.9★ Rated', '100% Eco'].map((badge, i) => (
              <span
                key={i}
                className={`px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs font-semibold tracking-wider uppercase text-gray-500 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                style={{ transitionDelay: `${800 + i * 120}ms` }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className={`w-full lg:w-1/2 flex items-center justify-center relative z-10 p-8 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img src="/navbar logo2.png" alt="CareSakhi" className="h-16 w-auto mx-auto" />
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>Welcome back</h2>
          <p className="text-gray-400 mb-8 font-light tracking-wide">Sign in to your account</p>

          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all duration-200 pr-12"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-pink-200/60 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed group mt-2"
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Signing in...</>
                ) : (
                  <>Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                )}
              </span>
            </button>
          </form>

          <p className="mt-8 text-center text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-pink-500 hover:text-pink-600 transition-colors">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
