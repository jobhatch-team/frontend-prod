import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../features/home/components/HeroSection';
import HowItWorksSection from '../features/home/components/HowItWorksSection';
import TestimonialsSection from '../features/home/components/TestimonialsSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage; 