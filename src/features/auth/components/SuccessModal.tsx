import React from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, onContinue }) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-md w-full">
        {/* Modal Container */}
        <div className="bg-white rounded-t-3xl relative overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          {/* Header with user info */}
          <div className="bg-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/images/LOGO.jpg" 
                alt="JobHatch Logo" 
                className="h-8 w-auto"
              />
              <span className="text-lg font-bold text-gray-900">JOBHATCH</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Home</span>
              <span className="text-sm text-gray-600">About</span>
              <span className="text-sm text-gray-600">Download</span>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-700">{user?.username || 'Mia Yue'}</span>
                <i className="fas fa-chevron-down text-xs text-gray-500"></i>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 py-8 text-center">
            {/* Party Celebration Icon */}
            <div className="mb-6">
              <div className="relative mx-auto w-24 h-24">
                {/* Party cone */}
                <div className="absolute left-1/2 top-4 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-orange-400"></div>
                  <div className="w-0 h-0 border-l-5 border-r-5 border-b-10 border-l-transparent border-r-transparent border-b-orange-500 absolute top-1 left-0.5"></div>
                  {/* Party lines */}
                  <div className="absolute -top-1 left-1 w-0.5 h-2 bg-orange-300 transform rotate-12"></div>
                  <div className="absolute -top-1 right-1 w-0.5 h-2 bg-orange-300 transform -rotate-12"></div>
                </div>

                {/* Confetti particles */}
                <div className="absolute top-0 left-4 w-2 h-2 bg-orange-400 rounded-full"></div>
                <div className="absolute top-2 right-6 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                <div className="absolute top-6 left-2 w-1 h-1 bg-blue-400 rounded-full"></div>
                <div className="absolute top-4 right-2 w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                <div className="absolute top-8 left-6 w-1 h-1 bg-green-400 rounded-full"></div>
                
                {/* Plus symbols */}
                <div className="absolute top-2 left-8 text-orange-400 text-lg font-bold">+</div>
                <div className="absolute top-6 right-8 text-orange-400 text-sm font-bold">+</div>
                <div className="absolute bottom-2 left-4 text-orange-400 text-xs font-bold">+</div>
                
                {/* Circle outlines */}
                <div className="absolute top-1 right-4 w-3 h-3 border-2 border-orange-400 rounded-full"></div>
                <div className="absolute bottom-4 right-6 w-2 h-2 border-2 border-orange-400 rounded-full"></div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Congratulations!
            </h2>
            
            <p className="text-gray-600 mb-8">
              Thank you for joining us! Now you can enjoy your career journey at JOBHATCH!
            </p>

            {/* Continue Button */}
            <button
              onClick={onContinue}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors mb-8"
            >
              Continue
            </button>

            {/* Cute Characters */}
            <div className="flex justify-center items-end space-x-4 mb-8">
              {/* Chick character */}
              <div className="relative">
                <div className="w-16 h-16 bg-yellow-400 rounded-full relative">
                  {/* Body */}
                  <div className="w-12 h-12 bg-yellow-400 rounded-full absolute bottom-0 left-2"></div>
                  {/* Head */}
                  <div className="w-10 h-10 bg-yellow-400 rounded-full absolute -top-2 left-3"></div>
                  {/* Beak */}
                  <div className="w-0 h-0 border-l-1 border-r-1 border-b-2 border-l-transparent border-r-transparent border-b-orange-500 absolute top-1 left-7"></div>
                  {/* Eyes */}
                  <div className="absolute top-0 left-5 w-1 h-1 bg-black rounded-full"></div>
                  <div className="absolute top-0 left-7 w-1 h-1 bg-black rounded-full"></div>
                  {/* Wings */}
                  <div className="absolute top-4 left-1 w-3 h-2 bg-yellow-500 rounded-full transform rotate-12"></div>
                  <div className="absolute top-4 right-1 w-3 h-2 bg-yellow-500 rounded-full transform -rotate-12"></div>
                  {/* Game controller on head */}
                  <div className="absolute -top-4 left-3 w-6 h-4 bg-gray-600 rounded flex items-center justify-center">
                    <div className="w-1 h-1 bg-gray-300 rounded-full mr-0.5"></div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Owl character */}
              <div className="relative">
                <div className="w-16 h-20 relative">
                  {/* Body */}
                  <div className="w-12 h-14 bg-amber-700 rounded-full absolute bottom-0 left-2"></div>
                  {/* Head */}
                  <div className="w-14 h-12 bg-amber-600 rounded-full absolute top-0 left-1"></div>
                  {/* Eyes */}
                  <div className="absolute top-2 left-3 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  <div className="absolute top-2 right-3 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>
                  {/* Glasses frame */}
                  <div className="absolute top-1 left-2 w-5 h-6 border-2 border-gray-800 rounded-full"></div>
                  <div className="absolute top-1 right-2 w-5 h-6 border-2 border-gray-800 rounded-full"></div>
                  <div className="absolute top-4 left-7 w-2 h-0.5 bg-gray-800"></div>
                  {/* Beak */}
                  <div className="w-0 h-0 border-l-2 border-r-2 border-b-3 border-l-transparent border-r-transparent border-b-yellow-600 absolute top-6 left-6"></div>
                  {/* Wings */}
                  <div className="absolute top-8 left-0 w-3 h-4 bg-amber-800 rounded-full"></div>
                  <div className="absolute top-8 right-0 w-3 h-4 bg-amber-800 rounded-full"></div>
                  {/* Laptop */}
                  <div className="absolute bottom-6 left-4 w-6 h-3 bg-gray-300 rounded-t transform rotate-3">
                    <div className="w-5 h-2 bg-gray-700 rounded mt-0.5 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blue curved bottom section */}
        <div className="bg-blue-200 relative overflow-hidden" style={{ height: '120px', borderRadius: '0 0 50% 50%' }}>
          {/* JobHatch logo and name */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <div className="mb-2">
              <img 
                src="/images/LOGO.jpg" 
                alt="JobHatch Logo" 
                className="h-8 w-auto mx-auto"
              />
            </div>
            <span className="text-xl font-bold text-blue-900">JOBHATCH</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal; 