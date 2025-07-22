import React, { useEffect, useRef } from 'react';

const AppSidebar: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Initialize the radar chart
    if (chartRef.current) {
      initializeRadarChart();
    }
  }, []);

  const initializeRadarChart = () => {
    // Simple radar chart implementation without Chart.js dependency
    const canvas = chartRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Data for the radar chart
    const data = [
      { label: 'Resume', value: 75, angle: 0 },
      { label: 'Interview Skills', value: 60, angle: Math.PI / 2 },
      { label: 'Networking', value: 45, angle: Math.PI },
      { label: 'Technical Skills', value: 85, angle: (3 * Math.PI) / 2 },
    ];

    // Draw radar chart background
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius * i) / 4, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // Draw radar lines
    data.forEach((item) => {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      const x = centerX + Math.cos(item.angle - Math.PI / 2) * radius;
      const y = centerY + Math.sin(item.angle - Math.PI / 2) * radius;
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    // Draw data points and area
    ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((item, index) => {
      const x = centerX + Math.cos(item.angle - Math.PI / 2) * (radius * item.value / 100);
      const y = centerY + Math.sin(item.angle - Math.PI / 2) * (radius * item.value / 100);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw data points
    data.forEach((item) => {
      const x = centerX + Math.cos(item.angle - Math.PI / 2) * (radius * item.value / 100);
      const y = centerY + Math.sin(item.angle - Math.PI / 2) * (radius * item.value / 100);
      
      ctx.fillStyle = '#3b82f6';
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  const journeyNodes = [
    { title: 'Goal Setting', status: 'Completed', icon: 'fas fa-flag', active: true, completed: true },
    { title: 'Resume Building', status: '8/10 Complete', icon: 'fas fa-file-alt', active: true, completed: false },
    { title: 'Job Applications', status: '4 Applied', icon: 'fas fa-clipboard-list', active: false, completed: false, current: true },
    { title: 'Networking', status: 'Not Started', icon: 'fas fa-handshake', active: false, completed: false },
    { title: 'Job Offers', status: 'Upcoming', icon: 'fas fa-trophy', active: false, completed: false },
  ];

  const sidebarItems = [
    { label: 'Tell us about yourself', completed: true },
    { label: 'What do you want to work on?', active: true },
    { label: 'Your background', completed: false },
    { label: 'Personal challenges & values', completed: false },
  ];

  return (
    <aside className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit">
      {/* User Status Radar Chart Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Job Readiness Status</h2>
          <div className="flex gap-2">
            <button className="p-1 text-gray-500 hover:text-gray-700" title="Refresh chart data">
              <i className="fas fa-sync-alt text-sm"></i>
            </button>
            <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200">
              <i className="fas fa-edit text-xs mr-1"></i> Update Status
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <canvas
            ref={chartRef}
            width="250"
            height="250"
            className="max-w-full"
          />
        </div>
      </div>

      {/* User Profile Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Welcome, Simon</h3>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Mock Interview Practice</span>
              <span className="text-xs text-gray-500">Tomorrow, 2:00 PM</span>
            </div>
          </div>
          <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
            <i className="fas fa-tasks"></i>
            <span>View all deadlines</span>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Journey Map */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Career Journey: The Tech Explorer's Path</h3>
        <div className="space-y-4">
          {journeyNodes.map((node, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                node.completed 
                  ? 'bg-green-100 text-green-600' 
                  : node.current 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                <i className={`${node.icon} text-sm`}></i>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{node.title}</div>
                <div className={`text-xs ${
                  node.completed 
                    ? 'text-green-600' 
                    : node.current 
                    ? 'text-blue-600' 
                    : 'text-gray-500'
                }`}>
                  {node.status}
                </div>
              </div>
              {index < journeyNodes.length - 1 && (
                <div className="absolute left-4 mt-8 w-px h-4 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>

        {/* Pet and Stats */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center justify-center mb-3">
            <img src="/images/egg.svg" alt="Career Pet" className="w-16 h-16" />
          </div>
          <div className="flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-yellow-600">
              <i className="fas fa-star"></i>
              <span>325 points</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600">
              <i className="fas fa-tasks"></i>
              <span>12 tasks completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Started</h3>
        <ul className="space-y-3">
          {sidebarItems.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <i className={`fas ${
                item.completed 
                  ? 'fa-check-circle text-green-500' 
                  : item.active 
                  ? 'fa-graduation-cap text-blue-500' 
                  : 'fa-user-friends text-gray-400'
              }`}></i>
              <span className={`text-sm ${
                item.completed 
                  ? 'text-gray-600 line-through' 
                  : item.active 
                  ? 'text-gray-900 font-medium' 
                  : 'text-gray-500'
              }`}>
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Account Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
        <ul className="space-y-3">
          <li>
            <button className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 w-full text-left">
              <i className="fas fa-user-circle text-blue-500"></i>
              <span>Profile & Status</span>
            </button>
          </li>
          <li>
            <button className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 w-full text-left">
              <i className="fas fa-cog text-blue-500"></i>
              <span>Settings</span>
            </button>
          </li>
          <li>
            <button className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 w-full text-left">
              <i className="fas fa-question-circle text-blue-500"></i>
              <span>Help & Support</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AppSidebar; 