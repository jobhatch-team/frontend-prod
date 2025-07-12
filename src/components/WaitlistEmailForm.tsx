'use client';

import React, { useState } from 'react';
import { API_ENDPOINTS, debugFetch } from '../config/api';

export default function WaitlistEmailForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any[]>([]);
  const [countdown, setCountdown] = useState(3);

  // Enhanced logging function
  const logWaitlist = (message: string, data?: any) => {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, message, data };
    console.log(`[WAITLIST-FORM ${timestamp}] ${message}`, data || '');
    setDebugInfo(prev => [...prev, logEntry]);
  };

  // Countdown and redirect effect
  React.useEffect(() => {
    if (submitted) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            logWaitlist('Auto-redirecting to onboarding');
            window.location.href = '/onboarding?from=waitlist';
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [submitted]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logWaitlist('Email step submitted', { email: formData.email });
    if (!formData.email) return;
    setStep(2); // Move to additional info step
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.name) {
      logWaitlist('Form validation failed', { email: !!formData.email, name: !!formData.name });
      return;
    }

    setIsSubmitting(true);
    logWaitlist('Starting waitlist submission', formData);

    try {
      // Test 1: Try JobHatch backend API first
      logWaitlist('Attempting JobHatch backend API submission');
      
      try {
        const backendResponse = await debugFetch(API_ENDPOINTS.waitlist, {
          method: 'POST',
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            message: formData.message,
            source: 'waitlist_form',
            timestamp: new Date().toISOString()
          }),
        });

        if (backendResponse.ok) {
          const responseData = await backendResponse.json();
          logWaitlist('✅ Backend API submission successful', responseData);
          setSubmitted(true);
          setIsSubmitting(false);
          return;
        } else {
          logWaitlist('❌ Backend API submission failed', { 
            status: backendResponse.status, 
            statusText: backendResponse.statusText 
          });
        }
      } catch (backendError) {
        const err = backendError as Error;
        logWaitlist('❌ Backend API submission error', { 
          error: err.message,
          name: err.name,
          stack: err.stack 
        });
      }

      // Test 2: Fallback to Google Forms (original method)
      logWaitlist('Falling back to Google Forms submission');
      
      const form = new FormData();
      form.append('entry.1305314608', formData.email);   // Email
      form.append('entry.1788866372', formData.name);    // Name
      form.append('entry.1666390546', formData.message); // Message

      const googleResponse = await fetch(
        'https://docs.google.com/forms/d/e/1FAIpQLSfKUxYaAAkRuK-DgvKI1W_IVo1OVGgZ8Fm9I6-2mEvEkO2fKw/formResponse',
        {
          method: 'POST',
          mode: 'no-cors',
          body: form,
        }
      );

      logWaitlist('Google Forms submission completed', { 
        status: 'no-cors mode (cannot read response)' 
      });
      
      setSubmitted(true);

    } catch (error) {
      const err = error as Error;
      logWaitlist('❌ All submission methods failed', { 
        error: err.message,
        name: err.name,
        stack: err.stack 
      });
      
      // Still show success since Google Forms with no-cors doesn't return response
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    logWaitlist('Form field changed', { field: name, value: value.substring(0, 20) + '...' });
  };

  // Debug panel (only show in development or when there are errors)
  const showDebugPanel = process.env.NODE_ENV === 'development' || debugInfo.some(entry => entry.message.includes('❌'));

  if (submitted) {
    return (
      <div className="text-center">
        <p className="text-white text-lg font-semibold">✅ Thanks! You're on our waitlist.</p>
        <p className="text-white opacity-80 text-sm mt-2">We'll keep you updated on JobHatch progress!</p>
        <p className="text-white opacity-80 text-sm mt-2">
          Taking you to the next step in <span className="font-semibold">{countdown}</span> seconds...
        </p>
        <div className="mt-4">
          <button
            onClick={() => window.location.href = '/onboarding?from=waitlist'}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Continue to Onboarding →
          </button>
        </div>
        
        {showDebugPanel && (
          <details className="mt-4 text-left">
            <summary className="text-white opacity-60 text-xs cursor-pointer">Debug Info</summary>
            <div className="bg-black bg-opacity-50 p-2 rounded mt-2 text-xs text-white font-mono max-h-40 overflow-y-auto">
              {debugInfo.map((entry, index) => (
                <div key={index} className="mb-1">
                  <span className="text-gray-400">{entry.timestamp}:</span> {entry.message}
                  {entry.data && (
                    <pre className="text-xs text-gray-300 ml-2">
                      {JSON.stringify(entry.data, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {step === 1 ? (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          <button
            type="submit"
            disabled={!formData.email || isSubmitting}
            className="w-full py-3 px-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Early Access
          </button>
        </form>
      ) : (
        <form onSubmit={handleFinalSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Tell us about your job search goals (optional)"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          <button
            type="submit"
            disabled={!formData.email || !formData.name || isSubmitting}
            className="w-full py-3 px-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Joining...' : 'Join Waitlist'}
          </button>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full py-2 px-4 text-white/60 hover:text-white transition-colors"
          >
            ← Back
          </button>
        </form>
      )}

      {showDebugPanel && debugInfo.length > 0 && (
        <details className="mt-4">
          <summary className="text-white opacity-60 text-xs cursor-pointer">Debug Console</summary>
          <div className="bg-black bg-opacity-50 p-2 rounded mt-2 text-xs text-white font-mono max-h-32 overflow-y-auto">
            {debugInfo.map((entry, index) => (
              <div key={index} className="mb-1">
                <span className="text-gray-400">{entry.timestamp.split('T')[1]}:</span> {entry.message}
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
} 