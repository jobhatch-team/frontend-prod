import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthModal from '@/features/auth/components/AuthModal';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/jobs') return 'jobs';
    if (path === '/download') return 'download';
    return '';
  };

  const activeTab = getActiveTab();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    closeMobileMenu();
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <img 
              src="/images/LOGO.jpg" 
              alt="JobHatch Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Baloo 2, cursive' }}>
              JOBHATCH
            </span>
          </Link>

          {/* Desktop Navigation */}
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

          {/* Desktop Auth and Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <Link 
              to="/" 
              onClick={closeMobileMenu}
              className={`${activeTab === 'home' ? 'text-blue-500 bg-blue-50 border-l-4 border-blue-500' : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'} block px-3 py-2 text-base font-medium transition-colors`}
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              onClick={closeMobileMenu}
              className={`${activeTab === 'jobs' ? 'text-blue-500 bg-blue-50 border-l-4 border-blue-500' : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'} block px-3 py-2 text-base font-medium transition-colors`}
            >
              Jobs
            </Link>
            <Link 
              to="/download" 
              onClick={closeMobileMenu}
              className={`${activeTab === 'download' ? 'text-blue-500 bg-blue-50 border-l-4 border-blue-500' : 'text-gray-600 hover:text-blue-500 hover:bg-gray-50'} block px-3 py-2 text-base font-medium transition-colors`}
            >
              Download
            </Link>
            <Link 
              to="/webapp" 
              onClick={closeMobileMenu}
              className="text-gray-600 hover:text-blue-500 hover:bg-gray-50 block px-3 py-2 text-base font-medium transition-colors"
            >
              <span className="inline-flex items-center space-x-1">
                <span>Web App</span>
                <i className="fas fa-external-link-alt text-xs"></i>
              </span>
            </Link>
            
            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <button
                onClick={() => openAuthModal('login')}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="w-full text-left px-3 py-2 text-base font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        defaultMode={authMode}
      />
    </header>
  );
};

export default Navbar;
  