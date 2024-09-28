import CustomerTestimonials from "./CustomerTestimonials/CustomerTestimonials";
import FeaturedRooms from "./featuredRooms/FeaturedRooms";
import HeroSection from "./heroSection/HeroSection";
import HowItWorks from "./HowItWorks/HowItWorks";
import ServiceSection from "./serviceSection/ServiceSection";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServiceSection></ServiceSection>
      <FeaturedRooms />
      <WhyChooseUs />
      <HowItWorks />
      <CustomerTestimonials />
    </div>
  );
};

export default Home;
