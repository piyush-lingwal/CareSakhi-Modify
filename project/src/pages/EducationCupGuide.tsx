import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, BookOpen, Droplets, Shield, Heart } from 'lucide-react';

const EducationCupGuide = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Back to Home */}
      <div className="container mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative mb-8">
            <img
              src="https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="How Menstrual Cups Work"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-white bg-opacity-90 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Education</span>
              </span>
            </div>
          </div>

          {/* Article Meta */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              How Menstrual Cups Work
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="font-medium">Dr. Sarah Johnson</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>3 min read</span>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center space-x-4 pb-8 border-b border-gray-200">
              <span className="text-gray-600 font-medium">Share:</span>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Droplets className="w-6 h-6 mr-2 text-blue-600" />
                Understanding Menstrual Cups
              </h2>
              <p className="text-lg">
                Menstrual cups are revolutionary period products that collect rather than absorb menstrual fluid. Made from medical-grade silicone, they offer a sustainable and comfortable alternative to traditional tampons and pads.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800">The Science Behind Collection</h3>
            <p>
              Unlike tampons that absorb fluid and can disrupt your body's natural pH balance, menstrual cups simply collect the fluid in a small, flexible cup. This method:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                <span>Maintains your body's natural moisture balance</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                <span>Reduces risk of infections like TSS (Toxic Shock Syndrome)</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                <span>Allows for longer wear time (up to 12 hours)</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                <span>Provides leak-proof protection when properly inserted</span>
              </li>
            </ul>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-green-600" />
                Material Safety
              </h3>
              <p className="mb-4">
                Our cups are made from 100% medical-grade silicone, the same material used in medical implants. This ensures:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Biocompatibility with your body</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>No harmful chemicals or bleaches</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Durability for years of use</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span>Easy sterilization and cleaning</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-gray-800">Environmental Impact</h3>
            <p>
              One menstrual cup can replace thousands of disposable products over its 5-10 year lifespan, making it one of the most environmentally friendly period solutions available. By choosing a menstrual cup, you're not just making a personal health choice – you're contributing to a more sustainable future.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Getting Started</h3>
              <p className="mb-4">
                Ready to make the switch? Here are some tips for beginners:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Start with our sizing guide to find your perfect fit</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Practice insertion and removal when you're not on your period</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Be patient – it may take a few cycles to get comfortable</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Don't hesitate to contact our support team for guidance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-start space-x-4">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt="Dr. Sarah Johnson"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Dr. Sarah Johnson</h3>
                <p className="text-gray-600 leading-relaxed">
                  Dr. Sarah Johnson is a women's health specialist and the founder of CareSakhi. 
                  With over 15 years of experience in gynecology, she's passionate about educating 
                  women about menstrual health and sustainable period products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default EducationCupGuide;