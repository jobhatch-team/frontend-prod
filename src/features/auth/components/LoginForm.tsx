import { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { thunkLogin, clearErrors } from '../authSlice';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { errors, status } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(thunkLogin({ email, password }));

    if (thunkLogin.fulfilled.match(resultAction)) {
      navigate('/onboarding'); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex">
        {/* Left Column - Login Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-8 bg-white">
          <div className="w-full max-w-sm">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Log In</h1>
            </div>

          {errors && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {Object.values(errors).map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors) dispatch(clearErrors());
                }}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 pr-10 text-sm"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors) dispatch(clearErrors());
                  }}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Log In Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {status === 'loading' ? 'LOGGING IN...' : 'Log In'}
            </button>

            {/* OR Divider */}
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            {/* Google Sign In Button */}
            <GoogleLoginButton />

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="font-medium text-blue-600 hover:text-blue-800 transition duration-200"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
          </div>
        </div>

        {/* Right Column - Promotional Content */}
        <div className="flex-1 bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center px-6 py-8">
          <div className="text-center text-white max-w-sm">
            <h2 className="text-3xl font-bold mb-6 leading-tight">
              <span className="text-gray-800">Welcome Back to</span><br />
              <span className="text-gray-800">Your Career</span><br />
              <span className="text-gray-800">Journey</span>
            </h2>
            
            {/* Character and Icons */}
            <div className="relative">
              <img
                src="/images/homepage-chick-offer.png"
                alt="JobHatch Character"
                className="w-48 h-48 mx-auto object-contain"
              />
              
              {/* Floating Icons */}
              <div className="absolute top-0 left-1/4 transform -translate-x-1/2 animate-bounce">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="absolute top-8 right-1/4 transform translate-x-1/2 animate-pulse">
                <div className="w-7 h-7 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
              
              <div className="absolute bottom-2 left-1/3 transform -translate-x-1/2 animate-bounce delay-100">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 text-green-800" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
