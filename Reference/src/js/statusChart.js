/**
 * Status Radar Chart Implementation
 * Handles the initialization and updating of the user's job readiness radar chart
 */

// Status Radar Chart class
class StatusRadarChart {
    constructor(canvasId, userData) {
        this.canvasId = canvasId;
        this.userData = userData;
        this.chart = null;
    }

    // Render the radar chart
    render() {
        // Make sure Chart is defined and wait for DOM to be ready
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded, using fallback renderer');
            if (typeof renderFallbackRadarChart === 'function') {
                renderFallbackRadarChart(this.canvasId, this.userData);
            }
            return;
        }
        
        const canvas = document.getElementById(this.canvasId);
        if (!canvas) {
            console.error('Canvas element not found:', this.canvasId);
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        // If chart already exists, destroy it before creating a new one
        if (this.chart) {
            this.chart.destroy();
        }
        
        // Create chart data
        const chartData = {
            labels: [
                'Technical Skills', 
                'Interview Preparation', 
                'Resume Readiness', 
                'Job Search Activity'
            ],
            datasets: [{
                label: 'Your Skills',
                data: [
                    this.userData.technicalSkills || 0, 
                    this.userData.interviewPreparation || 0, 
                    this.userData.resumeReadiness || 0, 
                    this.userData.jobSearchActivity || 0
                ],
                backgroundColor: 'rgba(92, 147, 237, 0.2)',
                borderColor: 'rgba(92, 147, 237, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(92, 147, 237, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(92, 147, 237, 1)'
            }]
        };
        
        // Chart options
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 10,
                    ticks: {
                        stepSize: 2,
                        backdropColor: 'transparent'
                    },
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            }
        };
        
        // Create new Chart.js radar chart
        try {
            this.chart = new Chart(ctx, {
                type: 'radar',
                data: chartData,
                options: options
            });
            console.log('Chart rendered successfully');
            return this.chart;
        } catch (error) {
            console.error('Error rendering chart:', error);
            
            // Use fallback if Chart.js fails
            if (typeof renderFallbackRadarChart === 'function') {
                renderFallbackRadarChart(this.canvasId, this.userData);
            }
            return null;
        }
    }
    
    // Update the chart with new data
    update(userData) {
        this.userData = userData;
        
        if (this.chart) {
            // Update the data points
            this.chart.data.datasets[0].data = [
                userData.technicalSkills || 0, 
                userData.interviewPreparation || 0, 
                userData.resumeReadiness || 0, 
                userData.jobSearchActivity || 0
            ];
            
            // Re-render the chart
            this.chart.update();
            return this.chart;
        } else {
            // If no chart exists, create a new one
            return this.render();
        }
    }
}

// Main initialization function
function initializeStatusChart() {
    console.log('Initializing status chart');
    
    // Get the current user ID
    const userId = sessionStorage.getItem('currentUserId') || 'user1';
    
    // Load user status ratings from backend
    loadStatusData(userId)
        .then(ratings => {
            // Create and render the chart
            const chart = new StatusRadarChart('userStatusChart', ratings);
            window.statusChart = chart;
            chart.render();
            
            // Setup rating controls
            setupRatingControls(userId, ratings, chart);
            
            // Add event listener for refresh button
            const refreshBtn = document.getElementById('refreshChartBtn');
            if (refreshBtn) {
                refreshBtn.addEventListener('click', function() {
                    refreshUserStatusData(userId, chart);
                });
            }
        })
        .catch(error => {
            console.error('Error initializing status chart:', error);
            
            // Use fallback data if loading fails
            const fallbackData = {
                userId: userId,
                technicalSkills: 3,
                interviewPreparation: 2,
                resumeReadiness: 2,
                jobSearchActivity: 1
            };
            
            const chart = new StatusRadarChart('userStatusChart', fallbackData);
            window.statusChart = chart;
            chart.render();
            
            // Setup rating controls
            setupRatingControls(userId, fallbackData, chart);
        });
}

// Load status data from backend or cache
function loadStatusData(userId) {
    console.log('Loading status data for user:', userId);
    
    // Use the global loadUserStatusRatings function if available
    if (typeof window.loadUserStatusRatings === 'function') {
        return window.loadUserStatusRatings(userId);
    }
    
    // Direct fetch fallback
    return fetch(`users/${userId}/progress/ratings.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ratings.json: ${response.status}`);
            }
            return response.json();
        });
}

// Refresh user status data from backend
function refreshUserStatusData(userId, chart) {
    // Show visual indication that refresh is happening
    const refreshBtn = document.getElementById('refreshChartBtn');
    if (refreshBtn) {
        refreshBtn.classList.add('refreshing');
        refreshBtn.disabled = true;
    }
    
    // Clear any data cache
    if (typeof window.clearDataCache === 'function') {
        window.clearDataCache();
    }
    
    // Fetch fresh data with cache-busting query parameter
    fetch(`users/${userId}/progress/ratings.json?t=${Date.now()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ratings.json: ${response.status}`);
            }
            return response.json();
        })
        .then(ratings => {
            // Update the chart with fresh data
            if (chart) {
                chart.update(ratings);
            }
            
            // Update UI elements
            updateStatusSummary(ratings);
            updateRatingSliders(ratings);
            
            // Show success message
            showSuccessToast('Chart refreshed with latest data');
        })
        .catch(error => {
            console.error('Error refreshing status data:', error);
            showErrorToast('Failed to refresh chart. Please try again.');
        })
        .finally(() => {
            // Remove refreshing indicator
            if (refreshBtn) {
                setTimeout(() => {
                    refreshBtn.classList.remove('refreshing');
                    refreshBtn.disabled = false;
                }, 800);
            }
        });
}

