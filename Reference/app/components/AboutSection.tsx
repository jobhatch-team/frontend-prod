import React from 'react';
import Image from 'next/image';

interface AboutSectionProps {
  onGetStarted: () => void;
}

export default function AboutSection({ onGetStarted }: AboutSectionProps) {
  const values = [
    {
      icon: 'far fa-heart',
      title: 'Support',
      description: 'Create a supportive community that alleviates the emotional burden of job seeking',
      color: 'text-red-500'
    },
    {
      icon: 'fas fa-users',
      title: 'Connection',
      description: 'Foster meaningful connections between job seekers facing similar challenges',
      color: 'text-blue-500'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Growth',
      description: 'Transform career development into a rewarding journey of personal growth',
      color: 'text-green-500'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      description: 'Continuously innovate to make career building more engaging and effective',
      color: 'text-yellow-500'
    }
  ];

  const founders = [
    {
      name: 'Jacqueline Li',
      title: 'Co-Founder & CEO',
      bio: 'Cornell University graduate with a degree in Information Science. Jacqueline identified the emotional challenges job seekers face and envisioned JobHatch as a solution to transform the job search experience.',
      image: '/images/founder-linlin.jpg',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Simon Tian',
      title: 'Co-Founder & CTO',
      bio: 'Cornell University graduate with a degree in Systems Engineering. Simon brings technical expertise and innovative solutions to create an engaging platform that helps job seekers build clear goals and action plans.',
      image: '/images/founder-simon.jpeg',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  return (
    <div className="bg-white">
      {/* About Hero */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="section-title">About JobHatch</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            JobHatch is the next-gen job hunt accelerator—a gamified, AI-powered platform that teaches in-demand skills, automates job applications, and connects users to AI-integrated roles.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">A Platform Born from Real Struggles</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Think Duolingo meets LinkedIn: we teach AI-relevant skills, then help users apply and get hired into AI-integrated roles.
                </p>
                <p>
                  Starting with Gen Z, users build skills through daily tasks, AI coaching, and peer support — while our backend agent automates job applications and streamlines their workflow.
                </p>
                <p>
                  Unlike traditional platforms that only show listings, JobHatch delivers end-to-end career support: teaching in-demand skills and connecting users to curated opportunities.
                </p>
                <p>
                  With LLMs now able to teach and automate complex tasks, this is the moment to scale a platform that helps users to learn, grow, and get hired — all in one place.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/team-working.png"
                alt="Team collaborating on laptops"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Our Mission & Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 ${value.color} bg-opacity-10 rounded-full flex items-center justify-center mb-6`}>
                  <i className={`${value.icon} text-2xl ${value.color}`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Meet Our Founders</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {founders.map((founder, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{founder.title}</p>
                <p className="text-gray-600 leading-relaxed mb-6">{founder.bio}</p>
                <div className="flex justify-center space-x-4">
                  <a href={founder.social.linkedin} className="text-blue-600 hover:text-blue-800 transition-colors">
                    <i className="fab fa-linkedin text-xl"></i>
                  </a>
                  <a href={founder.social.twitter} className="text-blue-400 hover:text-blue-600 transition-colors">
                    <i className="fab fa-twitter text-xl"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title">Join Us in Transforming Job Hunting</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            At JobHatch, we believe that job hunting doesn&apos;t have to be a lonely and anxious process. Join our community and turn your career journey into an engaging adventure filled with growth, connections, and achievement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={onGetStarted} className="btn btn-primary text-lg px-8 py-4">
              Get Started
            </button>
            <button className="btn btn-outline text-lg px-8 py-4">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 