import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, BookOpen, Ruler, Target, Users } from 'lucide-react';

const EducationSizing = () => {
  const cupSizes = [
    {
      size: 'Small',
      diameter: '40mm',
      length: '45mm',
      capacity: '25ml',
      recommended: 'Under 30, no vaginal births',
      color: 'bg-pink-100 text-pink-800'
    },
    {
      size: 'Medium',
      diameter: '43mm',
      length: '50mm',
      capacity: '30ml',
      recommended: 'Over 30 or vaginal births',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      size: 'Large',
      diameter: '46mm',
      length: '55mm',
      capacity: '35ml',
      recommended: 'Heavy flow or larger anatomy',
      color: 'bg-blue-100 text-blue-800'
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
              src="https://images.pexels.com/photos/7262708/pexels-photo-7262708.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Sizing Guide"
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-white bg-opacity-90 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Sizing Guide</span>
              </span>
            </div>
          </div>

          {/* Article Meta */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Complete Sizing Guide
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="font-medium">CareSakhi Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>2 min read</span>
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2 text-pink-600" />
                Finding Your Perfect Fit
              </h2>
              <p className="text-lg text-gray-700">
                Choosing the right size is crucial for comfort and effectiveness. Our sizing guide helps you make the best choice for your body and lifestyle.
              </p>
            </div>

            {/* Cup Sizes */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Ruler className="w-5 h-5 mr-2 text-emerald-600" />
                Menstrual Cup Sizing
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {cupSizes.map((cup, index) => (
                  <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${cup.color}`}>
                      Size {cup.size}
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Diameter:</span>
                        <span className="font-semibold">{cup.diameter}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Length:</span>
                        <span className="font-semibold">{cup.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacity:</span>
                        <span className="font-semibold">{cup.capacity}</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Recommended for:</strong> {cup.recommended}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Sizing Factors</h3>
              <p className="mb-4">Cup sizing is primarily based on:</p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Age:</strong> Generally, those under 30 choose smaller sizes
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Childbirth history:</strong> Vaginal births may require larger sizes
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Cervix height:</strong> Low cervix may need shorter cups
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <strong>Flow intensity:</strong> Heavy flow may benefit from larger capacity
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-green-600" />
                Still Unsure?
              </h3>
              <p className="mb-4">
                Our customer service team is here to help! We offer personalized sizing consultations and easy exchanges if needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Get Sizing Help
                </button>
                <Link to="/size-guide" className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors text-center">
                  View Full Size Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default EducationSizing;