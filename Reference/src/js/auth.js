// Auth JavaScript for JobHatch

document.addEventListener('DOMContentLoaded', function() {
    // Initialize modals
    initModals();
    
    // Initialize form validation
    initFormValidation();
});

// Initialize modals
function initModals() {
    // Get modal elements
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    // Get button elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    
    // Get close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Get switch links
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    
    // Open login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (loginModal) {
                loginModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Open signup modal
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (signupModal) {
                signupModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Close modals when clicking on close button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeModals();
        });
    });
    
    // Close modals when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === loginModal || e.target === signupModal) {
            closeModals();
        }
    });
    
    // Switch between modals
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            if (loginModal && signupModal) {
                loginModal.style.display = 'none';
                signupModal.style.display = 'flex';
            }
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            if (loginModal && signupModal) {
                signupModal.style.display = 'none';
                loginModal.style.display = 'flex';
            }
        });
    }
    
    // Close all modals
    function closeModals() {
        if (loginModal) loginModal.style.display = 'none';
        if (signupModal) signupModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize form validation
function initFormValidation() {
    // Get form elements
    const authForms = document.querySelectorAll('.auth-form');
    
    authForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Example validation
            const isValid = validateForm(form);
            
            if (isValid) {
                // Submit the form (in a real app, this would handle API requests)
                console.log('Form submitted successfully');
                
                // Simulate successful login/signup
                successfulAuth();
            }
        });
    });
}

// Validate form fields
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Clear previous error
        clearError(input);
        
        // Check if empty
        if (input.required && !input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }
        
        // Password validation
        if (input.id === 'signupPassword' && input.value.trim()) {
            if (input.value.length < 8) {
                showError(input, 'Password must be at least 8 characters');
                isValid = false;
            }
        }
        
        // Confirm password validation
        if (input.id === 'confirmPassword') {
            const password = document.getElementById('signupPassword');
            if (password && input.value !== password.value) {
                showError(input, 'Passwords do not match');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Show error message
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    
    if (formGroup) {
        formGroup.classList.add('error');
        formGroup.appendChild(error);
    }
    
    input.setAttribute('aria-invalid', 'true');
}

// Clear error message
function clearError(input) {
    const formGroup = input.closest('.form-group');
    
    if (formGroup) {
        formGroup.classList.remove('error');
        const error = formGroup.querySelector('.error-message');
        if (error) {
            formGroup.removeChild(error);
        }
    }
    
    input.setAttribute('aria-invalid', 'false');
}

// Handle successful authentication
function successfulAuth() {
    // Close modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    
    document.body.style.overflow = 'auto';
    
    // In a real app, this would redirect to dashboard or update UI
    console.log('Authentication successful');
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-notification';
    successMessage.textContent = 'Successfully logged in!';
    
    document.body.appendChild(successMessage);
    
    // Remove after 3 seconds
    setTimeout(() => {
        document.body.removeChild(successMessage);
    }, 3000);
}

// Helper Functions
function openModal(modal) {
    document.body.style.overflow = 'hidden';
    modal.classList.add('active');
    
    // Add animation classes
    setTimeout(() => {
        modal.style.display = 'flex';
    }, 10);
}

function closeModal(modal) {
    modal.classList.remove('active');
    
    // Remove animation classes after animation ends
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        closeModal(modal);
    });
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = document.createElement('div');
    
    // Remove any existing error messages
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and add new error message
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#ff3860';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
    
    input.style.borderColor = '#ff3860';
    input.parentElement.appendChild(errorElement);
    
    // Clear error after 3 seconds
    setTimeout(() => {
        const currentError = input.parentElement.querySelector('.error-message');
        if (currentError) {
            currentError.remove();
            input.style.borderColor = '';
        }
    }, 3000);
}

// Simulate API calls (in a real app these would be actual API calls)
function simulateLogin(email, password) {
    // Show loading state
    showLoadingState();
    
    // Simulate API call delay
    setTimeout(() => {
        console.log('Logging in with:', email, password);
        
        // Simulate successful login
        closeAllModals();
        hideLoadingState();
        showSuccessMessage('Successfully logged in!');
        
        // In a real app, this would store tokens, redirect to dashboard, etc.
        // For this demo, we'll just show the onboarding flow
        document.getElementById('onboardingContainer').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }, 1500);
}

function simulateSignup(name, email, password) {
    // Show loading state
    showLoadingState();
    
    // Simulate API call delay
    setTimeout(() => {
        console.log('Signing up with:', name, email, password);
        
        // Simulate successful signup
        closeAllModals();
        hideLoadingState();
        showSuccessMessage('Account created successfully!');
        
        // In a real app, this would store tokens, redirect to dashboard, etc.
        // For this demo, we'll just show the onboarding flow
        document.getElementById('onboardingContainer').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }, 1500);
}

function simulateSocialLogin(provider) {
    // Show loading state
    showLoadingState();
    
    // Simulate API call delay
    setTimeout(() => {
        console.log('Social login with:', provider);
        
        // Simulate successful login
        closeAllModals();
        hideLoadingState();
        showSuccessMessage(`Successfully logged in with ${provider}!`);
        
        // In a real app, this would store tokens, redirect to dashboard, etc.
        // For this demo, we'll just show the onboarding flow
        document.getElementById('onboardingContainer').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }, 1500);
}

