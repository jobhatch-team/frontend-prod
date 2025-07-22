import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleFeatureProfile = async () => {
    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        navigate(data.redirect_url || '/webapp');
      } else {
        throw new Error('Failed to complete onboarding');
      }
    } catch (error) {
      console.error('Completion error:', error);
      navigate('/webapp');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        {/* Characters */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center space-x-4">
            <img
              src="/images/chick-pc-owl.png"
              alt="Chick and Owl with Laptop"
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>

        {/* Main Message */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          We want to feature you to recruiters!
        </h2>

        {/* Description */}
        <div className="text-gray-600 text-sm mb-6">
          <p className="mb-4">Hey Mia,</p>
          <p className="mb-4">
            Your skills are in demand! We'd love to potentially feature your profile even further to 
            companies that are hiring for your skills and preferences. All you have to do is opt in 
            and we'll shoot you an email beforehand if your profile is going to be featured. Your 
            current and past employers will not see your profile and you can opt out at anytime.
          </p>
          <p className="font-medium">
            Interested? We'll just need you to confirm the following:
          </p>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 mb-6">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              defaultChecked
            />
            <span className="text-sm text-gray-700">
              I'm ready to take calls with companies
            </span>
          </label>
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              className="mt-1 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              defaultChecked
            />
            <span className="text-sm text-gray-700">
              I'll respond to messages from companies in a timely manner
            </span>
          </label>
        </div>

        {/* Button */}
        <button
          onClick={handleFeatureProfile}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Feature my profile
        </button>
      </div>
    </div>
  );
};

export default CompletionModal; 