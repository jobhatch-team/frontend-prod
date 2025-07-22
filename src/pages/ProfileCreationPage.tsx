import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import { useAppSelector } from '../hooks/reduxHooks';

const ProfileCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    location: '',
    role: '',
    experience: '',
    isStudent: '',
    jobTitle: '',
    company: '',
    companyLocation: '',
    linkedinUrl: '',
    websiteUrl: '',
    githubUrl: '',
    currentlyEmployed: true
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    if (!formData.experience) {
      newErrors.experience = 'Experience level is required';
    }
    if (!formData.isStudent) {
      newErrors.isStudent = 'Please indicate if you are a student';
    }
    
    // Validate URLs if provided
    if (formData.linkedinUrl && !formData.linkedinUrl.includes('linkedin.com')) {
      newErrors.linkedinUrl = 'Please enter a valid LinkedIn URL';
    }
    if (formData.githubUrl && !formData.githubUrl.includes('github.com')) {
      newErrors.githubUrl = 'Please enter a valid GitHub URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    try {
      // Create/update profile
      const profileResponse = await fetch(API_ENDPOINTS.profiles, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          location: formData.location,
          current_role: formData.role,
          years_experience: formData.experience,
          is_student: formData.isStudent === 'yes',
          linkedin_url: formData.linkedinUrl,
          website_url: formData.websiteUrl,
          github_url: formData.githubUrl,
          current_job_title: formData.jobTitle,
          current_company: formData.company,
          current_company_location: formData.companyLocation,
          currently_employed: formData.currentlyEmployed
        })
      });

      if (profileResponse.ok) {
        navigate('/onboarding/preferences');
      } else {
        const errorData = await profileResponse.json().catch(() => ({ error: 'Server error' }));
        throw new Error(errorData.error || 'Failed to save profile');
      }
    } catch (error: any) {
      console.error('Profile creation error:', error);
      
      // Handle CORS and network errors gracefully
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.log('💾 Backend unavailable, saving profile data locally');
        localStorage.setItem('profile_data', JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          backendSaved: false
        }));
        
        setErrors({ 
          submit: 'Unable to save to server, but your profile data has been saved locally. You can continue with the onboarding process.' 
        });
        
        // Allow user to continue after showing the message
        setTimeout(() => {
          navigate('/onboarding/preferences');
        }, 3000);
      } else {
        setErrors({ submit: error.message || 'Failed to save profile. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/onboarding/pricing');
  };

  const handleSkip = () => {
    navigate('/onboarding/preferences');
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              <span className="font-medium">{user?.username || user?.email || 'Guest User'}</span>
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
              <span className="ml-2 text-green-600 font-medium">Pricing</span>
            </div>
            <div className="w-16 h-0.5 bg-orange-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">4</span>
              </div>
              <span className="ml-2 text-orange-500 font-medium">Profile</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">5</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Preferences</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">6</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tell us about yourself
          </h1>
          <p className="text-lg text-gray-600">
            Help us personalize your job search experience
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-red-700">{errors.submit}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., San Francisco, CA"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.role ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Software Engineer"
              />
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.experience ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select experience level</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="mid">Mid Level (2-5 years)</option>
                <option value="senior">Senior Level (5-10 years)</option>
                <option value="lead">Lead/Principal (10+ years)</option>
              </select>
              {errors.experience && (
                <p className="mt-1 text-sm text-red-600">{errors.experience}</p>
              )}
            </div>

            {/* Student Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are you currently a student? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="yes"
                    checked={formData.isStudent === 'yes'}
                    onChange={(e) => handleInputChange('isStudent', e.target.value)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="no"
                    checked={formData.isStudent === 'no'}
                    onChange={(e) => handleInputChange('isStudent', e.target.value)}
                    className="text-orange-500 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
              {errors.isStudent && (
                <p className="mt-1 text-sm text-red-600">{errors.isStudent}</p>
              )}
            </div>

            {/* Current Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Job Title
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Senior Software Engineer"
              />
            </div>

            {/* Current Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Company
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Google"
              />
            </div>

            {/* LinkedIn URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn Profile
              </label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.linkedinUrl ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://linkedin.com/in/username"
              />
              {errors.linkedinUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.linkedinUrl}</p>
              )}
            </div>

            {/* GitHub URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Profile
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.githubUrl ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://github.com/username"
              />
              {errors.githubUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.githubUrl}</p>
              )}
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Website
              </label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="https://yourwebsite.com"
              />
            </div>

                         {/* Employment Status */}
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 Employment Status
               </label>
               <div className="flex gap-4">
                 <label className="flex items-center">
                   <input
                     type="radio"
                     value="true"
                     checked={formData.currentlyEmployed === true}
                     onChange={(e) => handleInputChange('currentlyEmployed', e.target.value === 'true')}
                     className="text-orange-500 focus:ring-orange-500"
                   />
                   <span className="ml-2 text-gray-700">Currently Employed</span>
                 </label>
                 <label className="flex items-center">
                   <input
                     type="radio"
                     value="false"
                     checked={formData.currentlyEmployed === false}
                     onChange={(e) => handleInputChange('currentlyEmployed', e.target.value === 'true')}
                     className="text-orange-500 focus:ring-orange-500"
                   />
                   <span className="ml-2 text-gray-700">Not Currently Employed</span>
                 </label>
               </div>
             </div>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-red-700">{errors.submit}</span>
              </div>
              {/* Show continue button when there are backend issues */}
              {errors.submit.includes('Unable to save to server') && (
                <div className="mt-3">
                  <button
                    onClick={handleSkip}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    Continue Anyway →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleBack}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Back to Pricing
            </button>
            
            <div className="flex gap-4">
              <button
                onClick={handleSkip}
                disabled={isLoading}
                className="text-gray-500 hover:text-gray-700 font-medium underline disabled:opacity-50"
              >
                Skip for now
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                {isLoading ? 'Saving...' : 'Save & Continue'}
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <h4 className="font-semibold text-blue-900">Privacy & Security</h4>
          </div>
          <p className="text-sm text-blue-800">
            Your information is secure and private. We only use it to personalize your job search experience 
            and will never share your data without your explicit consent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreationPage; 