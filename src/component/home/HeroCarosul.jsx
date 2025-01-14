import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
const HeroCarosul = () => {
  return (
    <div>
      {' '}
      <Carousel
        showArrows={true}
        // onChange={onChange}
        // onClickItem={onClickItem}
        // onClickThumb={onClickThumb}
      >
        <div>
          <img src='/public/agnieszka-boeske-ky0ljKGar78-unsplash.jpg' />
          <p className='legend'>Legend 1</p>
        </div>
        <div>
          <img src='/public/hanvin-cheong-dUGwH0jO-Ck-unsplash.jpg' />
          <p className='legend'>Legend 2</p>
        </div>
        <div>
          <img src='/public/my-profit-tutor-ZfRWq1bRisE-unsplash.jpg' />
          <p className='legend'>Legend 3</p>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroCarosul;
