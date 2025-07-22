import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../app/store';
import { thunkSignup, thunkGoogleLogin } from '../authSlice';

interface SignupFormErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  server?: string;
}

function SignupForm() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { errors, status } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [wantsUpdates, setWantsUpdates] = useState(false);
  const [formErrors, setFormErrors] = useState<SignupFormErrors>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormErrors({}); // Reset errors

    if (password !== confirmPassword) {
      setFormErrors({
        confirmPassword: 'Confirm Password must match Password.',
      });
      return;
    }

    const res = await dispatch(
      thunkSignup({ email, username, password })
    );

    if ('payload' in res && res.meta.requestStatus === 'rejected') {
      setFormErrors(res.payload || { server: 'Signup failed' });
    } else {
      navigate('/congratulations');
    }
  };

  const handleGoogleSignup = async (credential: string) => {
    const resultAction = await dispatch(thunkGoogleLogin(credential));
    if (thunkGoogleLogin.fulfilled.match(resultAction)) {
      navigate('/congratulations');
    }
  };

  const handleContinueAsGuest = () => {
    // Navigate to guest experience
    navigate('/guest-dashboard');
  };

  const handleDemoLogin = () => {
    // Fill form with demo credentials
    setEmail('demo@jobhatch.com');
    setUsername('demo_user');
    setPassword('demo123');
    setConfirmPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex">
        {/* Left Column - Signup Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-8 bg-white">
          <div className="w-full max-w-sm">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                Welcome to <span className="text-orange-500">Jobhatch</span>
              </h1>
              <p className="text-sm text-gray-600">Create your account to get started</p>
            </div>

          {(formErrors.server || errors?.server) && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {formErrors.server || errors?.server}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {(formErrors.email || errors?.email) && (
                <p className="mt-1 text-xs text-red-600">{formErrors.email || errors?.email}</p>
              )}
            </div>

            {/* Username Field */}
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {(formErrors.username || errors?.username) && (
                <p className="mt-1 text-xs text-red-600">{formErrors.username || errors?.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 pr-10 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {(formErrors.password || errors?.password) && (
                <p className="mt-1 text-xs text-red-600">{formErrors.password || errors?.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 pr-10 text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
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
              {formErrors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{formErrors.confirmPassword}</p>
              )}
            </div>

            {/* Updates Checkbox */}
            <div className="flex items-center">
              <input
                id="updates"
                type="checkbox"
                className="h-3 w-3 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                checked={wantsUpdates}
                onChange={(e) => setWantsUpdates(e.target.checked)}
              />
              <label htmlFor="updates" className="ml-2 block text-xs text-gray-700">
                I want updates about new job offers.
              </label>
            </div>

            {/* Primary Sign Up Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {status === 'loading' ? 'CREATING...' : 'SIGN UP'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Sign Up Button */}
            <button
              type="button"
              className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 transition duration-200"
            >
              <img
                className="w-4 h-4 mr-2"
                src="/images/google-icon.svg"
                alt="Google"
              />
              Sign up with Google
            </button>

            {/* Extra Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="flex items-center justify-center px-2 py-1.5 border border-blue-300 rounded-lg text-xs font-medium text-blue-700 hover:bg-blue-50 transition duration-200"
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Demo
              </button>
              
              <button
                type="button"
                onClick={handleContinueAsGuest}
                className="flex items-center justify-center px-2 py-1.5 border border-green-300 rounded-lg text-xs font-medium text-green-700 hover:bg-green-50 transition duration-200"
              >
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Guest
              </button>
            </div>

            {/* Terms and Privacy */}
            <div className="text-center">
              <p className="text-xs text-gray-600">
                You agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Have an account?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-gray-900 hover:text-orange-500 transition duration-200"
                >
                  Log in now
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
              <span className="text-gray-800">Move Quickly and</span><br />
              <span className="text-gray-800">Confidently</span><br />
              toward your role
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
                <div className="w-7 h-7 bg-orange-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 text-orange-800" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              
              <div className="absolute bottom-2 left-1/3 transform -translate-x-1/2 animate-bounce delay-100">
                <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 text-green-800" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
              </div>

              {/* Additional floating elements for signup */}
              <div className="absolute bottom-8 right-1/3 transform translate-x-1/2 animate-pulse delay-200">
                <div className="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-2 h-2 text-purple-800" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
