import React, { useState, useEffect, useRef } from 'react';

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  image: string;
  position: 'left' | 'right';
  style: React.CSSProperties;
}

const HowItWorksSection = () => {
  const [pressedButton, setPressedButton] = useState<number | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [isRoadVisible, setIsRoadVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLImageElement>(null);

  const roadmapSteps: RoadmapStep[] = [
    {
      id: 1,
      title: "Design Personal Career Plan",
      description: "Not sure where to start? Just upload your resume and let our AI hatch a custom career roadmap for you.",
      image: "/images/Design-Personal-Career-Plan.png",
      position: 'left',
      style: { position: 'absolute', left: '0', top: '0', width: '100%' }
    },
    {
      id: 2,
      title: "Set Up Daily Goals",
      description: "Choose your intensity — chill or power mode. Our mission planner turns your career goals into fun daily quests (XP included)!",
      image: "/images/Set-Up-Daily-Goals.png",
      position: 'right',
      style: { position: 'absolute', left: '0', top: '232px', width: '100%' }
    },
    {
      id: 3,
      title: "Apply with AI & Track Jobs",
      description: "Tired of copy-pasting? Our AI matches you to jobs, rewrites your resume, and applies for you. You sit back and watch the offers roll in.",
      image: "/images/Apply-with-AI-Track-Jobs.png",
      position: 'left',
      style: { position: 'absolute', left: '0', top: '390px', width: '100%' }
    },
    {
      id: 4,
      title: "Enhance Skills",
      description: "Get ready to level up. We'll show you where your skills fall short and guide you through practice, courses, and mock interviews.",
      image: "/images/Enhance-Skills.png",
      position: 'right',
      style: { position: 'absolute', left: '73px', top: '551px', width: '100%' }
    },
    {
      id: 5,
      title: "Find a buddy & Mentor",
      description: "Don't job hunt alone! Get matched with a buddy or a real mentor to keep you motivated, supported, and on track to the finish line.",
      image: "/images/FindabuddyMentor.png",
      position: 'left',
      style: { position: 'absolute', right: '36px', top: '728px', width: '100%' }
    }
  ];

  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepId = parseInt(entry.target.getAttribute('data-step-id') || '0');
          if (stepId && !visibleSteps.includes(stepId)) {
            setTimeout(() => {
              setVisibleSteps(prev => [...prev, stepId]);
            }, (stepId - 1) * 200); // Staggered animation delay
          }
        }
      });
    }, observerOptions);

    // Observe road element
    const roadObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsRoadVisible(true);
        }
      });
    }, { threshold: 0.1 });

    // Start observing elements after component mounts
    const timer = setTimeout(() => {
      const stepElements = document.querySelectorAll('[data-step-id]');
      stepElements.forEach(el => observer.observe(el));
      
      if (roadRef.current) {
        roadObserver.observe(roadRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      roadObserver.disconnect();
    };
  }, [visibleSteps]);

  const handleStarClick = (stepId: number) => {
    setPressedButton(stepId);
    const step = roadmapSteps.find(step => step.id === stepId);
    if (step) {
      // Create a more engaging notification
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, #3b82f6, #f97316);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          z-index: 1000;
          font-family: Nunito, sans-serif;
          font-weight: 600;
          transform: translateX(100%);
          transition: transform 0.3s ease-out;
        ">
          ✨ ${step.title}
        </div>
      `;
      document.body.appendChild(notification);
      
      // Animate in
      setTimeout(() => {
        const notif = notification.firstElementChild as HTMLElement;
        if (notif) notif.style.transform = 'translateX(0)';
      }, 10);
      
      // Animate out and remove
      setTimeout(() => {
        const notif = notification.firstElementChild as HTMLElement;
        if (notif) notif.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(notification), 300);
      }, 2000);
    }
    setTimeout(() => setPressedButton(null), 200);
  };

  const renderTitleWords = (title: string) => {
    const words = title.split(' ');
    return words.map((word, index) => (
      <span 
        key={index}
        className={`inline-block transition-all duration-300 ${index % 2 === 0 ? 'text-blue-500' : 'text-orange-500'}`}
        style={{
          animationDelay: `${index * 100}ms`
        }}
      >
        {word}
        {index < words.length - 1 ? ' ' : ''}
      </span>
    ));
  };

  return (
    <div className="bg-gray-50 w-full" ref={sectionRef}>
      <section className="max-w-4xl mx-auto px-5 py-16 relative" style={{ fontFamily: 'Nunito, sans-serif' }}>
        {/* Animated Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 transform transition-all duration-1000 hover:scale-105" style={{ fontFamily: 'Nunito, sans-serif' }}>
            How JobHatch Works
          </h2>
          <p className="text-gray-600 text-lg transition-all duration-500 hover:text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>
            A quick, fun look at what makes us tick—no long reads, we promise
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block relative min-h-[950px]">
          {/* Animated Road Path */}
          <img 
            ref={roadRef}
            src="/images/Road.png" 
            alt="Road" 
            className={`absolute left-1/2 top-16 transform -translate-x-1/2 h-[820px] w-auto z-0 transition-all duration-1500 ease-out ${
              isRoadVisible 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 translate-y-8'
            }`}
            style={{
              filter: isRoadVisible ? 'none' : 'blur(2px)',
            }}
          />

          {/* Animated Roadmap Steps */}
          {roadmapSteps.map((step) => (
            <div 
              key={step.id} 
              data-step-id={step.id}
              style={step.style} 
              className={`flex justify-between items-center h-36 transition-all duration-800 ease-out ${
                visibleSteps.includes(step.id)
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              {step.position === 'left' ? (
                <>
                  {/* Animated Image on left */}
                  <div className="w-2/5 flex justify-end pr-12">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className={`w-48 h-auto transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${
                        visibleSteps.includes(step.id) ? 'hover:rotate-1' : ''
                      }`}
                      style={{
                        filter: visibleSteps.includes(step.id) ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' : 'none'
                      }}
                    />
                  </div>

                  {/* Enhanced Star Button */}
                  <button 
                    className="relative z-10 w-20 h-20 bg-transparent border-none cursor-pointer transform transition-all duration-300 hover:scale-125 hover:-translate-y-1 active:scale-110"
                    onClick={() => handleStarClick(step.id)}
                    aria-label={step.title}
                    style={{
                      filter: visibleSteps.includes(step.id) ? 'drop-shadow(0 8px 16px rgba(249, 115, 22, 0.3))' : 'none'
                    }}
                  >
                    <img 
                      src={pressedButton === step.id ? "/images/Button_Press.png" : "/images/Button_default.png"}
                      alt={`star${step.id}`}
                      className={`w-20 h-20 pointer-events-none transition-all duration-200 ${
                        visibleSteps.includes(step.id) ? 'animate-pulse' : ''
                      }`}
                    />
                  </button>

                  {/* Animated Content on right */}
                  <div className="w-2/5 pl-12">
                    <div className="max-w-xs group">
                      <div className="font-bold text-lg mb-1 transition-all duration-300 group-hover:translate-x-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {renderTitleWords(step.title)}
                      </div>
                      <div className="text-gray-600 text-sm transition-all duration-300 group-hover:text-gray-800 group-hover:translate-x-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {step.description}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Animated Content on left */}
                  <div className="w-2/5 flex justify-end pr-12">
                    <div className="max-w-xs text-right group">
                      <div className="font-bold text-lg mb-1 transition-all duration-300 group-hover:-translate-x-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {renderTitleWords(step.title)}
                      </div>
                      <div className="text-gray-600 text-sm transition-all duration-300 group-hover:text-gray-800 group-hover:-translate-x-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {step.description}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Star Button */}
                  <button 
                    className="relative z-10 w-20 h-20 bg-transparent border-none cursor-pointer transform transition-all duration-300 hover:scale-125 hover:-translate-y-1 active:scale-110"
                    onClick={() => handleStarClick(step.id)}
                    aria-label={step.title}
                    style={{
                      filter: visibleSteps.includes(step.id) ? 'drop-shadow(0 8px 16px rgba(249, 115, 22, 0.3))' : 'none'
                    }}
                  >
                    <img 
                      src={pressedButton === step.id ? "/images/Button_Press.png" : "/images/Button_default.png"}
                      alt={`star${step.id}`}
                      className={`w-20 h-20 pointer-events-none transition-all duration-200 ${
                        visibleSteps.includes(step.id) ? 'animate-pulse' : ''
                      }`}
                    />
                  </button>

                  {/* Animated Image on right */}
                  <div className="w-2/5 pl-12">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className={`w-48 h-auto transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${
                        visibleSteps.includes(step.id) ? 'hover:-rotate-1' : ''
                      }`}
                      style={{
                        filter: visibleSteps.includes(step.id) ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' : 'none'
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Mobile Layout */}
        <div className="block lg:hidden">
          {roadmapSteps.map((step, index) => (
            <div 
              key={step.id} 
              className={`mb-10 text-center transform transition-all duration-600 hover:scale-105 ${
                visibleSteps.includes(step.id) || true // Always visible on mobile for simplicity
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <img 
                src={step.image} 
                alt={step.title} 
                className="w-36 h-auto mx-auto mb-5 transition-all duration-400 hover:scale-110 hover:rotate-1"
                style={{
                  filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))'
                }}
              />
              <div className="font-bold text-lg mb-2 transition-all duration-300" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {renderTitleWords(step.title)}
              </div>
              <div className="text-gray-600 text-sm max-w-xs mx-auto transition-all duration-300 hover:text-gray-800" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {step.description}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorksSection; 