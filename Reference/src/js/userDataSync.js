/**
 * User Data Synchronization Utilities
 * Provides functions for loading and saving user data across the application
 */

// Global cache for user data to minimize repeat fetches
const dataCache = {
    profile: null,
    statusRatings: null,
    todos: null,
    jobs: null
};

/**
 * Load user profile data from backend
 * @param {string} userId - The user ID
 * @returns {Promise} - Promise resolving to user profile data
 */
function loadUserProfile(userId = 'user1') {
    // Check cache first
    if (dataCache.profile) {
        return Promise.resolve(dataCache.profile);
    }
    
    return window.apiService.getUserProfile(userId)
        .then(data => {
            // Update cache
            dataCache.profile = data;
            return data;
        })
        .catch(error => {
            console.error('Error loading profile:', error);
            // Return a minimal profile in case of error
            return {
                userId: userId,
                fullName: 'Default User',
                profession: 'Software Developer',
                skills: ['JavaScript', 'HTML/CSS']
            };
        });
}

/**
 * Load user status ratings from backend
 * @param {string} userId - The user ID
 * @returns {Promise} - Promise resolving to user status ratings
 */
function loadUserStatusRatings(userId = 'user1') {
    // Check cache first
    if (dataCache.statusRatings) {
        return Promise.resolve(dataCache.statusRatings);
    }
    
    return window.apiService.getUserRatings(userId)
        .then(data => {
            // Update cache
            dataCache.statusRatings = data;
            return data;
        })
        .catch(error => {
            console.error('Error loading status ratings:', error);
            // Return default ratings in case of error
            return {
                userId: userId,
                technicalSkills: 3,
                interviewPreparation: 2,
                resumeReadiness: 2,
                jobSearchActivity: 1,
                lastUpdated: new Date().toISOString(),
                history: [
                    {
                        date: new Date().toISOString(),
                        technicalSkills: 3,
                        interviewPreparation: 2,
                        resumeReadiness: 2,
                        jobSearchActivity: 1
                    }
                ]
            };
        });
}

/**
 * Load user todos from backend
 * @param {string} userId - The user ID
 * @returns {Promise} - Promise resolving to user todos
 */
function loadUserTodos(userId = 'user1') {
    // Check cache first
    if (dataCache.todos) {
        return Promise.resolve(dataCache.todos);
    }
    
    return window.apiService.getUserTodos(userId)
        .then(data => {
            // Update cache
            dataCache.todos = data;
            return data;
        })
        .catch(error => {
            console.error('Error loading todos:', error);
            // Return empty todos in case of error
            return {
                userId: userId,
                todos: [],
                lastUpdated: new Date().toISOString()
            };
        });
}

/**
 * Load user job applications from backend
 * @param {string} userId - The user ID
 * @returns {Promise} - Promise resolving to user job applications
 */
function loadUserJobs(userId = 'user1') {
    // Check cache first
    if (dataCache.jobs) {
        return Promise.resolve(dataCache.jobs);
    }
    
    // This is a placeholder until a proper API endpoint is created
    // for job applications. For now, using mock data.
    return Promise.resolve({
        applications: [],
        saved: [],
        stats: {
            applied: 0,
            interviews: 0,
            offers: 0,
            rejected: 0,
            saved: 0,
            lastUpdated: new Date().toISOString()
        }
    }).then(data => {
        // Update cache
        dataCache.jobs = data;
        return data;
    });
}

/**
 * Save user status ratings to backend
 * @param {Object} statusData - The status data to save
 * @param {string} userId - The user ID
 * @returns {Promise} - Promise resolving when save is complete
 */
function saveUserStatusRatings(statusData, userId = 'user1') {
    // Update cache immediately for faster UI updates
    dataCache.statusRatings = statusData;
    
    // Use the API service to update the ratings
    return window.apiService.updateUserRatings(userId, statusData)
        .then(response => {
            console.log('Status ratings saved successfully:', response);
            return statusData;
        })
        .catch(error => {
            console.error('Error saving status ratings:', error);
            
            // Show error to user
            if (typeof showErrorToast === 'function') {
                showErrorToast('Could not save your status data. Please try again later.');
            }
            
            return statusData;
        });
}

/**
 * Clear data cache to force fresh data fetch
 */
function clearDataCache() {
    dataCache.profile = null;
    dataCache.statusRatings = null;
    dataCache.todos = null;
    dataCache.jobs = null;
    console.log('Data cache cleared');
}

// Export all functions for use in other modules
window.loadUserProfile = loadUserProfile;
window.loadUserStatusRatings = loadUserStatusRatings;
window.loadUserTodos = loadUserTodos;
window.loadUserJobs = loadUserJobs;
window.saveUserStatusRatings = saveUserStatusRatings;
window.clearDataCache = clearDataCache; 