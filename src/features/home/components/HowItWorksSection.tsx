import React, { useState } from 'react';

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

  const handleStarClick = (stepId: number) => {
    setPressedButton(stepId);
    alert(`${roadmapSteps.find(step => step.id === stepId)?.title}`);
    setTimeout(() => setPressedButton(null), 200);
  };

  const renderTitleWords = (title: string) => {
    const words = title.split(' ');
    return words.map((word, index) => (
      <span 
        key={index}
        className={index % 2 === 0 ? 'text-blue-500' : 'text-orange-500'}
      >
        {word}
        {index < words.length - 1 ? ' ' : ''}
      </span>
    ));
  };

  return (
    <div className="bg-gray-50 w-full">
      <section className="max-w-4xl mx-auto px-5 py-16 relative" style={{ fontFamily: 'Nunito, sans-serif' }}>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>How JobHatch Works</h2>
          <p className="text-gray-600 text-lg" style={{ fontFamily: 'Nunito, sans-serif' }}>A quick, fun look at what makes us tick—no long reads, we promise</p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block relative min-h-[950px]">
          {/* Road Path */}
          <img 
            src="/images/Road.png" 
            alt="Road" 
            className="absolute left-1/2 top-16 transform -translate-x-1/2 h-[820px] w-auto z-0"
          />

          {/* Roadmap Steps */}
          {roadmapSteps.map((step) => (
            <div key={step.id} style={step.style} className="flex justify-between items-center h-36">
              {step.position === 'left' ? (
                <>
                  {/* Image on left */}
                  <div className="w-2/5 flex justify-end pr-12">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-48 h-auto"
                    />
                  </div>

                  {/* Star Button */}
                  <button 
                    className="relative z-10 w-20 h-20 bg-transparent border-none cursor-pointer transform transition-all hover:scale-110"
                    onClick={() => handleStarClick(step.id)}
                    aria-label={step.title}
                  >
                    <img 
                      src={pressedButton === step.id ? "/images/Button_Press.png" : "/images/Button_default.png"}
                      alt={`star${step.id}`}
                      className="w-20 h-20 pointer-events-none"
                    />
                  </button>

                  {/* Content on right */}
                  <div className="w-2/5 pl-12">
                    <div className="max-w-xs">
                      <div className="font-bold text-lg mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {renderTitleWords(step.title)}
                      </div>
                      <div className="text-gray-600 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {step.description}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Content on left */}
                  <div className="w-2/5 flex justify-end pr-12">
                    <div className="max-w-xs text-right">
                      <div className="font-bold text-lg mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {renderTitleWords(step.title)}
                      </div>
                      <div className="text-gray-600 text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {step.description}
                      </div>
                    </div>
                  </div>

                  {/* Star Button */}
                  <button 
                    className="relative z-10 w-20 h-20 bg-transparent border-none cursor-pointer transform transition-all hover:scale-110"
                    onClick={() => handleStarClick(step.id)}
                    aria-label={step.title}
                  >
                    <img 
                      src={pressedButton === step.id ? "/images/Button_Press.png" : "/images/Button_default.png"}
                      alt={`star${step.id}`}
                      className="w-20 h-20 pointer-events-none"
                    />
                  </button>

                  {/* Image on right */}
                  <div className="w-2/5 pl-12">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-48 h-auto"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {roadmapSteps.map((step) => (
            <div key={step.id} className="mb-10 text-center">
              <img 
                src={step.image} 
                alt={step.title} 
                className="w-36 h-auto mx-auto mb-5"
              />
              <div className="font-bold text-lg mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {renderTitleWords(step.title)}
              </div>
              <div className="text-gray-600 text-sm max-w-xs mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
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