import React from 'react';
import Navbar from '../components/Navbar';
import DownloadSection from '../components/DownloadSection';
import Footer from '../components/Footer';

const DownloadPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default DownloadPage; 