import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TestPage: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const navigate = useNavigate();

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testBackendConnection = async () => {
    try {
      const response = await fetch('https://backend-prod-team-jobhatchs-projects.vercel.app/api/health');
      if (response.ok) {
        const data = await response.json();
        addResult(`✅ Backend health check: ${data.message}`);
      } else {
        addResult(`❌ Backend health check failed: ${response.status}`);
      }
    } catch (error) {
      addResult(`❌ Backend connection error: ${error}`);
    }
  };

  const testOnboardingEndpoints = async () => {
    try {
      const response = await fetch('https://backend-prod-team-jobhatchs-projects.vercel.app/api/onboarding');
      if (response.ok) {
        const data = await response.json();
        addResult(`✅ Onboarding endpoint: ${data.message}`);
      } else {
        addResult(`❌ Onboarding endpoint failed: ${response.status}`);
      }
    } catch (error) {
      addResult(`❌ Onboarding endpoint error: ${error}`);
    }
  };

  const testWaitlistFlow = () => {
    addResult('🔄 Testing waitlist flow redirect...');
    navigate('/onboarding?from=waitlist');
  };

  const testNormalOnboarding = () => {
    addResult('🔄 Testing normal onboarding flow...');
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">JobHatch Deployment Test</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
          <div className="space-y-4">
            <button
              onClick={testBackendConnection}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Test Backend Connection
            </button>
            <button
              onClick={testOnboardingEndpoints}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Test Onboarding Endpoints
            </button>
            <button
              onClick={testWaitlistFlow}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Test Waitlist Flow
            </button>
            <button
              onClick={testNormalOnboarding}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Test Normal Onboarding
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Test Results</h2>
          <div className="space-y-2">
            {testResults.length === 0 ? (
              <p className="text-gray-500">No tests run yet</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded font-mono text-sm">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Current Environment</h2>
          <div className="space-y-2 text-sm">
            <div><strong>URL:</strong> {window.location.href}</div>
            <div><strong>User Agent:</strong> {navigator.userAgent}</div>
            <div><strong>Timestamp:</strong> {new Date().toISOString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage; 