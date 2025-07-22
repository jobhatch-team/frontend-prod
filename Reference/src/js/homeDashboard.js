// Home Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    initHomeDashboard();
    
    // If the DOM already loaded before this script, initialize manually
    if (document.readyState === 'complete') {
        initHomeDashboard();
    }
});

function initHomeDashboard() {
    // Initialize mission functionality
    setupMissions();
    
    // Initialize pet progress
    updatePetProgress();
    
    // Setup stats display
    updateStats();
}

function setupMissions() {
    const missionCheckboxes = document.querySelectorAll('.mission-item input[type="checkbox"]');
    const missionItems = document.querySelectorAll('.mission-item');
    
    // Set already completed missions
    missionItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        if (checkbox && checkbox.checked) {
            item.classList.add('completed');
        }
    });
    
    // Add event listeners for checkbox changes
    missionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const missionItem = this.closest('.mission-item');
            
            if (this.checked) {
                missionItem.classList.add('completed');
                // Update progress bar
                updateMissionProgress();
                // Update career pet progress
                updatePetProgress();
                // Update stats
                updateStats();
                
                // Add a visual feedback effect
                addCompletionEffect(missionItem);
            } else {
                missionItem.classList.remove('completed');
                // Update progress bar
                updateMissionProgress();
                // Update pet progress too
                updatePetProgress();
                // Update stats
                updateStats();
            }
        });
    });
    
    // Initialize progress bar
    updateMissionProgress();
    
    // Setup add custom task button
    const addTaskButton = document.getElementById('addCustomTaskBtn');
    if (addTaskButton) {
        addTaskButton.addEventListener('click', function() {
            // This would typically open a modal or form
            alert('Add custom task functionality would be implemented here');
        });
    }
}

function updateMissionProgress() {
    const totalMissions = document.querySelectorAll('.mission-item').length;
    const completedMissions = document.querySelectorAll('.mission-item.completed').length;
    
    const progressBar = document.querySelector('.missions-progress-fill');
    const progressText = document.querySelector('.missions-progress');
    
    if (progressBar && progressText && totalMissions > 0) {
        const percentage = Math.floor((completedMissions / totalMissions) * 100);
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${completedMissions} of ${totalMissions} completed`;
    }
}

function updatePetProgress() {
    // This would typically be connected to the backend
    // For demo purposes, we'll use the mission completion as a basis
    
    const totalMissions = document.querySelectorAll('.mission-item').length;
    const completedMissions = document.querySelectorAll('.mission-item.completed').length;
    
    const progressBar = document.querySelector('.hatching-progress-fill');
    const progressText = document.querySelector('.hatching-percentage');
    
    if (progressBar && progressText && totalMissions > 0) {
        const percentage = Math.floor((completedMissions / totalMissions) * 100);
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}% until hatching`;
    }
}

function updateStats() {
    // In a real app, this would fetch data from the backend
    // For now, we'll just update based on mission completion
    
    const completedMissions = document.querySelectorAll('.mission-item.completed').length;
    
    // Update career points - 30 base points + 20 per completed mission
    const careerPointsElement = document.querySelector('.career-points-value');
    if (careerPointsElement) {
        const points = 360 + (completedMissions * 20);
        careerPointsElement.textContent = points;
    }
}

function addCompletionEffect(element) {
    // Add a visual feedback when completing a mission
    element.style.transition = 'background-color 0.3s ease';
    element.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
    
    setTimeout(() => {
        element.style.backgroundColor = '';
        // After the effect, transition back to the completed style
        setTimeout(() => {
            element.style.transition = '';
        }, 300);
    }, 500);
}

// Expose functions for external use
window.HomeDashboard = {
    updateMissionProgress,
    updatePetProgress,
    updateStats
}; 