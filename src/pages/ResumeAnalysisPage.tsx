import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import { useAppSelector } from '../hooks/reduxHooks';

interface AnalysisData {
  score_overall: number;
  score_format: number;
  score_skills: number;
  score_experience: number;
  candidate_name?: string;
  strengths: string;
  weaknesses: string;
  suggestions: string;
}

interface JobMatch {
  title: string;
  company: string;
  match_score: number;
  description: string;
  requirements: string[];
}

const ResumeAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { resumeId } = useParams<{ resumeId: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [error, setError] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  useEffect(() => {
    if (resumeId) {
      analyzeResume();
    } else {
      setError('No resume ID provided');
      setIsAnalyzing(false);
    }
  }, [resumeId]);

  // Simulate progress updates during analysis
  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev < 90) {
            return prev + Math.random() * 10;
          }
          return prev;
        });
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const analyzeResume = async () => {
    try {
      console.log('Starting analysis for resume:', resumeId);
      setError('');
      setIsAnalyzing(true);
      setAnalysisProgress(0);
      
      const response = await fetch(`${API_ENDPOINTS.aiResume}/resumes/${resumeId}/analyze`, {
        method: 'POST',
        credentials: 'include',
      });

      console.log('Analysis response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Analysis data received:', data);
        
        setAnalysisProgress(100);
        setTimeout(() => {
          setAnalysisData(data.analysis);
          setJobMatches(data.job_matches || []);
          setIsAnalyzing(false);
        }, 500);
      } else {
        const errorData = await response.json().catch(() => ({ 
          error: `Analysis failed with status ${response.status}` 
        }));
        console.error('Analysis failed:', errorData);
        throw new Error(errorData.error || 'Analysis failed');
      }
    } catch (error: any) {
      console.error('Analysis error:', error);
      let errorMessage = error.message || 'Failed to analyze resume';
      
      // Handle CORS and network errors gracefully
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = 'Unable to connect to the analysis server. This may be due to network issues or the server being temporarily unavailable. You can skip this step and continue with the onboarding process.';
      }
      
      setError(errorMessage);
      setAnalysisProgress(0);
      setIsAnalyzing(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    analyzeResume();
  };

  const handleContinue = () => {
    navigate('/onboarding/pricing');
  };

  const handleSeeFullReport = () => {
    // Could navigate to a detailed report page
    alert('Full detailed report feature coming soon!');
  };

  const handleBackToUpload = () => {
    navigate('/onboarding/upload');
  };

  // Loading state
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4">
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

        {/* Loading Content */}
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-sm">🧠</span>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Analyzing your resume...
            </h2>
            
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${analysisProgress}%` }}
                />
              </div>
              
              <p className="text-gray-600 text-sm">
                {analysisProgress < 30 ? 'Parsing your resume content...' :
                 analysisProgress < 60 ? 'Analyzing skills and experience...' :
                 analysisProgress < 90 ? 'Matching with job opportunities...' :
                 'Finalizing analysis...'}
              </p>
              
              <div className="text-xs text-gray-500 mt-4">
                <p>This may take a few moments...</p>
                <p>We're using AI to provide you with detailed insights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !analysisData) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-6 py-4">
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

        {/* Error Content */}
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Analysis Failed
            </h2>
            
            <p className="text-gray-600 mb-6">
              {error}
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleRetry}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Try Again {retryCount > 0 && `(${retryCount})`}
              </button>
              
              <button
                onClick={handleBackToUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back to Upload
              </button>
              
              <button
                onClick={handleContinue}
                className="w-full text-gray-500 hover:text-gray-700 font-medium underline"
              >
                Skip Analysis & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const overallScore = Math.round((analysisData?.score_overall || 0) * 10);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🐥</span>
              </div>
              <span className="text-xl font-bold text-gray-900">JOBHATCH</span>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center gap-8 text-sm">
              <span className="text-gray-600">Resume/CV</span>
              <span className="text-orange-500 font-medium">Job Analysis</span>
              <span className="text-gray-600">Profile</span>
              <span className="text-gray-600">Preferences</span>
              <span className="text-gray-600">Done</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="font-medium">{user?.username || user?.email || 'Guest User'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Resume Analysis Results
          </h1>
          <p className="text-gray-600">
            We've analyzed your resume and found matching opportunities!
          </p>
        </div>

        {/* Success Message */}
        <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-green-700">
              Analysis complete! Here's what we found about your resume and potential job matches.
            </span>
          </div>
        </div>

        {/* Analysis Report Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Your JobHatch Analysis Report</h2>
              <p className="text-gray-600 text-sm mb-4">
                Hi {analysisData?.candidate_name || 'there'}, here's your personalized analysis:
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {analysisData?.strengths}
              </p>
            </div>
            
            {/* Overall Score */}
            <div className="text-center ml-8">
              <div className="text-5xl font-bold text-blue-600 mb-1">
                {overallScore}
              </div>
              <div className="text-gray-500 text-sm">Overall Score</div>
            </div>
          </div>

          {/* Skills Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Left side - Progress bars */}
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Skills Match</span>
                  <span className="text-sm font-semibold text-gray-800">{Math.round((analysisData?.score_skills || 0) * 10)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${(analysisData?.score_skills || 0) * 10}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Experience Level</span>
                  <span className="text-sm font-semibold text-gray-800">{Math.round((analysisData?.score_experience || 0) * 10)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${(analysisData?.score_experience || 0) * 10}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Format Quality</span>
                  <span className="text-sm font-semibold text-gray-800">{Math.round((analysisData?.score_format || 0) * 10)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-500 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${(analysisData?.score_format || 0) * 10}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right side - Visual representation */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <svg width="200" height="200" className="transform -rotate-90">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(overallScore / 100) * 502.65} 502.65`}
                    strokeLinecap="round"
                    className="transition-all duration-2000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{overallScore}%</div>
                    <div className="text-xs text-gray-500">Match Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✅ Strengths</h4>
              <p className="text-gray-600 leading-relaxed">{analysisData?.strengths || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🔧 Areas for Improvement</h4>
              <p className="text-gray-600 leading-relaxed">{analysisData?.weaknesses || 'N/A'}</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">💡 Suggestions</h4>
              <p className="text-gray-600 leading-relaxed">{analysisData?.suggestions || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Job Matches Section */}
        {jobMatches.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Job Matches for Your Profile
            </h2>
            <div className="space-y-6">
              {jobMatches.map((job, index) => (
                <div 
                  key={index}
                  className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative ${
                    job.match_score < 0.5 ? 'opacity-60' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-lg">💼</span>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{job.title}</h3>
                            <p className="text-sm text-gray-600">{job.company}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {job.requirements.slice(0, 4).map((req, reqIndex) => (
                            <span 
                              key={reqIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {req}
                            </span>
                          ))}
                          {job.requirements.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{job.requirements.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Match Score */}
                      <div className="text-right ml-6">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                          {Math.round(job.match_score * 100)}%
                        </div>
                        <div className="text-xs text-gray-500">Match</div>
                      </div>
                    </div>

                    {/* Match Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          job.match_score >= 0.7 ? 'bg-green-500' :
                          job.match_score >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${job.match_score * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSeeFullReport}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              See Detailed Report
            </button>
            
            <button
              onClick={handleContinue}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Continue to Next Step
            </button>
          </div>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={handleBackToUpload}
              className="text-gray-500 hover:text-gray-700 font-medium underline"
            >
              Upload Different Resume
            </button>
            
            <button
              onClick={handleContinue}
              className="text-gray-500 hover:text-gray-700 font-medium underline"
            >
              Skip to Pricing →
            </button>
          </div>
        </div>

        {/* Debug info for development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
            <p><strong>Debug Info:</strong></p>
            <p>Resume ID: {resumeId}</p>
            <p>API Endpoint: {API_ENDPOINTS.aiResume}/resumes/{resumeId}/analyze</p>
            <p>Analysis Score: {analysisData?.score_overall || 0}</p>
            <p>Job Matches: {jobMatches.length}</p>
            <p>User: {user?.email || 'Guest'}</p>
          </div>
        )}

        {/* Analysis info for users */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <h4 className="font-semibold text-blue-900">Analysis Information</h4>
          </div>
          <div className="text-sm text-blue-800">
            <p>✅ Your resume has been analyzed using advanced AI algorithms.</p>
            <p>📊 Scores are based on your actual resume content including skills, experience, and formatting.</p>
            <p>🎯 Job matches are calculated based on keywords and requirements found in your resume.</p>
            <p>🔄 This analysis helps JobHatch recommend the best opportunities for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisPage; 