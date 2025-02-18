import { LayoutDashboard, ShieldCheck, Lock, UserCheck } from 'lucide-react';

export default function Privacy() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl'>
            Privacy Policy
          </h1>
          <p className='mt-5 max-w-xl mx-auto text-xl text-gray-500'>
            Your privacy is important to us. Learn how we handle and protect
            your data.
          </p>
        </div>

        <div className='mt-16'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Information We Collect
          </h2>
          <p className='mt-4 text-lg text-gray-500'>
            We collect personal information such as your name, email, and
            payment details when you use our platform. This helps us provide a
            seamless experience and improve our services.
          </p>
        </div>

        <div className='mt-16'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            How We Use Your Information
          </h2>
          <ul className='mt-6 space-y-4'>
            <li className='flex items-start'>
              <ShieldCheck className='h-6 w-6 text-tertiary mr-3' />
              <span className='text-gray-700'>
                To provide and enhance our services.
              </span>
            </li>
            <li className='flex items-start'>
              <Lock className='h-6 w-6 text-tertiary mr-3' />
              <span className='text-gray-700'>
                To secure your personal data with encryption and authentication
                measures.
              </span>
            </li>
            <li className='flex items-start'>
              <UserCheck className='h-6 w-6 text-tertiary mr-3' />
              <span className='text-gray-700'>
                To comply with legal obligations and prevent fraud.
              </span>
            </li>
          </ul>
        </div>

        <div className='mt-16'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Data Protection
          </h2>
          <p className='mt-4 text-lg text-gray-500'>
            We implement strong security measures to safeguard your personal
            data. Your information is not shared with third parties without your
            consent, except as required by law.
          </p>
        </div>

        <div className='mt-16 text-center'>
          <h2 className='text-3xl font-extrabold text-gray-900'>Your Rights</h2>
          <p className='mt-4 text-lg text-gray-500'>
            You have the right to access, modify, or delete your personal data.
            Contact us if you wish to exercise your rights.
          </p>
        </div>
      </main>
    </div>
  );
}
