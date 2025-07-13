// import React from 'react';

// interface Testimonial {
//   id: number;
//   rating: number;
//   quote: string;
//   translation?: string;
//   author: {
//     name: string;
//     title: string;
//     avatar: string;
//   };
// }

// const TestimonialsSection = () => {
//   const testimonials: Testimonial[] = [
//     {
//       id: 1,
//       rating: 5,
//       quote: "My dream job-seeking product would be called CareerCraft—a platform that goes far beyond the traditional keyword-based job board. It would use AI to recommend jobs based not only on your resume, but also your values, skills, ideal work environment, and long-term career goals.",
//       author: {
//         name: "Job Seeker",
//         title: "Recent Graduate",
//         avatar: "/images/avatar-1.svg"
//       }
//     },
//     {
//       id: 2,
//       rating: 5,
//       quote: "Would be great to see a job search engine with the ability to handle highly specific requests/filters. One of the most time consuming and frustrating parts of the job app process is finding applicable jobs in the first place. Being able to avoid browsing through hundreds of irrelevant postings would be huge.",
//       author: {
//         name: "Experienced Professional",
//         title: "Tech Industry",
//         avatar: "/images/avatar-2.svg"
//       }
//     },
//     {
//       id: 3,
//       rating: 5,
//       quote: "Automatic application generation, connection with LinkedIn and other platforms to give me potential networking contacts and automatic email generation. Outreach tracker as well, and a brief pre-coffee chat to save research time. A guide with next steps to optimize my time.",
//       author: {
//         name: "Sarah",
//         title: "Career Switcher",
//         avatar: "/images/avatar-3.svg"
//       }
//     },
//     {
//       id: 4,
//       rating: 5,
//       quote: "自从修改简历，根据每个职位来优化简历，帮忙投递简历，针对性地提供面试辅导",
//       translation: "Help with resume optimization for each position, automated application submission, and targeted interview coaching.",
//       author: {
//         name: "International User",
//         title: "Job Seeker",
//         avatar: "/images/avatar-4.svg"
//       }
//     },
//     {
//       id: 5,
//       rating: 5,
//       quote: "主要是能\"督促\"学习吧，帮助持续学习下去。基本都是最后落到\"没有时间\"而不继续。",
//       translation: "A platform that can 'supervise' learning, helping users to continue learning consistently. Most people eventually stop because they 'don't have time'.",
//       author: {
//         name: "Li Wei",
//         title: "Student",
//         avatar: "/images/avatar-4.svg"
//       }
//     }
//   ];

//   const renderStars = (rating: number) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <i 
//         key={index}
//         className={`fas fa-star ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
//       />
//     ));
//   };

//   return (
//     <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
//       {/* Top Curve */}
//       <div className="relative -mt-20 mb-16">
//         <svg viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
//           <path d="M0 0C240 150 1200 0 1440 0V150H0V0Z" fill="#1e3a8a"/>
//         </svg>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Trophy and Title Section */}
//         <div className="text-center mb-16">
//           <img 
//             src="/images/Trophy.png" 
//             alt="Trophy" 
//             className="w-24 h-24 mx-auto mb-6"
//           />
          
//           <div className="flex justify-center space-x-1 mb-4">
//             {[...Array(5)].map((_, index) => (
//               <span key={index} className="text-yellow-400 text-2xl">★</span>
//             ))}
//           </div>
          
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">What They Said</h2>
//           <p className="text-xl text-blue-200 max-w-2xl mx-auto">
//             Real feedback from users who want a better job search experience.
//           </p>
//         </div>

//         {/* Testimonials Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {testimonials.map((testimonial) => (
//             <div key={testimonial.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
//               {/* Rating */}
//               <div className="flex space-x-1 mb-4">
//                 {renderStars(testimonial.rating)}
//               </div>

//               {/* Quote */}
//               <div className="mb-6">
//                 <p className="text-sm md:text-base leading-relaxed text-justify mb-2">
//                   "{testimonial.quote}"
//                 </p>
//                 {testimonial.translation && (
//                   <p className="text-xs md:text-sm text-blue-200 italic text-justify">
//                     {testimonial.translation}
//                   </p>
//                 )}
//               </div>

//               {/* Author */}
//               <div className="flex items-center space-x-3">
//                 <img 
//                   src={testimonial.author.avatar} 
//                   alt="User Avatar" 
//                   className="w-10 h-10 rounded-full border-2 border-white/30"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-sm">{testimonial.author.name}</h4>
//                   <p className="text-xs text-blue-200">{testimonial.author.title}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsSection; 


