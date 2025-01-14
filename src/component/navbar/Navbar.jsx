'use client';

import { Github, LogOut } from 'lucide-react';

import { useState } from 'react';
import { Link } from 'react-router';

// Simulating authentication state
const isLoggedIn = false;
const userCoins = 1500;

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link href='/' className='flex items-center'>
          <span className='text-xl font-bold text-tertiary'>PayTasker</span>
        </Link>

        <div className='flex items-center gap-4'>
          {/* Navigation for logged in users */}
          {isLoggedIn && (
            <Link
              href='/dashboard'
              className='text-sm font-medium text-gray-600 transition-colors hover:text-tertiary'
            >
              Dashboard
            </Link>
          )}

          {/* Available Coins for logged in users */}
          {isLoggedIn && (
            <div className='flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5'>
              <span className='text-sm font-medium text-gray-600'>
                Available Coins:
              </span>
              <span className='font-bold text-tertiary'>{userCoins}</span>
            </div>
          )}

          {/* Auth buttons for non-logged in users */}
          {!isLoggedIn && (
            <>
              <Link
                href='/login'
                className='rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
              >
                Login
              </Link>
              <Link
                href='/register'
                className='rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
              >
                Register
              </Link>
            </>
          )}

          {/* User Profile Dropdown */}
          {isLoggedIn && (
            <div className='relative'>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600'
              >
                U
              </button>
              {isDropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5'>
                  <Link
                    href='/profile'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Profile
                  </Link>
                  <button
                    className='block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100'
                    onClick={() => {
                      // Add logout logic here
                      console.log('Logging out...');
                    }}
                  >
                    <LogOut />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Join as Developer Button */}
          <Link
            href='https://github.com/your-repo'
            target='_blank'
            className='flex items-center gap-2 rounded-md bg-[#00838C] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#006d75]'
          >
            <Github />
            Join as Developer
          </Link>
        </div>
      </div>
    </header>
  );
}
