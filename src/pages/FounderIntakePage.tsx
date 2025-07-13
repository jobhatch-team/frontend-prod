import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import InfoIntakeForm from '../components/InfoIntakeForm';

const FounderIntakePage: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isWaitlistUser, setIsWaitlistUser] = useState(false);
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is coming from waitlist
    const urlParams = new URLSearchParams(window.location.search);
    const fromWaitlist = urlParams.get('from') === 'waitlist';
    
    if (fromWaitlist) {
      setIsWaitlistUser(true);
    }
  }, []);

  const handleFormSubmit = (formData: any) => {
    console.log('[FOUNDER-INTAKE] Form data submitted:', formData);
    
    // Save founder intake data to localStorage
    localStorage.setItem('founder_intake_data', JSON.stringify({
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'onboarding_founder_intake'
    }));
  };

  const handleSubmissionSuccess = () => {
    console.log('[FOUNDER-INTAKE] ✅ Submission successful');
    setSubmissionStatus('success');
    
    // Redirect to Founders Club page after a short delay
    setTimeout(() => {
      navigate('/founders-club');
    }, 2000);
  };

  const handleSubmissionError = (error: string) => {
    console.error('[FOUNDER-INTAKE] ❌ Submission error:', error);
    setSubmissionStatus('error');
    setErrorMessage(error);
  };

  // Get initial email if available
  const initialEmail = user?.email || '';

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
                {user?.username || user?.email || 'Founder'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        {submissionStatus === 'success' ? (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✅</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to JobHatch!
              </h2>
              <p className="text-gray-600 mb-4">
                Your founder profile has been successfully created. You'll be redirected to continue your setup.
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
            </div>
          </div>
        ) : submissionStatus === 'error' ? (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">❌</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Submission Failed
              </h2>
              <p className="text-gray-600 mb-4">
                {errorMessage || 'There was an error submitting your information. Please try again.'}
              </p>
              <button
                onClick={() => {
                  setSubmissionStatus('idle');
                  setErrorMessage('');
                }}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <InfoIntakeForm
            onSubmit={handleFormSubmit}
            onSuccess={handleSubmissionSuccess}
            onError={handleSubmissionError}
            userType="founder"
            initialEmail={initialEmail}
          />
        )}
      </div>
    </div>
  );
};

export default FounderIntakePage; 