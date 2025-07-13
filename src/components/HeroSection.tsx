import React, { useState } from 'react';
import { debugFetch } from '../config/api';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [showHatchAnim, setShowHatchAnim] = useState(false);
  const [showXpAnim, setShowXpAnim] = useState(false);

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

  const handleJoinWaitlist = () => {
    console.log('Join Waitlist button clicked');
    // Handle waitlist signup logic here
    window.location.href = '/waitlist';
  };

  const handleChickClick = () => {
    setShowHatchAnim(true);
    setShowXpAnim(true);
    setTimeout(() => {
      setShowHatchAnim(false);
      setShowXpAnim(false);
    }, 2000);
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 relative overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 fade-in-up relative z-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-orange-500">Hatch</span>{' '}
              <span className="text-blue-600">your</span>{' '}
              <span className="text-orange-500">career</span>
              <br />
              <span className="text-blue-600">Together</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Level up your career quest! 🐣 Team up, unlock daily wins, and hatch your dream job—no more solo grinding.
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleGetStarted} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3 justify-start items-center max-w-lg">
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
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full transition-colors w-full sm:w-auto text-lg shadow-lg hover:scale-105 transform transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Get Started!
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <button 
                onClick={handleJoinWaitlist}
                className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-4 px-8 rounded-full transition-colors w-full sm:w-auto text-lg shadow-lg hover:scale-105 transform transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Join Our Waitlist Now
              </button>
            </div>

            {/* Users Count */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white font-semibold"
                  >
                    {String.fromCharCode(65 + i - 1)}
                  </div>
                ))}
              </div>
              <p className="text-gray-600 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Join 1,200+ career builders</p>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Main Character */}
              <div 
                className="relative w-full h-full cursor-pointer hover:scale-105 transition-transform duration-300 animate-bounce"
                onClick={handleChickClick}
                style={{ animation: 'bounce 3s ease-in-out infinite' }}
              >
                <img
                  src="/images/homepage-chick-offer.png"
                  alt="Career Pet Chick"
                  className="w-full h-full object-contain"
                />
                
                {/* Hatch Animation Overlay */}
                {showHatchAnim && (
                  <div className="absolute inset-0 z-10">
                    <img
                      src="/images/flychick.gif"
                      alt="Hatch Animation"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Feature Bubbles */}
              <div className="absolute top-4 right-4 w-56 bg-white rounded-xl p-4 shadow-lg border border-gray-100 animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-file-alt text-orange-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Resume Updated</p>
                    <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>+25 XP</p>
                    {showXpAnim && (
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-green-500 font-bold animate-bounce">
                        +25 XP
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-16 left-4 w-56 bg-white rounded-xl p-4 shadow-lg border border-gray-100 animate-pulse" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-blue-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Buddy Matched!</p>
                    <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>Meet your accountability partner</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 right-8 w-56 bg-white rounded-xl p-4 shadow-lg border border-gray-100 animate-pulse" style={{ animationDelay: '2s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-briefcase text-green-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Job Fair Attended</p>
                    <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>3 new connections</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 50C240 150 1200 0 1440 50V150H0V50Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection; 