// Setup rating controls
function setupRatingControls(userId, ratings, chart) {
    const updateStatusBtn = document.getElementById('updateStatusBtn');
    const closeStatusForm = document.getElementById('closeStatusForm');
    const saveRatingsBtn = document.getElementById('saveRatingsBtn');
    const statusRatingsForm = document.getElementById('statusRatingsForm');
    
    // Update initial slider values
    updateRatingSliders(ratings);
    
    // Update initial summary values
    updateStatusSummary(ratings);
    
    // Setup slider event listeners
    const sliders = document.querySelectorAll('.status-rating-slider');
    sliders.forEach(slider => {
        const category = slider.dataset.category;
        const displayEl = document.getElementById(`${category}Rating`);
        
        slider.addEventListener('input', function() {
            // Update display value
            if (displayEl) {
                displayEl.textContent = this.value;
            }
        });
    });
    
    // Show the status ratings form
    if (updateStatusBtn) {
        updateStatusBtn.addEventListener('click', function() {
            statusRatingsForm.classList.add('active');
        });
    }
    
    // Hide the status ratings form
    if (closeStatusForm) {
        closeStatusForm.addEventListener('click', function() {
            statusRatingsForm.classList.remove('active');
        });
    }
    
    // Handle form submission
    if (saveRatingsBtn) {
        saveRatingsBtn.addEventListener('click', function() {
            statusRatingsForm.classList.remove('active');
            
            // Get current values from sliders
            const currentValues = {
                userId: userId,
                technicalSkills: parseInt(document.getElementById('technicalSkillsSlider').value),
                interviewPreparation: parseInt(document.getElementById('interviewPrepSlider').value),
                resumeReadiness: parseInt(document.getElementById('resumeReadinessSlider').value),
                jobSearchActivity: parseInt(document.getElementById('jobSearchSlider').value),
                lastUpdated: new Date().toISOString()
            };
            
            // Save status ratings to backend
            saveStatusData(currentValues)
                .then(updatedData => {
                    // Update the chart with the saved data
                    if (chart) {
                        chart.update(updatedData);
                    }

                    // Update UI elements
                    updateStatusSummary(updatedData);
                    
                    // Show success message
                    showSuccessToast('Your job readiness status has been updated!');
                })
                .catch(error => {
                    console.error('Error saving status ratings:', error);
                    showErrorToast('Failed to save your status. Please try again later.');
                });
        });
    }
}

// Save status data to backend
function saveStatusData(statusData) {
    console.log('Saving status data:', statusData);
    
    // Use the global saveUserStatusRatings function if available
    if (typeof window.saveUserStatusRatings === 'function') {
        return window.saveUserStatusRatings(statusData);
    }
    
    // Create a downloadable file as fallback
    return Promise.resolve(createDownloadableFile(statusData, 'ratings.json'));
}

// Update rating sliders with current values
function updateRatingSliders(ratings) {
    document.getElementById('technicalSkillsSlider').value = ratings.technicalSkills;
    document.getElementById('technicalSkillsRating').textContent = ratings.technicalSkills;
    
    document.getElementById('interviewPrepSlider').value = ratings.interviewPreparation;
    document.getElementById('interviewPreparationRating').textContent = ratings.interviewPreparation;
    
    document.getElementById('resumeReadinessSlider').value = ratings.resumeReadiness;
    document.getElementById('resumeReadinessRating').textContent = ratings.resumeReadiness;
    
    document.getElementById('jobSearchSlider').value = ratings.jobSearchActivity;
    document.getElementById('jobSearchActivityRating').textContent = ratings.jobSearchActivity;
}

// Update status summary with current values
function updateStatusSummary(ratings) {
    const summaryItems = document.querySelectorAll('.status-summary-item');
    if (summaryItems[0]) summaryItems[0].querySelector('.status-summary-value').textContent = `${ratings.technicalSkills}/10`;
    if (summaryItems[1]) summaryItems[1].querySelector('.status-summary-value').textContent = `${ratings.interviewPreparation}/10`;
    if (summaryItems[2]) summaryItems[2].querySelector('.status-summary-value').textContent = `${ratings.resumeReadiness}/10`;
    if (summaryItems[3]) summaryItems[3].querySelector('.status-summary-value').textContent = `${ratings.jobSearchActivity}/10`;
}

// Create a downloadable file with the data
function createDownloadableFile(data, filename) {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'data.json';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    console.log(`Data saved and downloadable as ${filename}:`, data);
    
    return data;
}

// Show success toast notification
function showSuccessToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast success-toast';
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

// Show error toast notification
function showErrorToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast error-toast';
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

// Make the StatusRadarChart class and initialization function globally available
window.JobHatch = window.JobHatch || {};
window.JobHatch.StatusRadarChart = StatusRadarChart;
window.JobHatch.initializeStatusChart = initializeStatusChart;

// Initialize when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking if chart should be initialized');
    
    // Find chart element
    const chartCanvas = document.getElementById('userStatusChart');
    if (chartCanvas) {
        console.log('Chart canvas found, initializing chart');
        initializeStatusChart();
    } else {
        console.log('Chart canvas not found, skipping initialization');
    }
    
    // Dispatch event to notify that JobHatch is ready
    const event = new Event('JobHatchReady');
    window.dispatchEvent(event);
}); 