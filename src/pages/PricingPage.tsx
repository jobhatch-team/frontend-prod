import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [billingPeriod, setBillingPeriod] = useState<'yearly' | 'monthly'>('yearly');
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanSelect = async (plan: string) => {
    setIsLoading(true);
    // Simulate plan selection processing
    setTimeout(() => {
      navigate('/onboarding/profile');
    }, 1000);
  };

  const handleSkip = () => {
    navigate('/onboarding/profile');
  };

  const handleBack = () => {
    navigate('/onboarding/analyze');
  };

  const pricingPlans = {
    yearly: {
      free: { price: 0, tokens: 90, limit: 'Perfect for getting started' },
      standard: { price: 12, tokens: 420, limit: 'Great for active job seekers' },
      pro: { price: 22, tokens: 1200, limit: 'Best for power users' }
    },
    monthly: {
      free: { price: 0, tokens: 90, limit: 'Perfect for getting started' },
      standard: { price: 15, tokens: 350, limit: 'Great for active job seekers' },
      pro: { price: 29, tokens: 1000, limit: 'Best for power users' }
    }
  };

  const currentPricing = pricingPlans[billingPeriod];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🐥</span>
              </div>
              <span className="text-xl font-bold text-gray-900">JOBHATCH</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="font-medium">{user?.username || user?.email || 'Guest User'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-green-600 font-medium">Resume/CV</span>
            </div>
            <div className="w-16 h-0.5 bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-green-600 font-medium">Analyze</span>
            </div>
            <div className="w-16 h-0.5 bg-orange-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">3</span>
              </div>
              <span className="ml-2 text-orange-500 font-medium">Pricing</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">4</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Profile</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">5</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Preferences</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">6</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Get early-bird pricing and unlock powerful features to accelerate your job search
          </p>

          {/* Billing Period Toggle */}
          <div className="inline-flex bg-gray-100 rounded-full p-1 mb-12">
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingPeriod === 'yearly'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly (Save 25%)
            </button>
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center relative">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Free</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">${currentPricing.free.price}</span>
              <span className="text-gray-600">/month</span>
            </div>
            <button
              onClick={() => handlePlanSelect('free')}
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Start for Free'}
            </button>
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Tokens</h4>
                <p className="text-sm text-gray-600">{currentPricing.free.tokens} AI tokens</p>
                <p className="text-xs text-gray-500">{currentPricing.free.limit}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Resume analysis</li>
                  <li>• Basic job matching</li>
                  <li>• Profile creation</li>
                  <li>• Email support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Standard Plan */}
          <div className="bg-white rounded-2xl border-2 border-orange-500 p-8 text-center relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Standard</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">${currentPricing.standard.price}</span>
              <span className="text-gray-600">/month</span>
            </div>
            <button
              onClick={() => handlePlanSelect('standard')}
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Get Started'}
            </button>
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Tokens</h4>
                <p className="text-sm text-gray-600">{currentPricing.standard.tokens} AI tokens</p>
                <p className="text-xs text-gray-500">{currentPricing.standard.limit}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Everything in Free</li>
                  <li>• Advanced AI analysis</li>
                  <li>• Premium job matching</li>
                  <li>• Cover letter generation</li>
                  <li>• Interview preparation</li>
                  <li>• Priority support</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center relative">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pro</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">${currentPricing.pro.price}</span>
              <span className="text-gray-600">/month</span>
            </div>
            <button
              onClick={() => handlePlanSelect('pro')}
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Go Pro'}
            </button>
            <div className="space-y-4 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Tokens</h4>
                <p className="text-sm text-gray-600">{currentPricing.pro.tokens} AI tokens</p>
                <p className="text-xs text-gray-500">{currentPricing.pro.limit}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Everything in Standard</li>
                  <li>• Unlimited AI analysis</li>
                  <li>• Advanced job alerts</li>
                  <li>• Personal career coach</li>
                  <li>• Networking opportunities</li>
                  <li>• White-glove support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Analysis
          </button>
          
          <button
            onClick={handleSkip}
            disabled={isLoading}
            className="text-gray-500 hover:text-gray-700 font-medium underline disabled:opacity-50"
          >
            Skip for now
          </button>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Why Choose JobHatch Premium?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>AI-powered job matching</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Personalized career guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Direct recruiter connections</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 