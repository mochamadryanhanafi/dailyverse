import { useNavigate } from 'react-router-dom';
import AddGoogleIcon from '@/assets/svg/google-color-icon.svg';
// import AddGithubIcon from '@/assets/svg/github-icon.svg';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axiosInstance from '@/helpers/axios-instance';
import userState from '@/utils/user-state';
import ThemeToggle from '@/components/theme-toggle-button';
import { useEffect, useRef } from 'react';
import { isAxiosError } from 'axios';

function Signin() {
  const navigate = useNavigate();
  const toastShownRef = useRef(false);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const isGoogleCallback = searchParams.get('google-callback') === 'true';

        if (isGoogleCallback && !toastShownRef.current) {
          console.log('Cookies available:', document.cookie);

          const response = await axiosInstance.get('/api/auth/check');
          const { user } = response.data;

          if (user && user._id && user.role) {
            userState.setUser({
              _id: user._id,
              role: user.role,
              fullName: user.fullName,
              avatar: user.avatar,
            });

            navigate('/');
            if (!toastShownRef.current) {
              toast.success('Successfully logged in with Google');
              toastShownRef.current = true;
            }
          } else {
            console.error('User data is incomplete:', user);
            toast.error('Incomplete user data received');
          }

          // Hapus query string dari URL setelah callback
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      } catch (error) {
        console.error('Error handling Google login:', error);

        if (isAxiosError(error) && error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
        }

        if (!toastShownRef.current) {
          toast.error('Failed to log in with Google. Please try again.');
          toastShownRef.current = true;
        }
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_PATH}/api/auth/google`;
  };

  return (
    <div className="flex-grow cursor-default bg-white py-4 dark:bg-dark-card">
      <div className="m-4 mb-4 flex justify-center">
        <div className="flex w-full items-center justify-center">
          <h2 className="w-2/4 pl-2 text-center text-lg font-bold text-black dark:text-dark-primary sm:text-xl md:w-3/4 md:pl-48">
            Sign in to Winnicode
          </h2>
          <div className="flex items-center justify-end px-4 sm:px-20">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="m-2 mt-8 flex flex-col items-center justify-center gap-2">
        <div className="mt-2 flex w-5/6 flex-col items-center justify-center gap-4 text-center text-sm font-normal dark:text-dark-primary sm:text-base">
          <p></p>
        </div>

        <button
          className="flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-b-4 border-gray-300 p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:text-dark-primary dark:hover:bg-gray-700 md:w-3/4 lg:w-2/5"
          onClick={handleGoogleLogin}
        >
          <img className="h-4 w-6 pl-1 sm:h-5 sm:w-10" src={AddGoogleIcon} alt="Google icon" />
          <span className="text-sm sm:text-base">Continue with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Signin;
