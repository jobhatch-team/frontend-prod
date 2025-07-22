import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FoundersClubPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="text-center py-20 px-5 max-w-2xl mx-auto">
        {/* Character Image */}
        <img 
          src="/images/chick-pc-owl.png" 
          alt="Chick and Owl Characters" 
          className="w-60 h-auto mx-auto mb-8 block"
        />
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
          JobHatch Founders' Club
        </h1>
        
        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          Join us and find your next founding team member!
        </p>
        
        {/* Button Group */}
        <div className="flex flex-col gap-4 items-center">
          <a 
            href="https://discord.com/invite/PFyVg2FdaU" 
            className="bg-indigo-600 text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-colors min-w-56 text-center inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join our Discord Group
          </a>
          
          <a 
            href="https://chat.whatsapp.com/LS8LjJSKLzsGsWb4zgqjmJ" 
            className="bg-gray-900 text-white py-3 px-8 rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors min-w-56 text-center inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join our WhatsApp Group
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FoundersClubPage; 