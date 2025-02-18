import { Check, X } from 'lucide-react';
import SectionWrapper from '../wrapper/SectionWrapper';

export function FeaturesCompare() {
  const roles = [
    {
      title: 'Worker',
      description: 'Complete tasks and earn coins',
      features: [
        { name: 'Browse Available Tasks', included: true },
        { name: 'Submit Task Work', included: true },
        { name: 'Withdraw Earnings', included: true },
        { name: 'Track Earnings', included: true },
        { name: 'Create Tasks', included: false },
        { name: 'Approve Submissions', included: false },
        { name: 'Manage Platform', included: false },
      ],
    },
    {
      title: 'Buyer',
      description: 'Create and manage tasks',
      features: [
        { name: 'Browse Available Tasks', included: true },
        { name: 'Submit Task Work', included: false },
        { name: 'Withdraw Earnings', included: false },
        { name: 'Track Earnings', included: true },
        { name: 'Create Tasks', included: true },
        { name: 'Approve Submissions', included: true },
        { name: 'Manage Platform', included: false },
      ],
    },
    {
      title: 'Admin',
      description: 'Full platform control',
      features: [
        { name: 'Browse Available Tasks', included: true },
        { name: 'Submit Task Work', included: false },
        { name: 'Withdraw Earnings', included: false },
        { name: 'Track Earnings', included: true },
        { name: 'Create Tasks', included: false },
        { name: 'Approve Submissions', included: true },
        { name: 'Manage Platform', included: true },
      ],
    },
  ];

  return (
    <section className='w-full py-16 bg-gray-100'>
      <SectionWrapper>
        <div className='w-full'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                Choose Your Role
              </h2>
              <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Compare features across different user roles and find the
                perfect fit for you
              </p>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
            {roles.map((role) => (
              <div
                key={role.title}
                className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200'
              >
                <div className='p-6 border-b border-gray-200'>
                  <h3 className='text-xl font-bold text-gray-900'>
                    {role.title}
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    {role.description}
                  </p>
                </div>
                <div className='p-6'>
                  <ul className='space-y-4'>
                    {role.features.map((feature) => (
                      <li
                        key={feature.name}
                        className='flex items-center space-x-2'
                      >
                        {feature.included ? (
                          <Check className='w-5 h-5 text-green-500 flex-shrink-0' />
                        ) : (
                          <X className='w-5 h-5 text-red-500 flex-shrink-0' />
                        )}
                        <span className='text-sm text-gray-600'>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}

export default FeaturesCompare;
