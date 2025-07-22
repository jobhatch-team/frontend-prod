import React from 'react';

const DownloadSection = () => {
  return (
    <section id="download" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Download Our Mobile App
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take JobHatch with you everywhere and stay on top of your job search journey
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Phone Mockup */}
          <div className="flex-shrink-0">
            <div className="relative">
              <svg width="340" height="680" viewBox="0 0 340 680" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-xs mx-auto">
                <defs>
                  <radialGradient id="grad1" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#fffae0"/>
                    <stop offset="100%" stopColor="#ffe268"/>
                  </radialGradient>
                  <linearGradient id="phoneBackground" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fffdf2"/>
                    <stop offset="100%" stopColor="#fff5c0"/>
                  </linearGradient>
                </defs>
                <circle cx="170" cy="340" r="140" fill="url(#grad1)" fillOpacity="0.85"/>
                <rect x="30" y="40" width="280" height="600" rx="48" fill="url(#phoneBackground)" stroke="#222" strokeWidth="4"/>
                <rect x="110" y="620" width="120" height="8" rx="4" fill="#111"/>
                <rect x="130" y="55" width="80" height="20" rx="10" fill="#111"/>
                <rect x="112.5" y="182.5" width="115" height="115" rx="14" fill="#fff"/>
                <image href="/images/LOGO.jpg" x="116" y="186" width="108" height="108" preserveAspectRatio="xMidYMid slice"/>
                <text x="170" y="340" textAnchor="middle" fontSize="32" fontFamily="Inter, sans-serif" fontWeight="700" fill="#1976d2">Download</text>
                <text x="170" y="370" textAnchor="middle" fontSize="18" fontFamily="Inter, sans-serif" fontWeight="500" fill="#4fc3f7">JobHatch</text>
                <a href="/phone-demo">
                  <rect x="70" y="470" width="200" height="40" rx="20" fill="#ffffff" stroke="#4fc3f7" strokeWidth="2" className="hover:fill-gray-50 transition-colors cursor-pointer"/>
                  <text x="170" y="495" textAnchor="middle" fontSize="16" fontFamily="Inter, sans-serif" fontWeight="600" fill="#4fc3f7" className="cursor-pointer">View Phone Demo</text>
                </a>
              </svg>
            </div>
          </div>

          {/* Download Content */}
          <div className="flex-1 max-w-md">
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Download<br/>Our Mobile App
              </h3>
              <h4 className="text-xl font-semibold text-blue-600 mb-4">
                Take JobHatch Everywhere
              </h4>
              <p className="text-gray-600 text-lg">
                Level up your career quest! Scan the QR code or tap below to download JobHatch for iOS or Android. Start your journey with a gamified, supportive job search experience.
              </p>
            </div>

            {/* iOS Download */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 60 60">
                  <rect width="60" height="60" rx="8" fill="#eee"/>
                  <rect x="8" y="8" width="12" height="12" fill="#222"/>
                  <rect x="40" y="8" width="12" height="12" fill="#222"/>
                  <rect x="8" y="40" width="12" height="12" fill="#222"/>
                  <rect x="24" y="24" width="12" height="12" fill="#222"/>
                  <rect x="40" y="40" width="8" height="8" fill="#222"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-blue-600 mb-1">iOS App</div>
                <div className="text-xs text-blue-400 mb-2">Scan to download</div>
                <a 
                  href="#" 
                  className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  <i className="fab fa-apple text-lg"></i>
                  <span>App Store</span>
                </a>
              </div>
            </div>

            {/* Android Download */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 60 60">
                  <rect width="60" height="60" rx="8" fill="#eee"/>
                  <rect x="8" y="8" width="12" height="12" fill="#222"/>
                  <rect x="40" y="8" width="12" height="12" fill="#222"/>
                  <rect x="8" y="40" width="12" height="12" fill="#222"/>
                  <rect x="24" y="24" width="12" height="12" fill="#222"/>
                  <rect x="40" y="40" width="8" height="8" fill="#222"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-blue-600 mb-1">Android App</div>
                <div className="text-xs text-blue-400 mb-2">Scan to download</div>
                <a 
                  href="#" 
                  className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  <i className="fab fa-google-play text-lg"></i>
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection; 