// Loading and message functions
function showLoadingState() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.zIndex = '2000';
    
    // Create spinner
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.width = '40px';
    spinner.style.height = '40px';
    spinner.style.border = '4px solid #f3f3f3';
    spinner.style.borderTop = '4px solid var(--primary-color)';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'spin 1s linear infinite';
    
    // Add spinner to overlay
    loadingOverlay.appendChild(spinner);
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Add overlay to body
    document.body.appendChild(loadingOverlay);
}

function hideLoadingState() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

function showSuccessMessage(message) {
    // Create toast message
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = '#4CAF50';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    toast.style.zIndex = '2000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease-in-out';
    
    // Add toast to body
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Authentication and user management
document.addEventListener('DOMContentLoaded', function() {
    // Login and Signup Modal Functionality
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const switchToSignupLink = document.getElementById('switchToSignup');
    const switchToLoginLink = document.getElementById('switchToLogin');
    
    // Open login modal
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });
    }
    
    // Open signup modal
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.style.display = 'flex';
        });
    }
    
    // Close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });
    
    // Switch between login and signup modals
    if (switchToSignupLink) {
        switchToSignupLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            signupModal.style.display = 'flex';
        });
    }
    
    if (switchToLoginLink) {
        switchToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
    }
    
    // Click outside to close modals
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });
    
    // --- LOGIN FORM SUBMISSION HANDLER  ---
    const loginForm = document.querySelector('#loginModal .auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // For this demo, use username 'admin' and password 'password'
            // Replace with real API call
            try {
                const res = await fetch('http://:5001/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username: email, password })
                });
                const result = await res.json();
                if (res.ok && result.success) {
                    closeAllModals();
                    showSuccessMessage('Successfully logged in!');
                    // Optionally redirect or update UI here
                } else {
                    showError('loginEmail', 'Invalid credentials. Try admin/password.');
                }
            } catch (err) {
                showError('loginEmail', 'Server error. Try again later.');
            }
        });
    }
    
    // Handle signup form submission
    const signupForm = document.querySelector('#signupModal .auth-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Simple validation
            if (!fullName || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Mock signup - in a real app, this would call a server API
            simulateSignup(fullName, email, password);
        });
    }
    
    // Simulate login functionality
    function simulateLogin(email, password) {
        // In a real app, this would validate against a database
        console.log('Attempting login with:', email);
        
        // For demo, accept any login
        const userId = 'user1'; // In a real app, this would be retrieved from the database
        const username = email.split('@')[0]; // Simple username extraction
        
        // Store user info in session storage
        sessionStorage.setItem('currentUserId', userId);
        sessionStorage.setItem('currentUsername', username);
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Close the modal
        loginModal.style.display = 'none';
        
        // Redirect to app
        window.location.href = 'webapp.html';
    }
    
    // Simulate signup functionality
    function simulateSignup(fullName, email, password) {
        // In a real app, this would create a user in the database
        console.log('Creating new user:', fullName, email);
        
        // Create a new user ID - in a real app, this would be generated by the database
        const userCount = parseInt(localStorage.getItem('userCount') || '0');
        const newUserCount = userCount + 1;
        const userId = `user${newUserCount}`;
        
        // Store the updated user count
        localStorage.setItem('userCount', newUserCount.toString());
        
        // Create folders for the new user (simulated)
        createUserFolders(userId, fullName);
        
        // Store user info in session storage
        sessionStorage.setItem('currentUserId', userId);
        sessionStorage.setItem('currentUsername', fullName);
        sessionStorage.setItem('isLoggedIn', 'true');
        
        // Flag this as a first login
        localStorage.setItem(`${userId}_firstLogin`, 'true');
        
        // Close the modal
        signupModal.style.display = 'none';
        
        // Redirect to onboarding or app
        startOnboarding();
    }
    
    // Create user folders (simulated)
    function createUserFolders(userId, username) {
        console.log(`Creating folders for new user: ${username} (${userId})`);
        
        // In a real app, this would make an API call to the server
        // to create the user's folder structure
        
        // For now, we'll just log it and use the UserDataStorage class
        // when available in the app
        if (window.JobHatch && window.JobHatch.UserDataStorage) {
            const storage = new window.JobHatch.UserDataStorage();
            storage.createUserFolder(userId)
                .then(() => {
                    console.log(`Folder structure created for ${username}`);
                })
                .catch(error => {
                    console.error('Error creating user folders:', error);
                });
        } else {
            // Just log for now, the real folder creation will happen when the user
            // first accesses the app and the UserDataStorage is available
            console.log(`Folders would be created for ${userId}:`);
            console.log([
                `users/${userId}/experiences`,
                `users/${userId}/resumes`,
                `users/${userId}/jobs`,
                `users/${userId}/cover_letters`,
                `users/${userId}/status_ratings`,
                `users/${userId}/progress`
            ]);
        }
    }
    
    // Start onboarding process
    function startOnboarding() {
        // In a real app, this would check if the user has completed onboarding
        
        // For the demo, we'll just redirect to the app
        window.location.href = 'webapp.html';
    }
}); 