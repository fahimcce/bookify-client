import { Layout, Typography, Row, Col } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./Footers.css";

const { Text, Title } = Typography;

const Footers = () => {
  return (
    <Layout.Footer className="footer">
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} md={8}>
          <Title level={4}>Contact Us</Title>
          <Text>Email: support@example.com</Text>
          <br />
          <Text>Phone: +123 456 7890</Text>
          <br />
          <Text>Address: 123 Main St, City, Country</Text>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Title level={4}>Follow Us</Title>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinOutlined />
            </a>
          </div>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Title level={4}>Additional Links</Title>
          <Text>
            <a href="/privacy-policy">Privacy Policy</a>
          </Text>
          <br />
          <Text>
            <a href="/terms-of-service">Terms of Service</a>
          </Text>
        </Col>
      </Row>

      <div className="footer-bottom">
        <Text>
          &copy; {new Date().getFullYear()} Bookify. All rights reserved.
        </Text>
      </div>
    </Layout.Footer>
  );
};

export default Footers;
