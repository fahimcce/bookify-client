import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Section from "../../components/common/Section";

const testimonials = [
  {
    name: "Abu Bakar Galib",
    title: "Founder & CEO, Stellar Ventures",
    image:
      "https://i.ibb.co.com/pjbfy4j/Whats-App-Image-2024-10-02-at-10-26-19-PM-1.jpg",
    feedback:
      "Our business has greatly improved with the ease of Bookify's platform. Booking rooms has become effortless, enabling us to focus on growing our company.",
  },
  {
    name: "Saydol Islam",
    title: "Operations Manager, Apex Dynamics",
    image:
      "https://i.ibb.co.com/wJfN91Z/Whats-App-Image-2024-10-02-at-10-26-19-PM.jpg",
    feedback:
      "Bookify has simplified our entire meeting process. The ability to check room availability instantly has led to smoother coordination and improved operational efficiency.",
  },
  {
    name: "Ershad Eslahi",
    title: "Chief Technology Officer, Infinity Innovations",
    image:
      "https://i.ibb.co.com/7RvdLPP/Whats-App-Image-2024-10-02-at-10-26-18-PM.jpg",
    feedback:
      "Managing office spaces with Bookify is a breeze. Its data-driven insights have helped us make better decisions about space utilization and resource management.",
  },
  {
    name: "Fahim Uddin",
    title: "HR Manager, Synergy Solutions",
    image:
      "https://i.ibb.co.com/jHDHRK3/Whats-App-Image-2024-10-02-at-10-26-18-PM-1.jpg",
    feedback:
      "Bookify has been essential in organizing our recruitment drives and training programs. The notifications and seamless user experience help us stay organized and efficient.",
  },
  {
    name: "Forhadul Islam Fahim",
    title: "Chief Operating Officer, Quantum Industries",
    image: "https://i.ibb.co.com/gvspQ9D/c-1.jpg",
    feedback:
      "Bookify has been a fantastic solution for managing our office spaces across different locations. Its customizable features and ease of use have significantly increased our team’s productivity.",
  },
];

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Section className="py-24">
      <h2 className="text-4xl text-left font-bold mb-16 border-b-4 border-green-500 pb-4">
        What Our Customers Are Saying
      </h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-5 py-12">
            <div className=" p-10 rounded-xl shadow-lg text-center transition-all transform hover:scale-105">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto mb-8 border-4"
              />
              <h3 className="text-2xl font-semibold mb-3">
                {testimonial.name}
              </h3>
              <p className="text-lg mb-4">{testimonial.title}</p>
              <p className="text-gray-700 leading-relaxed line-clamp-5">
                {testimonial.feedback}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </Section>
  );
};

export default TestimonialSlider;
