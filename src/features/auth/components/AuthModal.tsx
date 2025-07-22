import React, { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { thunkLogin, thunkSignup, clearErrors } from '../authSlice';
import GoogleLoginButton from './GoogleLoginButton';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, defaultMode = 'signup' }) => {
  const dispatch = useAppDispatch();
  const { errors, status } = useAppSelector((state) => state.auth);
  
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors) dispatch(clearErrors());
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        return; // Handle password mismatch
      }
      const result = await dispatch(thunkSignup({
        username: formData.username,
        email: formData.email,
        password: formData.password
      }));
      if (thunkSignup.fulfilled.match(result)) {
        onSuccess?.();
      }
    } else {
      const result = await dispatch(thunkLogin({
        email: formData.email,
        password: formData.password
      }));
      if (thunkLogin.fulfilled.match(result)) {
        onSuccess?.();
      }
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    dispatch(clearErrors());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-md w-full">
        {/* Modal Container with Curved Bottom */}
        <div className="bg-gray-100 rounded-t-3xl relative overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          {/* Content */}
          <div className="px-6 py-6 text-center">
            {/* Lightbulb Icon */}
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-yellow-400 rounded-full flex items-center justify-center mb-3">
                <div className="relative">
                                     {/* Lightbulb body */}
                   <div className="w-10 h-12 bg-yellow-500 rounded-t-full relative">
                    {/* Filament lines */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-yellow-700">
                        <div className="w-1 h-1 bg-yellow-700 rounded-full mb-1 mx-auto"></div>
                        <div className="w-2 h-0.5 bg-yellow-700 rounded mb-1"></div>
                        <div className="w-1 h-1 bg-yellow-700 rounded-full mx-auto"></div>
                      </div>
                    </div>
                    {/* Happy face */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-yellow-800 rounded-full"></div>
                        <div className="w-1 h-1 bg-yellow-800 rounded-full"></div>
                      </div>
                      <div className="w-3 h-1 bg-yellow-800 rounded-full mt-0.5 mx-auto" style={{borderRadius: '0 0 50% 50%'}}></div>
                    </div>
                  </div>
                                     {/* Lightbulb base */}
                   <div className="w-6 h-2 bg-yellow-600 mx-auto"></div>
                  
                  {/* Light rays */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-0.5 h-4 bg-yellow-400 transform -rotate-12 absolute -left-6 -top-1"></div>
                    <div className="w-0.5 h-4 bg-yellow-400 absolute -left-1 -top-2"></div>
                    <div className="w-0.5 h-4 bg-yellow-400 transform rotate-12 absolute right-5 -top-1"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Be one of the top talents!!
            </h2>
            
            <p className="text-gray-600 mb-4 text-sm">
              Sign up or log in to view your job opportunities!
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Username - only show in signup mode */}
              {mode === 'signup' && (
                                 <div>
                   <label className="block text-left text-gray-600 mb-1 font-medium text-sm">
                     Username
                   </label>
                   <input
                     type="text"
                     placeholder="Mia Xi"
                     className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                     value={formData.username}
                     onChange={(e) => handleInputChange('username', e.target.value)}
                     required
                   />
                 </div>
              )}

                             {/* Email */}
               <div>
                 <label className="block text-left text-gray-600 mb-1 font-medium text-sm">
                   Email
                 </label>
                 <input
                   type="email"
                   placeholder="mia@gmail.com"
                   className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                   value={formData.email}
                   onChange={(e) => handleInputChange('email', e.target.value)}
                   required
                 />
               </div>

                             {/* Password */}
               <div>
                 <label className="block text-left text-gray-600 mb-1 font-medium text-sm">
                   Password
                 </label>
                 <input
                   type="password"
                   placeholder="••••••••••••"
                   className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                   value={formData.password}
                   onChange={(e) => handleInputChange('password', e.target.value)}
                   required
                 />
               </div>

                             {/* Confirm Password - only show in signup mode */}
               {mode === 'signup' && (
                 <div>
                   <label className="block text-left text-gray-600 mb-1 font-medium text-sm">
                     Confirm password
                   </label>
                   <input
                     type="password"
                     placeholder="••••••••••••"
                     className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                     value={formData.confirmPassword}
                     onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                     required
                   />
                 </div>
               )}

              {/* Error Messages */}
              {errors && (
                <div className="text-red-500 text-sm text-left">
                  {Object.values(errors).map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}

                             {/* Submit Button */}
               <button
                 type="submit"
                 disabled={status === 'loading'}
                 className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 text-sm mt-4"
               >
                 {status === 'loading' 
                   ? (mode === 'signup' ? 'Signing up...' : 'Logging in...') 
                   : 'Sign up / Log in'
                 }
               </button>
            </form>

            {/* Mode Toggle */}
            <div className="mt-3">
              <button
                type="button"
                onClick={toggleMode}
                className="text-xs text-gray-600 hover:text-gray-800 underline"
              >
                {mode === 'signup' 
                  ? 'Already have an account? Log in' 
                  : "Don't have an account? Sign up"
                }
              </button>
            </div>

            {/* Google Login */}
            <div className="mt-2">
              <GoogleLoginButton />
            </div>
          </div>
        </div>

        {/* Curved Bottom Section */}
        <div className="bg-gray-100 h-8" style={{
          borderRadius: '0 0 50% 50%'
        }}></div>
      </div>
    </div>
  );
};

export default AuthModal; 