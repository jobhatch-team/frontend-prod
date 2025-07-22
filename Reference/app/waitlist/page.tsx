'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import AuthModal from '@/app/components/AuthModal';

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('waitlist');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Navigate to different pages based on tab
    switch (tab) {
      case 'home':
        router.push('/home');
        break;
      case 'download':
        router.push('/home'); // Navigate to home page with download tab
        setTimeout(() => {
          const event = new CustomEvent('setActiveTab', { detail: 'download' });
          window.dispatchEvent(event);
        }, 100);
        break;
      default:
        break;
    }
  };

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email.trim() && formData.name.trim()) {
      // Submit to Google Forms (using existing form structure)
      const form = new FormData();
      form.append('entry.1305314608', formData.email);   // Replace with actual entry ID
      form.append('entry.1788866372', formData.name);    // Replace with actual entry ID
      form.append('entry.1666390546', formData.message); // Replace with actual entry ID

      try {
        await fetch(
          'https://docs.google.com/forms/d/e/1FAIpQLSfKUxYaAAkRuK-DgvKI1W_IVo1OVGgZ8Fm9I6-2mEvEkO2fKw/formResponse',
          {
            method: 'POST',
            mode: 'no-cors',
            body: form,
          }
        );
      } catch (error) {
        console.log('Form submission completed');
      }

      setIsSubmitted(true);
    }
  };

  const handleShare = (platform: string) => {
    const url = 'https://www.jobhatch.pro';
    
    switch (platform) {
      case 'instagram':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard! Share it on Instagram.');
        break;
      case 'tiktok':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard! Share it on TikTok.');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200">
        {/* Header */}
        <Header 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onAuthClick={handleAuthClick}
        />

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-lightbulb text-orange-500 text-xl"></i>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">You're on the waitlist</h1>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              If you are interested in our product, type in here and we will hatch your dream job soon!
            </p>

            {/* Share Link */}
            <div className="bg-white rounded-full px-6 py-3 inline-flex items-center gap-3 shadow-sm mb-8">
              <span className="text-blue-500 font-medium">https://www.jobhatch.pro</span>
              <button 
                onClick={() => navigator.clipboard.writeText('https://www.jobhatch.pro')}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-copy"></i>
              </button>
            </div>

            <div className="text-gray-500 mb-6">or</div>

            {/* Share Buttons */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => handleShare('instagram')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
              >
                <i className="fab fa-instagram"></i>
                Share
              </button>
              <button
                onClick={() => handleShare('tiktok')}
                className="bg-black text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
              >
                <i className="fab fa-tiktok"></i>
                Share
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-shadow flex items-center gap-2"
              >
                <i className="fab fa-facebook-f"></i>
                Share
              </button>
            </div>
          </div>

          {/* Mascot Characters */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-4">
              {/* Placeholder for chick with gamepad */}
              <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 text-xs text-center">Chick with<br/>Gamepad</span>
              </div>
              {/* Placeholder for laptop */}
              <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                <i className="fas fa-laptop text-gray-400"></i>
              </div>
              {/* Placeholder for owl mentor */}
              <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-xs text-center">Owl<br/>Mentor</span>
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="text-center">
            <Image
              src="/LOGO.jpg"
              alt="JobHatch Logo"
              width={60}
              height={60}
              className="rounded-lg mx-auto mb-3"
            />
            <div className="text-2xl font-bold text-gray-800">JOBHATCH</div>
          </div>
        </main>

        {/* Footer - Second State */}
        <footer className="bg-blue-200 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Quick Link</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                  <li>Lorem Ipsum</li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Privacy Policy</li>
                  <li>Terms or Conditions of Use</li>
                  <li>Cookie Advertising Policy</li>
                </ul>
              </div>

              {/* Empty column for spacing */}
              <div></div>

              {/* Social Icons */}
              <div className="flex justify-end gap-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <i className="fab fa-tiktok text-white"></i>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <i className="fab fa-linkedin-in text-white"></i>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <i className="fab fa-instagram text-white"></i>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Learn More or Contribute?</h3>
              <div className="flex justify-center items-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your Email"
                  className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 font-medium">
                  Contact Us
                </button>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="text-center mt-8">
              <div className="flex justify-center items-center gap-2 text-blue-300">
                <span>❖</span>
                <span className="text-2xl">❖</span>
                <span>❖</span>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-6 text-sm text-gray-600">
              © 2026 JobHatch
            </div>
          </div>
        </footer>

        {/* Modals */}
        {showAuthModal && (
          <AuthModal
            mode={authMode}
            onClose={() => setShowAuthModal(false)}
            onModeChange={setAuthMode}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200">
      {/* Header */}
      <Header 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onAuthClick={handleAuthClick}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-lightbulb text-orange-500 text-xl"></i>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Join our waitlist</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            If you are interested in our product, type in here and we will hatch your dream job soon!
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <input
              type="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              placeholder="Enter Your Email"
              className="w-full max-w-sm px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 text-center"
              required
            />
            <input
              type="text"
              value={formData.name}
              onChange={handleChange}
              name="name"
              placeholder="Enter Your Name"
              className="w-full max-w-sm px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500 text-center"
              required
            />
            <textarea
              value={formData.message}
              onChange={handleChange}
              name="message"
              placeholder="Enter Your Message (Optional)"
              rows={4}
              className="w-full max-w-sm px-6 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:border-blue-500 text-center resize-none"
            />
            <button
              type="submit"
              className="w-full max-w-sm bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 font-semibold transition-colors"
            >
              Join the Waitlist
            </button>
          </form>
        </div>

        {/* Mascot Characters */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4">
            {/* Placeholder for chick with gamepad */}
            <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-xs text-center">Chick with<br/>Gamepad</span>
            </div>
            {/* Placeholder for laptop */}
            <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
              <i className="fas fa-laptop text-gray-400"></i>
            </div>
            {/* Placeholder for owl mentor */}
            <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xs text-center">Owl<br/>Mentor</span>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="text-center">
          <Image
            src="/LOGO.jpg"
            alt="JobHatch Logo"
            width={60}
            height={60}
            className="rounded-lg mx-auto mb-3"
          />
          <div className="text-2xl font-bold text-gray-800">JOBHATCH</div>
        </div>
      </main>

      {/* Footer - First State */}
      <footer className="bg-blue-200 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Quick Link</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
                <li>Lorem Ipsum</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Privacy Policy</li>
                <li>Terms or Conditions of Use</li>
                <li>Cookie Advertising Policy</li>
              </ul>
            </div>

            {/* Empty column for spacing */}
            <div></div>

            {/* Social Icons */}
            <div className="flex justify-end gap-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <i className="fab fa-tiktok text-white"></i>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="fab fa-linkedin-in text-white"></i>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <i className="fab fa-instagram text-white"></i>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Learn More or Contribute?</h3>
            <div className="flex justify-center items-center gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your Email"
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 font-medium">
                Contact Us
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="text-center mt-8">
            <div className="flex justify-center items-center gap-2 text-blue-300">
              <span>❖</span>
              <span className="text-2xl">❖</span>
              <span>❖</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-6 text-sm text-gray-600">
            © 2026 JobHatch
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onModeChange={setAuthMode}
        />
      )}
    </div>
  );
} 