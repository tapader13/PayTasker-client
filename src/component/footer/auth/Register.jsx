import { Eye, EyeOff, Loader2, Upload } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { signUpUser, updateProfileUser, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const axiosPublic = useAxiosPublic();

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_API_IMGBB_KEY
        }`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      return data.data.url;
    } catch (error) {
      // console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      try {
        const imageUrl = await uploadImage(file);
        setValue('profilePicture', imageUrl);
      } catch (error) {
        toast.error('Failed to upload image. Please try again.');
      }
    }
  };
  const navigate = useNavigate();
  const handleRegister = async (data) => {
    // console.log(data);
    const manipulateData = { ...data };
    if (data.role === 'worker') {
      manipulateData.coins = 10;
    }
    if (data.role === 'buyer') {
      manipulateData.coins = 50;
    }
    const { password, ...dat } = manipulateData;
    setLoading(true);
    signUpUser(data.email, data.password)
      .then(() => {
        updateProfileUser({
          displayName: data.name,
          photoURL: data.profilePicture,
        })
          .then(async () => {
            try {
              const response = await axiosPublic.post('/users', dat);
              if (response?.data?.success) {
                toast.success(response?.data?.message);
                navigate('/dashboard');
              }
            } catch (error) {
              // console.log(error);
              toast.error(
                error?.response?.data?.message || error.response?.message
              );
            } finally {
              setLoading(false);
            }
          })
          .catch((error) => {
            // console.log(error);
            setLoading(false);
            toast.error(
              error?.response?.data?.message || error.response?.message
            );
          });
      })
      .catch((error) => {
        setLoading(false);
        // console.log(error);
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
          // console.log(error);
          toast.error(
            error?.response?.data?.message || error.response?.message
          );
        } finally {
          setLoading(false);
        }
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error?.message);
      });
  };

  return (
    <div>
      <div className='mx-auto max-w-md space-y-6 p-6'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold dark:text-white'>
            Create an Account
          </h1>
          <p className='text-gray-500 dark:text-gray-300'>
            Enter your information to get started
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className='space-y-4'>
          {/* Name Field */}
          <div>
            <label className='block text-sm font-medium dark:text-gray-300 text-gray-700'>
              Name
            </label>
            <input
              type='text'
              {...register('name', { required: 'Name is required' })}
              className={`mt-1 dark:bg-gray-700 dark:text-white block w-full rounded-md border px-3 py-2 text-sm ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.name?.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className='block text-sm font-medium dark:text-gray-300 text-gray-700'>
              Email
            </label>
            <input
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`mt-1 dark:bg-gray-700 dark:text-white block w-full rounded-md border px-3 py-2 text-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.email?.message}
              </p>
            )}
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className='block dark:text-gray-300 text-sm font-medium text-gray-700'>
              Profile Picture
            </label>
            <div className='mt-1 flex items-center'>
              <input
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
                id='profile-picture-upload'
              />
              <label
                htmlFor='profile-picture-upload'
                className='cursor-pointer rounded-md border border-gray-300 bg-white dark:bg-gray-700 dark:text-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                <Upload className='mr-2 inline-block h-5 w-5' />
                Upload Image
              </label>
              {imagePreview && (
                <div className='ml-4'>
                  <img
                    src={imagePreview || '/placeholder.svg'}
                    alt='Profile Preview'
                    className='rounded-full h-12 w-12 object-cover'
                  />
                </div>
              )}
            </div>
            {errors.profilePicture && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.profilePicture?.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className='block text-sm dark:text-gray-300 font-medium text-gray-700'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z]).*$/,
                    message:
                      'Password must contain at least one uppercase letter, one lowercase letter',
                  },
                })}
                className={`mt-1 dark:bg-gray-700 dark:text-white block w-full rounded-md border px-3 py-2 pr-10 text-sm ${
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

          {/* Role Selection */}
          <div>
            <label className='block text-sm font-medium dark:text-gray-300 text-gray-700'>
              I want to
            </label>
            <select
              {...register('role', { required: 'Role is required' })}
              defaultValue='worker'
              className='mt-1 block dark:bg-gray-700 dark:text-white w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
            >
              <option value='buyer'>Hire for Tasks (Buyer)</option>
              <option value='worker'>Work on Tasks (Worker)</option>
            </select>
            {errors.role && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.role?.message}
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
              'Create Account'
            )}
          </button>
        </form>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-white dark:bg-gray-700 px-2 text-gray-500 dark:text-gray-300'>
              Or continue with
            </span>
          </div>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className='flex w-full items-center justify-center rounded-md border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:bg-gray-50'
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
        <span className='mt-6 block text-center text-sm text-gray-500 dark:text-gray-400'>
          Already have an account? <Link href='/login'>Login</Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
