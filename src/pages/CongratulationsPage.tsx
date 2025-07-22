import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/reduxHooks';
import ProfileButton from '@/features/auth/components/ProfileButton';

const CongratulationsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/jobs') return 'jobs';
    if (path === '/download') return 'download';
    return '';
  };

  const activeTab = getActiveTab();

  const handleContinue = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/images/LOGO.jpg" 
                alt="JobHatch Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Baloo 2, cursive' }}>
                JOBHATCH
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`tab-link ${activeTab === 'home' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-500'} px-3 py-2 text-sm font-medium transition-colors`}
              >
                Home
              </Link>
              <Link 
                to="/jobs" 
                className={`tab-link ${activeTab === 'jobs' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-500'} px-3 py-2 text-sm font-medium transition-colors`}
              >
                Jobs
              </Link>
              <Link 
                to="/download" 
                className={`tab-link ${activeTab === 'download' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600 hover:text-blue-500'} px-3 py-2 text-sm font-medium transition-colors`}
              >
                Download
              </Link>
              <Link 
                to="/webapp" 
                className="app-link text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium transition-colors inline-flex items-center space-x-1"
              >
                <span>Web App</span>
                <i className="fas fa-external-link-alt text-xs"></i>
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <ProfileButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        {/* Party Celebration Icon */}
        <div className="mb-8">
          <img
            src="/images/Celebrate.png"
            alt="Celebration"
            className="w-32 h-32 mx-auto object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-blue-900 mb-6">
          Congratulations!
        </h1>
        
        <p className="text-gray-600 text-lg mb-12 text-center max-w-md">
          Thank you for joining us! Now you can enjoy your career journey at JOBHATCH
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-12 rounded-lg transition-colors text-lg mb-16"
        >
          Continue
        </button>

        {/* Cute Characters */}
        <div className="flex justify-center items-center">
          <img
            src="/images/chick-pc-owl.png"
            alt="JobHatch Chick and Owl Characters"
            className="w-64 h-64 object-contain"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-200 mt-auto">
        <div className="max-w-6xl mx-auto px-8 py-12">
          {/* JobHatch Logo */}
          <div className="text-center mb-8">
            <img 
              src="/images/LOGO.jpg" 
              alt="JobHatch Logo" 
              className="h-10 w-auto mx-auto mb-2"
            />
            <h3 className="text-2xl font-bold text-blue-900">JOBHATCH</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-blue-900 mb-4">Quick Link</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-blue-800 hover:text-blue-900">Home</Link></li>
                <li><Link to="/jobs" className="text-blue-800 hover:text-blue-900">Jobs</Link></li>
                <li><Link to="/resumes" className="text-blue-800 hover:text-blue-900">Resumes</Link></li>
                <li><Link to="/webapp" className="text-blue-800 hover:text-blue-900">Web App</Link></li>
                <li><Link to="/phone-demo" className="text-blue-800 hover:text-blue-900">Phone Demo</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-blue-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/webapp" className="text-blue-800 hover:text-blue-900">Documentation</Link></li>
                <li><Link to="/webapp" className="text-blue-800 hover:text-blue-900">Technical blog</Link></li>
                <li><Link to="/webapp" className="text-blue-800 hover:text-blue-900">Release note</Link></li>
                <li><Link to="/webapp" className="text-blue-800 hover:text-blue-900">Cookie Advertising</Link></li>
                <li><Link to="/webapp" className="text-blue-800 hover:text-blue-900">Cookie Preferences</Link></li>
              </ul>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-end items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.404-5.966 1.404-5.966s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="text-center mb-8">
            <p className="text-blue-900 font-semibold mb-4">Learn More or Contribute?</p>
            <div className="flex justify-center items-center space-x-4">
              <input
                type="email"
                placeholder="Your your Email"
                className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold">
                Subscribe
              </button>
            </div>
          </div>

          {/* Decorative stars */}
          <div className="text-center">
            <div className="inline-flex space-x-2 text-blue-400">
              <span className="text-2xl">✦</span>
              <span className="text-lg">✧</span>
              <span className="text-xl">✦</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 text-blue-800 text-sm">
            © 2023 - JobHatch
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CongratulationsPage; 