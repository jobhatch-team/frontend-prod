import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { thunkSignup } from './authSlice';
import GoogleLoginButton from './components/GoogleLoginButton';

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
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Signup Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome to <span className="text-orange-500">Jobhatch</span>
            </h1>
          </div>

                     {(formErrors.server || errors?.server) && (
             <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
               {formErrors.server || errors?.server}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
               {(formErrors.email || errors?.email) && (
                 <p className="mt-1 text-sm text-red-600">{formErrors.email || errors?.email}</p>
               )}
            </div>

            {/* Username Field */}
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
               {(formErrors.username || errors?.username) && (
                 <p className="mt-1 text-sm text-red-600">{formErrors.username || errors?.username}</p>
               )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
                             {(formErrors.password || errors?.password) && (
                 <p className="mt-1 text-sm text-red-600">{formErrors.password || errors?.password}</p>
               )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
               {formErrors.confirmPassword && (
                 <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
               )}
            </div>

            {/* Updates Checkbox */}
            <div className="flex items-center">
              <input
                id="updates"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                checked={wantsUpdates}
                onChange={(e) => setWantsUpdates(e.target.checked)}
              />
              <label htmlFor="updates" className="ml-2 block text-sm text-gray-700">
                I want updates about new job offers.
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'SIGNING UP...' : 'SIGN UP'}
            </button>

            {/* OR Divider */}
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            {/* Google Sign Up Button */}
            <GoogleLoginButton isSignup={true} />

            {/* Terms and Privacy */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                You agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                  Jobright Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </Link>{' '}
                when you use this service.
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
      <div className="flex-1 bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center px-8 py-12">
        <div className="text-center text-white max-w-lg">
          <h2 className="text-5xl font-bold mb-8 leading-tight">
            <span className="text-gray-800">Move Quickly and</span><br />
            <span className="text-gray-800">Confidently</span> Toward<br />
            Your Dream Role
          </h2>
          
          {/* Character and Icons */}
          <div className="relative mt-12">
            <img
              src="/images/homepage-chick-offer.png"
              alt="JobHatch Character"
              className="w-64 h-64 mx-auto object-contain"
            />
            
            {/* Floating Icons */}
            <div className="absolute top-0 left-1/4 transform -translate-x-1/2 animate-bounce">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <div className="absolute top-12 right-1/4 transform translate-x-1/2 animate-pulse">
              <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-orange-800" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-1/3 transform -translate-x-1/2 animate-bounce delay-100">
              <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-green-800" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
