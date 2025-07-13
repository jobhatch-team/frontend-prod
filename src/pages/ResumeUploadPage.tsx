import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import { useAppSelector } from '../hooks/reduxHooks';

const ResumeUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    if (!user) {
      // Allow unauthenticated users to proceed (they might be waitlist users)
      console.log('No authenticated user found, allowing to proceed');
    }
  }, [user]);

  const validateFile = (file: File): string | null => {
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return 'File size must be less than 10MB';
    }

    // Check file type
    const allowedTypes = ['pdf', 'doc', 'docx', 'rtf', 'txt'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      return `File type not supported. Please use: ${allowedTypes.join(', ')}`;
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setUploadedFile(null);
        return;
      }
      setUploadedFile(file);
      setError('');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        setUploadedFile(null);
        return;
      }
      setUploadedFile(file);
      setError('');
    }
  };

  const handleFileButtonClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.rtf,.txt';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          setUploadedFile(null);
          return;
        }
        setUploadedFile(file);
        setError('');
      }
    };
    input.click();
  };

  const handleUploadResume = async () => {
    if (!uploadedFile) {
      handleFileButtonClick();
      return;
    }

    await uploadFile(uploadedFile);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setError('');
    setProgress(0);
    
    try {
      console.log('Starting file upload:', file.name);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name);

      console.log('Making API request to', API_ENDPOINTS.resumes);
      
      // Create XMLHttpRequest for progress tracking
      const xhr = new XMLHttpRequest();
      
      // Set up progress tracking
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(Math.round(percentComplete));
        }
      };

      // Set up the request
      const response = await new Promise<Response>((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve({
              ok: true,
              status: xhr.status,
              json: () => Promise.resolve(JSON.parse(xhr.responseText)),
            } as Response);
          } else {
            resolve({
              ok: false,
              status: xhr.status,
              json: () => Promise.resolve(JSON.parse(xhr.responseText)),
            } as Response);
          }
        };
        
        xhr.onerror = () => reject(new Error('Network error - server may be unavailable'));
        xhr.ontimeout = () => reject(new Error('Request timeout - server may be slow'));
        
        xhr.open('POST', API_ENDPOINTS.resumes);
        xhr.withCredentials = true;
        xhr.timeout = 30000; // 30 second timeout
        xhr.send(formData);
      });

      console.log('API response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
        
        // Show success message briefly
        setProgress(100);
        
        // Navigate to analysis page with resume ID
        setTimeout(() => {
          navigate(`/onboarding/analyze/${data.resume.id}`);
        }, 500);
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Server error' }));
        console.error('Upload failed:', errorData);
        throw new Error(errorData.error || 'Upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMessage = error.message || 'Failed to upload resume. Please try again.';
      
      // Handle CORS and network errors gracefully
      if (error.message.includes('Failed to fetch') || error.message.includes('Network error')) {
        setError(`${errorMessage}. The server may be temporarily unavailable. You can skip this step and continue with the onboarding process.`);
      } else {
        setError(errorMessage);
      }
      
      setProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSkip = () => {
    navigate('/onboarding/pricing');
  };

  const handleBackToOnboarding = () => {
    navigate('/onboarding');
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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">1</span>
              </div>
              <span className="ml-2 text-orange-500 font-medium">Resume/CV</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">2</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Analyze</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">3</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Profile</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">4</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Preferences</span>
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
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upload a recent resume or CV
          </h1>
          <p className="text-lg text-gray-600 mb-16">
            Autocomplete your profile in just a few seconds by uploading a resume.
          </p>

          {/* Upload Box */}
          <div className="max-w-md mx-auto">
            <div 
              className={`bg-white rounded-2xl border-2 border-dashed p-12 mb-8 transition-all ${
                isDragOver 
                  ? 'border-orange-500 bg-orange-50' 
                  : uploadedFile 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-orange-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Chick Character */}
              <div className="mb-8">
                <div className="relative">
                  <img
                    src="/images/homepage-chick-offer.png"
                    alt="JobHatch Character"
                    className="w-24 h-24 mx-auto object-contain"
                  />
                  {/* Document icon overlay */}
                  <div className="absolute -top-2 -right-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      uploadedFile ? 'bg-green-500' : 'bg-blue-500'
                    }`}>
                      {uploadedFile ? (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {!uploadedFile && (
                <div>
                  <p className="text-gray-600 text-sm mb-8">
                    Drag and drop your resume here, or click the button below to select a file
                  </p>
                  <p className="text-xs text-gray-500 mb-6">
                    Supported formats: PDF, DOC, DOCX, RTF, TXT (max 10MB)
                  </p>
                </div>
              )}

              {uploadedFile && (
                <div className="mb-6">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-700 font-medium">{uploadedFile.name}</span>
                    </div>
                    <p className="text-green-600 text-sm mt-1">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500 mr-2"></div>
                    <span className="text-gray-600">Uploading... {progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {!uploadedFile && (
                <button
                  onClick={handleFileButtonClick}
                  disabled={isUploading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Choose File
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              {uploadedFile && (
                <button
                  onClick={handleUploadResume}
                  disabled={isUploading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Upload & Analyze Resume
                    </>
                  )}
                </button>
              )}
              
              <button
                onClick={handleSkip}
                disabled={isUploading}
                className="w-full text-gray-500 hover:text-gray-700 font-medium underline disabled:opacity-50"
              >
                Skip for now
              </button>
              
              <button
                onClick={handleBackToOnboarding}
                disabled={isUploading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Back to Onboarding
              </button>
            </div>

            {/* Debug info for development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs text-gray-600">
                <p><strong>Debug Info:</strong></p>
                <p>API endpoint: {API_ENDPOINTS.resumes}</p>
                <p>Accepted types: PDF, DOC, DOCX, RTF, TXT</p>
                <p>Max size: 10MB</p>
                <p>User: {user?.email || 'Guest'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploadPage; 