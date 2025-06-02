import { useNavigate } from 'react-router-dom';
import AddGoogleIcon from '@/assets/svg/google-color-icon.svg';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '@/helpers/axios-instance';
import userState from '@/utils/user-state';
import ThemeToggle from '@/components/theme-toggle-button';

function Signup() {
  const navigate = useNavigate();
  const toastShownRef = useRef(false);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const isGoogleCallback = searchParams.get('google-callback') === 'true';

      if (isGoogleCallback && !toastShownRef.current) {
        try {
          const response = await axiosInstance.get('/api/auth/check');
          const { user } = response.data;

          if (user && user._id && user.role) {
            userState.setUser({
              _id: user._id,
              role: user.role,
              fullName: user.fullName,
              avatar: user.avatar,
            });

            if (!toastShownRef.current) {
              toastShownRef.current = true;
              toast.success('Berhasil login');
            }

            navigate('/');
            return; // Early return to prevent further execution
          }
        } catch (_) {
          // Silent fail
        } finally {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    };

    handleGoogleCallback();
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_PATH}/api/auth/google`;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 dark:bg-dark-card">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <h2 className="mb-6 text-center text-xl font-bold text-black dark:text-dark-primary sm:text-2xl">
        Login with Google to continue
      </h2>

      <button
        className="flex w-full max-w-sm items-center justify-center space-x-2 rounded-lg border-2 border-b-4 border-gray-300 p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:text-dark-primary dark:hover:bg-gray-700"
        onClick={handleGoogleLogin}
      >
        <img className="h-5 w-5" src={AddGoogleIcon} alt="Google Icon" />
        <span className="text-sm sm:text-base">Continue with Google</span>
      </button>
    </div>
  );
}

export default Signup;
