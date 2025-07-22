'use client';

import React, { useState } from 'react';

export default function OnboardingFlow() {
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
    alert('Redirecting to resume builder...');
    setCurrentStep(currentStep + 1);
  };

  const handleFinish = () => {
    // Redirect to resume upload page
    window.location.href = '/upload-resume';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content Area with light blue background */}
      <div className="flex-1 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of 5</span>
              <span>{Math.round((currentStep / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content in White Container */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="text-center space-y-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Step 1: 🎯 Role Identification
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-8">What brings you to JobHatch?</p>
                <div className="space-y-4">
                  <button
                    onClick={() => handleStepAnswer('role', 'mentee')}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all bg-white flex items-center"
                  >
                    <span className="text-2xl mr-4">👩‍💼</span>
                    <span className="text-gray-700">I'm looking for a job</span>
                  </button>
                  <button
                    onClick={() => handleStepAnswer('role', 'mentor')}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all bg-white flex items-center"
                  >
                    <span className="text-2xl mr-4">🌟</span>
                    <span className="text-gray-700">I'd like to mentor or support others</span>
                  </button>
                  <button
                    onClick={() => handleStepAnswer('role', 'both')}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all bg-white flex items-center"
                  >
                    <span className="text-2xl mr-4">🔁</span>
                    <span className="text-gray-700">I want to do both</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <div className="text-center space-y-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Step 2: 🔍 Job Search Status
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-8">Are you currently job hunting?</p>
                <div className="space-y-4">
                  <button
                    onClick={() => handleStepAnswer('status', 'active')}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all bg-white flex items-center"
                  >
                    <span className="text-2xl mr-4">✅</span>
                    <span className="text-gray-700">Actively applying</span>
                  </button>
                  <button
                    onClick={() => handleStepAnswer('status', 'exploring')}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all bg-white flex items-center"
                  >
                    <span className="text-2xl mr-4">👀</span>
                    <span className="text-gray-700">Just exploring</span>
                  </button>
                  <button
                    onClick={() => handleStepAnswer('status', 'notnow')}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all bg-white flex items-center"
                  >
                    <span className="text-2xl mr-4">❌</span>
                    <span className="text-gray-700">Not right now</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {currentStep === 3 && (
              <div className="text-center space-y-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Step 3: 🧭 Career Clarity Check
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-8">Do you have a specific job role or industry in mind?</p>
                <div className="space-y-4">
                  <button
                    onClick={() => handleStepAnswer('clarity', 'yes')}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all bg-white flex items-center"
                  >
                    <span className="text-2xl mr-4">✅</span>
                    <span className="text-gray-700">Yes, I know what I'm targeting</span>
                  </button>
                  <button
                    onClick={() => handleStepAnswer('clarity', 'notSure')}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all bg-white flex items-center"
                  >
                    <span className="text-2xl mr-4">❓</span>
                    <span className="text-gray-700">Not sure yet</span>
                  </button>
                </div>

                {showResumeUpload && (
                  <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
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

            {/* Step 4 */}
            {currentStep === 4 && (
              <div className="text-center space-y-8">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Step 4: ⏱️ Urgency & Planning
                  </h2>
                </div>
                <p className="text-lg text-gray-600 mb-8">How urgent is your job search?</p>
                <div className="space-y-4">
                  <button
                    onClick={() => handleStepAnswer('urgency', 'asap')}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all bg-white flex items-center"
                  >
                    <span className="text-2xl mr-4">🧨</span>
                    <span className="text-gray-700">I need a job ASAP</span>
                  </button>
                  <button
                    onClick={() => handleStepAnswer('urgency', 'timing')}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all bg-white flex items-center"
                  >
                    <span className="text-2xl mr-4">📅</span>
                    <span className="text-gray-700">I'm taking my time</span>
                  </button>
                  <button
                    onClick={() => handleStepAnswer('urgency', 'exploring')}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all bg-white flex items-center"
                  >
                    <span className="text-2xl mr-4">🧘</span>
                    <span className="text-gray-700">Just exploring possibilities</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 5 */}
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
          </div>
        </div>
      </div>

      {/* Bottom Section with Mascots and Blue Gradient - matching waitlist design */}
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
    </div>
  );
}


