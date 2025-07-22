import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  showNotificationDropdown: boolean;
  onToggleNotifications: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  activeTab,
  onTabChange,
  showNotificationDropdown,
  onToggleNotifications,
}) => {
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fas fa-home' },
    { id: 'planner', label: 'Planner', icon: 'fas fa-calendar-alt' },
    { id: 'resume', label: 'Resume', icon: 'fas fa-file-alt' },
    { id: 'jobs', label: 'Jobs', icon: 'fas fa-briefcase' },
    { id: 'buddies', label: 'Buddies', icon: 'fas fa-users' },
  ];

  const notifications = [
    {
      id: 1,
      type: 'job',
      message: 'New job matching your profile at Tech Solutions Inc.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      type: 'deadline',
      message: 'Upcoming deadline: Complete mock interview preparation',
      time: 'Yesterday',
      unread: true,
    },
    {
      id: 3,
      type: 'achievement',
      message: "You've earned 50 points for updating your resume!",
      time: '3 days ago',
      unread: false,
    },
  ];

  const markAllAsRead = () => {
    // Logic to mark notifications as read
    console.log('Marked all as read');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <img
                src="/images/LOGO.jpg"
                alt="JobHatch Logo"
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-xl font-bold">JobHatch</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Side - Notifications & User Menu */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={onToggleNotifications}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <i className="fas fa-bell text-lg"></i>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </button>

              {/* Notification Dropdown */}
              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">Notifications</h4>
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <i
                                className={`fas ${
                                  notification.type === 'job'
                                    ? 'fa-briefcase'
                                    : notification.type === 'deadline'
                                    ? 'fa-calendar-check'
                                    : 'fa-star'
                                } text-blue-600 text-sm`}
                              ></i>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                          <button className="flex-shrink-0 text-gray-400 hover:text-gray-600">
                            <i className="fas fa-times text-sm"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-800">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
              >
                <img
                  src="/images/founder-simon.jpeg"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium">Simon</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader; 