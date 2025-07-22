import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAuthClick: (mode: 'login' | 'signup') => void;
}

export default function Header({ activeTab, onTabChange, onAuthClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/LOGO.jpg"
              alt="JobHatch Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="ml-3 text-xl font-bold text-gray-900 font-baloo2">
              JOBHATCH
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onTabChange('home')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === 'home'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onTabChange('download')}
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                activeTab === 'download'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Download
            </button>
            <a
              href="/webapp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1"
            >
              Web App
              <i className="fas fa-external-link-alt text-xs"></i>
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onAuthClick('login')}
              className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              Log in
            </button>
            <button
              onClick={() => onAuthClick('signup')}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 font-medium text-sm transition-colors"
            >
              Sign up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-blue-600">
              <i className="fas fa-bars text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 