/**
 * Profile Editor
 * Handles loading and updating user profile data
 */

class ProfileEditor {
    constructor(userId = 'user1') {
        this.userId = userId;
        this.profileData = null;
        this.isEditing = false;
        this.editableFields = [
            'fullName', 'title', 'location', 'email', 'phone', 'summary'
        ];
    }

    /**
     * Load user profile from API
     */
    loadProfile() {
        return new Promise((resolve, reject) => {
            window.apiService.getUserProfile(this.userId)
                .then(data => {
                    this.profileData = data;
                    this.updateUI();
                    resolve(data);
                })
                .catch(error => {
                    console.error('Error loading profile:', error);
                    this.showError('Could not load profile data. Please try again.');
                    reject(error);
                });
        });
    }

    /**
     * Save user profile to API
     */
    saveProfile() {
        return new Promise((resolve, reject) => {
            if (!this.profileData) {
                reject(new Error('No profile data to save'));
                return;
            }

            const saveData = { ...this.profileData };
            
            // Update lastUpdated timestamp
            saveData.lastUpdated = new Date().toISOString();
            
            // This is a placeholder until we have an API endpoint for saving the profile
            // In a real implementation, we would use window.apiService.updateUserProfile(this.userId, saveData)
            // For now, we'll simulate a successful save
            setTimeout(() => {
                this.profileData = saveData;
                this.showSuccess('Profile updated successfully!');
                resolve(saveData);
            }, 500);
        });
    }

    /**
     * Update UI with profile data
     */
    updateUI() {
        if (!this.profileData) return;

        // Update document title
        document.title = `${this.profileData.fullName} | JobHatch`;
        
        // Update header profile picture
        const headerProfilePic = document.getElementById('header-profile-picture');
        if (headerProfilePic) {
            headerProfilePic.alt = this.profileData.fullName;
        }
        
        // Update sidebar welcome message
        const welcomeMessage = document.querySelector('.user-profile h3');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome, ${this.profileData.fullName.split(' ')[0]}`;
        }
        
        // Update sidebar profile completion
        const progressBar = document.querySelector('.progress');
        if (progressBar) {
            progressBar.style.width = `${this.profileData.completionPercentage}%`;
        }
        
        const completionText = document.querySelector('.profile-completion p');
        if (completionText) {
            completionText.innerHTML = `Your profile is <span class="highlight">${this.profileData.completionPercentage}%</span> complete`;
        }
        
        // Update profile header
        document.getElementById('profile-name').textContent = this.profileData.fullName;
        document.getElementById('profile-title').textContent = this.profileData.title;
        
        const locationEl = document.getElementById('profile-location');
        if (locationEl) {
            locationEl.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${this.profileData.location}`;
        }
        
        // Update contact info
        const emailEl = document.getElementById('profile-email');
        if (emailEl) {
            emailEl.innerHTML = `<i class="fas fa-envelope"></i> ${this.profileData.email}`;
        }
        
        const phoneEl = document.getElementById('profile-phone');
        if (phoneEl) {
            phoneEl.innerHTML = `<i class="fas fa-phone"></i> ${this.profileData.phone}`;
        }
        
        // Update about section
        const aboutSection = document.querySelector('.profile-summary p');
        if (aboutSection) {
            aboutSection.textContent = this.profileData.summary;
        }
        
