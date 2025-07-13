'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { thunkAuthenticate } from '../features/auth/authSlice';
import { API_ENDPOINTS } from '../config/api';

interface UserTypeOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  interests: string[];
}

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'userType' | 'interests'>('userType');
  const [selectedUserType, setSelectedUserType] = useState<string>('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isWaitlistUser, setIsWaitlistUser] = useState(false);
  const [authError, setAuthError] = useState<string>('');
  const [saveError, setSaveError] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, status } = useAppSelector((state) => state.auth);

  // Check if user is coming from waitlist
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromWaitlist = urlParams.get('from') === 'waitlist';
    
    console.log('OnboardingFlow: URL params:', urlParams.toString());
    console.log('OnboardingFlow: fromWaitlist:', fromWaitlist);
    console.log('OnboardingFlow: current URL:', window.location.href);
    
    // If the URL has ?from=waitlist parameter, treat as waitlist user
    if (fromWaitlist) {
      setIsWaitlistUser(true);
      setIsAuthenticating(false);
      console.log('✅ Waitlist user detected via URL parameter, skipping authentication check');
      return;
    }
    
    // Continue with normal authentication check for non-waitlist users
    console.log('🔐 Non-waitlist user, proceeding with authentication check');
    const checkAuth = async () => {
      try {
        const result = await dispatch(thunkAuthenticate());
        console.log('Authentication check result:', result);
        
        // If authentication fails, redirect immediately
        if (!result.payload) {
          console.log('Authentication failed, redirecting to login...');
          setAuthError('Authentication failed. Please log in to continue.');
          setTimeout(() => navigate('/login'), 2000);
          return;
        }
        
        // Clear any previous auth errors
        setAuthError('');
      } catch (error) {
        console.error('Authentication error:', error);
        setAuthError('Authentication error. Please try again.');
        setTimeout(() => navigate('/login'), 2000);
      } finally {
        setIsAuthenticating(false);
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  // Redirect to login if not authenticated (except for waitlist users)
  useEffect(() => {
    if (!isAuthenticating && !user && !isWaitlistUser && !authError) {
      console.log('No user found, redirecting to login...');
      navigate('/login');
    }
  }, [isAuthenticating, user, isWaitlistUser, authError, navigate]);

  const userTypes: UserTypeOption[] = [
    {
      id: 'job_seeker',
      title: 'For Job Seekers',
      subtitle: 'Jobs',
      description: 'Meet founders at 19,000+ companies. Free & private.',
      interests: ['seeking_job', 'mentor_others']
    },
    {
      id: 'founder',
      title: 'For Founders',
      subtitle: 'Recruiting',
      description: 'Meet 500,000+ high-quality candidates. Free.',
      interests: ['recruiting', 'fundraising']
    },
    {
      id: 'investor',
      title: 'For Investors',
      subtitle: 'Find Startups',
      description: 'Meet 500,000+ high-quality candidates. Free.',
      interests: ['find_startups', 'join_program']
    }
  ];

  const getInterestOptions = (userType: string) => {
    switch (userType) {
      case 'job_seeker':
        return [
          { id: 'seeking_job', label: "I'm actively seeking a job" },
          { id: 'mentor_others', label: "I'd like to mentor others" }
        ];
      case 'founder':
        return [
          { id: 'recruiting', label: 'Recruiting talent' },
          { id: 'fundraising', label: 'Fundraising' }
        ];
      case 'investor':
        return [
          { id: 'find_startups', label: 'Find promising startups' },
          { id: 'join_program', label: 'Join investment program' }
        ];
      default:
        return [];
    }
  };

  const getStepDescription = (userType: string) => {
    switch (userType) {
      case 'job_seeker':
        return {
          title: 'What are you looking for?',
          subtitle: 'Thousands of the world\'s best tech companies and startups are hiring on JobHatch\nApply privately · See salary upfront · No middlemen'
        };
      case 'founder':
        return {
          title: 'What are your current priorities?',
          subtitle: 'Connect with top talent and investors on JobHatch\nBuild your team · Raise capital · Grow your network'
        };
      case 'investor':
        return {
          title: 'What are you interested in?',
          subtitle: 'Discover innovative startups and investment opportunities\nConnect with founders · Track deals · Build your portfolio'
        };
      default:
        return { title: '', subtitle: '' };
    }
  };

  const handleUserTypeSelect = (userType: string) => {
    setSelectedUserType(userType);
    
    // If founder is selected, redirect to founder intake form
    if (userType === 'founder') {
      console.log('Founder selected - redirecting to founder intake form');
      // Save the user type selection first
      localStorage.setItem('onboarding_user_type', JSON.stringify({
        userType: userType,
        timestamp: new Date().toISOString(),
        source: 'onboarding_selection'
      }));
      
      // Navigate to founder intake page
      const urlParams = new URLSearchParams(window.location.search);
      const fromWaitlist = urlParams.get('from') === 'waitlist';
      
      if (fromWaitlist) {
        navigate('/onboarding/founder-intake?from=waitlist');
      } else {
        navigate('/onboarding/founder-intake');
      }
      return;
    }
    
    // For other user types, continue with normal flow
    setCurrentStep('interests');
  };

  const handleInterestSelect = (interestId: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interestId)) {
        return prev.filter(id => id !== interestId);
      } else {
        return [...prev, interestId];
      }
    });
  };

  const handleSaveAndContinue = async () => {
    if (!selectedUserType || selectedInterests.length === 0) {
      setSaveError('Please select at least one interest to continue.');
      return;
    }

    setIsLoading(true);
    setSaveError('');
    
    try {
      console.log('Saving onboarding data:', { selectedUserType, selectedInterests });

      // For waitlist users, save locally and navigate to resume upload
      if (isWaitlistUser) {
        console.log('Waitlist user - saving preferences locally');
        localStorage.setItem('waitlist_preferences', JSON.stringify({
          userType: selectedUserType,
          interests: selectedInterests,
          timestamp: new Date().toISOString()
        }));
        
        // Navigate to resume upload for waitlist users (same as authenticated users)
        console.log('Waitlist user preferences saved, navigating to resume upload');
        navigate('/onboarding/upload');
        return;
      }

      // For authenticated users, try to save to backend with fallback
      console.log('Authenticated user - attempting to save to backend');
      console.log('API endpoint:', `${API_ENDPOINTS.onboarding}/user-type`);
      
      let backendSaveSuccessful = false;
      
      try {
        // Save user type
        const userTypeResponse = await fetch(`${API_ENDPOINTS.onboarding}/user-type`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ user_type: selectedUserType }),
        });

        console.log('User type response status:', userTypeResponse.status);
        
        if (userTypeResponse.ok) {
          // Save initial interests
          const preferencesResponse = await fetch(`${API_ENDPOINTS.onboarding}/preferences`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
              user_type: selectedUserType,
              interests: selectedInterests,
            }),
          });

          console.log('Preferences response status:', preferencesResponse.status);

          if (preferencesResponse.ok) {
            backendSaveSuccessful = true;
            console.log('✅ Backend save successful');
          } else {
            console.warn('⚠️ Preferences save failed, continuing with local storage fallback');
          }
        } else {
          console.warn('⚠️ User type save failed, continuing with local storage fallback');
        }
      } catch (backendError: any) {
        console.warn('⚠️ Backend save failed (likely CORS or network issue), using local storage fallback:', backendError.message);
      }

      // Always save locally as backup/fallback
      console.log('💾 Saving preferences to local storage as backup');
      localStorage.setItem('onboarding_preferences', JSON.stringify({
        userType: selectedUserType,
        interests: selectedInterests,
        timestamp: new Date().toISOString(),
        backendSaved: backendSaveSuccessful
      }));

      // Always navigate to continue the flow, regardless of backend save status
      console.log('🚀 Navigating to resume upload step...');
      navigate('/onboarding/upload');
      
    } catch (error: any) {
      console.error('❌ Critical error in handleSaveAndContinue:', error);
      
      // Even if there's an error, save locally and continue
      console.log('💾 Emergency local save and navigation');
      localStorage.setItem('onboarding_preferences', JSON.stringify({
        userType: selectedUserType,
        interests: selectedInterests,
        timestamp: new Date().toISOString(),
        backendSaved: false,
        error: error.message
      }));
      
      // Show warning but continue
      setSaveError('Unable to save to server, but your preferences have been saved locally. You can continue.');
      
      // Navigate after a short delay to show the message
      setTimeout(() => {
        navigate('/onboarding/upload');
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // Skip to resume upload for now, but could be pricing or profile
    navigate('/onboarding/upload');
  };

  const currentUserTypeData = userTypes.find(type => type.id === selectedUserType);
  const stepDescription = getStepDescription(selectedUserType);

  // Show loading while checking authentication
  if (isAuthenticating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-sm">🐥</span>
          </div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show authentication error
  if (authError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-sm">🐥</span>
          </div>
          <p className="text-red-600 mb-4">{authError}</p>
          <button
            onClick={() => navigate('/login')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will be redirected)
  if (!user && !isWaitlistUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <span className="text-white font-bold text-sm">🐥</span>
          </div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

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
              <span className="font-medium">
                {user?.username || user?.email || 'Guest User'}
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Error Messages */}
        {saveError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-red-700">{saveError}</span>
            </div>
          </div>
        )}

        {currentStep === 'userType' && (
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              What are you interested in?
            </h1>
            <p className="text-lg text-gray-600 mb-16">
              We will customize your experience based on your role
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {userTypes.map((userType) => (
                <div
                  key={userType.id}
                  className={`bg-white rounded-2xl p-8 border-2 transition-all cursor-pointer group ${
                    selectedUserType === userType.id
                      ? 'border-orange-500 shadow-lg'
                      : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                  }`}
                  onClick={() => handleUserTypeSelect(userType.id)}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-5 h-5 border-2 rounded-full transition-colors ${
                      selectedUserType === userType.id 
                        ? 'border-orange-500 bg-orange-500' 
                        : 'border-gray-300 group-hover:border-orange-500'
                    }`}>
                      {selectedUserType === userType.id && (
                        <div className="w-3 h-3 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700">{userType.title}</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-orange-500 mb-2">{userType.subtitle}</h4>
                      <p className="text-sm text-gray-600">{userType.description}</p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-orange-500 mb-2">
                        {userType.id === 'job_seeker' ? 'Mentoring' : 
                         userType.id === 'founder' ? 'Fundraising' : 'Join Program'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {userType.id === 'job_seeker' ? 'Connect with experienced professionals' :
                         userType.id === 'founder' ? 'Meet investors on JobHatch' : 'Access exclusive opportunities'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center gap-4">
              <button
                onClick={() => selectedUserType && setCurrentStep('interests')}
                disabled={!selectedUserType}
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
              <button
                onClick={handleSkip}
                className="px-8 py-3 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Skip for now
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                You can always change your role later in your account settings
              </p>
            </div>
          </div>
        )}

        {currentStep === 'interests' && (
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {stepDescription.title}
            </h1>
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">👤</span>
              </div>
            </div>
            <p className="text-lg text-gray-600 mb-16 whitespace-pre-line">
              {stepDescription.subtitle}
            </p>

            <div className="space-y-4 mb-16">
              {getInterestOptions(selectedUserType).map((option) => (
                <div
                  key={option.id}
                  className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedInterests.includes(option.id)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                  onClick={() => handleInterestSelect(option.id)}
                >
                  <div className={`w-5 h-5 border-2 rounded transition-colors ${
                    selectedInterests.includes(option.id)
                      ? 'border-orange-500 bg-orange-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedInterests.includes(option.id) && (
                      <svg className="w-3 h-3 text-white mt-0.5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-lg font-medium text-gray-700">{option.label}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCurrentStep('userType')}
                className="px-6 py-3 border border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSaveAndContinue}
                disabled={selectedInterests.length === 0 || isLoading}
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                {isLoading ? 'Saving...' : 'Save & Continue'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow; 