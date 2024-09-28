import { Carousel } from "antd";
import "./CustomerTestimonials.css";
import c1 from "../../../assets/images/c-1.jpg";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import { CarouselRef } from "antd/es/carousel";

const testimonials = [
  {
    image: c1,
    name: "John Doe",
    role: "Project Manager",
    testimonial: "This service is fantastic! Highly recommend it.",
  },
  {
    image: c1,
    name: "Jane Smith",
    role: "Team Leader",
    testimonial: "The booking process is seamless and easy.",
  },
  {
    image: c1,
    name: "Michael Johnson",
    role: "Business Analyst",
    testimonial: "A reliable service that I use for all my meetings.",
  },
  {
    image: c1,
    name: "Emily Davis",
    role: "Marketing Director",
    testimonial: "Great experience! Very user-friendly.",
  },
  {
    image: c1,
    name: "Chris Brown",
    role: "Sales Executive",
    testimonial: "The best platform for booking meeting rooms!",
  },
  {
    image: c1,
    name: "Sarah Wilson",
    role: "Product Manager",
    testimonial: "Quick and easy booking process. Love it!",
  },
];

const CustomerTestimonials = () => {
  const carouselRef = useRef<CarouselRef | null>(null);

  return (
    <section className="testimonials">
      <h2 className="section-heading">Customer Testimonials</h2>
      <div className="carousel-container">
        <LeftOutlined
          className="arrow left-arrow"
          onClick={() => carouselRef.current?.prev()}
        />
        <Carousel ref={carouselRef} dots={false} autoplay slidesToShow={3}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="card-content">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="card-image"
                />
                <h3>{testimonial.name}</h3>
                <p className="role">{testimonial.role}</p>
                <p className="testimonial">{testimonial.testimonial}</p>
              </div>
            </div>
          ))}
        </Carousel>
        <RightOutlined
          className="arrow right-arrow"
          onClick={() => carouselRef.current?.next()}
        />
      </div>
    </section>
  );
};

export default CustomerTestimonials;
