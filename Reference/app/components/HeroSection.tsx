'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [showHatchAnim, setShowHatchAnim] = useState(false);
  const [showXpAnim, setShowXpAnim] = useState(false);
  const router = useRouter();

  const handleChickClick = () => {
    setShowHatchAnim(true);
    setShowXpAnim(true);
    setTimeout(() => {
      setShowHatchAnim(false);
      setShowXpAnim(false);
    }, 2000);
  };

  const handleLearnMore = () => {
    console.log('Learn More button clicked');
    router.push('/waitlist');
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 fade-in-up relative z-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-baloo2 leading-tight">
              <span className="text-orange">Hatch</span>{' '}
              <span className="text-blue">your</span>{' '}
              <span className="text-orange">career</span>
              <br />
              <span className="text-blue">Together</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Level up your career quest! 🐣 Team up, unlock daily wins, and hatch your dream job—no more solo grinding.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <button
                onClick={onGetStarted}
                className="btn btn-primary text-lg px-8 py-4 hover:scale-105 transform transition-all cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                Get Started !
              </button>
              <button 
                onClick={handleLearnMore}
                className="btn btn-outline text-lg px-8 py-4 cursor-pointer"
                style={{ pointerEvents: 'auto' }}
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
              <p className="text-gray-600 font-medium">Join 1,200+ career builders</p>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Main Character */}
              <div 
                className="relative w-full h-full cursor-pointer hover:scale-105 transition-transform duration-300 float-animation"
                onClick={handleChickClick}
              >
                <Image
                  src="/images/homepage-chick-offer.png"
                  alt="Career Pet Chick"
                  width={300}
                  height={300}
                  className="w-full h-full object-contain"
                  priority
                />
                
                {/* Hatch Animation Overlay */}
                {showHatchAnim && (
                  <div className="absolute inset-0 z-10">
                    <Image
                      src="/images/chick-hatch.gif"
                      alt="Hatch Animation"
                      width={300}
                      height={300}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Feature Bubbles */}
              <div className="feature-bubble top-4 right-4 w-56 animate-pulse">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-file-alt text-orange-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-sm">Resume Updated</p>
                  <p className="text-xs text-gray-500">+25 XP</p>
                  {showXpAnim && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-green-500 font-bold animate-bounce">
                      +25 XP
                    </span>
                  )}
                </div>
              </div>

              <div className="feature-bubble bottom-16 left-4 w-56 animate-pulse" style={{ animationDelay: '1s' }}>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-users text-blue-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-sm">Buddy Matched!</p>
                  <p className="text-xs text-gray-500">Meet your accountability partner</p>
                </div>
              </div>

              <div className="feature-bubble bottom-4 right-8 w-56 animate-pulse" style={{ animationDelay: '2s' }}>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="fas fa-briefcase text-green-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-sm">Job Fair Attended</p>
                  <p className="text-xs text-gray-500">3 new connections</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50C240 150 1200 0 1440 50V150H0V50Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
} 