/**
 * API Service
 * 
 * Handles all API requests to the backend server
 */

class APIService {
    constructor() {
        // Base URL for API calls
        // const API_BASE_URL = 'http://localhost:5001/api';
        const API_BASE_URL = 'https://backend-prod-dun.vercel.app/api';
        
        // Cache for API responses
        this.cache = {};
        
        // Default request options
        this.defaultOptions = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        // API endpoints
        this.endpoints = {
            // User endpoints
            userProfile: (userId) => `${API_BASE_URL}/user/${userId}/profile`,
            userRatings: (userId) => `${API_BASE_URL}/user/${userId}/progress/ratings`,
            userTodos: (userId) => `${API_BASE_URL}/user/${userId}/progress/todos`,
            
            // Job endpoints
            jobSearch: () => `${API_BASE_URL}/jobs/search`,
            jobDetails: (jobId) => `${API_BASE_URL}/jobs/${jobId}`,
            
            // Health check
            healthCheck: () => `${API_BASE_URL}/health`
        };
    }

    /**
     * Common fetch wrapper with error handling
     * @param {string} url - The URL to fetch
     * @param {Object} options - Fetch options
     * @returns {Promise} - Promise resolving to JSON response
     */
    fetchWithErrorHandling(url, options = {}) {
        return fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('API fetch error:', error);
                throw error;
            });
    }

    /**
     * Get user profile from API
     * @param {string} userId - The user ID
     * @returns {Promise} - Promise resolving to user profile data
     */
    getUserProfile(userId = 'user1') {
        return this.fetchWithErrorHandling(this.endpoints.userProfile(userId));
    }

    /**
     * Get user ratings from API
     * @param {string} userId - The user ID
     * @returns {Promise} - Promise resolving to user ratings data
     */
    getUserRatings(userId = 'user1') {
        return this.fetchWithErrorHandling(this.endpoints.userRatings(userId));
    }

    /**
     * Update user ratings
     * @param {string} userId - The user ID
     * @param {Object} ratingsData - The ratings data to update
     * @returns {Promise} - Promise resolving to response data
     */
    updateUserRatings(userId = 'user1', ratingsData) {
        return this.fetchWithErrorHandling(this.endpoints.userRatings(userId), {
            method: 'POST',
            body: JSON.stringify(ratingsData),
        });
    }

    /**
     * Get user todos from API
     * @param {string} userId - The user ID
     * @returns {Promise} - Promise resolving to user todos data
     */
    getUserTodos(userId = 'user1') {
        return this.fetchWithErrorHandling(this.endpoints.userTodos(userId));
    }

    /**
     * Parse resume PDF
     * @param {File} file - The PDF file to parse
     * @returns {Promise} - Promise resolving to parsed experiences
     */
    parseResume(file) {
        const formData = new FormData();
        formData.append('file', file);
        
        return this.fetchWithErrorHandling(this.endpoints.jobSearch(), {
            method: 'POST',
            body: formData,
        });
    }

    /**
     * Improve resume experiences
     * @param {Array} experiences - The experiences to improve
     * @returns {Promise} - Promise resolving to improved experiences
     */
    improveResume(experiences) {
        return this.fetchWithErrorHandling(this.endpoints.jobSearch(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ experiences }),
        });
    }
}

// Export all functions for use in other modules
window.apiService = new APIService(); 