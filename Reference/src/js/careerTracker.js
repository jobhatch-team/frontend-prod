// Career Progress Tracker functionality
document.addEventListener('DOMContentLoaded', function() {
    initCareerTracker();
});

function initCareerTracker() {
    // Check if the career tracker element exists
    const trackerContainer = document.getElementById('careerProgressTracker');
    if (!trackerContainer) return;
    
    // Initialize user progress data (in a real app, this would come from an API/backend)
    updateProgressData({
        overall: 33,
        categories: {
            resume: 75,
            applications: 40,
            interviews: 25
        },
        phases: [
            {
                id: 'preparation',
                title: 'Phase 1: Preparation',
                description: 'Complete your profile, optimize your resume, and set your job search goals',
                progress: 80,
                isActive: true,
                isCompleted: false,
                icon: 'src/assets/images/egg.svg'
            },
            {
                id: 'application',
                title: 'Phase 2: Application',
                description: 'Apply to job openings, network with professionals, and attend industry events',
                progress: 40,
                isActive: true,
                isCompleted: false,
                icon: 'src/assets/images/chick.svg'
            },
            {
                id: 'interviews',
                title: 'Phase 3: Interviews',
                description: 'Prepare for interviews, complete practice sessions, and follow up with employers',
                progress: 25,
                isActive: false,
                isCompleted: false,
                icon: 'src/assets/images/egg.svg'
            },
            {
                id: 'offer-success',
                title: 'Phase 4: Offer & Success',
                description: 'Evaluate offers, negotiate terms, and successfully transition to your new role',
                progress: 0,
                isActive: false,
                isCompleted: false,
                icon: 'src/assets/images/egg.svg'
            }
        ]
    });
    
    // Add event listeners for progress updates
    // This would typically be connected to user actions, but is just for demo purposes
    document.addEventListener('career-progress-updated', function(e) {
        updateProgressData(e.detail);
    });
}

function updateProgressData(data) {
    updateOverallProgress(data.overall);
    updateCategoryProgress(data.categories);
    updatePhaseProgress(data.phases);
}

function updateOverallProgress(percentage) {
    const progressBar = document.querySelector('.progress-bar-fill');
    const progressLabel = document.querySelector('.progress-percentage');
    
    if (progressBar && progressLabel) {
        progressBar.style.width = `${percentage}%`;
        progressLabel.textContent = `${percentage}%`;
    }
}

function updateCategoryProgress(categories) {
    // Update resume progress
    const resumeBar = document.querySelector('.resume-fill');
    const resumePercentage = document.querySelector('.resume-percentage');
    if (resumeBar && resumePercentage) {
        resumeBar.style.width = `${categories.resume}%`;
        resumePercentage.textContent = `${categories.resume}%`;
    }
    
    // Update applications progress
    const appsBar = document.querySelector('.applications-fill');
    const appsPercentage = document.querySelector('.applications-percentage');
    if (appsBar && appsPercentage) {
        appsBar.style.width = `${categories.applications}%`;
        appsPercentage.textContent = `${categories.applications}%`;
    }
    
    // Update interviews progress
    const interviewsBar = document.querySelector('.interviews-fill');
    const interviewsPercentage = document.querySelector('.interviews-percentage');
    if (interviewsBar && interviewsPercentage) {
        interviewsBar.style.width = `${categories.interviews}%`;
        interviewsPercentage.textContent = `${categories.interviews}%`;
    }
}

function updatePhaseProgress(phases) {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;
    
    // Clear existing timeline
    timelineContainer.innerHTML = '';
    
    // Add each phase to the timeline
    phases.forEach((phase, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        // Determine icon state class
        let iconClass = 'timeline-icon';
        if (phase.isCompleted) {
            iconClass += ' completed';
        } else if (phase.isActive) {
            iconClass += ' active';
        }
        
        // Create HTML structure for the timeline item
        timelineItem.innerHTML = `
            <div class="${iconClass}">
                <img src="${phase.icon}" alt="Phase icon">
            </div>
            <div class="timeline-connector"></div>
            <div class="timeline-content">
                <h4 class="timeline-title">${phase.title}</h4>
                <p class="timeline-description">${phase.description}</p>
                <div class="timeline-progress">
                    <div class="timeline-progress-fill" style="width: ${phase.progress}%"></div>
                </div>
                <div class="timeline-percentage">${phase.progress}% Complete</div>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Expose functions for external usage
window.CareerTracker = {
    updateProgress: updateProgressData
}; 