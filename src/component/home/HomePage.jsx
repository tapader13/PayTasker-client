import { Outlet } from 'react-router';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

const HomePage = () => {
  return (
    <div className='font-inter'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomePage;
