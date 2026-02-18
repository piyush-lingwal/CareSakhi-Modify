import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2, BookOpen } from 'lucide-react';

const EducationDetail = () => {
  const { slug } = useParams();

  const educationContent = {
    'how-menstrual-cups-work': {
      title: 'How Menstrual Cups Work',
      duration: '3 min read',
      author: 'Dr. Sarah Johnson',
      image: 'https://images.pexels.com/photos/7319070/pexels-photo-7319070.jpeg?auto=compress&cs=tinysrgb&w=800',
      content: `
        <h2>Understanding Menstrual Cups</h2>
        <p>Menstrual cups are revolutionary period products that collect rather than absorb menstrual fluid. Made from medical-grade silicone, they offer a sustainable and comfortable alternative to traditional tampons and pads.</p>

        <h3>The Science Behind Collection</h3>
        <p>Unlike tampons that absorb fluid and can disrupt your body's natural pH balance, menstrual cups simply collect the fluid in a small, flexible cup. This method:</p>
        <ul>
          <li>Maintains your body's natural moisture balance</li>
          <li>Reduces risk of infections like TSS (Toxic Shock Syndrome)</li>
          <li>Allows for longer wear time (up to 12 hours)</li>
          <li>Provides leak-proof protection when properly inserted</li>
        </ul>

        <h3>Material Safety</h3>
        <p>Our cups are made from 100% medical-grade silicone, the same material used in medical implants. This ensures:</p>
        <ul>
          <li>Biocompatibility with your body</li>
          <li>No harmful chemicals or bleaches</li>
          <li>Durability for years of use</li>
          <li>Easy sterilization and cleaning</li>
        </ul>

        <h3>Environmental Impact</h3>
        <p>One menstrual cup can replace thousands of disposable products over its 5-10 year lifespan, making it one of the most environmentally friendly period solutions available.</p>
      `
    },
    'sizing-guide': {
      title: 'Sizing Guide',
      duration: '2 min read',
      author: 'CareSakhi Team',
      image: 'https://images.pexels.com/photos/7262708/pexels-photo-7262708.jpeg?auto=compress&cs=tinysrgb&w=800',
      content: `
        <h2>Finding Your Perfect Fit</h2>
        <p>Choosing the right size is crucial for comfort and effectiveness. Our sizing guide helps you make the best choice for your body and lifestyle.</p>

        <h3>Menstrual Cup Sizing</h3>
        <p>Cup sizing is primarily based on:</p>
        <ul>
          <li><strong>Age:</strong> Generally, those under 30 choose smaller sizes</li>
          <li><strong>Childbirth history:</strong> Vaginal births may require larger sizes</li>
          <li><strong>Cervix height:</strong> Low cervix may need shorter cups</li>
          <li><strong>Flow intensity:</strong> Heavy flow may benefit from larger capacity</li>
        </ul>

        <h3>Period Underwear Sizing</h3>
        <p>For optimal protection and comfort:</p>
        <ul>
          <li>Measure your waist and hips accurately</li>
          <li>Choose a snug fit for best leak protection</li>
          <li>Consider sizing up if between sizes for comfort</li>
          <li>Check our size chart for specific measurements</li>
        </ul>

        <h3>Still Unsure?</h3>
        <p>Our customer service team is here to help! We offer personalized sizing consultations and easy exchanges if needed.</p>
      `
    },
    'care--maintenance': {
      title: 'Care & Maintenance',
      duration: '4 min read',
      author: 'CareSakhi Team',
      image: 'https://images.pexels.com/photos/7319069/pexels-photo-7319069.jpeg?auto=compress&cs=tinysrgb&w=800',
      content: `
        <h2>Keeping Your Products in Perfect Condition</h2>
        <p>Proper care ensures your reusable products last for years while maintaining hygiene and effectiveness.</p>

        <h3>Menstrual Cup Care</h3>
        <h4>Before First Use:</h4>
        <ul>
          <li>Sterilize by boiling in water for 5-10 minutes</li>
          <li>Let cool completely before use</li>
          <li>Wash your hands thoroughly</li>
        </ul>

        <h4>During Your Cycle:</h4>
        <ul>
          <li>Rinse with cold water when emptying</li>
          <li>Wash with mild, unscented soap</li>
          <li>Reinsert or sterilize if cycle is complete</li>
        </ul>

        <h4>Between Cycles:</h4>
        <ul>
          <li>Sterilize by boiling for 5-10 minutes</li>
          <li>Store in breathable cotton pouch</li>
          <li>Never store in airtight containers</li>
        </ul>

        <h3>Period Underwear Care</h3>
        <h4>Immediate Care:</h4>
        <ul>
          <li>Rinse with cold water until water runs clear</li>
          <li>Pre-treat any stains if necessary</li>
        </ul>

        <h4>Washing:</h4>
        <ul>
          <li>Machine wash in cold water</li>
          <li>Use regular detergent (no fabric softener)</li>
          <li>Wash with similar colors</li>
        </ul>

        <h4>Drying:</h4>
        <ul>
          <li>Air dry for best results</li>
          <li>Avoid high heat from dryers</li>
          <li>Lay flat or hang to maintain shape</li>
        </ul>

        <h3>Troubleshooting</h3>
        <p>If you notice any discoloration, odor, or reduced effectiveness, contact our support team for guidance on whether replacement is needed.</p>
      `
    }
  };

  const content = educationContent[slug] || educationContent['how-menstrual-cups-work'];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Back to Education */}
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
              src={content.image}
              alt={content.title}
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
              {content.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{content.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{content.duration}</span>
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
          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: content.content }}
              className="text-gray-700 leading-relaxed"
            />
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-start space-x-4">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
                alt={content.author}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{content.author}</h3>
                <p className="text-gray-600 leading-relaxed">
                  Expert in women's health and sustainable menstrual products, dedicated to educating 
                  women about safe and eco-friendly period care options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default EducationDetail;