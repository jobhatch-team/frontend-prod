import React from 'react';

const JobsSection = () => {
  const jobs = [
    {
      id: 1,
      title: 'UX Designer',
      company: 'Creative Design Co.',
      location: 'San Francisco, CA',
      salary: '$85,000 - $110,000',
      match: 85,
      logo: '/images/company-logo1.svg',
      tags: ['UX Design', 'Figma', 'User Research'],
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Tech Innovations Inc.',
      location: 'Remote',
      salary: '$90,000 - $120,000',
      match: 92,
      logo: '/images/company-logo2.svg',
      tags: ['React', 'JavaScript', 'CSS'],
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Startup Growth Ltd.',
      location: 'New York, NY',
      salary: '$110,000 - $140,000',
      match: 78,
      logo: '/images/company-logo3.svg',
      tags: ['Product Strategy', 'Agile', 'Roadmapping'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Find the right jobs for you</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for jobs and companies"
              className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80"
            />
            <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm">Clear All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select Location</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Types</option>
              <option value="fulltime">Full-time</option>
              <option value="parttime">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">All Levels</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Any Salary</option>
              <option value="50k-75k">$50k - $75k</option>
              <option value="75k-100k">$75k - $100k</option>
              <option value="100k+">$100k+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="fas fa-building text-gray-400 text-xl"></i>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <i className="fas fa-map-marker-alt"></i>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <i className="fas fa-money-bill-wave"></i>
                        {job.salary}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">
                      Looking for a talented professional to join our growing team...
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-1">
                        <span className="text-green-700 font-bold">{job.match}%</span>
                      </div>
                      <span className="text-xs text-gray-500">Match</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
                        <i className="far fa-heart text-gray-500"></i>
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsSection; 