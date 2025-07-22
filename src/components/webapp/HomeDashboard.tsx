import React, { useState } from 'react';

interface Mission {
  id: number;
  title: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

interface ScheduleItem {
  id: number;
  title: string;
  time: string;
  type: 'interview' | 'webinar' | 'meeting';
}

const HomeDashboard: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      title: 'Update your resume with new skills',
      points: 20,
      difficulty: 'easy',
      completed: false,
    },
    {
      id: 2,
      title: 'Optimize your LinkedIn profile',
      points: 15,
      difficulty: 'medium',
      completed: false,
    },
    {
      id: 3,
      title: 'Connect with 3 people in your target industry',
      points: 25,
      difficulty: 'hard',
      completed: false,
    },
    {
      id: 4,
      title: 'Write a cover letter template',
      points: 15,
      difficulty: 'medium',
      completed: true,
    },
    {
      id: 5,
      title: 'Apply to 2 job openings',
      points: 30,
      difficulty: 'hard',
      completed: false,
    },
    {
      id: 6,
      title: 'Practice answering 5 common interview questions',
      points: 20,
      difficulty: 'medium',
      completed: true,
    },
  ]);

  const [schedule] = useState<ScheduleItem[]>([
    {
      id: 1,
      title: 'Mock Interview Practice',
      time: 'Tomorrow, 2:00 PM',
      type: 'interview',
    },
    {
      id: 2,
      title: 'Networking Webinar',
      time: 'Thu, Nov 12 • 6:30 PM',
      type: 'webinar',
    },
  ]);

  const completedMissions = missions.filter(m => m.completed).length;
  const totalMissions = missions.length;
  const progressPercentage = Math.round((completedMissions / totalMissions) * 100);

  const toggleMission = (id: number) => {
    setMissions(missions.map(mission => 
      mission.id === id 
        ? { ...mission, completed: !mission.completed }
        : mission
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScheduleIcon = (type: string) => {
    switch (type) {
      case 'interview': return 'fa-user-tie';
      case 'webinar': return 'fa-laptop';
      case 'meeting': return 'fa-calendar';
      default: return 'fa-calendar';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Missions */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Missions</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <input type="checkbox" className="w-4 h-4" />
              <div>
                <div className="font-medium">Update your resume with new skills</div>
                <div className="text-sm text-green-600">+20 points • Easy</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Your Stats</h2>
          <div className="text-center">
            <div className="text-2xl font-bold">360</div>
            <div className="text-sm text-gray-600">Career Points</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard; 