/**
 * Profile Trends Chart Manager
 * Renders trend charts for user job readiness metrics
 */

class ProfileTrendsChart {
    constructor(canvasId, historyData) {
        this.canvasId = canvasId;
        this.historyData = historyData;
        this.chart = null;
    }

    render() {
        // Make sure Chart is defined
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded');
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
        
        // Extract dates and metrics from history data
        const dates = this.historyData.map(entry => new Date(entry.date));
        const technicalSkills = this.historyData.map(entry => entry.technicalSkills);
        const interviewPreparation = this.historyData.map(entry => entry.interviewPreparation);
        const resumeReadiness = this.historyData.map(entry => entry.resumeReadiness);
        const jobSearchActivity = this.historyData.map(entry => entry.jobSearchActivity);
        
        // Format dates for display
        const formattedDates = dates.map(date => date.toLocaleDateString('en-US', {
            month: 'short', day: 'numeric'
        }));
        
        // Create chart data
        const chartData = {
            labels: formattedDates,
            datasets: [
                {
                    label: 'Technical Skills',
                    data: technicalSkills,
                    borderColor: 'rgba(92, 147, 237, 1)',
                    backgroundColor: 'rgba(92, 147, 237, 0.1)',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Interview Preparation',
                    data: interviewPreparation,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Resume Readiness',
                    data: resumeReadiness,
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.1)',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Job Search Activity',
                    data: jobSearchActivity,
                    borderColor: 'rgba(153, 102, 255, 1)',
                    backgroundColor: 'rgba(153, 102, 255, 0.1)',
                    fill: false,
                    tension: 0.4
                }
            ]
        };
        
        // Chart options
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 15
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        };
        
        // Create new Chart.js line chart
        try {
            this.chart = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: options
            });
            console.log('Trends chart rendered successfully');
        } catch (error) {
            console.error('Error rendering trends chart:', error);
        }
    }
}

// Load user status history and render the trends chart
function loadUserStatusHistory(userId = 'user1') {
    return new Promise((resolve, reject) => {
        // Use the loadUserStatusRatings function from userDataSync.js
        loadUserStatusRatings(userId)
            .then(data => {
                if (data && data.history && Array.isArray(data.history)) {
                    resolve(data.history);
                } else {
                    reject(new Error('Invalid status history data format'));
                }
            })
            .catch(error => {
                console.error('Error loading status history:', error);
                reject(error);
            });
    });
}

// Initialize when document loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('ProfileTrends.js: DOM fully loaded');
    
    // Create a trends chart container if it doesn't exist
    const trendsChartContainer = document.createElement('div');
    trendsChartContainer.className = 'profile-section trends-chart-container';
    trendsChartContainer.innerHTML = `
        <h2><i class="fas fa-chart-line"></i> Progress Over Time</h2>
        <div class="trends-chart-wrapper">
            <canvas id="userTrendsChart" width="100%" height="250"></canvas>
        </div>
    `;
    
    // Get profile sidebar
    const profileSidebar = document.querySelector('.profile-sidebar');
    
    // Add the trends chart container after the job readiness section
    const jobReadinessSection = document.querySelector('.profile-sidebar .profile-section:first-child');
    if (jobReadinessSection && profileSidebar) {
        profileSidebar.insertBefore(trendsChartContainer, jobReadinessSection.nextSibling);
    }
    
    // Load user status history and render trends chart
    loadUserStatusHistory()
        .then(historyData => {
            if (document.getElementById('userTrendsChart')) {
                const trendsChart = new ProfileTrendsChart('userTrendsChart', historyData);
                trendsChart.render();
            }
        })
        .catch(error => {
            console.error('Error initializing trends chart:', error);
        });
});

// Export for use in other modules
window.JobHatch = window.JobHatch || {};
window.JobHatch.ProfileTrendsChart = ProfileTrendsChart;
window.JobHatch.loadUserStatusHistory = loadUserStatusHistory; 