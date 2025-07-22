// Onboarding JavaScript for JobHatch

document.addEventListener('DOMContentLoaded', function() {
    // Onboarding elements
    const onboardingContainer = document.getElementById('onboardingContainer');
    const step1 = document.getElementById('onboardingStep1');
    const step2 = document.getElementById('onboardingStep2');
    const step3 = document.getElementById('onboardingStep3');
    const step4 = document.getElementById('onboardingStep4');
    
    // Navigation buttons
    const toStep2Btn = document.getElementById('toStep2');
    const toStep3Btn = document.getElementById('toStep3');
    const toStep4Btn = document.getElementById('toStep4');
    const backToStep1Btn = document.getElementById('backToStep1');
    const backToStep2Btn = document.getElementById('backToStep2');
    const backToStep3Btn = document.getElementById('backToStep3');
    const completeOnboardingBtn = document.getElementById('completeOnboarding');
    const homeBackButtons = document.querySelectorAll('.btn-back');
    
    // Handle form data storage
    let onboardingData = {
        jobTitle: '',
        industry: '',
        targetCompanies: [],
        yearsOfExperience: '',
        skillsToImprove: [],
        jobTimeline: '6'
    };
    
    // Handle navigation to step 2
    if (toStep2Btn) {
        toStep2Btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate step 1
            const dreamJob = document.getElementById('dreamJob').value;
            const industry = document.getElementById('industry').value;
            
            if (dreamJob.trim() === '') {
                showStepError('dreamJob', 'Please enter your dream job title');
                return;
            }
            
            // Store data
            onboardingData.jobTitle = dreamJob;
            onboardingData.industry = industry;
            
            // Move to step 2
            step1.style.display = 'none';
            step2.style.display = 'flex';
            
            // Update progress bar
            updateProgressBar(2);
        });
    }
    
    // Handle navigation to step 3
    if (toStep3Btn) {
        toStep3Btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Validate and store data
            const targetCompanies = document.getElementById('targetCompanies').value;
            const experience = document.getElementById('experience').value;
            
            // Store data
            if (targetCompanies.trim() !== '') {
                onboardingData.targetCompanies = targetCompanies.split(',').map(company => company.trim());
            }
            onboardingData.yearsOfExperience = experience;
            
            // Move to step 3
            step2.style.display = 'none';
            step3.style.display = 'flex';
            
            // Update progress bar
            updateProgressBar(3);
        });
    }
    
    // Handle navigation to step 4
    if (toStep4Btn) {
        toStep4Btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get selected skills
            const selectedSkills = [];
            document.querySelectorAll('.skill-option.selected').forEach(skill => {
                selectedSkills.push(skill.getAttribute('data-skill'));
            });
            
            // Store data
            onboardingData.skillsToImprove = selectedSkills;
            
            // Move to step 4
            step3.style.display = 'none';
            step4.style.display = 'flex';
            
            // Update progress bar
            updateProgressBar(4);
        });
    }
    
    // Handle going back to step 1
    if (backToStep1Btn) {
        backToStep1Btn.addEventListener('click', function(e) {
            e.preventDefault();
            step2.style.display = 'none';
            step1.style.display = 'flex';
            
            // Update progress bar
            updateProgressBar(1);
        });
    }
    
    // Handle going back to step 2
    if (backToStep2Btn) {
        backToStep2Btn.addEventListener('click', function(e) {
            e.preventDefault();
            step3.style.display = 'none';
            step2.style.display = 'flex';
            
            // Update progress bar
            updateProgressBar(2);
        });
    }
    
    // Handle going back to step 3
    if (backToStep3Btn) {
        backToStep3Btn.addEventListener('click', function(e) {
            e.preventDefault();
            step4.style.display = 'none';
            step3.style.display = 'flex';
            
            // Update progress bar
            updateProgressBar(3);
        });
    }
    
    // Handle skill selection
    const skillOptions = document.querySelectorAll('.skill-option');
    skillOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Toggle selected class
            this.classList.toggle('selected');
            
            // Toggle checkbox
            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = this.classList.contains('selected');
        });
        
        // Handle checkbox clicks within skill options
        const checkbox = option.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function(e) {
            e.stopPropagation(); // Prevent the click from also triggering the parent's click
            const parentOption = this.closest('.skill-option');
            
            if (this.checked) {
                parentOption.classList.add('selected');
            } else {
                parentOption.classList.remove('selected');
            }
        });
    });
    
    // Handle completing onboarding
    if (completeOnboardingBtn) {
        completeOnboardingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get timeline selection
            const jobTimeline = document.getElementById('jobTimeline').value;
            
            // Store data
            onboardingData.jobTimeline = jobTimeline;
            
            // Save all onboarding data (in a real app, this would be sent to an API)
            console.log('Onboarding completed with data:', onboardingData);
            
            // Show success message
            showSuccessMessage('Your career journey has begun!');
            
            // Close onboarding and redirect to dashboard
            // In a real app, this would redirect to the user's dashboard
            // For this demo, we'll just return to the homepage
            setTimeout(() => {
                onboardingContainer.style.display = 'none';
                document.body.style.overflow = '';
                showSuccessMessage('Welcome to JobHatch!');
            }, 1000);
        });
    }
    
    // Handle going back to home from any step
    homeBackButtons.forEach(button => {
        if (button.textContent.includes('Home')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                onboardingContainer.style.display = 'none';
                document.body.style.overflow = '';
            });
        }
    });
});

// Helper functions
function updateProgressBar(step) {
    const progressBar = document.querySelector('.progress');
    const percentage = (step / 4) * 100;
    progressBar.style.width = `${percentage}%`;
}

function showStepError(inputId, message) {
    const input = document.getElementById(inputId);
    
    // Add error styling
    input.style.borderColor = '#ff3860';
    
    // Show error tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'error-tooltip';
    tooltip.textContent = message;
    tooltip.style.color = '#ff3860';
    tooltip.style.fontSize = '0.85rem';
    tooltip.style.marginTop = '5px';
    
    // Remove any existing tooltip
    const existingTooltip = input.parentElement.querySelector('.error-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    
    // Add tooltip after input
    input.parentElement.appendChild(tooltip);
    
    // Clear error after 3 seconds
    setTimeout(() => {
        if (input.parentElement.querySelector('.error-tooltip')) {
            input.parentElement.querySelector('.error-tooltip').remove();
            input.style.borderColor = '';
        }
    }, 3000);
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