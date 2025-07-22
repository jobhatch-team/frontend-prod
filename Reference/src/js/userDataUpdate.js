/**
 * User Data Update Utility
 * 
 * Contains functions to update user data in the backend
 * and provides fallback mechanisms for offline usage
 */

/**
 * Update user profile information
 * @param {Object} profileData - The profile data to save
 * @param {string} userId - The user ID
 * @returns {Promise} - Promise resolving to saved profile data
 */
function updateUserProfile(profileData, userId = 'user1') {
    return new Promise((resolve, reject) => {
        // Add timestamp
        profileData.lastUpdated = new Date().toISOString();
        
        // Check if API service is available
        if (window.apiService && typeof window.apiService.updateUserProfile === 'function') {
            // Use API service (when implemented)
            window.apiService.updateUserProfile(userId, profileData)
                .then(data => {
                    console.log('Profile updated successfully via API');
                    resolve(data);
                })
                .catch(error => {
                    console.error('Error updating profile via API:', error);
                    // Fall back to localStorage
                    try {
                        localStorage.setItem(`profile_${userId}`, JSON.stringify(profileData));
                        console.log('Profile saved to localStorage as fallback');
                        resolve(profileData);
                    } catch (localError) {
                        console.error('Error saving to localStorage:', localError);
                        reject(error);
                    }
                });
        } else {
            // Fallback: Save to localStorage
            try {
                localStorage.setItem(`profile_${userId}`, JSON.stringify(profileData));
                console.log('Profile saved to localStorage (API not available)');
                resolve(profileData);
            } catch (localError) {
                console.error('Error saving to localStorage:', localError);
                reject(new Error('Failed to update profile: Storage error'));
            }
        }
    });
}

/**
 * Load user profile data
 * @param {string} userId - The user ID
 * @returns {Promise} - Promise resolving to user profile data
 */
function loadUserProfile(userId = 'user1') {
    return new Promise((resolve, reject) => {
        // Check if API service is available
        if (window.apiService && typeof window.apiService.getUserProfile === 'function') {
            // Use API service
            window.apiService.getUserProfile(userId)
                .then(data => {
                    console.log('Profile loaded successfully via API');
                    resolve(data);
                })
                .catch(error => {
                    console.error('Error loading profile via API:', error);
                    // Fall back to localStorage
                    try {
                        const localData = localStorage.getItem(`profile_${userId}`);
                        if (localData) {
                            console.log('Profile loaded from localStorage fallback');
                            resolve(JSON.parse(localData));
                        } else {
                            reject(error);
                        }
                    } catch (localError) {
                        console.error('Error loading from localStorage:', localError);
                        reject(error);
                    }
                });
        } else {
            // Fallback: Try localStorage
            try {
                const localData = localStorage.getItem(`profile_${userId}`);
                if (localData) {
                    console.log('Profile loaded from localStorage (API not available)');
                    resolve(JSON.parse(localData));
                } else {
                    reject(new Error('Failed to load profile: No local data available'));
                }
            } catch (localError) {
                console.error('Error loading from localStorage:', localError);
                reject(localError);
            }
        }
    });
}

/**
 * Create downloadable backup of user data
 * @param {Object} data - The data to backup
 * @param {string} filename - The filename to use
 */
function createDataBackup(data, filename) {
    const dataString = JSON.stringify(data, null, 2);
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
}

// Export the functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateUserProfile,
        loadUserProfile,
        createDataBackup
    };
} else {
    // Browser environment
    window.updateUserProfile = updateUserProfile;
    window.loadUserProfile = loadUserProfile;
    window.createDataBackup = createDataBackup;
} 