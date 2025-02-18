import BestWorker from './BestWorker';
import CalculateEarning from './CalculateEarning';
import FeaturesCompare from './FeaturesCompare';
import HeroCarosul from './HeroCarosul';
import MakingMoney from './MakingMoney';
import Testimonial from './Testimonial';
import TopPick from './TopPick';
import Works from './Works';

const Home = () => {
  return (
    <div>
      <HeroCarosul />
      <BestWorker />
      <TopPick />
      <Works />
      <FeaturesCompare />
      <CalculateEarning />
      <MakingMoney />
      <Testimonial />
    </div>
  );
};

export default Home;
