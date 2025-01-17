import SectionWrapper from '../wrapper/SectionWrapper';

const MakingMoney = () => {
  return (
    <div className='bg-gray-100  py-16'>
      <SectionWrapper>
        <h2 className='mb-12 text-center text-3xl font-extrabold text-gray-900 md:text-4xl'>
          Making money online is easy with PayTasker surveys
        </h2>
        <div className='flex gap-12'>
          <div className='w-1/2'>
            <img
              className='h-[73vh] w-full'
              src='/public/Survimo-is-a-great-way-to-make-money-online-2.jpg'
              alt=''
            />
          </div>
          <div className='w-1/2 text-[18px] leading-10 flex flex-col justify-between'>
            <p>
              Earning money online from PayTasker Micro Task is easy and fun. We
              offer a free lifetime membership to all. Anyone can join and earn
              money on the Internet for free.
            </p>
            <p>
              You don’t need to have any experience in order to take our online
              paid Tasks. We just care about your very honest opinion.
            </p>
            <p>
              To make things even easier, we will look for task that match your
              profile perfectly. So, instead of trying to find tasks on your
              own, sit back and relax while we do the search for you. As soon as
              we find a perfect paid task, we will send you a direct email
              invitation.
            </p>
            <p>
              {' '}
              Share your answers with us and instantly earn money online. It’s
              as simple as that.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default MakingMoney;
