import Hero from '../components/Hero';
import CareSakhiKits from '../components/CareSakhiKits';
import ProductShowcase from '../components/ProductShowcase';
import Education from '../components/Education';
import Testimonials from '../components/Testimonials';
import TrustedBy from '../components/TrustedBy';

const Home = () => {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <ProductShowcase />
      <Education />
      <CareSakhiKits />
      <Testimonials />
    </div>
  );
};

export default Home;