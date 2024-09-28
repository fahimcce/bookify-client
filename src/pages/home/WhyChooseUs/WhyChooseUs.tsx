import { Card, Col, Row } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./WhyChooseUs.css"; // Import the CSS for custom styles

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <h2 className="section-heading">Why Choose Us?</h2>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Card className="feature-card">
            <CheckCircleOutlined className="feature-icon" />
            <h3>Seamless Booking Experience</h3>
            <p>Enjoy an easy and intuitive booking process.</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="feature-card">
            <CheckCircleOutlined className="feature-icon" />
            <h3>Secure Transactions</h3>
            <p>Your data is safe with us, guaranteed.</p>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default WhyChooseUs;
