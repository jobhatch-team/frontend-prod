import { useState, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { thunkLogin, clearErrors } from './authSlice';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from './components/GoogleLoginButton';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, errors, status } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const resultAction = await dispatch(thunkLogin({ email, password }));

    if (thunkLogin.fulfilled.match(resultAction)) {
      navigate('/onboarding'); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

      {errors && (
        <div className="mb-4 text-red-600 text-sm">
          {Object.values(errors).map((err, idx) => (
            <p key={idx}>{err}</p>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors) dispatch(clearErrors());
            }}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="w-full px-3 py-2 border rounded-md"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors) dispatch(clearErrors());
            }}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {status === 'loading' ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      {/* OR Divider */}
      <div className="flex items-center justify-center my-4">
        <div className="border-t border-gray-300 flex-grow"></div>
        <span className="px-3 text-gray-500 text-sm">OR</span>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>

      {/* Google Login Button */}
      <GoogleLoginButton />
    </div>
  );
};

export default LoginForm;
