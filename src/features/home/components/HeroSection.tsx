import React, { useState } from 'react';
import { debugFetch } from '../../../config/api';

const HeroSection = () => {
  const [email, setEmail] = useState('');

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
    <section className="relative min-h-screen flex items-center py-20" style={{ backgroundColor: '#eafbff', fontFamily: 'Inter, sans-serif' }}>
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
                  <div className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>No more ghosting</div>
                  <div className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Talk directly with Hiring Manager</div>
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
                  <div className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Mock Interview</div>
                  <div className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Today at 12:00 PM</div>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold py-2 px-4 rounded-full transition-colors shadow-md" style={{ fontFamily: 'Inter, sans-serif' }}>
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
                  <div className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>One click to apply</div>
                  <div className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>No more filling out applications.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Main Content */}
          <div className="text-center">
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              <span className="text-orange-500">Find your </span>

              <span className="text-blue-600">first</span>
              
              <span className="text-orange-500"> job within</span>
              <br />
              <span className="text-blue-600">weeks</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              Enter your email to connect with <span className="font-semibold">500+</span> startups and launch your <span className="font-semibold">first</span> job.
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleGetStarted} className="mb-16">
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="flex-1 px-6 py-4 rounded-full border-2 border-blue-200 focus:outline-none focus:border-blue-400 text-center sm:text-left w-full sm:w-80 text-lg shadow-sm"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full transition-colors w-full sm:w-auto text-lg shadow-lg"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Get started
                </button>
              </div>
            </form>

            {/* Character Image at Bottom */}
            <div className="flex justify-center">
              <img 
                src="/images/ChickenFriends1.png" 
                alt="JobHatch Characters" 
                className="w-96 h-auto max-w-full"
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
                  <div className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>No more ghosting</div>
                  <div className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Talk directly with Hiring Manager</div>
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
                  <div className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>One click to apply</div>
                  <div className="text-xs text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>No more filling out applications.</div>
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
                  <div className="font-semibold text-gray-900 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Mock Interview</div>
                  <div className="text-xs text-gray-600 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Today at 12:00 PM</div>
                  <button className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold py-2 px-4 rounded-full transition-colors shadow-md" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Join Now
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Smooth Continuous Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0,80 Q360,40 720,80 T1440,80 V150 H0 V80 Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection; 