        // Update the rest of the profile sections
        this.updateExperienceSection();
        this.updateEducationSection();
        this.updateSkillsSection();
        this.updateLanguagesSection();
        this.updateInterestsSection();
        this.updateJobPreferencesSection();
        this.updateSocialLinksSection();
    }

    /**
     * Update the experience section of the profile
     */
    updateExperienceSection() {
        const experienceSection = document.querySelector('.profile-section:nth-child(2)');
        if (!experienceSection || !this.profileData.experience) return;
        
        experienceSection.innerHTML = '<h2><i class="fas fa-briefcase"></i> Work Experience</h2>';
        
        this.profileData.experience.forEach(job => {
            const experienceItem = document.createElement('div');
            experienceItem.className = 'experience-item';
            
            // Format dates for display
            const startDate = this.formatDateString(job.startDate);
            const endDate = job.endDate === 'present' ? 'Present' : this.formatDateString(job.endDate);
            const dateRange = `${startDate} - ${endDate}`;
            
            experienceItem.innerHTML = `
                <div class="item-header">
                    <h3 class="item-title">${job.position}</h3>
                    <span class="item-date">${dateRange}</span>
                </div>
                <div class="item-subtitle">${job.company}</div>
                <div class="item-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</div>
                <p class="item-description">${job.description}</p>
            `;
            
            experienceSection.appendChild(experienceItem);
        });
    }

    /**
     * Update the education section of the profile
     */
    updateEducationSection() {
        const educationSection = document.querySelector('.profile-section:nth-child(3)');
        if (!educationSection || !this.profileData.education) return;
        
        educationSection.innerHTML = '<h2><i class="fas fa-graduation-cap"></i> Education</h2>';
        
        this.profileData.education.forEach(edu => {
            const educationItem = document.createElement('div');
            educationItem.className = 'education-item';
            
            // Format dates for display
            const startDate = edu.startDate;
            const endDate = edu.endDate;
            const dateRange = `${startDate} - ${endDate}`;
            
            educationItem.innerHTML = `
                <div class="item-header">
                    <h3 class="item-title">${edu.degree}</h3>
                    <span class="item-date">${dateRange}</span>
                </div>
                <div class="item-subtitle">${edu.institution}</div>
                <div class="item-location"><i class="fas fa-map-marker-alt"></i> ${edu.location}</div>
            `;
            
            educationSection.appendChild(educationItem);
        });
    }

    /**
     * Update the skills section of the profile
     */
    updateSkillsSection() {
        const skillsList = document.querySelector('.skills-list');
        if (!skillsList || !this.profileData.skills) return;
        
        skillsList.innerHTML = '';
        
        this.profileData.skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillsList.appendChild(skillTag);
        });
    }

    /**
     * Update the languages section of the profile
     */
    updateLanguagesSection() {
        const languagesList = document.querySelector('.languages-list');
        if (!languagesList || !this.profileData.languages) return;
        
        languagesList.innerHTML = '';
        
        this.profileData.languages.forEach(language => {
            const langItem = document.createElement('div');
            langItem.className = 'language-item';
            langItem.innerHTML = `
                <span class="language-name">${language.name}</span>
                <span class="language-level">${language.level}</span>
            `;
            languagesList.appendChild(langItem);
        });
    }

    /**
     * Update the interests section of the profile
     */
    updateInterestsSection() {
        const interestsList = document.querySelector('.interests-list');
        if (!interestsList || !this.profileData.interests) return;
        
        interestsList.innerHTML = '';
        
        this.profileData.interests.forEach(interest => {
            const interestTag = document.createElement('span');
            interestTag.className = 'interest-tag';
            interestTag.textContent = interest;
            interestsList.appendChild(interestTag);
        });
    }

    /**
     * Update the job preferences section of the profile
     */
    updateJobPreferencesSection() {
        const preferences = this.profileData.jobPreferences;
        if (!preferences) return;
        
        // Update roles
        const rolesList = document.querySelector('.roles-list');
        if (rolesList && preferences.roles) {
            rolesList.innerHTML = '';
            preferences.roles.forEach(role => {
                const roleTag = document.createElement('span');
                roleTag.className = 'role-tag';
                roleTag.textContent = role;
                rolesList.appendChild(roleTag);
            });
        }
        
        // Update other preference fields
        const locationValue = document.querySelector('.preferences-group:nth-child(2) .preferences-value');
        if (locationValue && preferences.locations) {
            locationValue.textContent = preferences.locations.join(', ');
        }
        
        const salaryValue = document.querySelector('.preferences-group:nth-child(3) .preferences-value');
        if (salaryValue && preferences.salary) {
            salaryValue.textContent = preferences.salary;
        }
        
        const workModeValue = document.querySelector('.preferences-group:nth-child(4) .preferences-value');
        if (workModeValue && preferences.workMode) {
            workModeValue.textContent = preferences.workMode;
        }
    }

    /**
     * Update the social links section of the profile
     */
    updateSocialLinksSection() {
        const links = this.profileData.socialLinks;
        if (!links) return;
        
        const linkedinLink = document.querySelector('.social-link:nth-child(1)');
        if (linkedinLink && links.linkedin) {
            linkedinLink.href = `https://${links.linkedin}`;
        }
        
        const githubLink = document.querySelector('.social-link:nth-child(2)');
        if (githubLink && links.github) {
            githubLink.href = `https://${links.github}`;
        }
        
        const portfolioLink = document.querySelector('.social-link:nth-child(3)');
        if (portfolioLink && links.portfolio) {
            portfolioLink.href = `https://${links.portfolio}`;
        }
    }

    /**
     * Enable editing mode for the profile
     */
    enableEditMode() {
        this.isEditing = true;
        
        // Create and show edit form
        this.createEditForm();
        document.getElementById('profile-edit-form').style.display = 'block';
        
        // Hide edit button, show save button
        document.getElementById('edit-profile-btn').style.display = 'none';
    }

    /**
     * Disable editing mode for the profile
     */
    disableEditMode() {
        this.isEditing = false;
        
        // Hide edit form
        const editForm = document.getElementById('profile-edit-form');
        if (editForm) {
            editForm.style.display = 'none';
        }
        
        // Show edit button
        document.getElementById('edit-profile-btn').style.display = 'flex';
    }

    /**
     * Create the profile edit form
     */
    createEditForm() {
        // Check if form already exists
        let editForm = document.getElementById('profile-edit-form');
        
        if (!editForm) {
            editForm = document.createElement('div');
            editForm.id = 'profile-edit-form';
            editForm.className = 'profile-edit-form';
            
            // Create form content
            editForm.innerHTML = `
                <h2><i class="fas fa-user-edit"></i> Edit Profile</h2>
                <form id="user-profile-form">
                    <div class="form-group">
                        <label for="edit-fullName">Full Name</label>
                        <input type="text" id="edit-fullName" value="${this.profileData.fullName || ''}">
                    </div>
                    <div class="form-group">
                        <label for="edit-title">Job Title</label>
                        <input type="text" id="edit-title" value="${this.profileData.title || ''}">
                    </div>
                    <div class="form-group">
                        <label for="edit-location">Location</label>
                        <input type="text" id="edit-location" value="${this.profileData.location || ''}">
                    </div>
                    <div class="form-group">
                        <label for="edit-email">Email</label>
                        <input type="email" id="edit-email" value="${this.profileData.email || ''}">
                    </div>
                    <div class="form-group">
                        <label for="edit-phone">Phone</label>
                        <input type="tel" id="edit-phone" value="${this.profileData.phone || ''}">
                    </div>
                    <div class="form-group">
                        <label for="edit-summary">About Me</label>
                        <textarea id="edit-summary" rows="4">${this.profileData.summary || ''}</textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" id="cancel-edit" class="btn-secondary">Cancel</button>
                        <button type="submit" id="save-profile" class="btn-primary">Save Changes</button>
                    </div>
                </form>
            `;
            
            // Insert form after profile header
            const profileHeader = document.querySelector('.profile-header');
            profileHeader.parentNode.insertBefore(editForm, profileHeader.nextSibling);
            
            // Add event listeners
            document.getElementById('cancel-edit').addEventListener('click', () => {
                this.disableEditMode();
            });
            
            document.getElementById('user-profile-form').addEventListener('submit', (event) => {
                event.preventDefault();
                this.saveProfileChanges();
            });
        }
    }

    /**
     * Save changes from the edit form
     */
    saveProfileChanges() {
        // Get values from form
        const updatedData = {};
        
        this.editableFields.forEach(field => {
            const element = document.getElementById(`edit-${field}`);
            if (element) {
                updatedData[field] = element.value;
            }
        });
        
        // Update profile data
        this.profileData = { ...this.profileData, ...updatedData };
        
        // Save changes
        this.saveProfile()
            .then(() => {
                this.disableEditMode();
                this.updateUI();
            })
            .catch(error => {
                console.error('Error saving changes:', error);
                this.showError('Could not save changes. Please try again.');
            });
    }

    /**
     * Show a success toast message
     */
    showSuccess(message) {
        this.showToast(message, 'success');
    }

    /**
     * Show an error toast message
     */
    showError(message) {
        this.showToast(message, 'error');
    }

    /**
     * Show a toast message
     */
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}-toast`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    /**
     * Format date strings for display
     */
    formatDateString(dateStr) {
        if (!dateStr) return '';
        
        if (dateStr.includes('-')) {
            const [year, month] = dateStr.split('-');
            const date = new Date(year, parseInt(month) - 1);
            return date.toLocaleString('default', { month: 'long', year: 'numeric' });
        } else {
            return dateStr; // If it's just a year
        }
    }

    /**
     * Initialize event listeners
     */
    initEventListeners() {
        const editButton = document.getElementById('edit-profile-btn');
        if (editButton) {
            editButton.addEventListener('click', () => {
                this.enableEditMode();
            });
        }
    }
}

// Initialize when document loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('ProfileEditor.js: DOM fully loaded');
    
    // Create and initialize the profile editor
    const profileEditor = new ProfileEditor('user1');
    window.profileEditor = profileEditor; // Make available globally
    
    // Load the profile data
    profileEditor.loadProfile()
        .then(() => {
            profileEditor.initEventListeners();
        })
        .catch(error => {
            console.error('Error initializing profile editor:', error);
        });
});

// Export for use in other modules
window.JobHatch = window.JobHatch || {};
window.JobHatch.ProfileEditor = ProfileEditor; 