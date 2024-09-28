import { Button, Typography, Layout } from "antd";
import { NavLink } from "react-router-dom";
import "./HeroSection.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const HeroSection = () => {
  return (
    <Layout className="hero-section">
      <Content className="hero-content">
        <div className="hero-text">
          <Title level={1} className="hero-title">
            Book Your Ideal Meeting Room with Ease
          </Title>
          <Text className="hero-subtitle">
            Efficient, hassle-free room booking for all your meeting needs.
          </Text>
          <br></br>
          <NavLink to="/meeting-room">
            <Button type="primary" size="large" className="hero-btn">
              Book Now
            </Button>
          </NavLink>
        </div>
      </Content>
    </Layout>
  );
};

export default HeroSection;
