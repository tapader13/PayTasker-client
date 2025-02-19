import { useState } from 'react';
import { motion } from 'motion/react';

export default function CalculateEarning() {
  const [tasksPerWeek, setTasksPerWeek] = useState(5);
  const [avgTaskValue, setAvgTaskValue] = useState(50);

  const weeklyEarnings = tasksPerWeek * avgTaskValue;
  const monthlyEarnings = weeklyEarnings * 4;
  const yearlyEarnings = monthlyEarnings * 12;

  return (
    <motion.section
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
      className=' py-16'
    >
      <div className='w-10/12 mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl'>
          Calculate Your Potential Earnings
        </h2>
        <div className='mx-auto max-w-3xl rounded-lg bg-white dark:bg-gray-700 p-8 '>
          <div className='mb-8 grid gap-8 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Tasks per week: {tasksPerWeek}
              </label>
              <input
                type='range'
                value={tasksPerWeek}
                onChange={(e) => setTasksPerWeek(Number(e.target.value))}
                min={1}
                max={20}
                step={1}
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-tertiary'
              />
            </div>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Average task value: ${avgTaskValue}
              </label>
              <input
                type='range'
                value={avgTaskValue}
                onChange={(e) => setAvgTaskValue(Number(e.target.value))}
                min={10}
                max={200}
                step={5}
                className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-tertiary'
              />
            </div>
          </div>

          <div className='grid gap-4 rounded-lg bg-gray-100 dark:bg-gray-600 p-6 md:grid-cols-3'>
            <div className='text-center'>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Weekly Earnings
              </p>
              <p className='text-2xl font-bold text-tertiary dark:text-white'>
                ${weeklyEarnings}
              </p>
            </div>
            <div className='text-center'>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Monthly Earnings
              </p>
              <p className='text-2xl font-bold text-tertiary dark:text-white'>
                ${monthlyEarnings}
              </p>
            </div>
            <div className='text-center'>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Yearly Earnings
              </p>
              <p className='text-2xl font-bold text-tertiary dark:text-white'>
                ${yearlyEarnings}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
