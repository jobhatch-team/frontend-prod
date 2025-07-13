import React from 'react';
import { Link } from 'react-router-dom';
import WaitlistEmailForm from '../components/WaitlistEmailForm';

const WaitlistPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🐥</span>
              </div>
              <span className="text-xl font-bold text-white">JOBHATCH</span>
            </Link>

            {/* Back to Home */}
            <Link 
              to="/" 
              className="text-white hover:text-orange-200 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our Waitlist
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Be the first to experience JobHatch! Get early access to our career platform and unlock exclusive benefits.
          </p>
        </div>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto">
          <WaitlistEmailForm />
        </div>

        {/* Benefits Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Early Access</h3>
            <p className="text-white/70">
              Be among the first to use our platform and get a head start on your career journey.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Exclusive Features</h3>
            <p className="text-white/70">
              Access premium features and tools designed to accelerate your job search.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Priority Support</h3>
            <p className="text-white/70">
              Get priority customer support and direct access to our team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistPage; 