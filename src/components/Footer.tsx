import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Contact form submitted with email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <img 
              src="/images/LOGO.jpg" 
              alt="JobHatch Logo" 
              className="w-12 h-12 rounded-lg"
            />
            <span 
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: 'Baloo 2, cursive' }}
            >
              JOBHATCH
            </span>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Quick Links */}
            <div className="text-left">
              <h3 className="font-bold text-blue-900 text-lg mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                🧭 Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="/webapp" 
                    className="text-gray-700 hover:text-blue-500 transition-colors"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    Web App
                  </a>
                </li>
                <li>
                  <a 
                    href="#download" 
                    className="text-gray-700 hover:text-blue-500 transition-colors"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    Download Mobile App
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="text-left">
              <h3 className="font-bold text-blue-900 text-lg mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                👥 Community
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#" 
                    className="text-gray-700 hover:text-blue-500 transition-colors"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    Ambassador Program
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-700 hover:text-blue-500 transition-colors"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    Refer a Friend
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="text-left">
              <h3 className="font-bold text-blue-900 text-lg mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                🏢 Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#about" 
                    className="text-gray-700 hover:text-blue-500 transition-colors"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-700 hover:text-blue-500 transition-colors"
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    Join Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media Eggs */}
            <div className="flex flex-col items-center">
              <div className="relative w-44 h-40 mb-4">
                <img 
                  src="/images/Tiktok.png" 
                  alt="TikTok" 
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-12 w-24 h-24 z-30 hover:scale-110 transition-transform cursor-pointer"
                />
                <img 
                  src="/images/Linkedln.png" 
                  alt="LinkedIn" 
                  className="absolute bottom-4 left-5 -rotate-12 w-28 h-20 z-20 hover:scale-110 transition-transform cursor-pointer"
                />
                <img 
                  src="/images/Ins.png" 
                  alt="Instagram" 
                  className="absolute bottom-2 right-5 rotate-12 w-20 h-20 z-20 hover:scale-110 transition-transform cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleContactSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
              style={{ fontFamily: 'Nunito, sans-serif' }}
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors w-full sm:w-auto"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Contact Us
            </button>
          </form>

          {/* Stars */}
          <div className="flex justify-center space-x-2 mb-8">
            {[...Array(3)].map((_, index) => (
              <span key={index} className="text-yellow-400 text-2xl">★</span>
            ))}
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-gray-600 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Designed with <i className="fas fa-heart text-red-500"></i> by the JobHatch Team
            </p>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Copyright &copy; 2025 L3 INNO INC
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  