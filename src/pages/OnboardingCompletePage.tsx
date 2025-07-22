import React, { useState, useEffect } from 'react';
import CompletionModal from '../components/CompletionModal';

const OnboardingCompletePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal after a brief delay for better UX
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing your profile setup...</p>
      </div>
      
      <CompletionModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

export default OnboardingCompletePage; 