/**
 * Career Planner JavaScript Module
 * This module handles the career planning functionality including:
 * - Form interactions
 * - API calls to GPT for personalized career planning
 * - Rendering and managing the career plan
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Career Planner module loaded');
    
    // DOM Elements
    const generatePlanBtn = document.getElementById('generatePlanBtn');
    const regeneratePlanBtn = document.getElementById('regeneratePlanBtn');
    const regeneratePlanBanner = document.querySelector('.regenerate-plan-banner');
    const startPlanBtn = document.getElementById('startPlanBtn');
    const planEmptyState = document.getElementById('planEmptyState');
    const planGeneratorForm = document.getElementById('planGeneratorForm');
    const closePlanFormBtn = document.getElementById('closePlanFormBtn');
    const cancelPlanBtn = document.getElementById('cancelPlanBtn');
    const createPlanBtn = document.getElementById('createPlanBtn');
    const planLoading = document.getElementById('planLoading');
    const careerPlanContainer = document.getElementById('careerPlanContainer');
    const editPlanBtn = document.getElementById('editPlanBtn');
    const savePlanPDFBtn = document.getElementById('savePlanPDFBtn');
    const sharePlanBtn = document.getElementById('sharePlanBtn');
    const addToTodosBtn = document.getElementById('addToTodosBtn');
    const plannerTabs = document.querySelectorAll('.planner-tab');
    const careerDeadlinesContainer = document.getElementById('careerDeadlinesContainer');
    const deadlineCheckboxes = document.querySelectorAll('.deadline-checkbox input[type="checkbox"]');
    
    // Form fields
    const shortTermGoalInput = document.getElementById('shortTermGoal');
    const longTermGoalInput = document.getElementById('longTermGoal');
    const dreamRoleInput = document.getElementById('dreamRole');
    const dreamCompanyInput = document.getElementById('dreamCompany');
    const careerChallengesInput = document.getElementById('careerChallenges');
    const workPreferencesInput = document.getElementById('workPreferences');
    
    // Plan components
    const planSummaryTitle = document.getElementById('planSummaryTitle');
    const planSummaryText = document.getElementById('planSummaryText');
    const shortTermGoalsList = document.getElementById('shortTermGoalsList');
    const midTermGoalsList = document.getElementById('midTermGoalsList');
    const longTermGoalsList = document.getElementById('longTermGoalsList');
    const skillsGapRecommendations = document.getElementById('skillsGapRecommendations');
    const actionItemsList = document.getElementById('actionItemsList');
    const resourcesList = document.getElementById('resourcesList');
    
    // Career planner state
    let careerPlanData = null;
    let userProfile = null;
    let userRatings = null;
    let userTodos = null;
    
    // Career Planner Functionality
    const pathSvg = document.getElementById('careerPath');
    const currentPositionMarker = document.getElementById('currentPositionMarker');
    const milestone1 = document.getElementById('milestone1Details');
    const milestone2 = document.getElementById('milestone2Details');
    const milestone3 = document.getElementById('milestone3Details');
    
    // Sample career path data - would come from an API in production
    const careerPathData = {
        currentPosition: {
            title: "Junior Software Developer",
            description: "You're at the beginning of your software development journey with foundational skills.",
            skills: ["JavaScript", "HTML/CSS", "Basic React", "Problem Solving"]
        },
        milestones: [
            {
                title: "Mid-Level Developer",
                position: { x: 300, y: 230 },
                timeframe: "1-2 years",
                description: "Gain more advanced front-end skills and expand your back-end knowledge.",
                keySkills: ["Advanced React", "Node.js", "Database Design", "Testing"],
                recommendations: [
                    "Complete at least 3 full-stack projects",
                    "Contribute to open source",
                    "Learn a testing framework like Jest"
                ]
            },
            {
                title: "Senior Developer",
                position: { x: 500, y: 180 },
                timeframe: "3-4 years",
                description: "Develop architectural expertise and leadership skills.",
                keySkills: ["System Architecture", "Team Leadership", "Performance Optimization", "CI/CD"],
                recommendations: [
                    "Lead a medium-sized project",
                    "Mentor junior developers",
                    "Become proficient in cloud services"
                ]
            },
            {
                title: "Lead Engineer",
                position: { x: 700, y: 120 },
                timeframe: "5+ years",
                description: "Guide technical direction and mentor other developers.",
                keySkills: ["Technical Leadership", "Project Management", "System Design", "Strategic Planning"],
                recommendations: [
                    "Define technical roadmaps",
                    "Evaluate emerging technologies",
                    "Drive architectural decisions"
                ]
            }
        ],
        goal: {
            title: "Software Engineering Manager",
            description: "Leading teams to deliver high-quality software solutions."
        }
    };
    
    // Animation helpers
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const startTime = performance.now();
        
        function updateValue(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentValue = Math.floor(start + (range * progress));
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        }
        
        requestAnimationFrame(updateValue);
    }
    
    // Position the egg character along the SVG path
    function positionMarkerAlongPath(pathElement, marker, position) {
        // Position is 0-1 (0 = start, 1 = end)
        const pathLength = pathElement.getTotalLength();
        const point = pathElement.getPointAtLength(pathLength * position);
        
        // Position the marker at this point
        marker.setAttribute('transform', `translate(${point.x - 50}, ${point.y - 250})`);
        
        // Optional: Calculate angle for rotation
        const pointBefore = pathElement.getPointAtLength(Math.max(0, pathLength * position - 10));
        const pointAfter = pathElement.getPointAtLength(Math.min(pathLength, pathLength * position + 10));
        const angle = Math.atan2(pointAfter.y - pointBefore.y, pointAfter.x - pointBefore.x) * 180 / Math.PI;
        
        // Apply rotation to make character face direction of travel
        const eggFace = marker.querySelector('#eggFace');
        if (eggFace) {
            if (angle > 0) {
                eggFace.style.transform = 'scaleX(-1)';
            } else {
                eggFace.style.transform = 'scaleX(1)';
            }
        }
    }
    
    // Add milestones to SVG
    function addMilestones() {
        const milestoneGroup = pathSvg.querySelector('g:nth-child(11)');
        
        careerPathData.milestones.forEach((milestone, index) => {
            // Create milestone marker
            const milestoneCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            milestoneCircle.setAttribute("cx", milestone.position.x);
            milestoneCircle.setAttribute("cy", milestone.position.y);
            milestoneCircle.setAttribute("r", "8");
            milestoneCircle.setAttribute("fill", "#5C93ED");
            
            // Add pulse animation
            const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            animate.setAttribute("attributeName", "r");
            animate.setAttribute("values", "7;9;7");
            animate.setAttribute("dur", "3s");
            animate.setAttribute("repeatCount", "indefinite");
            animate.setAttribute("begin", `${index}s`);
            milestoneCircle.appendChild(animate);
            
            // Create milestone text
            const milestoneText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            milestoneText.setAttribute("x", milestone.position.x);
            milestoneText.setAttribute("y", milestone.position.y + 25);
            milestoneText.setAttribute("font-family", "Inter, sans-serif");
            milestoneText.setAttribute("font-size", "12");
            milestoneText.setAttribute("text-anchor", "middle");
            milestoneText.setAttribute("fill", "#334155");
            milestoneText.textContent = milestone.title;
            
            // Add to SVG
            milestoneGroup.appendChild(milestoneCircle);
            milestoneGroup.appendChild(milestoneText);
        });
    }
    
    // Generate career plan
    function generateCareerPlan() {
        // Show loading state
        planLoading.style.display = 'flex';
        planContent.style.display = 'none';
        
        // Simulate API call with setTimeout
        setTimeout(() => {
            // Hide loading, show content
            planLoading.style.display = 'none';
            planContent.style.display = 'block';
            
            // Update summary
            planSummaryTitle.textContent = `From ${careerPathData.currentPosition.title} to ${careerPathData.goal.title}`;
            planSummaryText.textContent = `Based on your skills and interests, we've mapped your journey from ${careerPathData.currentPosition.title} to ${careerPathData.goal.title} with key milestones along the way.`;
            
            // Add milestones to path
            addMilestones();
            
            // Add current position marker to start of path
            const pathElement = pathSvg.querySelector('path:nth-child(11)');
            positionMarkerAlongPath(pathElement, currentPositionMarker, 0);
            
            // Animate progress metrics
            animateValue(document.getElementById('timeEstimate'), 0, 5, 1500);
            animateValue(document.getElementById('skillsGap'), 0, 12, 1500);
            
            // Start the character movement animation
            animateCharacterAlongPath();
            
            // Populate milestone details
            populateMilestoneDetails();
            
            // Add character reaction to hover
            setupCharacterReactions();
            
        }, 2000); // 2 second loading time
    }
    
    // Animate character along the path
    function animateCharacterAlongPath() {
        const pathElement = pathSvg.querySelector('path:nth-child(11)');
        let position = 0;
        
        function animate() {
            // Move character
            positionMarkerAlongPath(pathElement, currentPositionMarker, position);
            
            // Increment position (loop for demo purposes)
            position += 0.001;
            if (position > 1) position = 0;
            
            // Continue animation
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // Populate milestone details
    function populateMilestoneDetails() {
        const milestones = careerPathData.milestones;
        
        // Milestone 1
        milestone1.querySelector('h4').textContent = milestones[0].title;
        milestone1.querySelector('.milestone-timeframe').textContent = milestones[0].timeframe;
        milestone1.querySelector('p').textContent = milestones[0].description;
        populateList(milestone1.querySelector('.milestone-skills'), milestones[0].keySkills);
        populateList(milestone1.querySelector('.milestone-actions'), milestones[0].recommendations);
        
        // Milestone 2
        milestone2.querySelector('h4').textContent = milestones[1].title;
        milestone2.querySelector('.milestone-timeframe').textContent = milestones[1].timeframe;
        milestone2.querySelector('p').textContent = milestones[1].description;
        populateList(milestone2.querySelector('.milestone-skills'), milestones[1].keySkills);
        populateList(milestone2.querySelector('.milestone-actions'), milestones[1].recommendations);
        
        // Milestone 3
        milestone3.querySelector('h4').textContent = milestones[2].title;
        milestone3.querySelector('.milestone-timeframe').textContent = milestones[2].timeframe;
        milestone3.querySelector('p').textContent = milestones[2].description;
        populateList(milestone3.querySelector('.milestone-skills'), milestones[2].keySkills);
        populateList(milestone3.querySelector('.milestone-actions'), milestones[2].recommendations);
    }
    
    // Helper to populate a list
    function populateList(listElement, items) {
        listElement.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            listElement.appendChild(li);
        });
    }
    
    // Setup character reactions on milestone hover
    function setupCharacterReactions() {
        const milestoneCards = document.querySelectorAll('.milestone-card');
        const eggFace = currentPositionMarker.querySelector('#eggFace');
        
        milestoneCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                // Move character to this milestone's position
                const pathElement = pathSvg.querySelector('path:nth-child(11)');
                const position = (index + 1) * 0.25; // Position along path (0.25, 0.5, 0.75)
                positionMarkerAlongPath(pathElement, currentPositionMarker, position);
                
                // Change expression based on milestone
                const mouth = eggFace.querySelector('ellipse:nth-child(3)');
                if (mouth) {
                    switch(index) {
                        case 0: // Excited
                            mouth.setAttribute('ry', '2');
                            mouth.setAttribute('rx', '3');
                            break;
                        case 1: // Big smile
                            mouth.setAttribute('ry', '3');
                            mouth.setAttribute('rx', '4');
                            break;
                        case 2: // Amazed
                            mouth.setAttribute('ry', '4');
                            mouth.setAttribute('rx', '3');
                            break;
                    }
                }
            });
            
            card.addEventListener('mouseleave', () => {
                // Reset mouth to default
                const mouth = eggFace.querySelector('ellipse:nth-child(3)');
                if (mouth) {
                    mouth.setAttribute('ry', '2');
                    mouth.setAttribute('rx', '3');
                }
            });
        });
    }
    
    // Event Listeners
    if (generatePlanBtn) {
        generatePlanBtn.addEventListener('click', function() {
            showPlanForm();
        });
    }
    
    if (regeneratePlanBtn) {
        regeneratePlanBtn.addEventListener('click', function() {
            if (careerPlanData) {
                // If we have existing plan data, just show the loading and regenerate
                planEmptyState.style.display = 'none';
                careerPlanContainer.style.display = 'none';
                planLoading.style.display = 'flex';
                
                // Add a slight delay to simulate regeneration
                setTimeout(() => {
                    generateCareerPlan();
                }, 1000);
            } else {
                // If no plan exists yet, show the form
                showPlanForm();
            }
        });
    }
    
    if (regeneratePlanBanner) {
        regeneratePlanBanner.addEventListener('click', function() {
            if (regeneratePlanBtn) {
                regeneratePlanBtn.click();
            }
        });
    }
    
    if (plannerTabs && plannerTabs.length > 0) {
        plannerTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                plannerTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Handle tab content switching
                const tabText = this.querySelector('span').textContent.trim();
                
                if (tabText === 'Planner') {
                    if (careerPlanContainer) careerPlanContainer.style.display = 'block';
                    if (careerDeadlinesContainer) careerDeadlinesContainer.style.display = 'block';
                } else if (tabText === 'Shortlisted Colleges') {
                    // This would be where you'd show college content
                    // For now, we'll just hide the planner content
                    if (careerPlanContainer) careerPlanContainer.style.display = 'none';
                    if (careerDeadlinesContainer) careerDeadlinesContainer.style.display = 'none';
                    
                    // Show a message that this feature is coming soon
                    const plannerContent = document.querySelector('.planner-content');
                    if (plannerContent) {
                        const comingSoonMsg = document.createElement('div');
                        comingSoonMsg.className = 'coming-soon-message';
                        comingSoonMsg.innerHTML = `
                            <div class="coming-soon-icon">
                                <i class="fas fa-university"></i>
                            </div>
                            <h3>College Shortlisting Coming Soon</h3>
                            <p>We're building a powerful tool to help you find and track your dream colleges.</p>
                        `;
                        
                        // Remove any existing message
                        const existingMsg = plannerContent.querySelector('.coming-soon-message');
                        if (existingMsg) plannerContent.removeChild(existingMsg);
                        
                        // Add new message
                        plannerContent.appendChild(comingSoonMsg);
                    }
                }
            });
        });
    }
    
    if (deadlineCheckboxes && deadlineCheckboxes.length > 0) {
        deadlineCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const deadlineItem = this.closest('.deadlines-list');
                if (this.checked) {
                    deadlineItem.classList.add('completed');
                    
                    // Show success message
                    showSuccessMessage('Deadline marked as complete!');
                    
                    // In a real app, this would also update the backend
                    console.log('Deadline completed:', this.id);
                } else {
                    deadlineItem.classList.remove('completed');
                }
            });
        });
    }
    
    if (startPlanBtn) {
        startPlanBtn.addEventListener('click', function() {
            showPlanForm();
        });
    }
    
    if (closePlanFormBtn) {
        closePlanFormBtn.addEventListener('click', function() {
            hidePlanForm();
        });
    }
    
    if (cancelPlanBtn) {
        cancelPlanBtn.addEventListener('click', function() {
            hidePlanForm();
        });
    }
    
    if (createPlanBtn) {
        createPlanBtn.addEventListener('click', handleCreatePlan);
    }
    
    if (editPlanBtn) {
        editPlanBtn.addEventListener('click', function() {
            showPlanForm();
        });
    }
    
    if (savePlanPDFBtn) {
        savePlanPDFBtn.addEventListener('click', function() {
            savePlanAsPDF();
        });
    }
    
    if (sharePlanBtn) {
        sharePlanBtn.addEventListener('click', function() {
            sharePlan();
        });
    }
    
    if (addToTodosBtn) {
        addToTodosBtn.addEventListener('click', function() {
            addPlanToTodos();
        });
    }
    
    // Initialize Career Planner tab
    initCareerPlanner();
    
    /**
     * Initialize the career planner
     * Load user data and check for existing plans
     */
    function initCareerPlanner() {
        // Load user profile data
        loadUserData()
            .then(() => {
                // Auto-fill form with user data if available
                prefillFormWithUserData();
                
                // Check for existing career plan and display if available
                checkForExistingPlan();
            })
            .catch(error => {
                console.error('Error initializing career planner:', error);
                showErrorMessage('Failed to load your data. Please try again later.');
            });
    }
    
    /**
     * Load all relevant user data
     */
    function loadUserData() {
        return Promise.all([
            loadUserProfile(),
            loadUserStatusRatings(),
            loadUserTodos()
        ])
        .then(results => {
            [userProfile, userRatings, userTodos] = results;
            console.log('All user data loaded successfully');
            return { userProfile, userRatings, userTodos };
        });
    }
    
    /**
     * Load user profile data
     * @returns {Promise<Object>} User profile data
     */
    function loadUserProfile() {
        return window.apiService.getUserProfile('user1')
            .then(data => {
                console.log('User profile loaded successfully');
                return data;
            })
            .catch(error => {
                console.error('Error loading user profile:', error);
                // Return a minimal profile in case of error
                return {
                    userId: 'user1',
                    fullName: 'Simon Johnson',
                    profession: 'Software Developer',
                    skills: ['JavaScript', 'HTML/CSS']
                };
            });
    }
    
    /**
     * Load user status ratings
     * @returns {Promise<Object>} User ratings data
     */
    function loadUserStatusRatings() {
        return window.apiService.getUserRatings('user1')
            .then(data => {
                console.log('User ratings loaded successfully');
                return data;
            })
            .catch(error => {
                console.error('Error loading user ratings:', error);
                // Return default ratings in case of error
                return {
                    userId: 'user1',
                    technicalSkills: 3,
                    interviewPreparation: 2,
                    resumeReadiness: 2,
                    jobSearchActivity: 1
                };
            });
    }
    
    /**
     * Load user todos
     * @returns {Promise<Object>} User todos data
     */
    function loadUserTodos() {
        return window.apiService.getUserTodos('user1')
            .then(data => {
                console.log('User todos loaded successfully');
                return data;
            })
            .catch(error => {
                console.error('Error loading user todos:', error);
                // Return empty todos in case of error
                return {
                    userId: 'user1',
                    todos: [],
                    lastUpdated: new Date().toISOString()
                };
            });
    }
    
    /**
     * Show the career plan form
     */
    function showPlanForm() {
        planEmptyState.style.display = 'none';
        careerPlanContainer.style.display = 'none';
        planGeneratorForm.style.display = 'block';
    }
    
    /**
     * Hide the career plan form
     */
    function hidePlanForm() {
        planGeneratorForm.style.display = 'none';
        
        // Show empty state or plan based on availability
        if (careerPlanData) {
            careerPlanContainer.style.display = 'block';
        } else {
            planEmptyState.style.display = 'flex';
        }
    }
    
    /**
     * Pre-fill the plan form with user profile data
     */
    function prefillFormWithUserData() {
        if (!userProfile) return;
        
        // Pre-fill dream role with current profession if available
        if (userProfile.profession) {
            dreamRoleInput.value = userProfile.profession;
        }
        
        // We can add more pre-fill logic based on user profile
    }
    
    /**
     * Check for existing career plan and display if available
     */
    function checkForExistingPlan() {
        // TODO: Replace with API endpoint when available
        // In a real implementation, we'd use: window.apiService.getUserCareerPlan('user1')
        
        // For now, just simulate no plan exists to show the empty state
        planEmptyState.style.display = 'flex';
        
        // Commented out direct file access code:
        /*
        fetch('users/user1/progress/career_plan.json')
            .then(response => {
                if (!response.ok) {
                    // No existing plan found, show empty state
                    planEmptyState.style.display = 'flex';
                    return null;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    careerPlanData = data;
                    renderCareerPlan(data);
                    careerPlanContainer.style.display = 'block';
                    planEmptyState.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error checking for existing plan:', error);
                planEmptyState.style.display = 'flex';
            });
        */
    }
    
    /**
     * Render the career plan UI
     * @param {Object} planData - Career plan data
     */
    function renderCareerPlan(planData) {
        if (!planData) return;
        
        // Update plan summary
        planSummaryTitle.textContent = planData.title || 'Your Career Adventure Map';
        planSummaryText.textContent = planData.summary || 'Here is your personalized career development plan.';
        
        // Render short-term goals
        renderGoalsList(shortTermGoalsList, planData.shortTermGoals || []);
        
        // Render mid-term goals
        renderGoalsList(midTermGoalsList, planData.midTermGoals || []);
        
        // Render long-term goals
        renderGoalsList(longTermGoalsList, planData.longTermGoals || []);
        
        // Render skills gap recommendations
        renderSkillsGap(planData.skillsGap || {});
        
        // Render action items
        renderActionItems(planData.actionItems || []);
        
        // Render resources
        renderResources(planData.resources || []);
        
        // Render career path map
        renderCareerPathMap(planData.careerPath || {});
    }
    
    /**
     * Render a list of goals
     * @param {HTMLElement} container - Container element
     * @param {Array} goals - Goals data
     */
    function renderGoalsList(container, goals) {
        if (!container) return;
        
        container.innerHTML = '';
        
        if (goals.length === 0) {
            container.innerHTML = '<p class="empty-list-message">No goals defined yet.</p>';
            return;
        }
        
        goals.forEach(goal => {
            const li = document.createElement('li');
            
            // Support both string format and object format
            if (typeof goal === 'string') {
                li.innerHTML = `
                    <div class="goal-icon">
                        <i class="fas fa-bullseye"></i>
                    </div>
                    <div class="goal-content">
                        <h4>${goal}</h4>
                    </div>
                `;
            } else {
                li.innerHTML = `
                    <div class="goal-icon">
                        <i class="fas fa-bullseye"></i>
                    </div>
                    <div class="goal-content">
                        <h4>${goal.title || goal}</h4>
                        ${goal.description ? `<p>${goal.description}</p>` : ''}
                        ${goal.timeframe ? `<span class="goal-timeframe">${goal.timeframe}</span>` : ''}
                    </div>
                `;
            }
            
            container.appendChild(li);
        });
    }
    
    /**
     * Render skills gap analysis
     * @param {Object} skillsGap - Skills gap data
     */
    function renderSkillsGap(skillsGap) {
        if (!skillsGapRecommendations) return;
        
        // Create skills gap recommendations
        skillsGapRecommendations.innerHTML = '';
        
        // Add current skills summary
        const currentSkillsDiv = document.createElement('div');
        currentSkillsDiv.className = 'skills-summary';
        currentSkillsDiv.innerHTML = `
            <h4>Current Skills</h4>
            <div class="skills-tags">
                ${(skillsGap.currentSkills || []).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        `;
        skillsGapRecommendations.appendChild(currentSkillsDiv);
        
        // Add recommended skills summary
        const recommendedSkillsDiv = document.createElement('div');
        recommendedSkillsDiv.className = 'skills-summary';
        recommendedSkillsDiv.innerHTML = `
            <h4>Recommended Skills</h4>
            <div class="skills-tags">
                ${(skillsGap.recommendedSkills || []).map(skill => `<span class="skill-tag recommended">${skill}</span>`).join('')}
            </div>
        `;
        skillsGapRecommendations.appendChild(recommendedSkillsDiv);
        
        // Add recommendations list
        if (skillsGap.recommendations && skillsGap.recommendations.length > 0) {
            const recommendationsDiv = document.createElement('div');
            recommendationsDiv.className = 'skills-recommendations';
            recommendationsDiv.innerHTML = `
                <h4>Recommended Actions</h4>
                <ul>
                    ${skillsGap.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            `;
            skillsGapRecommendations.appendChild(recommendationsDiv);
        }
        
        // Initialize skills gap chart
        initSkillsGapChart(skillsGap);
    }
    
    /**
     * Initialize skills gap chart
     * @param {Object} skillsGap - Skills gap data
     */
    function initSkillsGapChart(skillsGap) {
        const canvas = document.getElementById('skillsGapChart');
        if (!canvas || !window.Chart) return;
        
        // Destroy existing chart if it exists
        if (window.skillsGapChartInstance) {
            window.skillsGapChartInstance.destroy();
        }
        
        // Prepare data for chart
        const currentSkills = skillsGap.currentSkills || [];
        const recommendedSkills = skillsGap.recommendedSkills || [];
        
        // Combine all unique skills
        const allSkills = [...new Set([...currentSkills, ...recommendedSkills])];
        
        // Create datasets
        const currentData = allSkills.map(skill => currentSkills.includes(skill) ? 1 : 0);
        const recommendedData = allSkills.map(skill => recommendedSkills.includes(skill) ? 1 : 0);
        
        // Create chart
        const ctx = canvas.getContext('2d');
        window.skillsGapChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: allSkills,
                datasets: [
                    {
                        label: 'Current Skills',
                        data: currentData,
                        backgroundColor: 'rgba(92, 147, 237, 0.5)',
                        borderColor: 'rgba(92, 147, 237, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Recommended Skills',
                        data: recommendedData,
                        backgroundColor: 'rgba(128, 210, 91, 0.5)',
                        borderColor: 'rgba(128, 210, 91, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 1,
                        ticks: {
                            callback: function(value) {
                                return value === 1 ? 'Yes' : 'No';
                            }
                        }
                    }
                }
            }
        });
    }
    
    /**
     * Render action items
     * @param {Array} actionItems - Action items data
     */
    function renderActionItems(actionItems) {
        if (!actionItemsList) return;
        
        actionItemsList.innerHTML = '';
        
        if (actionItems.length === 0) {
            actionItemsList.innerHTML = '<p class="empty-list-message">No action items defined yet.</p>';
            return;
        }
        
        actionItems.forEach(item => {
            const actionItem = document.createElement('div');
            actionItem.className = 'action-item';
            
            // Format deadline
            let deadlineStr = '';
            if (item.deadline) {
                try {
                    const deadline = new Date(item.deadline);
                    deadlineStr = deadline.toLocaleDateString();
                } catch (e) {
                    deadlineStr = item.deadline;
                }
            }
            
            actionItem.innerHTML = `
                <div class="action-checkbox">
                    <input type="checkbox" id="action-${item.title.replace(/\s+/g, '-').toLowerCase()}">
                </div>
                <div class="action-content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <div class="action-meta">
                        <span class="action-priority ${item.priority || 'medium'}">${item.priority || 'Medium'}</span>
                        ${deadlineStr ? `<span class="action-deadline">Due: ${deadlineStr}</span>` : ''}
                    </div>
                </div>
            `;
            actionItemsList.appendChild(actionItem);
        });
    }
    
    /**
     * Render resources
     * @param {Array} resources - Resources data
     */
    function renderResources(resources) {
        if (!resourcesList) return;
        
        resourcesList.innerHTML = '';
        
        if (resources.length === 0) {
            resourcesList.innerHTML = '<p class="empty-list-message">No resources available yet.</p>';
            return;
        }
        
        resources.forEach(resource => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'resource-card';
            resourceCard.innerHTML = `
                <span class="resource-type">${resource.type || 'Link'}</span>
                <h4 class="resource-title">${resource.title}</h4>
                <p class="resource-desc">${resource.description}</p>
                <a href="${resource.url}" target="_blank" class="resource-link">
                    <i class="fas fa-external-link-alt"></i> Visit Resource
                </a>
            `;
            resourcesList.appendChild(resourceCard);
        });
    }
    
    /**
     * Render career path map visualization
     * @param {Object} careerPath - Career path data
     */
    function renderCareerPathMap(careerPath) {
        const careerPathMap = document.getElementById('careerPathMap');
        if (!careerPathMap) return;
        
        // Current position
        const currentPosition = careerPath.currentPosition || 'Current';
        const targetPosition = careerPath.targetPosition || 'Goal';
        
        // Get the milestones
        const milestones = careerPath.milestones || [];
        
        // Set position coordinates (this would be better done with D3.js for a real application)
        const startX = 50;
        const startY = 250;
        const endX = 750;
        const endY = 100;
        
        // Create milestone points
        let milestoneElements = '';
        
        if (milestones.length > 0) {
            const stepX = (endX - startX) / (milestones.length + 1);
            
            milestones.forEach((milestone, index) => {
                const x = startX + stepX * (index + 1);
                const y = startY - (startY - endY) * ((index + 1) / (milestones.length + 1));
                
                milestoneElements += `
                    <circle cx="${x}" cy="${y}" r="8" fill="#5C93ED"/>
                    <text x="${x}" y="${y - 15}" font-family="Inter, sans-serif" font-size="12" text-anchor="middle">${milestone.title}</text>
                `;
            });
        }
        
        // Update the currentPositionMarker position
        const currentMarker = document.getElementById('currentPositionMarker');
        if (currentMarker) {
            currentMarker.innerHTML = `
                <circle cx="${startX}" cy="${startY}" r="10" fill="#FFF5DD" stroke="#FFB84D" stroke-width="2"/>
                <circle cx="${startX - 5}" cy="${startY - 3}" r="2" fill="#333"/>
                <circle cx="${startX + 5}" cy="${startY - 3}" r="2" fill="#333"/>
                <path d="M${startX - 3},${startY + 3} Q${startX},${startY + 7} ${startX + 3},${startY + 3}" stroke="#333" stroke-width="1.5" fill="none"/>
            `;
        }
    }
    
    /**
     * Save career plan as PDF
     */
    function savePlanAsPDF() {
        // Show a message that this would download a PDF in a real implementation
        const toast = document.createElement('div');
        toast.className = 'toast info-toast';
        toast.textContent = 'PDF download would be implemented in production version';
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
     * Share career plan
     */
    function sharePlan() {
        // Show a message that this would share the plan in a real implementation
        const toast = document.createElement('div');
        toast.className = 'toast info-toast';
        toast.textContent = 'Sharing functionality would be implemented in production version';
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
     * Add career plan action items to todos
     */
    function addPlanToTodos() {
        if (!careerPlanData || !careerPlanData.actionItems) {
            showErrorMessage('No action items to add to todos');
            return;
        }
        
        // Create new todos from action items
        const newTodos = careerPlanData.actionItems.map(item => {
            // Generate a unique ID
            const id = 'todo' + Date.now() + Math.floor(Math.random() * 1000);
            
            return {
                id,
                title: item.title,
                deadline: item.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                completed: false,
                priority: item.priority || 'medium',
                category: 'career',
                icon: 'graduation-cap',
                description: item.description
            };
        });
        
        // Get existing todos
        if (!userTodos) {
            userTodos = { userId: 'user1', todos: [] };
        }
        
        // Add new todos
        userTodos.todos = [...userTodos.todos, ...newTodos];
        userTodos.lastUpdated = new Date().toISOString();
        
        // Save updated todos
        const jsonData = JSON.stringify(userTodos, null, 2);
        const blob = new Blob([jsonData], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'todos.json';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        
        // Show success message
        const toast = document.createElement('div');
        toast.className = 'toast success-toast';
        toast.textContent = `${newTodos.length} action items added to your todos`;
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
        
        // Refresh todos display if needed
        if (typeof fetchTodos === 'function') {
            fetchTodos();
        }
    }
    
    /**
     * Show error message to user
     * @param {string} message - Error message
     */
    function showErrorMessage(message) {
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
    
    /**
     * Show success message to user
     * @param {string} message - Success message
     */
    function showSuccessMessage(message) {
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
    
    /**
     * Handles the form submission when "Create My Plan" button is clicked
     * Collects form data, sends to OpenAI API, and updates the UI
     */
    async function handleCreatePlan() {
        try {
            // Show loading state
            planLoading.style.display = 'flex';
            planGeneratorForm.style.display = 'none';
            
            // Collect form data
            const formData = {
                shortTermGoal: shortTermGoalInput.value.trim(),
                longTermGoal: longTermGoalInput.value.trim(),
                dreamRole: dreamRoleInput.value.trim(),
                dreamCompany: dreamCompanyInput.value.trim(),
                careerChallenges: careerChallengesInput.value.trim(),
                workPreferences: workPreferencesInput.value.trim()
            };
            
            console.log("Career plan form data:", formData);
            
            // Validate form data
            if (!formData.shortTermGoal || !formData.longTermGoal || !formData.dreamRole) {
                showErrorMessage("Please fill in at least the short-term goal, long-term goal, and dream role fields.");
                planLoading.style.display = 'none';
                planGeneratorForm.style.display = 'block';
                return;
            }
            
            // Create prompt for OpenAI API
            const prompt = generateCareerPlanPrompt(formData);
            
            // Call OpenAI API
            const careerPlan = await callOpenAIForCareerPlan(prompt);
            
            // Hide loading spinner
            planLoading.style.display = 'none';
            
            // Update UI with career plan
            updateUIWithCareerPlan(careerPlan);
            
            // Show career plan container
            careerPlanContainer.style.display = 'block';
            
            // Save the career plan to localStorage for later reference
            localStorage.setItem('careerPlan', JSON.stringify(careerPlan));
            
            // Show success message
            showSuccessMessage("Your career plan has been created!");
            
        } catch (error) {
            console.error("Error creating career plan:", error);
            planLoading.style.display = 'none';
            planGeneratorForm.style.display = 'block';
            showErrorMessage("There was an error creating your career plan. Please try again.");
        }
    }
    
    /**
     * Generates a prompt for the OpenAI API based on form data
     * @param {Object} formData - The collected form data
     * @returns {String} - Formatted prompt for OpenAI
     */
    function generateCareerPlanPrompt(formData) {
        return `
        You are a professional career advisor. Create a personalized career plan based on the following information:
        
        Short-term Goal (3-6 months): ${formData.shortTermGoal}
        Long-term Goal (1-3 years): ${formData.longTermGoal}
        Dream Role: ${formData.dreamRole}
        Dream Company/Industry: ${formData.dreamCompany}
        Current Challenges: ${formData.careerChallenges}
        Work Preferences: ${formData.workPreferences}
        
        Please create a comprehensive career plan that includes:
        
        1. A career summary with a compelling title.
        2. Short-term goals (3-6 months) - specific actionable steps.
        3. Mid-term goals (6-12 months) - strategic moves to advance career.
        4. Long-term goals (1-3 years) - vision and aspirations.
        5. Skills gap analysis - what skills need development.
        6. Action items - concrete steps to take right away.
        7. Resources - useful tools, websites, courses, or books.
        8. A career timeline with milestones and projected dates.
        9. 5-7 career deadlines with specific dates and descriptions.
        
        Format the response as a JSON object with the following structure:
        {
          "summary": {
            "title": "Your career plan title",
            "text": "Brief summary of the career journey"
          },
          "shortTermGoals": ["Goal 1", "Goal 2", ...],
          "midTermGoals": ["Goal 1", "Goal 2", ...],
          "longTermGoals": ["Goal 1", "Goal 2", ...],
          "skillsGap": {
            "currentSkills": ["Skill 1", "Skill 2", ...],
            "neededSkills": ["Skill 1", "Skill 2", ...],
            "recommendations": ["Recommendation 1", "Recommendation 2", ...]
          },
          "actionItems": [
            {
              "title": "Action item title",
              "description": "Description",
              "timeframe": "Time estimate",
              "priority": "high|medium|low"
            },
            ...
          ],
          "resources": [
            {
              "title": "Resource title",
              "type": "course|book|website|tool",
              "url": "URL if applicable",
              "description": "Brief description"
            },
            ...
          ],
          "timeline": [
            {
              "title": "Milestone title",
              "date": "Estimated date or timeframe",
              "description": "Description of milestone"
            },
            ...
          ],
          "deadlines": [
            {
              "date": "YYYY-MM-DD",
              "title": "Deadline title",
              "type": "document|course|application|other",
              "description": "Brief description"
            },
            ...
          ]
        }
        `;
    }
    
    /**
     * Makes the API call to OpenAI
     * @param {String} prompt - The formatted prompt
     * @returns {Object} - The career plan data
     */
    async function callOpenAIForCareerPlan(prompt) {
        try {
            // For testing/development, return mock data
            // if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            //     console.log("Using mock data for development mode");
            //     return getMockCareerPlanData();
            // }
            
            // Actual API call
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getOpenAIKey()}`
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 4000
                })
            });
            
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Parse the response content as JSON
            try {
                const content = data.choices[0].message.content;
                const parsedContent = parseOpenAIResponse(content);
                return parsedContent;
            } catch (parseError) {
                console.error("Error parsing OpenAI response:", parseError);
                throw new Error("Invalid response format from API");
            }
        } catch (error) {
            console.error("Error calling OpenAI API:", error);
            throw error;
        }
    }

    function parseOpenAIResponse(response) {
        // Remove markdown code block syntax if present
        let jsonString = response;

        // Check if the response is wrapped in markdown code blocks
        if (response.startsWith('```json') && response.endsWith('```')) {
            // Extract just the JSON part
            jsonString = response.substring(7, response.length - 3);
        } else if (response.includes('```json\n') && response.includes('\n```')) {
            // Alternative pattern with newlines
            const startIndex = response.indexOf('```json\n') + 8;
            const endIndex = response.lastIndexOf('\n```');
            jsonString = response.substring(startIndex, endIndex);
        }

        // Parse the JSON string
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return null;
        }
    }
    
    /**
     * Updates the UI with the career plan data
     * @param {Object} careerPlan - The career plan data from API
     */
    function updateUIWithCareerPlan(careerPlan) {
        // Update summary section
        if (careerPlan.summary) {
            planSummaryTitle.textContent = careerPlan.summary.title;
            planSummaryText.textContent = careerPlan.summary.text;
        }
        
        // Get section elements
        const shortTermSection = document.getElementById('shortTermSection');
        const midTermSection = document.getElementById('midTermSection');
        const longTermSection = document.getElementById('longTermSection');
        
        // Update short term goals
        if (careerPlan.shortTermGoals && shortTermGoalsList) {
            // Update structured goals list
            if (Array.isArray(careerPlan.shortTermGoals)) {
                // Handle array of strings
                renderGoalsList(shortTermGoalsList, careerPlan.shortTermGoals.map(goal => ({
                    title: goal,
                    description: '',
                    timeframe: '3-6 months'
                })));
            } else {
                // Already in correct format
                renderGoalsList(shortTermGoalsList, careerPlan.shortTermGoals);
            }
            
            // Show the section
            if (shortTermSection) {
                shortTermSection.style.display = 'block';
            }
        }
        
        // Update mid term goals
        if (careerPlan.midTermGoals && midTermGoalsList) {
            // Update structured goals list
            if (Array.isArray(careerPlan.midTermGoals)) {
                // Handle array of strings
                renderGoalsList(midTermGoalsList, careerPlan.midTermGoals.map(goal => ({
                    title: goal,
                    description: '',
                    timeframe: '6-12 months'
                })));
            } else {
                // Already in correct format
                renderGoalsList(midTermGoalsList, careerPlan.midTermGoals);
            }
            
            // Show the section
            if (midTermSection) {
                midTermSection.style.display = 'block';
            }
        }
        
        // Update long term goals
        if (careerPlan.longTermGoals && longTermGoalsList) {
            // Update structured goals list
            if (Array.isArray(careerPlan.longTermGoals)) {
                // Handle array of strings
                renderGoalsList(longTermGoalsList, careerPlan.longTermGoals.map(goal => ({
                    title: goal,
                    description: '',
                    timeframe: '1-3 years'
                })));
            } else {
                // Already in correct format
                renderGoalsList(longTermGoalsList, careerPlan.longTermGoals);
            }
            
            // Show the section
            if (longTermSection) {
                longTermSection.style.display = 'block';
            }
        }
        
        // Update skills gap
        if (careerPlan.skillsGap && skillsGapRecommendations) {
            renderSkillsGap(careerPlan.skillsGap);
        }
        
        // Update action items
        if (careerPlan.actionItems && actionItemsList) {
            renderActionItems(careerPlan.actionItems);
        }
        
        // Update resources
        if (careerPlan.resources && resourcesList) {
            renderResources(careerPlan.resources);
        }
        
        // Update timeline and map
        if (careerPlan.timeline) {
            renderCareerPathMap(careerPlan.timeline);
        }
        
        // Update career deadlines
        if (careerPlan.deadlines) {
            updateCareerDeadlines(careerPlan.deadlines);
        }
        
        // Update career progress tracker
        updateCareerProgressTracker(careerPlan);
    }
    
    /**
     * Updates the career deadlines container with new deadline data
     * @param {Array} deadlines - Array of deadline objects
     */
    function updateCareerDeadlines(deadlines) {
        if (!careerDeadlinesContainer) return;
        
        // Clear current deadlines
        careerDeadlinesContainer.innerHTML = '<h3 class="section-title">Career Deadlines</h3>';
        
        // Format and add each deadline
        deadlines.forEach((deadline, index) => {
            const date = new Date(deadline.date);
            const dayNum = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const dayName = date.toLocaleString('default', { weekday: 'long' });
            
            // Create deadline HTML
            const deadlineHTML = `
                <div class="deadlines-list">
                    <div class="deadline-date-card">
                        <div class="date-number">${dayNum}</div>
                        <div class="date-month">${month}, ${dayName}</div>
                    </div>
                    <div class="deadline-details">
                        <div class="deadline-checkbox">
                            <input type="checkbox" id="deadline-${index + 1}">
                            <label for="deadline-${index + 1}"></label>
                        </div>
                        <div class="deadline-info">
                            <div class="deadline-icon ${getDeadlineIconClass(deadline.type)}">
                                <i class="${getDeadlineIconClass(deadline.type)}"></i>
                            </div>
                            <div class="deadline-title">${deadline.title}</div>
                        </div>
                    </div>
                </div>
            `;
            
            careerDeadlinesContainer.insertAdjacentHTML('beforeend', deadlineHTML);
        });
        
        // Add event listeners to checkboxes
        const newCheckboxes = careerDeadlinesContainer.querySelectorAll('.deadline-checkbox input[type="checkbox"]');
        newCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const deadlineItem = this.closest('.deadlines-list');
                if (this.checked) {
                    deadlineItem.classList.add('completed');
                } else {
                    deadlineItem.classList.remove('completed');
                }
            });
        });
    }
    
    /**
     * Gets the appropriate icon class based on deadline type
     * @param {String} type - The deadline type
     * @returns {String} - The icon class
     */
    function getDeadlineIconClass(type) {
        switch (type.toLowerCase()) {
            case 'document':
                return 'fas fa-file-alt';
            case 'course':
                return 'fas fa-graduation-cap';
            case 'application':
                return 'fas fa-briefcase';
            case 'interview':
                return 'fas fa-user-tie';
            case 'networking':
                return 'fas fa-users';
            case 'certification':
                return 'fas fa-certificate';
            case 'project':
                return 'fas fa-project-diagram';
            case 'art':
                return 'fas fa-palette';
            case 'mountain':
                return 'fas fa-mountain';
            default:
                return 'fas fa-calendar-check';
        }
    }
    
    /**
     * Updates the career progress tracker with data from the career plan
     * @param {Object} careerPlan - The career plan data
     */
    function updateCareerProgressTracker(careerPlan) {
        const progressTracker = document.getElementById('careerProgressTracker');
        if (!progressTracker) return;
        
        // Update overall progress
        // For now, set a default percentage, but could calculate based on completed items
        const overallProgressPercentage = 33;
        const overallProgressFill = progressTracker.querySelector('.progress-bar-fill');
        const progressPercentage = progressTracker.querySelector('.progress-percentage');
        
        if (overallProgressFill && progressPercentage) {
            overallProgressFill.style.width = `${overallProgressPercentage}%`;
            progressPercentage.textContent = `${overallProgressPercentage}%`;
        }
        
        // Update category progress
        // These could be calculated based on the career plan data
        const resumePercentage = 75;
        const applicationsPercentage = 40;
        const interviewsPercentage = 25;
        
        const resumeFill = progressTracker.querySelector('.resume-fill');
        const resumePercentageEl = progressTracker.querySelector('.resume-percentage');
        if (resumeFill && resumePercentageEl) {
            resumeFill.style.width = `${resumePercentage}%`;
            resumePercentageEl.textContent = `${resumePercentage}%`;
        }
        
        const applicationsFill = progressTracker.querySelector('.applications-fill');
        const applicationsPercentageEl = progressTracker.querySelector('.applications-percentage');
        if (applicationsFill && applicationsPercentageEl) {
            applicationsFill.style.width = `${applicationsPercentage}%`;
            applicationsPercentageEl.textContent = `${applicationsPercentage}%`;
        }
        
        const interviewsFill = progressTracker.querySelector('.interviews-fill');
        const interviewsPercentageEl = progressTracker.querySelector('.interviews-percentage');
        if (interviewsFill && interviewsPercentageEl) {
            interviewsFill.style.width = `${interviewsPercentage}%`;
            interviewsPercentageEl.textContent = `${interviewsPercentage}%`;
        }
        
        // Update timeline
        const timelineContainer = progressTracker.querySelector('.timeline-container');
        if (timelineContainer && careerPlan.timeline) {
            timelineContainer.innerHTML = '';
            
            // Add timeline items
            careerPlan.timeline.forEach((milestone, index) => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';
                if (index === 0) timelineItem.classList.add('active');
                
                const itemHTML = `
                    <div class="timeline-point"></div>
                    <div class="timeline-content">
                        <h4>${milestone.title}</h4>
                        <p>${milestone.date}</p>
                        <p>${milestone.description}</p>
                    </div>
                `;
                
                timelineItem.innerHTML = itemHTML;
                timelineContainer.appendChild(timelineItem);
            });
        }
    }
    
    /**
     * Gets or creates an OpenAI API key
     * In a production environment, this would be handled securely on the backend
     */
    function getOpenAIKey() {
        // In a real app, you would never expose the API key in the frontend
        // This is just for demo purposes
        return 'YOUR_OPENAI_API_KEY_HERE';
    }
    
    /**
     * Returns mock career plan data for testing/development
     */
    function getMockCareerPlanData() {
        return {
            "summary": {
                "title": "Full Stack Developer to Senior Engineer Journey",
                "text": "Your path from junior full stack developer to senior engineer focuses on deepening technical expertise while developing leadership skills over the next 3 years."
            },
            "shortTermGoals": [
                "Complete an advanced React course to master hooks and context API",
                "Build a full-stack application with React, Node.js, and MongoDB",
                "Contribute to at least one open-source project on GitHub",
                "Improve testing skills with Jest and Cypress",
                "Learn Docker basics for containerization"
            ],
            "midTermGoals": [
                "Gain experience with cloud services (AWS or Azure)",
                "Lead a small feature development with 2-3 team members",
                "Obtain a relevant certification (AWS Developer or similar)",
                "Develop mentoring skills by helping junior developers",
                "Build a portfolio of 3+ significant projects"
            ],
            "longTermGoals": [
                "Move into a senior developer role with architectural responsibilities",
                "Lead development of a major product feature or small product",
                "Develop expertise in system design and scalability",
                "Establish yourself as a subject matter expert in your tech stack",
                "Present at a technical conference or create technical content"
            ],
            "skillsGap": {
                "currentSkills": ["JavaScript", "React Basics", "HTML/CSS", "Node.js Basics", "SQL"],
                "neededSkills": ["Advanced React", "System Architecture", "Testing", "Cloud Services", "CI/CD", "Team Leadership"],
                "recommendations": [
                    "Focus on testing methodologies first as this improves code quality immediately",
                    "Learn cloud services through hands-on projects rather than just courses",
                    "Practice leadership by volunteering to lead smaller initiatives",
                    "Join communities related to your tech stack for networking and learning"
                ]
            },
            "actionItems": [
                {
                    "title": "Register for Advanced React Course",
                    "description": "Find and enroll in a comprehensive React course that covers hooks, context API, and advanced patterns",
                    "timeframe": "1 week",
                    "priority": "high"
                },
                {
                    "title": "Set Up GitHub Profile for Open Source",
                    "description": "Update GitHub profile and find 3-5 potential projects to contribute to",
                    "timeframe": "2 weeks",
                    "priority": "medium"
                },
                {
                    "title": "Create Learning Schedule",
                    "description": "Develop a weekly schedule allocating time for courses, projects, and practice",
                    "timeframe": "3 days",
                    "priority": "high"
                },
                {
                    "title": "Begin Docker Tutorial",
                    "description": "Complete the official Docker getting started guide",
                    "timeframe": "1 week",
                    "priority": "medium"
                }
            ],
            "resources": [
                {
                    "title": "Epic React by Kent C. Dodds",
                    "type": "course",
                    "url": "https://epicreact.dev/",
                    "description": "Comprehensive React training from fundamentals to advanced patterns"
                },
                {
                    "title": "Docker and Kubernetes: The Complete Guide",
                    "type": "course",
                    "url": "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/",
                    "description": "Learn containerization and orchestration fundamentals"
                },
                {
                    "title": "System Design Interview",
                    "type": "book",
                    "url": "https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF",
                    "description": "Essential reading for advancing to senior roles"
                },
                {
                    "title": "Frontend Masters",
                    "type": "website",
                    "url": "https://frontendmasters.com/",
                    "description": "In-depth courses on advanced frontend topics"
                }
            ],
            "timeline": [
                {
                    "title": "Complete Advanced React Training",
                    "date": "3 months",
                    "description": "Finish course and build sample application"
                },
                {
                    "title": "First Open Source Contribution",
                    "date": "4 months",
                    "description": "Successfully merge first pull request to an open project"
                },
                {
                    "title": "Full Stack Project Completion",
                    "date": "6 months",
                    "description": "Launch personal project demonstrating full stack skills"
                },
                {
                    "title": "Cloud Certification",
                    "date": "12 months",
                    "description": "Obtain AWS Developer Associate or equivalent certification"
                },
                {
                    "title": "Team Lead Experience",
                    "date": "18 months",
                    "description": "Successfully lead development of a significant feature"
                },
                {
                    "title": "Senior Developer Transition",
                    "date": "24-36 months",
                    "description": "Move into a senior role with expanded responsibilities"
                }
            ],
            "deadlines": [
                {
                    "date": "2023-11-15",
                    "title": "React Course Completion",
                    "type": "course",
                    "description": "Finish Advanced React course and all exercises"
                },
                {
                    "date": "2023-12-10",
                    "title": "Portfolio Website Update",
                    "type": "project",
                    "description": "Refresh personal site with new projects and skills"
                },
                {
                    "date": "2024-01-31",
                    "title": "Full Stack Application MVP",
                    "type": "project",
                    "description": "Complete minimum viable product of personal app"
                },
                {
                    "date": "2024-03-15",
                    "title": "Technical Resume Update",
                    "type": "document",
                    "description": "Update resume with new skills and projects"
                },
                {
                    "date": "2024-05-30",
                    "title": "Cloud Certification Study Completion",
                    "type": "certification",
                    "description": "Complete study materials for AWS cert"
                },
                {
                    "date": "2024-07-15",
                    "title": "Cloud Certification Exam",
                    "type": "certification",
                    "description": "Take and pass the certification exam"
                }
            ]
        };
    }
}); 