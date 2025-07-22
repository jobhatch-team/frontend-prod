import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Logo and Brand */}
            <div className="flex items-center gap-4">
              <Image
                src="/LOGO.jpg"
                alt="JobHatch Logo"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold text-gray-900 font-baloo2">JOBHATCH</span>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-4xl">
              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-4">🧭 Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="/webapp" className="text-gray-600 hover:text-blue-600 transition-colors">
                      Web App
                    </a>
                  </li>
                  <li>
                    <a href="#download" className="text-gray-600 hover:text-blue-600 transition-colors">
                      Download Mobile App
                    </a>
                  </li>
                </ul>
              </div>

              {/* Community */}
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-4">👥 Community</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                      Ambassador Program
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                      Refer a Friend
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-4">🏢 Company</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                      Join Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Icons */}
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-40 mb-4">
                  <Image
                    src="/images/Tiktok.png"
                    alt="TikTok"
                    width={80}
                    height={80}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-12"
                  />
                  <Image
                    src="/images/Linkedln.png"
                    alt="LinkedIn"
                    width={90}
                    height={70}
                    className="absolute bottom-4 left-4 -rotate-12"
                  />
                  <Image
                    src="/images/Ins.png"
                    alt="Instagram"
                    width={70}
                    height={70}
                    className="absolute bottom-2 right-4 rotate-12"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your Email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Contact Us
              </button>
            </form>

            {/* Stars */}
            <div className="flex gap-2">
              {[1, 2, 3].map((star) => (
                <span key={star} className="text-yellow-400 text-2xl">★</span>
              ))}
            </div>

            {/* Bottom Text */}
            <div className="text-center text-gray-600 space-y-2">
              <p className="flex items-center justify-center gap-2">
                Designed with <i className="fas fa-heart text-red-500"></i> by the JobHatch Team
              </p>
              <p>Copyright © 2025 L3 INNO INC</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 