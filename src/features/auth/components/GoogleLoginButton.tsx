import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { thunkGoogleLogin } from '../authSlice';
import { useNavigate } from 'react-router-dom';

interface GoogleLoginButtonProps {
  isSignup?: boolean;
}

function GoogleLoginButton({ isSignup = false }: GoogleLoginButtonProps) {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      console.log('Google login credential received');
      const resultAction = await dispatch(thunkGoogleLogin(credentialResponse.credential));

      if (thunkGoogleLogin.fulfilled.match(resultAction)) {
        console.log('Google login successful');
        navigate('/onboarding');
      } else {
        console.error('Google login failed:', resultAction.payload);
      }
    } else {
      console.error('Google login: No credential received');
    }
  };

  const handleError = () => {
    console.error('Google login failed');
  };

  return (
    <div className="w-full">
      <GoogleLogin 
        onSuccess={handleSuccess} 
        onError={handleError}
        useOneTap={false}
        auto_select={false}
        theme="outline"
        size="large"
        width="100%"
        text={isSignup ? "signup_with" : "signin_with"}
      />
    </div>
  );
}

export default GoogleLoginButton;