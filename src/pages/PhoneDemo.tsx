import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PhoneDemo = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState('loading');
  const [currentCard, setCurrentCard] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showBottomNav, setShowBottomNav] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Check if mobile device
  const isMobileDevice = typeof window !== 'undefined' && 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  useEffect(() => {
    // Auto-launch demo mode for mobile visitors
    if (isMobileDevice && !window.location.href.includes('?desktop=true')) {
      setIsDemoMode(true);
    }

    // Simulate app loading
    const loadingTimer = setTimeout(() => {
      setCurrentScreen('login');
    }, 2500);

    return () => clearTimeout(loadingTimer);
  }, [isMobileDevice]);

  const flashcards = [
    {
      question: "Which of the following is NOT a primary responsibility of an AI Product Manager?",
      options: [
        "Defining product requirements",
        "Writing AI algorithms",
        "Stakeholder management", 
        "Roadmap planning"
      ],
      correct: 1
    },
    {
      question: "What is a key consideration when defining metrics for an AI product?",
      options: [
        "Using only technical metrics",
        "Focusing only on business KPIs",
        "Balancing technical and business metrics",
        "Using only competitor metrics"
      ],
      correct: 2
    },
    {
      question: "When evaluating model performance, what should an AI PM prioritize?",
      options: [
        "Technical accuracy only",
        "Speed of inference only", 
        "Cost efficiency only",
        "User experience impact"
      ],
      correct: 3
    }
  ];

  const handleLogin = () => {
    setCurrentScreen('home');
    setShowBottomNav(true);
  };

  const handleFeatureClick = (feature: string) => {
    if (feature === 'courses') {
      setCurrentScreen('courses');
      setShowBottomNav(false);
    } else {
      showNotification(`Opening ${feature}...`);
    }
  };

  const handleCourseClick = () => {
    setCurrentScreen('flashcards');
    setCurrentCard(0);
  };

  const handleAnswerSelect = (cardIndex: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [cardIndex]: answerIndex
    }));
  };

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const showNotification = (message: string) => {
    // Simple notification implementation
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.7);
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      z-index: 1000;
      font-size: 14px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.5s';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 1500);
  };

  const enableDemoMode = () => {
    setIsDemoMode(true);
    document.body.style.overflow = 'hidden';
    
    // Request fullscreen if available
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
  };

  const exitDemoMode = () => {
    setIsDemoMode(false);
    document.body.style.overflow = '';
    
    // Exit fullscreen if active
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className={`min-h-screen ${isDemoMode ? 'fixed inset-0 bg-white z-[9999] w-screen h-screen' : ''}`}>
      {/* Header - hidden in demo mode */}
      {!isDemoMode && (
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => navigate('/download')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <i className="fas fa-arrow-left"></i>
                <span>Back to Download</span>
              </button>
              <h1 className="text-xl font-bold">JobHatch Phone Demo</h1>
              <div></div>
            </div>
          </div>
        </header>
      )}

      {/* Demo Controls */}
      {!isDemoMode && (
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold mb-4">Experience our mobile app features</h2>
          <p className="text-gray-600 mb-6">Try the interactive demo below</p>
          <button
            onClick={enableDemoMode}
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-mobile-alt mr-2"></i>
            Launch Full Demo
          </button>
        </div>
      )}

      {/* Exit Demo Button */}
      {isDemoMode && (
        <button
          onClick={exitDemoMode}
          className="fixed top-4 right-4 bg-black bg-opacity-40 text-white w-10 h-10 rounded-full flex items-center justify-center z-50 hover:bg-opacity-60"
        >
          <i className="fas fa-times"></i>
        </button>
      )}

      {/* Phone Demo Container */}
      <div className={`flex justify-center ${isDemoMode ? 'h-screen' : 'py-8'}`}>
        <div className={`phone-device ${isDemoMode ? 'w-full h-full' : 'w-80 h-[650px]'} relative`}>
          {/* Phone Frame - hidden in demo mode */}
          {!isDemoMode && (
            <div className="absolute inset-0 border-4 border-black rounded-[45px] shadow-2xl z-10 pointer-events-none"></div>
          )}
          
          {/* Phone Screen */}
          <div className={`phone-screen ${isDemoMode ? 'w-full h-full rounded-none' : 'absolute top-1 left-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-[40px]'} bg-white overflow-hidden`}>
            
            {/* Status Bar */}
            {!isDemoMode && (
              <div className="h-11 flex justify-between items-end px-6 pb-2 text-sm font-semibold relative">
                {/* Dynamic Island */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-black rounded-full"></div>
                <div>11:32</div>
                <div className="flex gap-2">
                  <i className="fas fa-signal text-xs"></i>
                  <i className="fas fa-wifi text-xs"></i>
                  <i className="fas fa-battery-full text-xs"></i>
                </div>
              </div>
            )}

            {/* App Content */}
            <div className={`phone-content ${isDemoMode ? 'h-full' : 'h-[calc(100%-44px)]'} relative overflow-hidden`}>
              
              {/* Loading Screen */}
              {currentScreen === 'loading' && (
                <div className="h-full bg-yellow-50 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 mb-8">
                    <img src="/images/LOGO.jpg" alt="JobHatch Logo" className="w-full h-full rounded-3xl" />
                  </div>
                  <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-blue-400 rounded-full animate-loading"
                    ></div>
                  </div>
                  <div className="text-gray-600">Loading...</div>
                </div>
              )}

              {/* Login Screen */}
              {currentScreen === 'login' && (
                <div className="h-full bg-white flex flex-col items-center pt-16 px-8">
                  <div className="w-32 h-32 mb-8">
                    <img src="/images/chickoffer.png" alt="JobHatch Mascot" className="w-full h-full" />
                  </div>
                  <h2 className="text-2xl font-bold mb-8 text-gray-800">Login to your account</h2>
                  
                  <div className="w-full space-y-4 mb-6">
                    <div className="relative">
                      <i className="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input 
                        type="text" 
                        placeholder="Username"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base outline-none focus:border-blue-400"
                      />
                    </div>
                    <div className="relative">
                      <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input 
                        type="password" 
                        placeholder="Password"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-base outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>
                  
                  <a href="#" className="self-end text-sm text-gray-600 mb-6">Forgot Password?</a>
                  
                  <button 
                    onClick={handleLogin}
                    className="w-full py-4 bg-blue-400 text-white text-base font-semibold rounded-xl hover:bg-blue-500 transition-colors mb-5"
                  >
                    Login
                  </button>
                  
                  <div className="text-sm text-gray-600 mt-auto mb-5">
                    Don't have an account? <a href="#" className="text-blue-400 font-semibold">Sign up</a>
                  </div>
                </div>
              )}

              {/* Home Screen */}
              {currentScreen === 'home' && (
                <div className={`home-screen ${showBottomNav ? 'h-[calc(100%-80px)]' : 'h-full'} bg-gray-50 overflow-y-auto`}>
                  {/* Home Header */}
                  <div className="bg-white p-5 flex justify-between items-center shadow-sm">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Welcome back</div>
                      <div className="text-lg font-bold text-gray-800">Simon!</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                      <img src="/images/founder-linlin.jpg" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Today's Challenge */}
                  <div className="bg-blue-400 rounded-2xl p-5 m-4 text-white shadow-lg">
                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-3">
                      <i className="fas fa-trophy text-white"></i>
                    </div>
                    <h3 className="text-lg font-bold mb-1">Today's Challenge</h3>
                    <p className="text-sm opacity-90 mb-4">Take this lesson to earn new milestone</p>
                    <button className="bg-white text-blue-400 px-4 py-2 rounded-full text-sm font-semibold">
                      Tap to Start
                    </button>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-4 px-4 mb-5">
                    <div 
                      onClick={() => handleFeatureClick('match')}
                      className="bg-white rounded-2xl p-4 h-36 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mb-3">
                        <i className="fas fa-users text-orange-500 text-xl"></i>
                      </div>
                      <h3 className="font-semibold text-gray-800 text-center">Your Match</h3>
                    </div>

                    <div 
                      onClick={() => handleFeatureClick('jobs')}
                      className="bg-white rounded-2xl p-4 h-36 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-3">
                        <i className="fas fa-briefcase text-blue-600 text-xl"></i>
                      </div>
                      <h3 className="font-semibold text-gray-800 text-center">Browse Jobs</h3>
                    </div>

                    <div 
                      onClick={() => handleFeatureClick('courses')}
                      className="bg-white rounded-2xl p-4 h-36 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-3">
                        <i className="fas fa-graduation-cap text-green-600 text-xl"></i>
                      </div>
                      <h3 className="font-semibold text-gray-800 text-center">Daily Courses</h3>
                    </div>

                    <div 
                      onClick={() => handleFeatureClick('leaderboard')}
                      className="bg-white rounded-2xl p-4 h-36 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-3">
                        <i className="fas fa-chart-line text-purple-600 text-xl"></i>
                      </div>
                      <h3 className="font-semibold text-gray-800 text-center">Leaderboard</h3>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="bg-white rounded-2xl p-5 mx-4 mb-5 shadow-sm">
                    <div className="flex justify-between items-center mb-5">
                      <h3 className="text-lg font-bold text-gray-800">Your Progress</h3>
                      <span className="text-sm text-blue-400 font-semibold">View all</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                      <div className="h-full w-3/5 bg-blue-400 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Current Progress: 65%</span>
                      <span>35% to go</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Courses Screen */}
              {currentScreen === 'courses' && (
                <div className="h-full bg-white flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <button 
                      onClick={() => {setCurrentScreen('home'); setShowBottomNav(true);}}
                      className="p-1"
                    >
                      <i className="fas fa-arrow-left text-lg text-gray-700"></i>
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800">Daily Courses</h2>
                    <i className="fas fa-ellipsis-v text-gray-400"></i>
                  </div>

                  {/* Courses List */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">Popular Courses</h3>
                      <span className="text-sm text-blue-400 font-semibold">View all</span>
                    </div>

                    <div className="space-y-4">
                      <div 
                        onClick={handleCourseClick}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                          <i className="fas fa-robot text-blue-600 text-xl"></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">AI Product Management</h4>
                          <div className="flex gap-4 text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <i className="fas fa-signal"></i> Beginner
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="far fa-clock"></i> 20 min
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full w-1/3 bg-blue-400 rounded-full"></div>
                            </div>
                            <span className="text-xs text-gray-500 font-medium">30%</span>
                          </div>
                        </div>
                        <button className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-semibold">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Flashcards Screen */}
              {currentScreen === 'flashcards' && (
                <div className="h-full bg-white flex flex-col">
                  {/* Header */}
                  <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <button 
                      onClick={() => setCurrentScreen('courses')}
                      className="p-1"
                    >
                      <i className="fas fa-arrow-left text-lg text-gray-700"></i>
                    </button>
                    <h2 className="text-lg font-semibold text-gray-800">AI Course</h2>
                    <i className="fas fa-ellipsis-v text-gray-400"></i>
                  </div>

                  {/* Progress Bar */}
                  <div className="p-4 bg-gray-50">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div 
                        className="h-full bg-blue-400 rounded-full transition-all duration-300"
                        style={{width: `${((currentCard + 1) / flashcards.length) * 100}%`}}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700 font-medium">{currentCard + 1}/{flashcards.length}</span>
                      <span className="text-purple-600 font-semibold">20 XP</span>
                    </div>
                  </div>

                  {/* Flashcard */}
                  <div className="flex-1 p-3 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
                      {/* Question Header */}
                      <div className="bg-purple-600 text-white p-3 flex items-center gap-2">
                        <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                          <i className="fas fa-question text-xs"></i>
                        </div>
                        <span className="text-sm font-semibold">QUESTION</span>
                      </div>

                      {/* Question Content */}
                      <div className="p-3 flex-1 flex flex-col">
                        <h3 className="text-base font-medium text-gray-800 mb-4 leading-snug">
                          {flashcards[currentCard].question}
                        </h3>

                        {/* Answer Options */}
                        <div className="space-y-3 flex-1">
                          {flashcards[currentCard].options.map((option, index) => {
                            const isSelected = selectedAnswers[currentCard] === index;
                            const isCorrect = index === flashcards[currentCard].correct;
                            const hasAnswered = selectedAnswers[currentCard] !== undefined;
                            
                            let optionClass = "flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer transition-all";
                            
                            if (hasAnswered) {
                              if (isSelected && isCorrect) {
                                optionClass += " bg-green-50 border-green-400";
                              } else if (isSelected && !isCorrect) {
                                optionClass += " bg-red-50 border-red-400";
                              } else if (isCorrect) {
                                optionClass += " bg-green-50 border-green-400";
                              }
                            } else if (isSelected) {
                              optionClass += " bg-blue-50 border-blue-400";
                            } else {
                              optionClass += " hover:bg-gray-50 hover:border-gray-300";
                            }

                            return (
                              <div
                                key={index}
                                className={optionClass}
                                onClick={() => !hasAnswered && handleAnswerSelect(currentCard, index)}
                              >
                                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <div className="flex-1 text-sm text-gray-700">{option}</div>
                                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-500">
                                  {index + 1}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Hint Button */}
                        <div className="flex justify-center mt-4">
                          <button 
                            onClick={() => showNotification("Think about the core responsibilities of a PM vs technical roles")}
                            className="bg-purple-50 text-purple-600 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                          >
                            <i className="fas fa-lightbulb"></i>
                            Hint
                            <span className="bg-purple-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-xs">1</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between p-3">
                    <button
                      onClick={prevCard}
                      disabled={currentCard === 0}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="fas fa-arrow-left"></i>
                      Previous
                    </button>
                    <button
                      onClick={nextCard}
                      disabled={currentCard === flashcards.length - 1}
                      className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Navigation */}
              {showBottomNav && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-white flex justify-around items-center border-t border-gray-200 rounded-b-[40px]">
                  <div className="flex flex-col items-center text-blue-400">
                    <i className="fas fa-home text-lg mb-1"></i>
                    <span className="text-xs font-medium">Home</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-400">
                    <i className="fas fa-search text-lg mb-1"></i>
                    <span className="text-xs font-medium">Search</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-400">
                    <i className="fas fa-calendar-alt text-lg mb-1"></i>
                    <span className="text-xs font-medium">Planner</span>
                  </div>
                  <div className="flex flex-col items-center text-gray-400">
                    <i className="fas fa-user text-lg mb-1"></i>
                    <span className="text-xs font-medium">Profile</span>
                  </div>
                </div>
              )}

              {/* Home Indicator */}
              {!isDemoMode && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-black opacity-30 rounded-full"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        @keyframes loading {
          0% { width: 0%; }
          60% { width: 80%; }
          100% { width: 100%; }
        }
        
        .animate-loading {
          animation: loading 2s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PhoneDemo; 