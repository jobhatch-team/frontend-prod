import React, { useState, useRef } from 'react';

interface RoadmapStep {
  id: number;
  title: string;
  titleColored: { text: string; color?: string }[];
  description: string;
  image: string;
  position: 'left' | 'right';
  top: string;
}

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const roadmapSteps: RoadmapStep[] = [
    {
      id: 1,
      title: "Design Personal Career Plan",
      titleColored: [
        { text: "Design", color: "text-blue-500" },
        { text: " " },
        { text: "Personal", color: "text-orange-500" },
        { text: " " },
        { text: "Career", color: "text-blue-500" },
        { text: " " },
        { text: "Plan", color: "text-orange-500" }
      ],
      description: "Not sure where to start? Just upload your resume and let our AI hatch a custom career roadmap for you.",
      image: "/images/Design-Personal-Career-Plan.png",
      position: 'left',
      top: "0px"
    },
    {
      id: 2,
      title: "Set Up Daily Goals",
      titleColored: [
        { text: "Set Up", color: "text-blue-500" },
        { text: " " },
        { text: "Daily Goals", color: "text-orange-500" }
      ],
      description: "Choose your intensity — chill or power mode. Our mission planner turns your career goals into fun daily quests (XP included)!",
      image: "/images/Set-Up-Daily-Goals.png",
      position: 'right',
      top: "140px"
    },
    {
      id: 3,
      title: "Apply with AI & Track Jobs",
      titleColored: [
        { text: "Apply with", color: "text-blue-500" },
        { text: " " },
        { text: "AI & Track Jobs", color: "text-orange-500" }
      ],
      description: "Tired of copy-pasting? Our AI matches you to jobs, rewrites your resume, and applies for you. You sit back and watch the offers roll in.",
      image: "/images/Apply-with-AI-Track-Jobs.png",
      position: 'left',
      top: "280px"
    },
    {
      id: 4,
      title: "Enhance Skills",
      titleColored: [
        { text: "Enhance", color: "text-blue-500" },
        { text: " " },
        { text: "Skills", color: "text-orange-500" }
      ],
      description: "Get ready to level up. We'll show you where your skills fall short and guide you through practice, courses, and mock interviews.",
      image: "/images/Enhance-Skills.png",
      position: 'right',
      top: "420px"
    },
    {
      id: 5,
      title: "Find a buddy & Mentor",
      titleColored: [
        { text: "Find a buddy", color: "text-blue-500" },
        { text: " " },
        { text: "& Mentor", color: "text-orange-500" }
      ],
      description: "Don't job hunt alone! Get matched with a buddy or a real mentor to keep you motivated, supported, and on track to the finish line.",
      image: "/images/FindabuddyMentor.png",
      position: 'left',
      top: "560px"
    }
  ];

  const handleStepClick = (stepId: number) => {
    // Debounce rapid clicks
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      setActiveStep(stepId);
      alert(`Step ${stepId}: ${roadmapSteps[stepId - 1].title}`);
      debounceRef.current = null;
    }, 100);
  };

  // Clean up timeout on unmount
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const renderTitleWords = (titleColored: { text: string; color?: string }[]) => {
    return titleColored.map((part, index) => (
      <span 
        key={index}
        className={part.color || 'text-gray-900'}
      >
        {part.text}
      </span>
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>How JobHatch Works</h2>
          <p className="text-lg text-gray-600" style={{ fontFamily: 'Nunito, sans-serif' }}>
            A quick, fun look at what makes us tick—no long reads, we promise
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block relative min-h-[700px]">
          {/* Road Path */}
          <div className="absolute left-1/2 top-8 transform -translate-x-1/2 z-0 pointer-events-none">
            <img
              src="/images/Road.png"
              alt="Career Path"
              className="h-[600px] w-auto"
            />
          </div>

          {/* Steps */}
          {roadmapSteps.map((step) => (
            <div
              key={step.id}
              className="absolute flex items-center w-full"
              style={{ top: `${parseInt(step.top) + 40}px` }}
            >
              {step.position === 'left' ? (
                <>
                  {/* Left image */}
                  <div className="w-[40%] flex justify-end pr-6">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-32 h-auto object-contain"
                    />
                  </div>

                  {/* Center button */}
                  <div className="w-[20%] flex justify-center">
                    <button
                      onClick={() => handleStepClick(step.id)}
                      className="relative z-10 w-16 h-16 p-0 border-none bg-transparent cursor-pointer hover:scale-110 transition-transform duration-200"
                      aria-label={step.title}
                    >
                      <img
                        src={
                          activeStep === step.id
                            ? "/images/Button_Press.png"
                            : "/images/Button_default.png"
                        }
                        alt={`Step ${step.id}`}
                        className="w-full h-full hover:brightness-110 hover:drop-shadow-lg"
                      />
                    </button>
                  </div>

                  <div className="w-[40%] pl-6">
                    <div className="max-w-56">
                      <div className="font-bold text-base mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {renderTitleWords(step.titleColored)}
                      </div>
                      <div className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {step.description}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-[40%] pr-6 text-right">
                    <div className="max-w-56 ml-auto">
                      <div className="font-bold text-base mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {renderTitleWords(step.titleColored)}
                      </div>
                      <div className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: 'Nunito, sans-serif' }}>
                        {step.description}
                      </div>
                    </div>
                  </div>

                  {/* Center button */}
                  <div className="w-[20%] flex justify-center">
                    <button
                      onClick={() => handleStepClick(step.id)}
                      className="relative z-10 w-16 h-16 p-0 border-none bg-transparent cursor-pointer hover:scale-110 transition-transform duration-200"
                      aria-label={step.title}
                    >
                      <img
                        src={
                          activeStep === step.id
                            ? "/images/Button_Press.png"
                            : "/images/Button_default.png"
                        }
                        alt={`Step ${step.id}`}
                        className="w-full h-full hover:brightness-110 hover:drop-shadow-lg"
                      />
                    </button>
                  </div>

                  {/* Right image */}
                  <div className="w-[40%] flex justify-start pl-6">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-32 h-auto object-contain"
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
                {renderTitleWords(step.titleColored)}
              </div>
              <div className="text-gray-600 text-sm max-w-xs mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {step.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom section transition */}
      <div className="mt-20">
        <svg
          viewBox="0 0 1440 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path d="M0 0C240 150 1200 0 1440 0V150H0V0Z" fill="#181e3a" />
        </svg>

        {/* Testimonials Preview */}
        <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
              <img
                src="/images/Trophy.png"
                alt="Trophy"
                className="w-24 h-24 mx-auto mb-6"
              />
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-2xl">
                    ★
                  </span>
                ))}
              </div>
              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>What They Said</h2>
              <p className="text-blue-200 text-lg" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Real feedback from users who want a better job search experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 