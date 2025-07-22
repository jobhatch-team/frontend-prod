import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JobPreferencesPage: React.FC = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    searchStage: '',
    jobTypes: [] as string[],
    desiredSalary: '',
    roleType: '',
    locations: '',
    remoteWork: '',
    workAuthorization: '',
    sponsorship: '',
    companySizes: [] as string[]
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/onboarding/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          user_type: 'job_seeker',
          interests: ['seeking_job'],
          job_search_stage: preferences.searchStage,
          job_types: preferences.jobTypes.join(','),
          desired_salary: preferences.desiredSalary,
          role_type: preferences.roleType,
          preferred_locations: preferences.locations,
          open_to_remote: preferences.remoteWork === 'yes',
          needs_sponsorship: preferences.sponsorship === 'yes',
          has_work_authorization: preferences.workAuthorization === 'yes',
          company_sizes: preferences.companySizes.join(',')
        })
      });

      if (response.ok) {
        navigate('/onboarding/complete');
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Server error' }));
        throw new Error(errorData.error || 'Failed to save preferences');
      }
    } catch (error: any) {
      console.error('Preferences error:', error);
      
      // Handle CORS and network errors gracefully
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.log('💾 Backend unavailable, saving job preferences locally');
        localStorage.setItem('job_preferences', JSON.stringify({
          ...preferences,
          timestamp: new Date().toISOString(),
          backendSaved: false
        }));
        
        alert('Unable to save to server, but your job preferences have been saved locally. Continuing to complete onboarding...');
        
        // Navigate to complete the onboarding
        setTimeout(() => {
          navigate('/onboarding/complete');
        }, 1000);
      } else {
        alert('Failed to save preferences. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🐥</span>
              </div>
              <span className="text-xl font-bold text-gray-900">JOBHATCH</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="font-medium">Mia Yue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-green-600 font-medium">Resume/CV</span>
            </div>
            <div className="w-16 h-0.5 bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-green-600 font-medium">Analyze</span>
            </div>
            <div className="w-16 h-0.5 bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-green-600 font-medium">Profile</span>
            </div>
            <div className="w-16 h-0.5 bg-orange-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">4</span>
              </div>
              <span className="ml-2 text-orange-500 font-medium">Preferences</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">5</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Set your job search preferences
          </h1>
          <p className="text-gray-600">
            Your answers determine which jobs we recommend to you and which startups see your profile.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          {/* Job Search Stage */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Where are you in your job search?
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {['Ready to interview', 'Open to offers', 'Casually looking'].map((stage) => (
                <button
                  key={stage}
                  onClick={() => handleInputChange('searchStage', stage)}
                  className={`p-4 text-center border-2 rounded-lg transition-all ${
                    preferences.searchStage === stage
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 text-gray-700 hover:border-orange-300'
                  }`}
                >
                  <div className="text-sm font-medium">{stage}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {stage === 'Ready to interview' && 'I am actively applying to interviews, I can start interviewing right away.'}
                    {stage === 'Open to offers' && 'I may consider applying to new opportunities if the role and company match my goals.'}
                    {stage === 'Casually looking' && 'I am not sure if I want to leave yet but would like to learn what else is out there.'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Job Types */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What type of job are you interested in?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Select one or more. You can always change your mind later.
            </p>
            <div className="grid grid-cols-4 gap-3">
              {['Full Time Employee', 'Contractor', 'Intern', 'Co-founder'].map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.jobTypes.includes(type)}
                    onChange={(e) => handleCheckboxChange('jobTypes', type, e.target.checked)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Desired Salary */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What is your desired salary?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Your information will never be shown publicly.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="$0"
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={preferences.desiredSalary}
                onChange={(e) => handleInputChange('desiredSalary', e.target.value)}
              />
              <select className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white">
                <option>Other (not relevant)</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>

          {/* Role Type */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What kind of role are you looking for?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              We'll use this information to find you matches.
            </p>
            <input
              type="text"
              placeholder="Product Manager"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={preferences.roleType}
              onChange={(e) => handleInputChange('roleType', e.target.value)}
            />
            <button className="mt-2 text-orange-500 text-sm font-medium">+ Add role</button>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What locations do you want to work at?
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              You can use specific cities like "San Francisco, CA" or broader like "San Francisco Bay Area"
            </p>
            <input
              type="text"
              placeholder="San Jose"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={preferences.locations}
              onChange={(e) => handleInputChange('locations', e.target.value)}
            />
            <div className="mt-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={preferences.remoteWork === 'yes'}
                  onChange={(e) => handleInputChange('remoteWork', e.target.checked ? 'yes' : 'no')}
                  className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-600">I'm open to working remotely</span>
              </label>
            </div>
          </div>

          {/* Work Authorization */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              US work authorization ❔
            </h3>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => handleInputChange('workAuthorization', 'yes')}
                className={`px-6 py-2 rounded-lg border transition-colors ${
                  preferences.workAuthorization === 'yes'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-orange-500'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleInputChange('workAuthorization', 'no')}
                className={`px-6 py-2 rounded-lg border transition-colors ${
                  preferences.workAuthorization === 'no'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-orange-500'
                }`}
              >
                No
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Are you legally authorized to work in the United States?
            </p>
            <p className="text-sm text-gray-600">
              Do you now, or will you in the future, require sponsorship for a US employment visa (e.g. H-1B)?
            </p>
          </div>

          {/* Sponsorship */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Would you like to work at companies of these sizes?
            </h3>
            <div className="space-y-3">
              {[
                { id: 'seed', label: 'Seed (1-10 employees)', desc: 'Very early stage company' },
                { id: 'series_a', label: 'Series A (11-50 employees)', desc: 'Early stage company' },
                { id: 'series_b', label: 'Series B (51-200 employees)', desc: 'Growth stage company' },
                { id: 'series_c', label: 'Series C+ (201+ employees)', desc: 'Later stage company' },
                { id: 'public', label: 'Public (1000+ employees)', desc: 'Large public company' }
              ].map((size) => (
                <div key={size.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={preferences.companySizes.includes(size.id)}
                    onChange={(e) => handleCheckboxChange('companySizes', size.id, e.target.checked)}
                    className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{size.label}</div>
                    <div className="text-xs text-gray-500">{size.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPreferencesPage; 