import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, BookOpen, Droplets, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const EducationCare = () => {
  const careSteps = [
    {
      title: 'Before First Use',
      description: 'Sterilize by boiling in water for 5-10 minutes',
      icon: Droplets,
      color: 'text-blue-600'
    },
    {
      title: 'During Your Cycle',
      description: 'Rinse with cold water when emptying, wash with mild soap',
      icon: Shield,
      color: 'text-green-600'
    },
    {
      title: 'Between Cycles',
      description: 'Sterilize again and store in breathable cotton pouch',
      icon: CheckCircle,
      color: 'text-purple-600'
    }
  ];

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
              src="https://images.pexels.com/photos/7319069/pexels-photo-7319069.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Care & Maintenance"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-white bg-opacity-90 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Care Guide</span>
              </span>
            </div>
          </div>

          {/* Article Meta */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Care & Maintenance Guide
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="font-medium">CareSakhi Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>4 min read</span>
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
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-pink-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Keeping Your Products in Perfect Condition
              </h2>
              <p className="text-lg text-gray-700">
                Proper care ensures your reusable products last for years while maintaining hygiene and effectiveness.
              </p>
            </div>

            {/* Care Steps */}
            <div className="grid md:grid-cols-3 gap-6">
              {careSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="text-center bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <IconComponent className={`w-8 h-8 ${step.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Detailed Instructions */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Menstrual Cup Care</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Before First Use:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span>Sterilize by boiling in water for 5-10 minutes</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span>Let cool completely before use</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span>Wash your hands thoroughly</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">During Your Cycle:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span>Rinse with cold water when emptying</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span>Wash with mild, unscented soap</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <span>Reinsert or sterilize if cycle is complete</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Period Underwear Care</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Immediate Care:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>Rinse with cold water until water runs clear</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>Pre-treat any stains if necessary</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Washing & Drying:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>Machine wash in cold water</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>Air dry for best results</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                  Troubleshooting
                </h3>
                <p className="mb-4">
                  If you notice any discoloration, odor, or reduced effectiveness, here are some solutions:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Common Cup Issues:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <span><strong>Discoloration:</strong> Soak in hydrogen peroxide solution</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <span><strong>Odor:</strong> Boil for longer or try baking soda paste</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Underwear Issues:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <span><strong>Staining:</strong> Rinse immediately with cold water</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                        <span><strong>Reduced Absorbency:</strong> Avoid fabric softeners</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default EducationCare;