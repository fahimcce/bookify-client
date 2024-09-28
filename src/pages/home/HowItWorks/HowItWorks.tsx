import { Card, Col, Row } from "antd";
import {
  CalendarOutlined,
  CheckOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./HowItWorks.css"; // Import the CSS for custom styles

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2 className="section-heading">How It Works</h2>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card className="step-card">
            <CalendarOutlined className="step-icon" />
            <h3>Select a Room</h3>
            <p>Choose from our wide range of meeting rooms.</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="step-card">
            <CheckOutlined className="step-icon" />
            <h3>Choose Date & Time</h3>
            <p>Pick the best time that suits your schedule.</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="step-card">
            <CheckCircleOutlined className="step-icon" />
            <h3>Confirm Booking</h3>
            <p>Finalize your booking in just a few clicks!</p>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default HowItWorks;
