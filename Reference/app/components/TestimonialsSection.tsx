import React from 'react';
import Image from 'next/image';

export default function TestimonialsSection() {
  const testimonials = [
    {
      rating: 5,
      quote: "My dream job-seeking product would be called CareerCraft—a platform that goes far beyond the traditional keyword-based job board. It would use AI to recommend jobs based not only on your resume, but also your values, skills, ideal work environment, and long-term career goals.",
      author: "Job Seeker",
      title: "Recent Graduate",
      avatar: "/images/avatar-1.svg"
    },
    {
      rating: 5,
      quote: "Would be great to see a job search engine with the ability to handle highly specific requests/filters. One of the most time consuming and frustrating parts of the job app process is finding applicable jobs in the first place. Being able to avoid browsing through hundreds of irrelevant postings would be huge.",
      author: "Experienced Professional",
      title: "Tech Industry",
      avatar: "/images/avatar-2.svg"
    },
    {
      rating: 5,
      quote: "Automatic application generation, connection with LinkedIn and other platforms to give me potential networking contacts and automatic email generation. Outreach tracker as well, and a brief pre-coffee chat to save research time. A guide with next steps to optimize my time.",
      author: "Sarah",
      title: "Career Switcher",
      avatar: "/images/avatar-3.svg"
    },
    {
      rating: 5,
      quote: "自从修改简历，根据每个职位来优化简历，帮忙投递简历，针对性地提供面试辅导",
      quoteTranslation: "Help with resume optimization for each position, automated application submission, and targeted interview coaching.",
      author: "International User",
      title: "Job Seeker",
      avatar: "/images/avatar-4.svg"
    },
    {
      rating: 5,
      quote: "主要是能督促学习吧，帮助持续学习下去。基本都是最后落到没有时间而不继续。",
      quoteTranslation: "A platform that can 'supervise' learning, helping users to continue learning consistently. Most people eventually stop because they 'don't have time'.",
      author: "Li Wei",
      title: "Student",
      avatar: "/images/avatar-5.svg"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Success Stories & User Feedback</h2>
          <p className="text-lg text-gray-600">
            Hear what job seekers are saying about their dream job-seeking platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>

              {/* Quote */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed text-justify italic mb-3">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                {testimonial.quoteTranslation && (
                  <p className="text-gray-600 text-sm leading-relaxed text-justify">
                    &ldquo;{testimonial.quoteTranslation}&rdquo;
                  </p>
                )}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 