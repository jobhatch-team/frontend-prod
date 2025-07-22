'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import AuthModal from '../components/AuthModal';
import OnboardingFlow from '../components/OnboardingFlow';

export default function OnboardingPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onAuthClick={handleAuthClick}
      />
      
      <div className="p-8">
        <OnboardingFlow />
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
