import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const objectCar = [
  {
    name: 'Find Expert Freelancers',
    description: 'Get any task done, quickly and efficiently',
    image: '/public/agnieszka-boeske-ky0ljKGar78-unsplash.jpg',
  },
  {
    name: 'Earn Money Your Way',
    description:
      'Join thousands of freelancers making money on their own terms',
    image: '/public/hanvin-cheong-dUGwH0jO-Ck-unsplash.jpg',
  },
  {
    name: 'Safe & Secure Platform',
    description:
      'Protected payments and verified professionals at your service',
    image: '/public/my-profit-tutor-ZfRWq1bRisE-unsplash.jpg',
  },
];
const HeroCarosul = () => {
  return (
    <div>
      {' '}
      <Carousel showArrows={true}>
        {objectCar.map((item, index) => (
          <div key={index} className='relative'>
            <img src={item.image} alt={item.name} />
            <div className='absolute top-0 left-0 w-full h-[90vh] bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-3xl font-bold'>
              <h1 className='mb-4 inline-block rounded-full bg-white/10 px-6 py-2 backdrop-blur-sm text-lg font-medium'>
                {item.name}
              </h1>
              <h5 className='mb-8 text-xl text-white/90 md:text-2xl'>
                {item.description}
              </h5>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarosul;
