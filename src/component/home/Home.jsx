import CalculateEarning from './CalculateEarning';
import HeroCarosul from './HeroCarosul';
import MakingMoney from './MakingMoney';
import Testimonial from './Testimonial';
import Works from './Works';

const Home = () => {
  return (
    <div>
      <HeroCarosul />
      <Works />
      <CalculateEarning />
      <MakingMoney />
      <Testimonial />
    </div>
  );
};

export default Home;
