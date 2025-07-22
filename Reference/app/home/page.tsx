'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import HeroSection from '@/app/components/HeroSection';
import HowItWorksSection from '@/app/components/HowItWorksSection';
import AboutSection from '@/app/components/AboutSection';
import TestimonialsSection from '@/app/components/TestimonialsSection';
import DownloadSection from '@/app/components/DownloadSection';
import Footer from '@/app/components/Footer';
import AuthModal from '@/app/components/AuthModal';


export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleGetStarted = () => {
    console.log('Get Started button clicked');
    router.push('/onboarding');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onAuthClick={handleAuthClick}
      />
      
      <main>
        {activeTab === 'home' && (
          <>
            <HeroSection onGetStarted={handleGetStarted} />
            <HowItWorksSection />
          </>
        )}
        
        {activeTab === 'about' && <AboutSection onGetStarted={handleGetStarted} />}
        
        {activeTab === 'testimonials' && <TestimonialsSection />}
        
        {activeTab === 'download' && <DownloadSection />}
      </main>

      <Footer />

      {/* Floating App Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => window.open('/webapp', '_blank')}
          className="bg-blue-600 hover:bg-blue-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
        >
          Enter App
          <i className="fas fa-arrow-right text-sm"></i>
        </button>
      </div>

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