import { Link } from 'react-router';
import { Facebook, Linkedin, Github } from 'lucide-react';
export default function Footer() {
  return (
    <footer className='bg-gray-100'>
      <div className='mx-auto w-10/12 px-4 py-12 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center justify-between md:flex-row'>
          {/* Logo */}
          <div className='mb-6 md:mb-0'>
            <Link href='/' className='flex items-center'>
              <span className='text-2xl font-bold text-tertiary'>
                PayTasker
              </span>
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className='flex space-x-6'>
            {/* LinkedIn */}
            <a
              href='https://www.linkedin.com/your-profile'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-400 hover:text-tertiary'
            >
              <span className='sr-only'>LinkedIn</span>
              <Linkedin className='h-6 w-6' />
            </a>

            {/* Facebook */}
            <a
              href='https://www.facebook.com/your-profile'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-400 hover:text-tertiary'
            >
              <span className='sr-only'>Facebook</span>
              <Facebook className='h-6 w-6' />
            </a>

            {/* GitHub */}
            <a
              href='https://github.com/your-profile'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-400 hover:text-tertiary'
            >
              <span className='sr-only'>GitHub</span>
              <Github className='h-6 w-6' />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-8 border-t border-gray-200 pt-8'>
          <p className='text-center text-sm text-gray-400'>
            &copy; {new Date().getFullYear()} TaskApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
