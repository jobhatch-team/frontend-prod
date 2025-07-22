import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/webapp/AppHeader';
import AppSidebar from '../components/webapp/AppSidebar';
import HomeDashboard from '../components/webapp/HomeDashboard';
import CareerPlanner from '../components/webapp/CareerPlanner';
import ResumeBuilder from '../components/webapp/ResumeBuilder';
import JobsSection from '../components/webapp/JobsSection';
import BuddiesSection from '../components/webapp/BuddiesSection';

const WebApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleNotifications = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeDashboard />;
      case 'planner':
        return <CareerPlanner />;
      case 'resume':
        return <ResumeBuilder />;
      case 'jobs':
        return <JobsSection />;
      case 'buddies':
        return <BuddiesSection />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* App Header */}
      <AppHeader 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        showNotificationDropdown={showNotificationDropdown}
        onToggleNotifications={toggleNotifications}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <AppSidebar />

          {/* Main Content Area */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </main>

      {/* CSS Styles */}
      <style>{`
        .app-body {
          font-family: 'Inter', sans-serif;
          background-color: #f8fafc;
        }
      `}</style>
    </div>
  );
};

export default WebApp; 