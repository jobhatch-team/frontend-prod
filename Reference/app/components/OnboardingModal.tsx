'use client';

import React, { useState } from 'react';

interface OnboardingModalProps {
  onClose: () => void;
}

export default function OnboardingModal({ onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResumeUpload, setShowResumeUpload] = useState(false);

  const handleStepAnswer = (key: string, value: string) => {
    if (key === 'clarity' && value === 'notSure') {
      setShowResumeUpload(true);
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(5); // Complete
    }
  };

  const handleResumeUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    input.onchange = () => {
      setCurrentStep(currentStep + 1);
    };
    input.click();
  };

  const handleBuildResume = () => {
    // Navigate to resume builder
    alert('Redirecting to resume builder...');
    setCurrentStep(currentStep + 1);
  };

  const handleFinish = () => {
    alert('Onboarding complete! Redirecting to appropriate features...');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep} of 5</span>
              <span>{Math.round((currentStep / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          {currentStep === 1 && (
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                🟢 Step 1: 🎯 Role Identification
              </h2>
              <p className="text-xl text-gray-600">What brings you to JobHatch?</p>
              <div className="space-y-4">
                <button
                  onClick={() => handleStepAnswer('role', 'mentee')}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <span className="text-2xl mr-3">👩‍💼</span>
                  I&apos;m looking for a job
                </button>
                <button
                  onClick={() => handleStepAnswer('role', 'mentor')}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <span className="text-2xl mr-3">🌟</span>
                  I&apos;d like to mentor or support others
                </button>
                <button
                  onClick={() => handleStepAnswer('role', 'both')}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <span className="text-2xl mr-3">🔁</span>
                  I want to do both
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                🔵 Step 2: 🔍 Job Search Status
              </h2>
              <p className="text-xl text-gray-600">Are you currently job hunting?</p>
              <div className="space-y-4">
                <button
                  onClick={() => handleStepAnswer('status', 'active')}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <span className="text-2xl mr-3">✅</span>
                  Actively applying
                </button>
                <button
                  onClick={() => handleStepAnswer('status', 'exploring')}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <span className="text-2xl mr-3">👀</span>
                  Just exploring
                </button>
                <button
                  onClick={() => handleStepAnswer('status', 'notnow')}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <span className="text-2xl mr-3">❌</span>
                  Not right now
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                🟡 Step 3: 🧭 Career Clarity Check
              </h2>
              <p className="text-xl text-gray-600">Do you have a specific job role or industry in mind?</p>
              <div className="space-y-4">
                <button
                  onClick={() => handleStepAnswer('clarity', 'yes')}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <span className="text-2xl mr-3">✅</span>
                  Yes, I know what I&apos;m targeting
                </button>
                <button
                  onClick={() => handleStepAnswer('clarity', 'notSure')}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <span className="text-2xl mr-3">❓</span>
                  Not sure yet
                </button>
              </div>

              {showResumeUpload && (
                <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                  <p className="text-gray-700 mb-4">
                    No worries! Our AI Career Coach can guide you based on your background. Please upload your resume to get started.
                  </p>
                  <div className="space-y-3">
                    <button
                      onClick={handleResumeUpload}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      <span className="text-xl mr-2">➕</span>
                      Upload Resume
                    </button>
                    <button
                      onClick={handleBuildResume}
                      className="w-full bg-white text-blue-600 border-2 border-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                    >
                      Build My Resume Now!
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">
                🔴 Step 4: ⏱️ Urgency & Planning
              </h2>
              <p className="text-xl text-gray-600">How urgent is your job search?</p>
              <div className="space-y-4">
                <button
                  onClick={() => handleStepAnswer('urgency', 'asap')}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <span className="text-2xl mr-3">🧨</span>
                  I need a job ASAP
                </button>
                <button
                  onClick={() => handleStepAnswer('urgency', 'timing')}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <span className="text-2xl mr-3">📅</span>
                  I&apos;m taking my time
                </button>
                <button
                  onClick={() => handleStepAnswer('urgency', 'exploring')}
                  className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <span className="text-2xl mr-3">🧘</span>
                  Just exploring possibilities
                </button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Welcome to JobHatch!</h2>
              <p className="text-xl text-gray-600">
                Your onboarding is complete. You will be routed to the appropriate features or agents based on your answers.
              </p>
              <button
                onClick={handleFinish}
                className="bg-blue-600 text-white py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Finish
              </button>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
} 