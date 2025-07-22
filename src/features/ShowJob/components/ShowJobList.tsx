import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { thunkFetchJobs } from '../showjobSlice';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import AuthModal from '../../auth/components/AuthModal';
import SuccessModal from '../../auth/components/SuccessModal';

const ShowJobList: React.FC = () => {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const status = useAppSelector((state) => state.jobs.status);
  const user = useAppSelector((state) => state.auth.user);
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('signup');

  useEffect(() => {
    dispatch(thunkFetchJobs());
  }, [dispatch]);

  const handleAuthAction = (action: 'apply' | 'chat') => {
    if (user) {
      // User is already logged in, proceed with action
      if (action === 'apply') {
        // Handle job application logic
        console.log('Applying to job...');
      } else {
        // Handle chat logic
        console.log('Starting chat...');
      }
    } else {
      // User not logged in, show auth modal
      setAuthModalMode('signup');
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
  };

  const handleSuccessContinue = () => {
    setShowSuccessModal(false);
    // Continue with the original action the user wanted to take
  };

  // Helper function to get display properties
  const getJobDisplayData = (job: any) => ({
    id: job.id,
    title: job.title,
    company: job.company || 'Company Name',
    location: job.location,
    jobType: job.jobType || job.job_type || 'Full-time',
    salary: job.salary || (job.salary_min && job.salary_max ? `$${job.salary_min} - $${job.salary_max}` : '$120k - $150k/yr'),
    tags: job.tags || (job.skills ? job.skills.split(',') : ['Architecture', 'E-Commerce', 'Late Stage']),
    description: job.description,
    match: job.match || 'STRONG MATCH',
    matchDetail: job.matchDetail || '4 of 5 Resume Units',
    daysAgo: job.daysAgo || '2 days ago',
    level: job.level || 'New Grad Entry Level',
    logo: job.logo || '/images/company-logo.svg'
  });

  // Mock data that matches the image design since the real API might not have all fields
  const mockJobs = [
    {
      id: 1,
      title: 'Product Designer',
      company: 'Company Name',
      location: 'Remote - US',
      jobType: 'Full-time',
      salary: '$120k - $150k/yr',
      tags: ['Architecture', 'E-Commerce', 'Late Stage'],
      description: 'One sentence pitch of the opportunity. Their first hire is creating a critical role of data to discreet in 10 seconds.',
      match: 'STRONG MATCH',
      matchDetail: '4 of 5 Resume Units',
      daysAgo: '2 days ago',
      level: 'New Grad Entry Level',
      logo: '/images/company-logo1.svg'
    },
    {
      id: 2,
      title: 'Product Designer',
      company: 'Company Name',
      location: 'Remote - US',
      jobType: 'Full-time',
      salary: '$120k - $150k/yr',
      tags: ['Architecture', 'E-Commerce', 'Late Stage'],
      description: 'One sentence pitch of the opportunity. Their first hire is creating a critical role of data to discreet in 10 seconds.',
      match: 'STRONG MATCH',
      matchDetail: '4 of 5 Resume Units',
      daysAgo: '2 days ago',
      level: 'New Grad Entry Level',
      logo: '/images/company-logo2.svg'
    },
    {
      id: 3,
      title: 'Product Designer',
      company: 'Company Name',
      location: 'Remote - US',
      jobType: 'Full-time',
      salary: '$120k - $150k/yr',
      tags: ['Architecture', 'E-Commerce', 'Late Stage'],
      description: 'One sentence pitch of the opportunity. Their first hire is creating a critical role of data to discreet in 10 seconds.',
      match: 'STRONG MATCH',
      matchDetail: '4 of 5 Resume Units',
      daysAgo: '2 days ago',
      level: 'New Grad Entry Level',
      logo: '/images/company-logo3.svg'
    },
    {
      id: 4,
      title: 'Product Designer',
      company: 'Company Name',
      location: 'Remote - US',
      jobType: 'Full-time',
      salary: '$120k - $150k/yr',
      tags: ['Architecture', 'E-Commerce', 'Late Stage'],
      description: 'One sentence pitch of the opportunity. Their first hire is creating a critical role of data to discreet in 10 seconds.',
      match: 'STRONG MATCH',
      matchDetail: '4 of 5 Resume Units',
      daysAgo: '2 days ago',
      level: 'New Grad Entry Level',
      logo: '/images/company-logo1.svg'
    }
  ];

  const displayJobs = jobs.length > 0 ? jobs : mockJobs;

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Popular Jobs</h1>
            <p className="text-gray-600">Be one of the first 10 to apply</p>
          </div>
          
          {/* Registration Tip */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 font-bold text-sm">!</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Tips</p>
              <p className="text-xs text-gray-600">Register with US to unlock more features!</p>
            </div>
          </div>
        </div>

                 {/* Job Listings */}
         <div className="space-y-4">
           {displayJobs.map((job, index) => {
             const jobData = getJobDisplayData(job);
             return (
               <div key={jobData.id || index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                 <div className="p-6">
                   <div className="flex items-start gap-6">
                     {/* Company Logo */}
                     <div className="flex-shrink-0">
                       <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                         <span className="text-white font-bold text-lg">SS</span>
                       </div>
                     </div>

                     {/* Job Info */}
                     <div className="flex-1 min-w-0">
                       <div className="flex items-start justify-between mb-3">
                         <div>
                           <div className="flex items-center space-x-2 mb-1">
                             <span className="text-sm text-gray-500">{jobData.daysAgo}</span>
                             <span className="text-sm text-gray-500">{jobData.level}</span>
                           </div>
                           <h3 className="text-xl font-semibold text-orange-600 mb-1">
                             {jobData.title}
                           </h3>
                           <p className="text-gray-600 mb-1">{jobData.company}</p>
                         </div>
            </div>

                       <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                         <span className="flex items-center">
                           <i className="fas fa-map-marker-alt mr-1"></i>
                           {jobData.location}
                         </span>
                         <span className="flex items-center">
                           <i className="fas fa-clock mr-1"></i>
                           {jobData.jobType}
                </span>
                         <span className="flex items-center">
                           <i className="fas fa-dollar-sign mr-1"></i>
                           {jobData.salary}
                </span>
              </div>

                       <p className="text-gray-700 mb-3 leading-relaxed">
                         {jobData.description || 'One sentence pitch of the opportunity. Their first hire is creating a critical role of data to discreet in 10 seconds.'}
                       </p>

                       <div className="flex flex-wrap gap-2">
                         {jobData.tags.map((tag: string, tagIndex: number) => (
                           <span
                             key={tagIndex}
                             className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                           >
                             {tag.trim()}
                           </span>
                         ))}
                       </div>
            </div>

                     {/* Match and Action Section */}
                     <div className="flex-shrink-0 w-72">
                       <div className="grid grid-cols-2 gap-4 h-full">
                         {/* Strong Match Section */}
                         <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                           <div className="w-12 h-12 bg-blue-200 rounded-full mb-2 flex items-center justify-center">
                             <i className="fas fa-chart-line text-blue-600"></i>
                           </div>
                           <div className="text-xs font-bold text-blue-600 mb-1">STRONG MATCH</div>
                           <div className="text-xs text-gray-500 mb-3">{jobData.matchDetail}</div>
                                                    <button 
                           onClick={() => handleAuthAction('apply')}
                           className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-4 rounded transition-colors"
                         >
                  APPLY NOW
                </button>
              </div>

                         {/* Funder Section */}
                         <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                           <div className="w-12 h-12 bg-blue-200 rounded-full mb-2 flex items-center justify-center">
                             <i className="fas fa-user-tie text-blue-600"></i>
                           </div>
                           <div className="text-sm font-bold text-gray-700 mb-1">Funder Name</div>
                           <div className="text-xs text-gray-500 mb-3">Description of Funder</div>
                                                    <button 
                           onClick={() => handleAuthAction('chat')}
                           className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded transition-colors"
                         >
                           LET'S CHAT
                         </button>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             );
           })}
         </div>

                 {/* Empty State */}
         {displayJobs.length === 0 && status === 'succeeded' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-briefcase text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs available</h3>
            <p className="text-gray-600">Check back later for new opportunities!</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-blue-100 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <img src="/images/LOGO.jpg" alt="JobHatch Logo" className="w-12 h-12 mr-3" />
              <span className="text-2xl font-bold text-gray-900">JOBHATCH</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Link</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
                <li>Lorem ipsum</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Privacy Policy</li>
                <li>Terms or Conditions of Use</li>
                <li>Cookie Advertising Policy</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <i className="fab fa-tiktok text-white text-xl"></i>
                </div>
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <i className="fab fa-linkedin-in text-white text-xl"></i>
                </div>
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                  <i className="fab fa-instagram text-white text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learn More or Contribute?</h3>
            <div className="flex items-center justify-center space-x-4">
              <input
                type="email"
                placeholder="Enter your Email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                Contact Us
              </button>
            </div>
            <div className="flex items-center justify-center mt-6 space-x-2">
              <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-blue-200">
            <p className="text-gray-600">© 2025 JobHatch</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        defaultMode={authModalMode}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        onContinue={handleSuccessContinue}
      />
    </div>
  );
};

export default ShowJobList;


