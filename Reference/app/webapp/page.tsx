'use client';

import React, { useState } from 'react';

export default function WebAppPage() {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleNotifications = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
  };

  return (
    <div className="app-body">
      {/* App Header */}
      <header className="app-header">
        <div className="container">
          <div className="app-header-left">
            <a href="/" className="logo">
              <img src="/LOGO.jpg" alt="JobHatch Logo" width={40} height={40} />
              <span>JobHatch</span>
            </a>
          </div>
          <nav className="app-nav">
            <a 
              href="#" 
              className={`app-nav-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleTabChange('home'); }}
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </a>
            <a 
              href="#" 
              className={`app-nav-link ${activeTab === 'planner' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleTabChange('planner'); }}
            >
              <i className="fas fa-calendar-alt"></i>
              <span>Planner</span>
            </a>
            <a 
              href="#" 
              className={`app-nav-link ${activeTab === 'resume' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleTabChange('resume'); }}
            >
              <i className="fas fa-file-alt"></i>
              <span>Resume</span>
            </a>
            <a 
              href="#" 
              className={`app-nav-link ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleTabChange('jobs'); }}
            >
              <i className="fas fa-briefcase"></i>
              <span>Jobs</span>
            </a>
            <a 
              href="#" 
              className={`app-nav-link ${activeTab === 'buddies' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleTabChange('buddies'); }}
            >
              <i className="fas fa-users"></i>
              <span>Buddies</span>
            </a>
          </nav>
          <div className="app-header-right">
            <div className="notifications">
              <button className="notification-btn" onClick={toggleNotifications}>
                <i className="fas fa-bell"></i>
                <span className="notification-badge">2</span>
              </button>
              {/* Notification Dropdown */}
              {showNotificationDropdown && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h4>Notifications</h4>
                    <button className="mark-all-read">Mark all as read</button>
                  </div>
                  <div className="notification-list">
                    <div className="notification-item unread">
                      <div className="notification-icon">
                        <i className="fas fa-briefcase"></i>
                      </div>
                      <div className="notification-content">
                        <p>New job matching your profile at <strong>Tech Solutions Inc.</strong></p>
                        <span className="notification-time">2 hours ago</span>
                      </div>
                      <button className="notification-dismiss">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="notification-item unread">
                      <div className="notification-icon">
                        <i className="fas fa-calendar-check"></i>
                      </div>
                      <div className="notification-content">
                        <p>Upcoming deadline: <strong>Complete mock interview preparation</strong></p>
                        <span className="notification-time">Yesterday</span>
                      </div>
                      <button className="notification-dismiss">
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                  <div className="notification-footer">
                    <a href="#" className="view-all-notifications">View all notifications</a>
                  </div>
                </div>
              )}
            </div>
            <div className="user-menu">
              <a href="#" className="user-avatar-link">
                <div className="user-avatar">
                  <img src="/images/founder-simon.jpeg" alt="User Avatar" width={32} height={32} />
                </div>
                <span className="user-name">Simon</span>
                <i className="fas fa-chevron-down"></i>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="container">
          {/* Sidebar */}
          <aside className="app-sidebar">
            {/* User Status Radar Chart Section */}
            <div className="status-chart-container">
              <div className="status-chart-header">
                <h2>Your Job Readiness Status</h2>
                <div className="status-actions">
                  <button className="refresh-chart-btn" title="Refresh chart data">
                    <i className="fas fa-sync-alt"></i>
                  </button>
                  <button className="update-status-btn">
                    <i className="fas fa-edit"></i> Update Status
                  </button>
                  <button className="analyze-resume-btn">
                    <i className="fas fa-chart-line"></i> Analyze Resume
                  </button>
                </div>
              </div>
              <div className="status-chart-content">
                <div className="radar-chart-wrapper" style={{ width: '100%', maxWidth: '450px', height: '300px' }}>
                  <canvas id="userStatusChart" width="450" height="300"></canvas>
                </div>
              </div>
            </div>

            <div className="user-profile">
              <h3>Welcome, Simon</h3>
              <div className="upcoming-deadlines-mini">
                <div id="sidebar-deadlines-container">
                  {/* Sidebar deadlines will be loaded dynamically */}
                </div>
                <a href="#" className="sidebar-link">
                  <i className="fas fa-tasks"></i>
                  <span>View all deadlines</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>

            <div className="journey-map">
              <h3>Career Journey: The Tech Explorer's Path</h3>
              <div className="journey-path">
                <div className="journey-node active">
                  <div className="node-icon">
                    <i className="fas fa-flag"></i>
                  </div>
                  <div className="node-info">
                    <span className="node-title">Goal Setting</span>
                    <span className="node-status">Completed</span>
                  </div>
                  <div className="node-line"></div>
                </div>
                <div className="journey-node active">
                  <div className="node-icon">
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <div className="node-info">
                    <span className="node-title">Resume Building</span>
                    <span className="node-status">8/10 Complete</span>
                  </div>
                  <div className="node-line"></div>
                </div>
                <div className="journey-node current">
                  <div className="node-icon">
                    <i className="fas fa-clipboard-list"></i>
                  </div>
                  <div className="node-info">
                    <span className="node-title">Job Applications</span>
                    <span className="node-status">4 Applied</span>
                  </div>
                  <div className="node-line"></div>
                </div>
                <div className="journey-node">
                  <div className="node-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div className="node-info">
                    <span className="node-title">Networking</span>
                    <span className="node-status">Not Started</span>
                  </div>
                  <div className="node-line"></div>
                </div>
                <div className="journey-node">
                  <div className="node-icon">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <div className="node-info">
                    <span className="node-title">Job Offers</span>
                    <span className="node-status">Upcoming</span>
                  </div>
                </div>
              </div>
              <div className="journey-info">
                <div className="pet-container">
                  <img src="/images/egg.svg" alt="Career Pet" className="egg-image" />
                </div>
                <div className="journey-stats">
                  <div className="stat">
                    <i className="fas fa-star"></i>
                    <span>325 points</span>
                  </div>
                  <div className="stat">
                    <i className="fas fa-tasks"></i>
                    <span>12 tasks completed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h3>Get Started</h3>
              <ul className="sidebar-list">
                <li className="completed">
                  <i className="fas fa-check-circle"></i>
                  <span>Tell us about yourself</span>
                </li>
                <li className="active">
                  <i className="fas fa-graduation-cap"></i>
                  <span>What do you want to work on?</span>
                </li>
                <li>
                  <i className="fas fa-user-friends"></i>
                  <span>Your background</span>
                </li>
                <li>
                  <i className="fas fa-heart"></i>
                  <span>Personal challenges & values</span>
                </li>
              </ul>
            </div>

            <div className="sidebar-section">
              <h3>Account</h3>
              <ul className="sidebar-list">
                <li>
                  <a href="#" className="sidebar-nav-link">
                    <i className="fas fa-user-circle"></i>
                    <span>Profile & Status</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="sidebar-nav-link">
                    <i className="fas fa-cog"></i>
                    <span>Settings</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="sidebar-nav-link">
                    <i className="fas fa-question-circle"></i>
                    <span>Help & Support</span>
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="app-content">
            {/* Tab Content - Home */}
            {activeTab === 'home' && (
              <div className="tab-content active">
                <div className="content-header">
                  <h1>Your Dashboard</h1>
                </div>
                <div className="dashboard-container">
                  <div className="missions-card">
                    <div className="missions-header">
                      <h2>Today's Missions</h2>
                      <span className="missions-progress">2 of 6 completed</span>
                    </div>
                    <div className="missions-progress-bar">
                      <div className="missions-progress-fill" style={{ width: '33%' }}></div>
                    </div>
                    <div className="mission-list">
                      <div className="mission-item">
                        <div className="mission-checkbox">
                          <input type="checkbox" id="mission1" />
                        </div>
                        <div className="mission-content">
                          <h3 className="mission-title">Update your resume with new skills</h3>
                          <div className="mission-meta">
                            <span className="mission-points">+20 points</span>
                            <span className="mission-difficulty difficulty-easy">Easy</span>
                          </div>
                        </div>
                      </div>
                      <div className="mission-item">
                        <div className="mission-checkbox">
                          <input type="checkbox" id="mission2" />
                        </div>
                        <div className="mission-content">
                          <h3 className="mission-title">Optimize your LinkedIn profile</h3>
                          <div className="mission-meta">
                            <span className="mission-points">+15 points</span>
                            <span className="mission-difficulty difficulty-medium">Medium</span>
                          </div>
                        </div>
                      </div>
                      <div className="mission-item completed">
                        <div className="mission-checkbox">
                          <input type="checkbox" id="mission4" checked />
                        </div>
                        <div className="mission-content">
                          <h3 className="mission-title">Write a cover letter template</h3>
                          <div className="mission-meta">
                            <span className="mission-points">+15 points</span>
                            <span className="mission-difficulty difficulty-medium">Medium</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="add-task-button">
                      <i className="fas fa-plus-circle"></i> Add Custom Task
                    </button>
                  </div>

                  <div className="right-column">
                    <div className="pet-card">
                      <h2>Your Career Pet</h2>
                      <div className="pet-container">
                        <img src="/images/egg.svg" alt="Career Pet" className="egg-image" />
                      </div>
                      <h3 className="pet-name">Jane's Career Egg</h3>
                      <p className="pet-description">Complete more tasks to hatch your pet!</p>
                      <div className="hatching-progress-bar">
                        <div className="hatching-progress-fill" style={{ width: '33%' }}></div>
                      </div>
                      <p className="hatching-percentage">33% until hatching</p>
                    </div>
                    <div className="stats-card">
                      <h2>Your Stats</h2>
                      <div className="stats-grid">
                        <div className="stat-item">
                          <span className="stat-icon"><i className="fas fa-star"></i></span>
                          <h3 className="stat-value career-points-value">360</h3>
                          <p className="stat-label">Career Points</p>
                        </div>
                        <div className="stat-item">
                          <span className="stat-icon achievements-icon"><i className="fas fa-trophy"></i></span>
                          <h3 className="stat-value">5</h3>
                          <p className="stat-label">Achievements</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bottom-section">
                  <div className="schedule-card">
                    <h2 className="section-header">Upcoming Schedule</h2>
                    <div className="schedule-list">
                      <div className="schedule-item">
                        <div className="schedule-icon interview-icon">
                          <i className="fas fa-user-tie"></i>
                        </div>
                        <div className="schedule-details">
                          <h3 className="schedule-title">Mock Interview Practice</h3>
                          <p className="schedule-time">Tomorrow, 2:00 PM</p>
                        </div>
                      </div>
                      <div className="schedule-item">
                        <div className="schedule-icon webinar-icon">
                          <i className="fas fa-laptop"></i>
                        </div>
                        <div className="schedule-details">
                          <h3 className="schedule-title">Networking Webinar</h3>
                          <p className="schedule-time">Thu, Nov 12 • 6:30 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="buddy-card">
                    <h2 className="section-header">Your Buddy</h2>
                    <div className="buddy-profile">
                      <div className="buddy-avatar">
                        <img src="/images/avatar-1.svg" alt="Alex Chen" />
                      </div>
                      <div className="buddy-info">
                        <h3 className="buddy-name">Alex Chen</h3>
                        <p className="buddy-title">UX Designer • 98% compatible</p>
                        <span className="buddy-status">Online now</span>
                      </div>
                    </div>
                    <button className="message-button">Message</button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content - Planner */}
            {activeTab === 'planner' && (
              <div className="tab-content active">
                <div className="content-header">
                  <h1>Career Planner</h1>
                  <div className="planner-header-actions">
                    <button className="btn btn-primary">
                      <i className="fas fa-magic"></i>
                      Generate Plan
                    </button>
                  </div>
                </div>
                <div className="planner-content">
                  <div className="plan-empty-state">
                    <div className="plan-progress-card">
                      <h3>Let's make a personalized career plan</h3>
                      <p>We'll analyze your skills, experiences, and goals to craft your adventure map</p>
                      <button className="btn btn-primary btn-block">
                        Start Your Journey
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content - Resume */}
            {activeTab === 'resume' && (
              <div className="tab-content active">
                <div className="content-header">
                  <h1>Resume Builder</h1>
                  <button className="btn btn-primary">
                    <i className="fas fa-plus"></i>
                    New Resume
                  </button>
                </div>
                <div className="resume-options">
                  <div className="option-card">
                    <div className="option-icon">
                      <i className="fas fa-pen"></i>
                    </div>
                    <h3>Free Write</h3>
                    <p>Create a resume from scratch with our guided editor</p>
                  </div>
                  <div className="option-card">
                    <div className="option-icon">
                      <i className="fas fa-file-upload"></i>
                    </div>
                    <h3>Upload Existing</h3>
                    <p>Upload and enhance your existing resume</p>
                  </div>
                  <div className="option-card">
                    <div className="option-icon">
                      <i className="fas fa-magic"></i>
                    </div>
                    <h3>AI Resume Generator</h3>
                    <p>Let our AI create a tailored resume based on your profile</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content - Jobs */}
            {activeTab === 'jobs' && (
              <div className="tab-content active">
                <div className="content-header">
                  <h1>Find the right jobs for you</h1>
                  <div className="search-container">
                    <input type="text" placeholder="Search for jobs and companies" />
                    <button className="search-btn">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
                <div className="job-listings">
                  <div className="job-card">
                    <div className="company-logo">
                      <img src="/images/company-logo1.svg" alt="Company Logo" />
                    </div>
                    <div className="job-details">
                      <h3>UX Designer</h3>
                      <p className="company-name">Creative Design Co.</p>
                      <div className="job-meta">
                        <span className="location"><i className="fas fa-map-marker-alt"></i> San Francisco, CA</span>
                        <span className="salary"><i className="fas fa-money-bill-wave"></i> $85,000 - $110,000</span>
                      </div>
                    </div>
                    <div className="job-actions">
                      <div className="match-percentage">
                        <div className="match-circle">85%</div>
                        <span>Match</span>
                      </div>
                      <button className="btn btn-primary">Apply</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content - Buddies */}
            {activeTab === 'buddies' && (
              <div className="tab-content active">
                <div className="content-header">
                  <h1>Find Accountability Partners</h1>
                  <button className="btn btn-primary">
                    <i className="fas fa-users"></i>
                    Match Me
                  </button>
                </div>
                <div className="buddy-cards">
                  <div className="buddy-card">
                    <div className="buddy-header">
                      <div className="buddy-avatar">
                        <img src="/images/avatar-1.svg" alt="Buddy Avatar" />
                      </div>
                      <div className="buddy-info">
                        <h3>Sarah Johnson</h3>
                        <p>UX Designer at Creative Studios</p>
                        <div className="match-badge">92% Match</div>
                      </div>
                    </div>
                    <div className="buddy-actions">
                      <button className="btn btn-outline">View Profile</button>
                      <button className="btn btn-primary">Connect</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
