import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';
import SectionWrapper from '../wrapper/SectionWrapper';
const testimonials = [
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Specialist',
    quote:
      "The quality of work I've received has been consistently high. I highly recommend this platform to anyone looking for skilled professionals.",
    avatar: '/public/my-profit-tutor-ZfRWq1bRisE-unsplash.jpg',
    rating: 4,
  },
  {
    name: 'John Doe',
    role: 'Web Developer',
    quote:
      'The platform is intuitive, and the range of professionals available has been a lifesaver for our web development projects. Great experience overall!',
    avatar: '/public/images.jpeg',
    rating: 5,
  },
  {
    name: 'Linda Smith',
    role: 'Content Writer',
    quote:
      'I’ve been able to collaborate with incredible clients, and the work environment is supportive and professional. Highly recommend for any writer.',
    avatar: '/public/images (4).jpeg',
    rating: 4,
  },
  {
    name: 'David Lee',
    role: 'SEO Expert',
    quote:
      "This platform helped me connect with clients who truly value SEO work. My business has expanded significantly thanks to the connections I've made.",
    avatar: '/public/images (3).jpeg',
    rating: 5,
  },
  {
    name: 'Olivia Williams',
    role: 'UX/UI Designer',
    quote:
      "I found several long-term clients through this platform. The collaboration has been seamless, and I'm consistently challenged by exciting new projects.",
    avatar: '/public/images (2).jpeg',
    rating: 5,
  },
  {
    name: 'James Brown',
    role: 'Virtual Assistant',
    quote:
      'The flexibility this platform offers has allowed me to balance multiple clients while maintaining high-quality work. I highly recommend it to other assistants.',
    avatar: '/public/images (1).jpeg',
    rating: 4,
  },
];

const Testimonial = () => {
  return (
    <SectionWrapper>
      <div className=' py-16'>
        <h2 className='mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl'>
          What Our Users Say
        </h2>
        <div>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            //   centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className='mySwiper'
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className='rounded-lg bg-white p-8 shadow-lg'>
                  <div className='mb-4 flex items-center'>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className='mr-4 h-16 w-16 rounded-full object-cover'
                    />
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        {testimonial.name}
                      </h3>
                      {/* <p className='text-sm text-gray-600'>{testimonial.role}</p> */}
                    </div>
                  </div>
                  <p className='mb-4 text-gray-700'>
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill='currentColor'
                      />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Testimonial;
