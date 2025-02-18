import {
  ArrowRight,
  CheckCircle,
  Users,
  Coins,
  CreditCard,
  FileCheck,
  DollarSign,
  LayoutDashboard,
  Smartphone,
} from 'lucide-react';

const features = [
  { icon: Users, text: 'Three distinct user roles: Worker, Buyer, and Admin' },
  { icon: Coins, text: 'Coin-based system for task creation and earnings' },
  {
    icon: CreditCard,
    text: 'Secure Stripe payment integration for coin purchases',
  },
  { icon: FileCheck, text: 'Efficient task submission and review process' },
  {
    icon: DollarSign,
    text: 'Withdrawal system for workers (min. 200 coins = $10)',
  },
  {
    icon: LayoutDashboard,
    text: 'Comprehensive admin dashboard for platform management',
  },
  { icon: Smartphone, text: 'Fully responsive design for all devices' },
];

const roles = [
  {
    title: 'Worker',
    description: 'Complete tasks and earn coins',
    capabilities: [
      'Browse available tasks',
      'Submit work for review',
      'Track earnings in real-time',
      'Withdraw earnings as cash',
    ],
  },
  {
    title: 'Buyer',
    description: 'Create tasks and manage submissions',
    capabilities: [
      'Create and post new tasks',
      'Set task requirements and rewards',
      'Review and approve submitted work',
      'Manage coin balance for task creation',
    ],
  },
  {
    title: 'Admin',
    description: 'Oversee platform operations',
    capabilities: [
      'Manage user accounts and permissions',
      'Monitor task creation and completion',
      'Handle withdrawal requests',
      'Generate reports and analytics',
    ],
  },
];

export default function About() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
        <div className='text-center'>
          <h1 className='text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl'>
            About PayTasker
          </h1>
          <p className='mt-5 max-w-xl mx-auto text-xl text-gray-500'>
            Empowering users to earn and achieve through micro-tasks
          </p>
        </div>

        <div className='mt-16'>
          <h2 className='text-3xl font-extrabold text-gray-900'>Our Mission</h2>
          <p className='mt-4 text-lg text-gray-500'>
            PayTasker is a revolutionary micro-task and earning platform that
            connects workers with buyers, enabling efficient task completion and
            fair compensation. Our goal is to create a thriving ecosystem where
            skills are valued, tasks are accomplished, and everyone has the
            opportunity to earn.
          </p>
        </div>

        <div className='mt-16'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Core Features
          </h2>
          <div className='mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, index) => (
              <div key={index} className='flex items-center space-x-3'>
                <feature.icon className='h-6 w-6 text-tertiary' />
                <span className='text-gray-700'>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-16'>
          <h2 className='text-3xl font-extrabold text-gray-900'>User Roles</h2>
          <div className='mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            {roles.map((role, index) => (
              <div
                key={index}
                className='bg-white overflow-hidden shadow rounded-lg'
              >
                <div className='px-4 py-5 sm:p-6'>
                  <h3 className='text-lg font-medium text-gray-900'>
                    {role.title}
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    {role.description}
                  </p>
                  <ul className='mt-4 space-y-2'>
                    {role.capabilities.map((capability, capIndex) => (
                      <li key={capIndex} className='flex items-start'>
                        <CheckCircle className='h-5 w-5 text-tertiary  mr-2' />
                        <span className='text-sm text-gray-700'>
                          {capability}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-16 text-center'>
          <h2 className='text-3xl font-extrabold text-gray-900'>
            Join PayTasker Today
          </h2>
          <p className='mt-4 text-lg text-gray-500'>
            Whether you&apos;re looking to earn, need tasks completed, or want
            to manage a thriving platform, PayTasker has a place for you.
          </p>
          <div className='mt-8'>
            <a
              href='/register'
              className='inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-tertiary hover:bg-tertiaryhover'
            >
              Get Started
              <ArrowRight className='ml-2 -mr-1 h-5 w-5' />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
