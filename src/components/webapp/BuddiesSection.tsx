import React from 'react';

const BuddiesSection = () => {
  const buddies = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'UX Designer at Creative Studios',
      experience: '3 years experience',
      location: 'San Francisco, CA (Remote)',
      availability: 'Available for weekly check-ins',
      match: 92,
      avatar: '/images/avatar-1.svg',
      interests: ['UI/UX', 'Product Design', 'Career Growth'],
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Frontend Developer at Tech Solutions',
      experience: '2 years experience',
      location: 'Boston, MA (Remote)',
      availability: 'Available for bi-weekly check-ins',
      match: 85,
      avatar: '/images/avatar-2.svg',
      interests: ['JavaScript', 'React', 'Interview Prep'],
    },
    {
      id: 3,
      name: 'Jessica Taylor',
      title: 'Marketing Specialist at Brand Inc.',
      experience: '4 years experience',
      location: 'Chicago, IL',
      availability: 'Available for weekly check-ins',
      match: 78,
      avatar: '/images/avatar-3.svg',
      interests: ['Digital Marketing', 'Content Strategy', 'Resume Building'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Find Accountability Partners</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <i className="fas fa-users"></i>
          Match Me
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Industries</option>
              <option value="tech">Technology</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Levels</option>
              <option value="student">Student</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Frequency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Any Frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buddy Types Tabs */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex border-b border-gray-200">
          <button className="px-6 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
            Peers
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            Mentors
          </button>
          <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            My Connections
          </button>
        </div>

        {/* Buddy Cards */}
        <div className="p-6 space-y-6">
          {buddies.map((buddy) => (
            <div key={buddy.id} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-user text-gray-400 text-xl"></i>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{buddy.name}</h3>
                      <p className="text-gray-600 mb-2">{buddy.title}</p>
                      <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                        {buddy.match}% Match
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fas fa-briefcase w-4"></i>
                      <span>{buddy.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fas fa-map-marker-alt w-4"></i>
                      <span>{buddy.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <i className="fas fa-calendar-check w-4"></i>
                      <span>{buddy.availability}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {buddy.interests.map((interest, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                      View Profile
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuddiesSection; 