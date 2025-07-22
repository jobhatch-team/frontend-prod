// Main app functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Tab Functionality
    const navLinks = document.querySelectorAll('.app-nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Initialize status chart
    if (typeof initializeStatusChart === 'function') {
        console.log('Initializing status chart from app.js');
        initializeStatusChart();
    } else {
        console.error('Status chart initialization function not found');
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show the corresponding content
            const targetId = this.id.replace('Tab', 'Content');
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Notification Dropdown Functionality
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const markAllReadBtn = document.getElementById('markAllRead');
    const notificationDismissBtns = document.querySelectorAll('.notification-dismiss');
    
    // Toggle notification dropdown
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
            
            // Check if there are unread notifications
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            const badge = document.querySelector('.notification-badge');
            
            if (unreadItems.length === 0 && badge) {
                badge.style.display = 'none';
            }
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (notificationDropdown.classList.contains('show') &&
                !notificationDropdown.contains(e.target) &&
                e.target !== notificationBtn) {
                notificationDropdown.classList.remove('show');
            }
        });
        
        // Mark all notifications as read
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', function() {
                const unreadItems = document.querySelectorAll('.notification-item.unread');
                unreadItems.forEach(item => {
                    item.classList.remove('unread');
                });
                
                // Hide notification badge
                const badge = document.querySelector('.notification-badge');
                if (badge) {
                    badge.style.display = 'none';
                }
            });
        }
        
        // Dismiss individual notifications
        notificationDismissBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const item = this.closest('.notification-item');
                if (item) {
                    // Animate removal
                    item.style.opacity = '0';
                    item.style.height = item.offsetHeight + 'px';
                    item.style.padding = '0 20px';
                    item.style.margin = '0';
                    item.style.overflow = 'hidden';
                    
                    setTimeout(() => {
                        item.style.height = '0';
                        item.style.padding = '0 20px';
                        item.style.border = 'none';
                        
                        setTimeout(() => {
                            item.remove();
                            
                            // Update badge count
                            const unreadItems = document.querySelectorAll('.notification-item.unread');
                            const badge = document.querySelector('.notification-badge');
                            
                            if (badge) {
                                if (unreadItems.length === 0) {
                                    badge.style.display = 'none';
                                } else {
                                    badge.textContent = unreadItems.length;
                                }
                            }
                            
                            // If no more notifications, show empty state
                            const remainingItems = document.querySelectorAll('.notification-item');
                            if (remainingItems.length === 0) {
                                const emptyState = document.createElement('div');
                                emptyState.className = 'notification-empty';
                                emptyState.innerHTML = `
                                    <div class="empty-notification-icon">
                                        <i class="fas fa-bell-slash"></i>
                                    </div>
                                    <p>No new notifications</p>
                                `;
                                document.querySelector('.notification-list').appendChild(emptyState);
                            }
                        }, 300);
                    }, 50);
                }
            });
        });
    }
    
    // User registration handling (for new users)
    function registerNewUser(userId, username) {
        // Check if JobHatch object exists
        if (!window.JobHatch || !window.JobHatch.UserDataStorage) {
            console.error('UserDataStorage not initialized');
            return;
        }
        
        const storage = new window.JobHatch.UserDataStorage();
        
        // Create user folder structure
        storage.createUserFolder(userId)
            .then(result => {
                console.log(`Created folder structure for ${username}`, result);
                
                // Initialize default status ratings
                return storage.updateUserStatusRatings(userId, {
                    technicalSkills: 3,
                    interviewPreparation: 2,
                    resumeReadiness: 2,
                    jobSearchActivity: 1
                });
            })
            .then(() => {
                console.log(`Initialized status ratings for ${username}`);
            })
            .catch(error => {
                console.error('Error setting up new user:', error);
            });
    }
    
    // Simulated user authentication - in a real app, this would be more robust
    function checkUserAuthentication() {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        
        if (!isLoggedIn) {
            // For demo purposes, auto-login as user1
            sessionStorage.setItem('currentUserId', 'user1');
            sessionStorage.setItem('currentUsername', 'Simon');
            sessionStorage.setItem('isLoggedIn', 'true');
            
            // This would be a first-time login check in a real app
            const isFirstLogin = localStorage.getItem('user1_firstLogin') !== 'false';
            if (isFirstLogin) {
                registerNewUser('user1', 'Simon');
                localStorage.setItem('user1_firstLogin', 'false');
            }
        }
        
        // Update UI with user info
        updateUserUI();
    }
    
    function updateUserUI() {
        const username = sessionStorage.getItem('currentUsername') || 'User';
        const userNameElements = document.querySelectorAll('.user-name');
        const welcomeElements = document.querySelectorAll('h3:contains("Welcome")');
        
        userNameElements.forEach(el => {
            el.textContent = username;
        });
        
        welcomeElements.forEach(el => {
            el.textContent = `Welcome, ${username}`;
        });
    }
    
    // Call authentication check on page load
    checkUserAuthentication();
    
    // Check if we're on the profile page
    if (window.location.pathname.includes('profile.html')) {
        initializeProfilePage();
    }
    
    // Initialize the profile page
    function initializeProfilePage() {
        console.log('Initializing profile page');
        
        // Wait for statusChart.js to be loaded
        if (typeof window.JobHatch !== 'undefined' && typeof window.JobHatch.StatusRadarChart !== 'undefined') {
            // If already loaded, initialize
            setTimeout(function() {
                initializeStatusChart();
            }, 300);
        } else {
            // Otherwise wait for it to load
            window.addEventListener('JobHatchReady', function() {
                initializeStatusChart();
            });
        }
        
        // Set up profile edit button
        const editProfileBtn = document.querySelector('.btn-edit-profile');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', function() {
                // In a real app, this would open an edit form
                alert('Profile editing will be implemented in a future update.');
            });
        }
        
        // Set up profile sharing button
        const shareProfileBtn = document.querySelector('.btn-share-profile');
        if (shareProfileBtn) {
            shareProfileBtn.addEventListener('click', function() {
                // In a real app, this would handle profile sharing
                alert('Profile sharing will be implemented in a future update.');
            });
        }
    }
    
    // Initialize the status chart
    function initializeStatusChart() {
        console.log('Initializing status chart');
        
        try {
            // If Chart.js is not loaded or fails, fall back to canvas implementation
            if (typeof Chart === 'undefined') {
                console.warn('Chart.js not found, using fallback implementation');
                
                // Get user data
                const userStorage = new window.JobHatch.UserDataStorage();
                const currentUserId = sessionStorage.getItem('currentUserId') || 'user1';
                
                userStorage.getUserStatusRatings(currentUserId)
                    .then(ratings => {
                        // Use fallback canvas implementation
                        window.renderFallbackRadarChart('userStatusChart', ratings);
                    })
                    .catch(error => {
                        console.error('Error loading user data for fallback chart:', error);
                    });
            }
        } catch (e) {
            console.error('Error initializing status chart:', e);
        }
    }
}); 