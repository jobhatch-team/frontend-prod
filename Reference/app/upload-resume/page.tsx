'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import AuthModal from '../components/AuthModal';

export default function UploadResumePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') {
      router.push('/');
    } else if (tab === 'download') {
      router.push('/#download');
    }
  };

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.doc,.docx,.pdf';
    input.multiple = false;
    
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('File selected:', file.name);
        // Handle file upload logic here
        alert(`File "${file.name}" selected for upload!`);
      }
    };
    
    input.click();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onAuthClick={handleAuthClick}
      />
      
      {/* Main Content Area with light blue background */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-6 py-16">
        <div className="max-w-lg mx-auto text-center">
          {/* Upload Icon */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-orange-400 rounded-full mx-auto flex items-center justify-center mb-4">
              <span className="text-2xl text-white">📂</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-12">Upload your resume</h1>

          {/* Upload Button */}
          <button
            onClick={handleFileUpload}
            className="bg-white border-2 border-blue-400 text-blue-500 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors font-semibold text-lg mb-6"
          >
            upload resume
          </button>

          {/* File Format Info */}
          <p className="text-gray-600 text-sm">
            DOC, DOCX, PDF (2MB)
          </p>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Bottom Section with Mascots and Blue Gradient - matching design */}
      <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 relative">
        {/* Wave Effect */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200" 
             style={{
               clipPath: 'ellipse(100% 100% at 50% 0%)'
             }}>
        </div>
        
        <div className="relative pt-16 pb-8 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Mascot Characters */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                {/* Chick with gaming controller */}
                <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center relative">
                  <span className="text-2xl">🐥</span>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                    <span className="text-xs">🎮</span>
                  </div>
                </div>
                
                {/* Laptop */}
                <div className="w-12 h-8 bg-gray-300 rounded-sm flex items-center justify-center">
                  <div className="w-8 h-5 bg-gray-100 rounded-sm"></div>
                </div>
                
                {/* Owl with glasses */}
                <div className="w-16 h-16 bg-amber-700 rounded-full flex items-center justify-center relative">
                  <span className="text-2xl">🦉</span>
                  <div className="absolute -top-1 w-12 h-6 border-2 border-black rounded-full bg-transparent"></div>
                </div>
              </div>
            </div>

            {/* JobHatch Logo */}
            <div className="text-center mb-12">
              <div className="w-12 h-12 bg-amber-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <span className="text-white font-bold text-lg">JH</span>
              </div>
              <h3 className="text-2xl font-bold text-white">JOBHATCH</h3>
            </div>

            {/* Footer Content */}
            <div className="grid md:grid-cols-3 gap-8 text-white">
              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Quick Link</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm opacity-90">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Conditions of Use</li>
                  <li>Cookie Advertising Policy</li>
                </ul>
              </div>

              {/* Social Icons */}
              <div className="flex justify-center md:justify-end items-start">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📧</span>
                  </div>
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">in</span>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📷</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learn More Section */}
            <div className="text-center mt-12 mb-8">
              <h4 className="text-lg font-semibold text-white mb-4">Learn More or Contribute?</h4>
              <div className="flex justify-center gap-3">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="px-4 py-2 rounded-lg text-gray-800 flex-1 max-w-xs"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                  Contact Us
                </button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="text-center text-white opacity-60 mb-4">
              <div className="flex justify-center gap-2 mb-4">
                <span>✦</span>
                <span>◆</span>
                <span>✦</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-white text-sm opacity-75">
              © 2025 JobHatch
            </div>
          </div>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onModeChange={(mode: 'login' | 'signup') => setAuthMode(mode)}
        />
      )}
    </div>
  );
} 