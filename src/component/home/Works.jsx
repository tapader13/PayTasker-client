import { CheckCircle2, CreditCard, UserCircle2 } from 'lucide-react';
import SectionWrapper from '../wrapper/SectionWrapper';
import { motion } from 'motion/react';

const Works = () => {
  return (
    <SectionWrapper>
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: false, amount: 0.3 }}
        className='py-16'
      >
        <div className=''>
          <h2 className='mb-12 text-center text-3xl font-extrabold text-gray-900 md:text-4xl'>
            How PayTasker Works
          </h2>
          <div className='grid gap-8 md:grid-cols-3'>
            {/* Step 1 */}
            <div className='relative flex flex-col items-center p-6 text-center'>
              <div className='mb-4 rounded-full bg-tertiary p-4 text-white'>
                <UserCircle2 className='h-8 w-8' />
              </div>
              <h3 className='mb-2 text-xl font-semibold'>
                Create Your Profile
              </h3>
              <p className='text-gray-600'>
                Sign up and create your professional profile. Showcase your
                skills and experience to stand out.
              </p>
            </div>

            {/* Step 2 */}
            <div className='relative flex flex-col items-center p-6 text-center'>
              <div className='mb-4 rounded-full bg-tertiary p-4 text-white'>
                <CheckCircle2 className='h-8 w-8' />
              </div>
              <h3 className='mb-2 text-xl font-semibold'>Complete Tasks</h3>
              <p className='text-gray-600'>
                Browse available tasks that match your skills. Accept tasks and
                deliver quality work.
              </p>
            </div>

            {/* Step 3 */}
            <div className='relative flex flex-col items-center p-6 text-center'>
              <div className='mb-4 rounded-full bg-tertiary p-4 text-white'>
                <CreditCard className='h-8 w-8' />
              </div>
              <h3 className='mb-2 text-xl font-semibold'>Get Paid</h3>
              <p className='text-gray-600'>
                Receive secure payments for completed tasks. Transfer earnings
                to your bank account anytime.
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      ;
    </SectionWrapper>
  );
};

export default Works;
