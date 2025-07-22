import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaExternalLinkAlt, FaHeart } from 'react-icons/fa';

const JoinUsBuilderPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Inter']">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center text-gray-900 no-underline">
              <img 
                src="/images/LOGO.jpg" 
                alt="JobHatch Logo" 
                className="h-10 w-auto mr-2"
              />
              <span className="text-xl font-bold">JOBHATCH</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/#home" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link to="/#download" className="text-gray-600 hover:text-gray-900 transition-colors">
                Download
              </Link>
              <Link to="/webapp" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1">
                Web App
                <FaExternalLinkAlt className="text-sm" />
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLogin}
                className="text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-full"
              >
                Log in
              </button>
              <button 
                onClick={handleSignup}
                className="bg-orange-400 text-white px-6 py-2 rounded-full hover:bg-orange-500 transition-colors"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="text-center py-20 px-5">
        <div className="max-w-2xl mx-auto">
          {/* Character Image */}
          <img 
            src="/images/chick-pc-owl.png" 
            alt="Chick and Owl Characters" 
            className="w-60 h-auto mx-auto mb-8"
          />

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
            JobHatch Early Access
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Join us and hatch your dream job soon!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4">
            <a 
              href="https://discord.com/invite/Pf2uX2s8Jw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-colors min-w-[220px] no-underline"
            >
              Join our Discord Group
            </a>
            <a 
              href="https://chat.whatsapp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors min-w-[220px] no-underline"
            >
              Join our WhatsApp Group
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-sky-200 to-sky-300 py-16 px-5 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Logo Section */}
          <div className="text-center mb-12">
            <img 
              src="/images/LOGO.jpg" 
              alt="JobHatch Logo" 
              className="w-12 h-12 mx-auto mb-2"
            />
            <div className="text-xl font-bold text-gray-900">JOBHATCH</div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">🧭 Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/webapp" className="text-gray-600 hover:text-gray-900 transition-colors no-underline">
                    Web App
                  </Link>
                </li>
                <li>
                  <Link to="/#download" className="text-gray-600 hover:text-gray-900 transition-colors no-underline">
                    Download Mobile App
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">👥 Community</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors no-underline">
                    Ambassador Program
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors no-underline">
                    Refer a Friend
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">🏢 Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/#about" className="text-gray-600 hover:text-gray-900 transition-colors no-underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors no-underline">
                    Join Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center items-center mb-8">
            <div className="relative w-48 h-44">
              <img 
                src="/images/Tiktok.png" 
                alt="Tiktok" 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-12 w-24 h-24 z-30"
              />
              <img 
                src="/images/Linkedln.png" 
                alt="LinkedIn" 
                className="absolute bottom-5 left-6 transform -rotate-12 w-26 h-20 z-20"
              />
              <img 
                src="/images/Ins.png" 
                alt="Instagram" 
                className="absolute bottom-2 right-6 transform rotate-12 w-20 h-20 z-20"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="text-center mb-8">
            <form className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your Email" 
                className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="bg-orange-400 text-white px-6 py-3 rounded-full hover:bg-orange-500 transition-colors"
              >
                Contact Us
              </button>
            </form>
          </div>

          {/* Stars */}
          <div className="text-center mb-6">
            <span className="text-yellow-400 text-2xl">★★★</span>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">
              Designed with <FaHeart className="inline text-red-500" /> by the JobHatch Team
            </p>
            <p>Copyright © 2025 L3 INNO INC</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JoinUsBuilderPage; 