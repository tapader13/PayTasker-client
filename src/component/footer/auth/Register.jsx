import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  return (
    <div>
      <div className='mx-auto max-w-md space-y-6 p-6'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Create an Account</h1>
          <p className='text-gray-500'>Enter your information to get started</p>
        </div>

        {serverError && (
          <div className='rounded-md bg-red-50 p-4 text-sm text-red-500'>
            {serverError}
          </div>
        )}

        <form className='space-y-4'>
          {/* Name Field */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              name='name'
              //   value={formData.name}
              //   onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className='mt-1 text-sm text-red-500'>{errors.name}</p>
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
              //   value={formData.email}
              //   onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-500'>{errors.email}</p>
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
              //   value={formData.profilePicture}
              //   onChange={handleChange}
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm ${
                errors.profilePicture ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.profilePicture && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.profilePicture}
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
                // value={formData.password}
                // onChange={handleChange}
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
              <p className='mt-1 text-sm text-red-500'>{errors.password}</p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              I want to
            </label>
            <select
              name='role'
              //   value={formData.role}
              //   onChange={handleChange}
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm'
            >
              <option value='buyer'>Hire for Tasks (Buyer)</option>
              <option value='worker'>Work on Tasks (Worker)</option>
            </select>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-md bg-[#00838C] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#006d75] disabled:bg-gray-400'
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
