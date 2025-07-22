import React, { useState, useEffect } from 'react';
import { debugFetch } from '../../../config/api';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const steps = [0, 1, 2, 3, 4]; // 0: start, 1-4: each line appears
    let currentStep = 0;
    
    const timer = setInterval(() => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        setAnimationStep(currentStep);
      } else {
        clearInterval(timer);
      }
    }, 800); // Increased to 800ms for more dramatic timing

    return () => clearInterval(timer);
  }, []);

  const handleGetStarted = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    console.log('[GET-STARTED] Starting waitlist submission for:', email);

    try {
      // Submit to JobHatch backend first
      console.log('[GET-STARTED] Submitting to JobHatch backend...');
      const backendResponse = await debugFetch('https://backend-prod-team-jobhatchs-projects.vercel.app/api/waitlist', {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          name: email.split('@')[0], // Use email prefix as name
          message: 'Submitted via Get Started button',
          source: 'homepage_get_started',
          timestamp: new Date().toISOString()
        }),
      });

      if (backendResponse.ok) {
        const backendData = await backendResponse.json();
        console.log('[GET-STARTED] ✅ Backend submission successful:', backendData);
      } else {
        console.log('[GET-STARTED] ⚠️ Backend submission failed, continuing with Google Forms');
      }
    } catch (backendError) {
      console.error('[GET-STARTED] ❌ Backend submission error:', backendError);
      console.log('[GET-STARTED] Continuing with Google Forms fallback');
    }

    try {
      // Fallback to Google Forms
      console.log('[GET-STARTED] Submitting to Google Forms...');
      const form = new FormData();
      form.append('entry.1305314608', email);   // Replace with actual entry ID

      await fetch(
        'https://docs.google.com/forms/d/e/1FAIpQLSfKUxYaAAkRuK-DgvKI1W_IVo1OVGgZ8Fm9I6-2mEvEkO2fKw/formResponse',
        {
          method: 'POST',
          mode: 'no-cors',
          body: form,
        }
      );
      console.log('[GET-STARTED] ✅ Google Forms submission completed');
    } catch (error) {
      console.error('[GET-STARTED] ❌ Google Forms submission error:', error);
    }

    // Redirect to onboarding flow with waitlist parameter
    console.log('[GET-STARTED] 🔄 Redirecting to onboarding...');
    window.location.href = '/onboarding?from=waitlist';
  };

  return (
    <section className="relative min-h-screen flex items-center py-20" style={{ 
      background: 'linear-gradient(to bottom, #eafbff 0%, #d1f2ff 100%)', 
      fontFamily: 'Nunito, sans-serif' 
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative">
          
          {/* No more ghosting - Independent positioning */}
          <div className="absolute left-20 bottom-80 hidden lg:block">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 w-64 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-envelope text-orange-500"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>No more ghosting</div>
                  <div className="text-xs text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>Talk directly with Hiring Manager</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mock Interview - Independent positioning */}
          <div className="absolute left-40 bottom-32 hidden lg:block">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 w-64 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="/images/avatar-1.svg" alt="Interviewer" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>Mock Interview</div>
                  <div className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>Today at 12:00 PM</div>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold py-2 px-4 rounded-full transition-colors shadow-md" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* One click to apply - Independent positioning */}
          <div className="absolute right-20 bottom-72 hidden lg:block">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 w-64 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-check text-green-500"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>One click to apply</div>
                  <div className="text-xs text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>No more filling out applications.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Main Content */}
          <div className="text-center">
            {/* Animated Main Title */}
            <div className="mb-8">
              <h1 className="font-bold leading-tight text-center" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {/* Line 1: Find Your */}
                <div 
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 transition-all duration-1000 ease-out ${
                    animationStep >= 1 ? 'opacity-100 translate-y-0 scale-100 rotate-0' : 'opacity-0 translate-y-16 scale-75 -rotate-3'
                  }`}
                  style={{ 
                    transitionDelay: '0ms',
                    textShadow: animationStep >= 1 ? '0 0 30px rgba(249, 115, 22, 0.6), 0 0 60px rgba(249, 115, 22, 0.3)' : 'none',
                    filter: animationStep >= 1 ? 'drop-shadow(0 10px 20px rgba(249, 115, 22, 0.2))' : 'none'
                  }}
                >
                  <span className={`text-orange-500 ${animationStep >= 1 ? 'animate-pulse' : ''}`}>Find Your</span>
                </div>
                
                {/* Line 2: First Job */}
                <div 
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 transition-all duration-1000 ease-out ${
                    animationStep >= 2 ? 'opacity-100 translate-y-0 scale-100 rotate-0' : 'opacity-0 translate-y-16 scale-75 rotate-3'
                  }`}
                  style={{ 
                    transitionDelay: '200ms',
                    textShadow: animationStep >= 2 ? '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.3)' : 'none',
                    filter: animationStep >= 2 ? 'drop-shadow(0 10px 20px rgba(59, 130, 246, 0.2))' : 'none'
                  }}
                >
                  <span className={`text-blue-600 ${animationStep >= 2 ? 'animate-pulse' : ''}`}>First Job</span>
                </div>
                
                {/* Line 3: Within */}
                <div 
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 transition-all duration-1000 ease-out ${
                    animationStep >= 3 ? 'opacity-100 translate-y-0 scale-100 rotate-0' : 'opacity-0 translate-y-16 scale-75 -rotate-2'
                  }`}
                  style={{ 
                    transitionDelay: '400ms',
                    textShadow: animationStep >= 3 ? '0 0 30px rgba(249, 115, 22, 0.6), 0 0 60px rgba(249, 115, 22, 0.3)' : 'none',
                    filter: animationStep >= 3 ? 'drop-shadow(0 10px 20px rgba(249, 115, 22, 0.2))' : 'none'
                  }}
                >
                  <span className={`text-orange-500 ${animationStep >= 3 ? 'animate-pulse' : ''}`}>Within</span>
                </div>
                
                {/* Line 4: Weeks - Emphasis with larger size and bounce */}
                <div 
                  className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-1200 ease-out ${
                    animationStep >= 4 ? 'opacity-100 translate-y-0 scale-110 rotate-0' : 'opacity-0 translate-y-20 scale-50 rotate-6'
                  }`}
                  style={{ 
                    transitionDelay: '600ms',
                    textShadow: animationStep >= 4 ? '0 0 50px rgba(59, 130, 246, 0.8), 0 0 100px rgba(59, 130, 246, 0.4)' : 'none',
                    filter: animationStep >= 4 ? 'drop-shadow(0 15px 30px rgba(59, 130, 246, 0.3))' : 'none'
                  }}
                >
                  <span className={`text-blue-600 font-black bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent ${animationStep >= 4 ? 'animate-bounce' : ''}`}>
                    Weeks
                  </span>
                </div>
              </h1>
            </div>

            {/* Animated Subtitle with more dramatic entrance */}
            <div 
              className={`transition-all duration-1000 ease-out ${
                animationStep >= 4 ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-8 scale-90 blur-sm'
              }`}
              style={{ transitionDelay: '1400ms' }}
            >
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Enter your email to connect with <span className="font-semibold text-orange-500">500+</span> startups and launch your <span className="font-semibold text-blue-600">first</span> job.
              </p>
            </div>

            {/* Animated Email Signup Form with bounce entrance */}
            <div 
              className={`transition-all duration-1000 ease-out ${
                animationStep >= 4 ? 'opacity-100 translate-y-0 scale-100 blur-0' : 'opacity-0 translate-y-12 scale-85 blur-sm'
              }`}
              style={{ transitionDelay: '1600ms' }}
            >
              <form onSubmit={handleGetStarted} className="mb-16">
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    className={`flex-1 px-6 py-4 rounded-full border-2 border-blue-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-center sm:text-left w-full sm:w-80 text-lg shadow-lg hover:shadow-xl transition-all duration-300 ${animationStep >= 4 ? 'hover:scale-105' : ''}`}
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                    required
                  />
                  <button
                    type="submit"
                    className={`bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 w-full sm:w-auto text-lg shadow-lg hover:shadow-xl transform ${animationStep >= 4 ? 'hover:scale-110 hover:-translate-y-1' : ''}`}
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    Get started 🚀
                  </button>
                </div>
              </form>
            </div>

            {/* Animated Character Image with dramatic bounce entrance */}
            <div 
              className={`flex justify-center transition-all duration-1200 ease-out ${
                animationStep >= 4 ? 'opacity-100 translate-y-0 scale-100 rotate-0 blur-0' : 'opacity-0 translate-y-16 scale-75 -rotate-6 blur-sm'
              }`}
              style={{ transitionDelay: '1800ms' }}
            >
              <img 
                src="/images/ChickenFriends1.png" 
                alt="JobHatch Characters" 
                className={`w-96 h-auto max-w-full transition-transform duration-500 ${animationStep >= 4 ? 'hover:scale-110 hover:-translate-y-2' : ''}`}
                style={{
                  filter: animationStep >= 4 ? 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))' : 'none'
                }}
              />
            </div>
          </div>

          {/* Mobile Feature Boxes */}
          <div className="lg:hidden space-y-4 mt-8">
            {/* No more ghosting */}
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 max-w-xs mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-envelope text-orange-500"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>No more ghosting</div>
                  <div className="text-xs text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>Talk directly with Hiring Manager</div>
                </div>
              </div>
            </div>

            {/* One click to apply */}
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 max-w-xs mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <i className="fas fa-check text-green-500"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>One click to apply</div>
                  <div className="text-xs text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>No more filling out applications.</div>
                </div>
              </div>
            </div>

            {/* Mock Interview */}
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 max-w-xs mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="/images/avatar-1.svg" alt="Interviewer" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>Mock Interview</div>
                  <div className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>Today at 12:00 PM</div>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold py-2 px-4 rounded-full transition-colors shadow-md" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Smooth Symmetrical Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0,50 Q720,170 1440,50 V200 H0 V50 Z" fill="#f9fafb"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection; 