import React, { useEffect, useState, memo } from 'react';

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  translation?: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    quote: "My dream job-seeking product would be called CareerCraft—a platform that goes far beyond the traditional keyword-based job board. It would use AI to recommend jobs based not only on your resume, but also your values, skills, ideal work environment, and long-term career goals.",
    author: {
      name: "Job Seeker",
      title: "Recent Graduate",
      avatar: "/images/avatar-1.svg"
    }
  },
  {
    id: 2,
    rating: 5,
    quote: "Would be great to see a job search engine with the ability to handle highly specific requests/filters. One of the most time consuming and frustrating parts of the job app process is finding applicable jobs in the first place. Being able to avoid browsing through hundreds of irrelevant postings would be huge.",
    author: {
      name: "Experienced Professional",
      title: "Tech Industry",
      avatar: "/images/avatar-2.svg"
    }
  },
  {
    id: 3,
    rating: 5,
    quote: "Automatic application generation, connection with LinkedIn and other platforms to give me potential networking contacts and automatic email generation. Outreach tracker as well, and a brief pre-coffee chat to save research time. A guide with next steps to optimize my time.",
    author: {
      name: "Sarah",
      title: "Career Switcher",
      avatar: "/images/avatar-3.svg"
    }
  },
  {
    id: 4,
    rating: 5,
    quote: "自从修改简历，根据每个职位来优化简历，帮忙投递简历，针对性地提供面试辅导",
    translation: "Help with resume optimization for each position, automated application submission, and targeted interview coaching.",
    author: {
      name: "International User",
      title: "Job Seeker",
      avatar: "/images/avatar-4.svg"
    }
  },
  {
    id: 5,
    rating: 5,
    quote: "主要是能\"督促\"学习吧，帮助持续学习下去。基本都是最后落到\"没有时间\"而不继续。",
    translation: "A platform that can 'supervise' learning, helping users to continue learning consistently. Most people eventually stop because they 'don't have time'.",
    author: {
      name: "Li Wei",
      title: "Student",
      avatar: "/images/avatar-4.svg"
    }
  }
];

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    <i
      key={index}
      className={`fas fa-star ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
    />
  ));
};

const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => (
  <div className="bg-white/5 shadow-md rounded-xl p-6 border border-white/10 w-full md:w-[45%] lg:w-[30%]">
    {/* Rating */}
    <div className="flex space-x-1 mb-4">
      {renderStars(testimonial.rating)}
    </div>

    {/* Quote */}
    <div className="mb-6">
      <p className="text-sm md:text-base leading-relaxed text-justify mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
        "{testimonial.quote}"
      </p>
      {testimonial.translation && (
        <p className="text-xs md:text-sm text-blue-200 italic text-justify" style={{ fontFamily: 'Nunito, sans-serif' }}>
          {testimonial.translation}
        </p>
      )}
    </div>

    {/* Author */}
    <div className="flex items-center space-x-3">
      <img
        src={testimonial.author.avatar}
        alt={`${testimonial.author.name}'s avatar`}
        width={40}
        height={40}
        loading="lazy"
        className="rounded-full border-2 border-white/30"
      />
      <div>
        <h4 className="font-semibold text-sm" style={{ fontFamily: 'Nunito, sans-serif' }}>{testimonial.author.name}</h4>
        <p className="text-xs text-blue-200" style={{ fontFamily: 'Nunito, sans-serif' }}>{testimonial.author.title}</p>
      </div>
    </div>
  </div>
));

const TestimonialsSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="text-center text-white py-20" style={{ fontFamily: 'Nunito, sans-serif' }}>Loading testimonials...</div>;
  }

  return (
    <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20" style={{ fontFamily: 'Nunito, sans-serif' }}>
      {/* Top Curve */}
      <div className="relative -mt-20 mb-16">
        <svg viewBox="0 0 1440 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 0C240 150 1200 0 1440 0V150H0V0Z" fill="#1e3a8a" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trophy and Title Section */}
        <div className="text-center mb-16">
          <img
            src="/images/Trophy.png"
            alt="Trophy"
            width={96}
            height={96}
            loading="lazy"
            className="mx-auto mb-6"
          />

          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-yellow-400 text-2xl">★</span>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>What They Said</h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Real feedback from users who want a better job search experience.
          </p>
        </div>

        {/* Testimonials Layout */}
        <div className="flex flex-wrap gap-8 justify-center">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
