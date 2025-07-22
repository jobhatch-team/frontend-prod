import React from 'react';

const ResumeBuilder = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <i className="fas fa-plus mr-2"></i>New Resume
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-pen text-blue-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Free Write</h3>
            <p className="text-gray-600 text-sm">Create a resume from scratch with our guided editor</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-file-upload text-green-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload Existing</h3>
            <p className="text-gray-600 text-sm">Upload and enhance your existing resume</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-magic text-purple-600 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Resume Generator</h3>
            <p className="text-gray-600 text-sm">Let our AI create a tailored resume based on your profile</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Your Resumes</h2>
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-file-alt text-gray-400 text-2xl"></i>
          </div>
          <p className="text-gray-600 mb-4">You haven't created any resumes yet</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Create Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder; 