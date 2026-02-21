import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, ArrowLeft, Check, Mail, RotateCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  // OTP verification state
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const rotatingWords = ['Wellness Journey', 'Healthier Future', 'Eco Revolution', 'Better Period Care', 'Sustainable Life'];

  const { register, verifyOtp, resendOtp } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

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

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.name.trim()) { setError('Please enter your name'); return; }
    if (!formData.email.includes('@')) { setError('Please enter a valid email'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return; }
    if (!formData.terms) { setError('Please accept the terms'); return; }

    setSubmitting(true);
    const result = await register(formData.name, formData.email, formData.password);
    if (result === 'success') {
      // New user created, show OTP verification step
      setShowOtpStep(true);
      setResendCooldown(60);
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } else if (result === 'exists') {
      // User already registered but unconfirmed — resend OTP and show verification
      await resendOtp(formData.email);
      setShowOtpStep(true);
      setResendCooldown(60);
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } else {
      setError('Registration failed. Please try again.');
    }
    setSubmitting(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    // Focus last filled or next empty
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerifyOtp = async () => {
    const code = otp.join('');
    if (code.length !== 6) { setOtpError('Please enter the full 6-digit code'); return; }

    setOtpError('');
    setVerifying(true);
    const success = await verifyOtp(formData.email, code);
    setVerifying(false);

    if (success) {
      navigate('/account');
    } else {
      setOtpError('Invalid or expired code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    const success = await resendOtp(formData.email);
    if (success) {
      setResendCooldown(60);
      setOtpError('');
    } else {
      setOtpError('Failed to resend. Please try again later.');
    }
  };

  const getStrength = () => {
    const p = formData.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) s++;
    return s;
  };
  const strength = getStrength();
  const strengthLabel = ['', 'Weak', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'bg-red-400', 'bg-yellow-400', 'bg-green-400'][strength];

  return (
    <div className="h-screen w-full flex overflow-hidden bg-white relative">
      {/* Back */}
      <Link to="/" className="absolute top-6 left-6 z-20 flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors group">
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Home</span>
      </Link>

      {/* Soft organic background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-100/70 transition-all duration-[2000ms] ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
        <div className={`absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-pink-50/80 transition-all duration-[2500ms] delay-300 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
        <div className={`absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-fuchsia-50/50 transition-all duration-[2000ms] delay-500 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
      </div>

      {/* Left: Brand */}
      <div className={`hidden lg:flex lg:w-[45%] flex-col items-center justify-center relative z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
        <div className="text-center px-16 max-w-lg">
          <img src="/navbar logo2.png" alt="CareSakhi" className="h-24 w-auto mx-auto mb-8" />

          <h1 className="text-5xl font-extrabold text-purple-800 leading-[1.05] tracking-tight mb-6" style={{ fontFamily: "'DM Serif Display', serif" }}>
            Start your
            <span
              className={`block bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent transition-all duration-300 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}
              style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic' }}
            >
              {rotatingWords[textIndex]}
            </span>
          </h1>

          <p className="text-lg text-gray-400 leading-relaxed max-w-sm mx-auto mb-10 font-light tracking-wide">
            Join thousands of women choosing sustainable care
          </p>

          <div className="space-y-3 text-left max-w-xs mx-auto">
            {['Eco-friendly products', 'Period health tracking', 'Exclusive member deals'].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-700 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                style={{ transitionDelay: `${800 + i * 150}ms` }}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-gray-500 text-sm font-light">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form / OTP */}
      <div className={`w-full lg:w-[55%] flex items-center justify-center relative z-10 p-6 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
        <div className="w-full max-w-lg">
          <div className="lg:hidden text-center mb-5">
            <img src="/navbar logo2.png" alt="CareSakhi" className="h-14 w-auto mx-auto" />
          </div>

          {/* ─── OTP VERIFICATION STEP ─── */}
          {showOtpStep ? (
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-50 rounded-2xl mb-6">
                <Mail className="w-8 h-8 text-pink-500" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>
                Verify your email
              </h2>
              <p className="text-gray-400 text-sm mb-2 font-light tracking-wide">
                We sent a 6-digit code to
              </p>
              <p className="text-gray-900 font-semibold mb-8">{formData.email}</p>

              {otpError && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-sm text-red-600 font-medium">{otpError}</p>
                </div>
              )}

              {/* OTP Input Boxes */}
              <div className="flex justify-center gap-3 mb-8" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={el => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 focus:outline-none transition-all duration-200 ${digit
                      ? 'border-pink-400 bg-pink-50/30 text-gray-900'
                      : 'border-gray-200 bg-gray-50 text-gray-400'
                      } focus:border-pink-500 focus:ring-4 focus:ring-pink-100`}
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                onClick={handleVerifyOtp}
                disabled={verifying || otp.join('').length !== 6}
                className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-pink-200/60 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
              >
                {verifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Verifying...
                  </span>
                ) : (
                  'Verify & Create Account'
                )}
              </button>

              {/* Resend */}
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-gray-400">Didn't receive the code?</span>
                {resendCooldown > 0 ? (
                  <span className="text-gray-400 font-medium">Resend in {resendCooldown}s</span>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-pink-500 hover:text-pink-600 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    Resend Code
                  </button>
                )}
              </div>

              {/* Change email */}
              <button
                onClick={() => { setShowOtpStep(false); setOtp(['', '', '', '', '', '']); setOtpError(''); }}
                className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            /* ─── REGISTRATION FORM ─── */
            <>
              <h2 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: "'DM Serif Display', serif" }}>Create account</h2>
              <p className="text-gray-400 text-sm mb-6 font-light tracking-wide">Join CareSakhi today</p>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-sm text-red-600 font-medium">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all duration-200"
                      placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all duration-200"
                      placeholder="you@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Password</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all duration-200 pr-11"
                        placeholder="••••••••" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Confirm</label>
                    <div className="relative">
                      <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white focus:ring-4 focus:ring-pink-50 transition-all duration-200 pr-11"
                        placeholder="••••••••" />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {formData.password && (
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1, 2, 3].map(level => (
                        <div key={level} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${strength >= level ? strengthColor : 'bg-gray-200'}`}></div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{strengthLabel}</span>
                  </div>
                )}

                <label className="flex items-start gap-3 cursor-pointer pt-1">
                  <div className="relative mt-0.5">
                    <input type="checkbox" name="terms" checked={formData.terms} onChange={handleInputChange} className="sr-only peer" />
                    <div className="w-5 h-5 rounded-md border-2 border-gray-300 peer-checked:border-pink-500 peer-checked:bg-pink-500 transition-all duration-200 flex items-center justify-center">
                      {formData.terms && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    I agree to the{' '}
                    <Link to="/terms-of-service" className="text-pink-500 hover:text-pink-600 font-medium">Terms</Link>
                    {' '}and{' '}
                    <Link to="/privacy-policy" className="text-pink-500 hover:text-pink-600 font-medium">Privacy Policy</Link>
                  </span>
                </label>

                <button type="submit" disabled={submitting}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-pink-200/60 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed group mt-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    {submitting ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Creating account...</>
                    ) : (
                      <>Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </span>
                </button>
              </form>

              <p className="mt-6 text-center text-gray-500 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-pink-500 hover:text-pink-600 transition-colors">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
