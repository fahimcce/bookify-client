import { Card, Col, Row } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import "./ServiceSection.css"; // Import custom styles

const services = [
  {
    title: "Real-Time Availability",
    description: "Get live updates on meeting room availability.",
    icon: <ClockCircleOutlined className="service-icon" />,
  },
  {
    title: "Instant Booking Confirmation",
    description: "Book and receive instant confirmations.",
    icon: <CheckCircleOutlined className="service-icon" />,
  },
  {
    title: "Flexible Scheduling",
    description: "Book, reschedule, or cancel with flexibility.",
    icon: <CalendarOutlined className="service-icon" />,
  },
  {
    title: "24/7 Support",
    description: "We’re here for you around the clock.",
    icon: <CustomerServiceOutlined className="service-icon" />,
  },
];

const ServiceSection = () => {
  return (
    <div className="service-section">
      <h2 className="service-heading">Our Highlighted Services</h2>
      <p className="service-subheading">
        Explore our range of services designed to make your booking experience
        seamless and efficient.
      </p>
      <Row gutter={[16, 16]} justify="center">
        {services.map((service, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card hoverable className="service-card" bordered={false}>
              {service.icon}
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ServiceSection;
