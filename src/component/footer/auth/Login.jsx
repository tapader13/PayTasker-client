import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Link, useNavigate } from 'react-router';
const Login = () => {
  const { signInWithGoogle, loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    console.log(data);

    setLoading(true);
    loginUser(data.email, data.password)
      .then(() => {
        toast.success('Login successful');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error?.response?.data?.message || error?.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(async (val) => {
        try {
          const { user } = val;
          const response = await axiosPublic.post('/users', {
            name: user?.displayName,
            email: user?.email,
            profilePicture: user?.photoURL,
            role: 'worker',
            coins: 10,
          });
          if (response?.data?.success) {
            toast.success(response?.data?.message);
            navigate('/dashboard');
          }
        } catch (error) {
          console.log(error);
          toast.error(
            error?.response?.data?.message || error.response?.message
          );
        } finally {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
      });
  };

  return (
    <div>
      <div className='mx-auto max-w-md space-y-6 p-6'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Sign In</h1>
          <p className='text-gray-500'>
            Welcome back! Please sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className='space-y-4'>
          {/* Email Field */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              name='email'
              {...register('email', {
                required: 'Email is required',
              })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.email?.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                {...register('password', {
                  required: 'Password is required',
                })}
                className={`mt-1 block w-full rounded-md border px-3 py-2 pr-10 text-sm ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.password?.message}
              </p>
            )}
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-md bg-tertiary py-2 text-sm font-semibold text-white transition-colors hover:bg-tertiaryhover disabled:bg-gray-400'
          >
            {loading ? (
              <Loader2 className='mx-auto h-5 w-5 animate-spin' />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-white px-2 text-gray-500'>
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className='flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50'
        >
          <svg
            className='mr-2 h-5 w-5'
            aria-hidden='true'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path d='M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z' />
          </svg>
          Sign in with Google
        </button>
        <span className='mt-6 block text-center text-sm text-gray-500'>
          Don&apos;t have an account? <Link to='/register'>Sign up</Link>
        </span>
      </div>
      ;
    </div>
  );
};

export default Login;
