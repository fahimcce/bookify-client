
import ServiceAdvertisement from "./AdvertismentSection"
import Faq from "./Faq"
import FeaturedRooms from "./FeaturedRooms"
import HeroSection from "./HeroSection"
import TestimonialSlider from "./Testimonial"
import WhyChooseUs from "./WhyChooseUs"

const Home = () => {
    return (
        <>
            <HeroSection />
            <ServiceAdvertisement />
            <FeaturedRooms />
            <TestimonialSlider />
            <WhyChooseUs />
            <Faq />
        </>
    )
}

export default Home