// API Configuration with Enhanced Debugging
const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

// Enhanced logging function
const logApiConfig = (message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[API-CONFIG ${timestamp}] ${message}`, data || '');
};

// Environment detection
logApiConfig('Environment Detection', {
  MODE: import.meta.env.MODE,
  isDevelopment,
  isProduction,
  VITE_API_URL: import.meta.env.VITE_API_URL,
  window_location: typeof window !== 'undefined' ? window.location.origin : 'server-side'
});

// API Base URL Configuration
const API_BASE_URL = (() => {
  let baseUrl: string;
  
  if (isProduction) {
    // Production configuration
    baseUrl = import.meta.env.VITE_API_URL || 'https://backend-prod-team-jobhatchs-projects.vercel.app/api';
    logApiConfig('Using Production API URL', { 
      source: import.meta.env.VITE_API_URL ? 'Environment Variable' : 'Default',
      url: baseUrl 
    });
  } else {
    // Development configuration - use relative URLs to leverage Vite proxy
    if (typeof window !== 'undefined' && window.location.origin.includes('localhost')) {
      baseUrl = '/api'; // Use relative URL for localhost to leverage Vite proxy
      logApiConfig('Using Relative API URL (localhost)', { 
        reason: 'Localhost detected - using Vite proxy',
        url: baseUrl,
        resolvedUrl: window.location.origin + baseUrl
      });
    } else {
      // Fallback to production URL if not localhost
      baseUrl = 'https://backend-prod-team-jobhatchs-projects.vercel.app/api';
      logApiConfig('Using Production API URL (fallback)', { 
        reason: 'Not localhost - using production backend',
        url: baseUrl 
      });
    }
  }
  
  return baseUrl;
})();

// Verify API URL format
if (!API_BASE_URL.startsWith('http') && !API_BASE_URL.startsWith('/')) {
  console.error('[API-CONFIG ERROR] Invalid API URL format:', API_BASE_URL);
}

logApiConfig('Final API Base URL', { url: API_BASE_URL });

export const API_ENDPOINTS = {
  resumes: `${API_BASE_URL}/resumes`,
  coverLetters: `${API_BASE_URL}/cover_letters`,
  onboarding: `${API_BASE_URL}/onboarding`,
  auth: `${API_BASE_URL}/auth`,
  profiles: `${API_BASE_URL}/profiles`,
  aiResume: `${API_BASE_URL}/ai_resume`, 
  aiCoverLetter: `${API_BASE_URL}/ai_cover_letter`,
  ai: `${API_BASE_URL}/ai`,
  waitlist: `${API_BASE_URL}/waitlist`,
  jobs: `${API_BASE_URL}/jobs`,
  health: `${API_BASE_URL}/health`,
};

// Log all endpoints for debugging
logApiConfig('API Endpoints Configuration', API_ENDPOINTS);

// Enhanced fetch wrapper with debugging
export const debugFetch = async (url: string, options: RequestInit = {}) => {
  const requestId = Math.random().toString(36).substr(2, 9);
  const timestamp = new Date().toISOString();
  
  console.group(`[API-CALL ${requestId}] ${options.method || 'GET'} ${url}`);
  console.log('🕐 Request Time:', timestamp);
  console.log('🌐 URL:', url);
  console.log('⚙️ Options:', options);
  console.log('🏠 Origin:', typeof window !== 'undefined' ? window.location.origin : 'server-side');
  console.log('📍 Environment:', import.meta.env.MODE);
  
  try {
    const startTime = performance.now();
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    });
    
    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);
    
    console.log('📊 Response Status:', response.status);
    console.log('⏱️ Response Time:', `${duration}ms`);
    console.log('📝 Response Headers:', Object.fromEntries(response.headers.entries()));
    
    // Log response body for debugging (clone to avoid consuming)
    const responseClone = response.clone();
    try {
      const responseText = await responseClone.text();
      if (responseText) {
        try {
          const responseJson = JSON.parse(responseText);
          console.log('📄 Response Body (JSON):', responseJson);
        } catch {
          console.log('📄 Response Body (Text):', responseText.substring(0, 200) + '...');
        }
      } else {
        console.log('📄 Response Body: Empty');
      }
    } catch (e) {
      console.log('📄 Response Body: Could not read');
    }
    
    if (!response.ok) {
      console.error('❌ Request Failed');
      console.error('Status:', response.status);
      console.error('Status Text:', response.statusText);
      
      // Try to get error details
      try {
        const errorText = await response.text();
        console.error('Error Body:', errorText);
      } catch (e) {
        console.error('Could not read error body');
      }
    } else {
      console.log('✅ Request Successful');
    }
    
    console.groupEnd();
    return response;
    
  } catch (error) {
    const err = error as Error;
    console.error('❌ Network Error:', error);
    console.error('Error Type:', err.constructor?.name || 'Unknown');
    console.error('Error Message:', err.message || 'Unknown error');
    console.groupEnd();
    throw error;
  }
};

// Test function to verify backend connectivity
export const testBackendConnection = async () => {
  console.group('[BACKEND-TEST] Testing Backend Connection');
  
  const testEndpoints = [
    { name: 'Health Check', url: API_ENDPOINTS.health },
    { name: 'Waitlist', url: API_ENDPOINTS.waitlist },
    { name: 'Jobs', url: API_ENDPOINTS.jobs },
  ];
  
  const results = [];
  
  for (const endpoint of testEndpoints) {
    try {
      console.log(`Testing ${endpoint.name}...`);
      const response = await debugFetch(endpoint.url, { method: 'GET' });
      results.push({
        name: endpoint.name,
        url: endpoint.url,
        success: response.ok,
        status: response.status
      });
    } catch (error) {
      const err = error as Error;
      console.error(`Failed to test ${endpoint.name}:`, error);
      results.push({
        name: endpoint.name,
        url: endpoint.url,
        success: false,
        error: err.message || 'Unknown error'
      });
    }
  }
  
  console.table(results);
  console.groupEnd();
  
  return results;
};

// Auto-test backend on load (both development and production)
if (typeof window !== 'undefined') {
  // Wait a bit for the app to load, then test
  setTimeout(() => {
    console.log('[AUTO-TEST] Running automatic backend connectivity test...');
    testBackendConnection().then(results => {
      const failed = results.filter(r => !r.success);
      if (failed.length > 0) {
        console.error('[AUTO-TEST] ⚠️ Some backend endpoints are not responding:', failed);
        console.error('[AUTO-TEST] This may cause frontend functionality issues');
      } else {
        console.log('[AUTO-TEST] ✅ All backend endpoints are responding correctly');
      }
    });
  }, 2000);
}

export default API_BASE_URL; 