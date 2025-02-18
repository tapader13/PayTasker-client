import { ArrowRight } from 'lucide-react';
import SectionWrapper from '../wrapper/SectionWrapper';

const topPicks = [
  {
    id: 1,
    title: 'Surveys',
    description: 'Share your opinion to earn',
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20224942-Um8sDyMucdJTpnUCh1eSBCwLe23KKA.png',
    coins: '0.51',
    amount: '$0.52',
    bgColor: 'bg-purple-500',
  },
  {
    id: 2,
    title: 'Honeygain',
    description: 'Share your spare internet',
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20224942-Um8sDyMucdJTpnUCh1eSBCwLe23KKA.png',
    coins: '0.95',
    amount: '$0.96',
    bgColor: 'bg-blue-400',
  },
  {
    id: 3,
    title: 'Videos',
    description: 'Watch videos & earn!',
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20224942-Um8sDyMucdJTpnUCh1eSBCwLe23KKA.png',
    coins: '0.01978',
    amount: '$0.02',
    bgColor: 'bg-indigo-600',
  },
  {
    id: 4,
    title: 'World of Tanks',
    description: 'Download World of Tanks',
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20224942-Um8sDyMucdJTpnUCh1eSBCwLe23KKA.png',
    coins: '0.29',
    amount: '$0.29',
    bgColor: 'bg-gray-800',
  },
  {
    id: 5,
    title: 'Youtube',
    description: 'Watch Youtube videos',
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20224942-Um8sDyMucdJTpnUCh1eSBCwLe23KKA.png',
    coins: '0.07',
    amount: '$0.07',
    bgColor: 'bg-white',
  },
  {
    id: 6,
    title: 'Follow on X',
    description: 'Follow projects on X (Twitter)',
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20224942-Um8sDyMucdJTpnUCh1eSBCwLe23KKA.png',
    coins: '0.04',
    amount: '$0.04',
    bgColor: 'bg-cyan-400',
  },
];

export function TopPick() {
  return (
    <section className='w-full py-16 bg-gray-100'>
      <SectionWrapper>
        <div className='container mx-auto px-4 md:px-6'>
          <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-white'>Top Picks</h2>
            <button className='text-blue-400 hover:text-blue-300 flex items-center focus:outline-none'>
              View all
              <ArrowRight className='ml-2 h-4 w-4' />
            </button>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto pb-4'>
            {topPicks.map((pick) => (
              <div
                key={pick.id}
                className='bg-[#1a1d24] rounded-lg overflow-hidden hover:bg-[#22262f] transition-colors duration-200'
              >
                <div className='p-4'>
                  <div className='aspect-square rounded-lg overflow-hidden mb-4'>
                    <div
                      className={`w-full h-full flex items-center justify-center ${pick.bgColor}`}
                    >
                      <img
                        src={pick.icon || '/placeholder.svg'}
                        alt={pick.title}
                        className='w-16 h-16 object-contain'
                      />
                    </div>
                  </div>
                  <h3 className='text-lg font-semibold text-white mb-1'>
                    {pick.title}
                  </h3>
                  <p className='text-sm text-gray-400 mb-3 line-clamp-2'>
                    {pick.description}
                  </p>
                  <div className='flex items-center space-x-2'>
                    <span className='text-blue-400'>⟠ {pick.coins}</span>
                    <span className='text-gray-500'>~{pick.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}

export default TopPick;
