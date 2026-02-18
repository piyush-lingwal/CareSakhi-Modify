import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    products: ['Menstrual Cups', 'Period Underwear', 'Travel Kits', 'Accessories'],
    support: [
      { name: 'Size Guide', path: '/size-guide' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Contact Us', path: '/contact' }
    ],
    company: [
      { name: 'Our Story', path: '/about' },
      { name: 'Blog', path: '/blog' },
      { name: 'Careers', path: '/careers' },
      { name: 'Become a Partner', path: 'http://localhost:5173', external: true }
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy-policy' },
      { name: 'Terms of Service', path: '/terms-of-service' },
      { name: 'Return Policy', path: '/return-policy' },
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="bg-emerald-700 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Join the CareSakhi Community
            </h3>
            <p className="text-lg text-emerald-100 mb-8">
              Get exclusive offers, period tips, and be the first to know about new products.
            </p>

            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
              />
              <button className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <img
                src="/navbar logo3.png"
                alt="CareSakhi Logo"
                className="h-16 w-auto object-contain mb-4"
              />
              <p className="text-gray-300 text-sm leading-relaxed">
                Your trusted companion for sustainable and comfortable menstrual health.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4 text-emerald-400">Products</h4>
              <ul className="space-y-2">
                {footerLinks.products.map((link, index) => (
                  <li key={index}><a href="#" className="text-gray-300 hover:text-emerald-400 text-sm">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-emerald-400">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    {typeof link === 'object' ? (
                      <Link to={link.path} className="text-gray-300 hover:text-emerald-400 text-sm">{link.name}</Link>
                    ) : (
                      <a href="#" className="text-gray-300 hover:text-emerald-400 text-sm">{link}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-emerald-400">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    {typeof link === 'object' ? (
                      (link as any).external ? (
                        <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-emerald-400 text-sm">
                          {link.name}
                        </a>
                      ) : (
                        <Link to={link.path} className="text-gray-300 hover:text-emerald-400 text-sm">{link.name}</Link>
                      )
                    ) : (
                      <a href="#" className="text-gray-300 hover:text-emerald-400 text-sm">{link}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-emerald-400">Legal</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link to={link.path} className="text-gray-300 hover:text-emerald-400 text-sm">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-0">
              © 2025 CareSakhi. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a key={index} href={social.href} aria-label={social.label} className="text-gray-400 hover:text-white">
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
