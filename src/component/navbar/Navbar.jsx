import { Github, LogOut, Menu, X } from 'lucide-react';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

// Simulating authentication state

const userCoins = 1500;

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user: isLoggedIn, logoutUser } = useAuth();
  const navigate = useNavigate();
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white'>
      <div className='mx-auto  flex h-16 w-10/12 items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Logo */}
        <Link to='/' className='flex items-center'>
          <span className='text-2xl font-bold text-tertiary'>PayTasker</span>
        </Link>
        <div className='flex items-center gap-3'>
          {isLoggedIn && (
            <button className='flex xl:hidden h-8 w-8 overflow-hidden items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600'>
              <img
                className='h-full w-full'
                src={isLoggedIn?.photoURL}
                alt='Profile'
              />
            </button>
          )}
          {/* Mobile Menu Button */}
          <button
            className='xl:hidden flex items-center'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {/* Desktop Navigation */}
        <div className='hidden  xl:flex items-center gap-4'>
          {/* Navigation for logged in users */}
          {isLoggedIn && (
            <Link
              to='/dashboard'
              className='text-sm font-medium text-gray-600 transition-colors hover:text-tertiary'
            >
              Dashboard
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to='/guide'
              className='text-sm font-medium text-gray-600 transition-colors hover:text-tertiary'
            >
              Guide
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
          <Link
            to='/'
            className='rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
          >
            Home
          </Link>
          <Link
            to='/alltask'
            className='rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
          >
            All Task
          </Link>
          <Link
            to='/about'
            className='rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
          >
            About Us
          </Link>

          {/* Auth buttons for non-logged in users */}
          {!isLoggedIn && (
            <>
              <Link
                to='/login'
                className='rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
              >
                Login
              </Link>
              <Link
                to='/register'
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
                className='flex h-8 w-8 overflow-hidden items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600'
              >
                <img
                  className='h-full w-full'
                  src={isLoggedIn?.photoURL}
                  alt='Profile'
                />
              </button>
              {isDropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5'>
                  {/* <Link
                    to='/profile'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                  >
                    Profile
                  </Link> */}
                  <button
                    className=' w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2'
                    onClick={() => {
                      logoutUser();
                      setIsDropdownOpen(false);
                      navigate('/login');
                    }}
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Join as Developer Button */}
          <Link
            to='https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-tapader13'
            target='_blank'
            className='flex items-center gap-2 rounded-md bg-tertiary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-tertiaryhover'
          >
            <Github size={16} />
            Join as Developer
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='xl:hidden absolute top-16 left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col gap-4'>
          {isLoggedIn && (
            <Link
              to='/dashboard'
              onClick={() => setIsMobileMenuOpen(false)}
              className='text-sm font-medium text-gray-600 transition-colors hover:text-tertiary'
            >
              Dashboard
            </Link>
          )}

          {isLoggedIn && (
            <Link
              to='/guide'
              onClick={() => setIsMobileMenuOpen(false)}
              className='text-sm font-medium text-gray-600 transition-colors hover:text-tertiary'
            >
              Guide
            </Link>
          )}

          {isLoggedIn && (
            <div className='flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5'>
              <span className='text-sm font-medium text-gray-600'>
                Available Coins:
              </span>
              <span className='font-bold text-tertiary'>{userCoins}</span>
            </div>
          )}

          <Link
            to='/'
            onClick={() => setIsMobileMenuOpen(false)}
            className='block rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
          >
            Home
          </Link>
          <Link
            to='/alltask'
            onClick={() => setIsMobileMenuOpen(false)}
            className='rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
          >
            All Task
          </Link>
          <Link
            to='/about'
            onClick={() => setIsMobileMenuOpen(false)}
            className='block rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
          >
            About Us
          </Link>

          {!isLoggedIn && (
            <>
              <Link
                to='/login'
                onClick={() => setIsMobileMenuOpen(false)}
                className='block rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
              >
                Login
              </Link>
              <Link
                to='/register'
                onClick={() => setIsMobileMenuOpen(false)}
                className='block rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
              >
                Register
              </Link>
            </>
          )}

          {/* {isLoggedIn && (
            <Link
              to='/profile'
              onClick={() => setIsMobileMenuOpen(false)}
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
            >
              Profile
            </Link>
          )} */}

          {isLoggedIn && (
            <button
              className=' w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2'
              onClick={() => {
                logoutUser();
                setIsMobileMenuOpen(false);
                navigate('/login');
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          )}

          <Link
            to='https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-tapader13'
            target='_blank'
            className='flex items-center gap-2 rounded-md bg-tertiary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-tertiaryhover'
          >
            <Github size={16} />
            Join as Developer
          </Link>
        </div>
      )}
    </header>
    // <header className='sticky top-0 z-50 w-full border-b bg-white'>
    //   <div className='mx-auto flex h-16 w-10/12 items-center justify-between px-4 sm:px-6 lg:px-8'>
    //     {/* Logo */}
    //     <Link href='/' className='flex items-center'>
    //       <span className='text-2xl font-bold text-tertiary'>PayTasker</span>
    //     </Link>

    //     <div className='flex items-center gap-4'>
    //       {/* Navigation for logged in users */}
    //       {isLoggedIn && (
    //         <Link
    //           to='/dashboard'
    //           className='text-sm font-medium text-gray-600 transition-colors hover:text-tertiary'
    //         >
    //           Dashboard
    //         </Link>
    //       )}

    //       {/* Available Coins for logged in users */}
    //       {isLoggedIn && (
    //         <div className='flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5'>
    //           <span className='text-sm font-medium text-gray-600'>
    //             Available Coins:
    //           </span>
    //           <span className='font-bold text-tertiary'>{userCoins}</span>
    //         </div>
    //       )}

    //       {/* Auth buttons for non-logged in users */}
    //       {!isLoggedIn && (
    //         <>
    //           <Link
    //             to='/login'
    //             className='rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
    //           >
    //             Login
    //           </Link>
    //           <Link
    //             to='/register'
    //             className='rounded-md px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100'
    //           >
    //             Register
    //           </Link>
    //         </>
    //       )}

    //       {/* User Profile Dropdown */}
    //       {isLoggedIn && (
    //         <div className='relative'>
    //           <button
    //             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    //             className='flex h-8 w-8 overflow-hidden items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600'
    //           >
    //             <img
    //               className='h-full w-full'
    //               src={isLoggedIn?.photoURL}
    //               alt=''
    //             />
    //           </button>
    //           {isDropdownOpen && (
    //             <div className='absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5'>
    //               <Link
    //                 href='/profile'
    //                 className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
    //               >
    //                 Profile
    //               </Link>
    //               <button
    //                 className='block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100'
    //                 onClick={() => {
    //                   logoutUser();
    //                   setIsDropdownOpen(false);
    //                   navigate('/login');
    //                 }}
    //               >
    //                 <LogOut />
    //                 Logout
    //               </button>
    //             </div>
    //           )}
    //         </div>
    //       )}

    //       {/* Join as Developer Button */}
    //       <Link
    //         href='https://github.com/tapader13'
    //         target='_blank'
    //         className='flex items-center gap-2 rounded-md bg-tertiary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-tertiaryhover'
    //       >
    //         <Github />
    //         Join as Developer
    //       </Link>
    //     </div>
    //   </div>
    // </header>
  );
}
