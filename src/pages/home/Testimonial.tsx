import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Section from "../../components/common/Section";

const testimonials = [
  {
    name: "Alice Walker",
    title: "CEO, Orion Technologies",
    image: "https://i.postimg.cc/vHrWqFvH/jhon-dow.jpg",
    feedback:
      "Our team has greatly benefited from Roomify's intuitive platform. Scheduling rooms is no longer a headache, and the seamless process has allowed us to focus more on productive meetings.",
  },
  {
    name: "David Wright",
    title: "Operations Head, Zenith Corp",
    image: "https://i.postimg.cc/dVJGgHWR/man.jpg",
    feedback:
      "Roomify has made organizing meetings incredibly simple. The ability to monitor room availability in real time has streamlined our internal operations, resulting in better efficiency.",
  },
  {
    name: "Sophia Turner",
    title: "CTO, Horizon Innovations",
    image: "https://i.ibb.co/745fRGT/emily.png",
    feedback:
      "With Roomify, managing our office spaces has never been easier. The platform’s analytics are especially helpful for understanding room usage, ensuring optimal resource allocation.",
  },
  {
    name: "Chloe Adams",
    title: "HR Director, Delta Solutions",
    image: "https://i.postimg.cc/x1gLQv7w/girl.jpg",
    feedback:
      "Roomify helps us organize interviews and employee training sessions with minimal effort. The reminders and smooth interface make it easy to keep everything on track.",
  },
  {
    name: "Benjamin Lee",
    title: "COO, Nexus Enterprises",
    image: "https://i.postimg.cc/dVJGgHWR/man.jpg",
    feedback:
      "We've found Roomify to be an invaluable tool for managing multiple office spaces. Its flexible, user-friendly features have boosted our team’s productivity across the board.",
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
    <Section className="py-24 bg-gradient-to-r from-purple-50 to-indigo-100">
      <h2 className="text-4xl md:text-5xl text-center font-bold mb-16 text-purple-800">
        What Our Customers Are Saying
      </h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-5 py-12">
            <div className="bg-indigo-50 p-10 rounded-xl shadow-lg text-center transition-all transform hover:scale-105">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto mb-8 border-4 border-indigo-200"
              />
              <h3 className="text-2xl font-semibold mb-3 text-purple-900">
                {testimonial.name}
              </h3>
              <p className="text-lg text-purple-600 mb-4">
                {testimonial.title}
              </p>
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
