import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from './../../../hooks/useAuth';
import { useNavigate } from 'react-router';
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signUpUser, updateProfileUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleRegister = async (data) => {
    console.log(data);
    const manipulateData = { ...data };
    if (data.role === 'buyer') {
      manipulateData.coins = 10;
    }
    if (data.role === 'worker') {
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
            setLoading(false);
            toast.error(
              error?.response?.data?.message || error.response?.message
            );
          });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toast.error(error?.response?.data?.message || error?.message);
      });
  };
  return (
    <div>
      <div className='mx-auto max-w-md space-y-6 p-6'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Create an Account</h1>
          <p className='text-gray-500'>Enter your information to get started</p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className='space-y-4'>
          {/* Name Field */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              name='name'
              {...register('name', { required: 'Name is required' })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
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
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              name='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
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

          {/* Profile Picture URL Field */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Profile Picture URL
            </label>
            <input
              type='url'
              name='profilePicture'
              {...register('profilePicture', {
                required: 'profile picture is required',
                pattern: {
                  value:
                    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
                  message: 'Invalid URL',
                },
              })}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                errors.profilePicture ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.profilePicture && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.profilePicture?.message}
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

          {/* Role Selection */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              I want to
            </label>
            <select
              name='role'
              {...register('role', { required: 'Role is required' })}
              defaultValue='buyer'
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
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
      </div>
    </div>
  );
};

export default Register;
