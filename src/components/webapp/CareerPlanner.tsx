import React from 'react';

const CareerPlanner = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Career Planner</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">Let's make a personalized career plan</h3>
        <p className="text-gray-600 mb-6">We'll analyze your skills, experiences, and goals to craft your adventure map</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Start Your Journey
        </button>
      </div>
    </div>
  );
};

export default CareerPlanner; 