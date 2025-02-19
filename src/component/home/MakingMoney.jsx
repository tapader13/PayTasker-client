import SectionWrapper from '../wrapper/SectionWrapper';

const MakingMoney = () => {
  return (
    <div className='bg-gray-100 dark:bg-gray-950 py-16'>
      <SectionWrapper>
        <div className='px-4 sm:px-6 lg:px-8'>
          <h2 className='mb-12 text-center text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl'>
            Making money online is easy with PayTasker surveys
          </h2>
          <div className='flex gap-12 lg:flex-row flex-col'>
            <div className='lg:w-1/2'>
              <img
                className='h-[73vh] w-full'
                src='/Survimo-is-a-great-way-to-make-money-online-2.jpg'
                alt=''
              />
            </div>
            <div className='lg:w-1/2 text-[18px] dark:text-gray-300 leading-10 flex flex-col justify-between'>
              <p>
                Earning money online from PayTasker Micro Task is easy and fun.
                We offer a free lifetime membership to all. Anyone can join and
                earn money on the Internet for free.
              </p>
              <p>
                You don’t need to have any experience in order to take our
                online paid Tasks. We just care about your very honest opinion.
              </p>
              <p>
                To make things even easier, we will look for task that match
                your profile perfectly. So, instead of trying to find tasks on
                your own, sit back and relax while we do the search for you. As
                soon as we find a perfect paid task, we will send you a direct
                email invitation.
              </p>
              <p>
                {' '}
                Share your answers with us and instantly earn money online. It’s
                as simple as that.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default MakingMoney;
