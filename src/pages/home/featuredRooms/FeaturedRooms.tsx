import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import "./FeaturedRooms.css"; // Import the CSS for custom styles
import f1 from "../../../assets/images/executive.jpg";
import f2 from "../../../assets/images/personal.jpg";
import f3 from "../../../assets/images/conference.jpg";
import f4 from "../../../assets/images/team.jpg";
import f5 from "../../../assets/images/training.jpg";
import f6 from "../../../assets/images/creative.jpg";

const rooms = [
  {
    name: "Executive Boardroom",
    capacity: "10 People",
    price: "$50 per hour",
    image: `${f1}`, // Replace with actual image URL
  },
  {
    name: "Private Meeting Room",
    capacity: "6 People",
    price: "$40 per hour",
    image: `${f2}`,
  },
  {
    name: "Conference Room",
    capacity: "15 People",
    price: "$70 per hour",
    image: `${f3}`,
  },
  {
    name: "Team Collaboration Room",
    capacity: "8 People",
    price: "$45 per hour",
    image: `${f4}`,
  },
  {
    name: "Training Room",
    capacity: "20 People",
    price: "$90 per hour",
    image: `${f5}`,
  },
  {
    name: "Creative Workshop Space",
    capacity: "12 People",
    price: "$60 per hour",
    image: `${f6}`,
  },
];

const FeaturedRooms = () => {
  return (
    <div className="featured-rooms-section">
      <h2 className="section-heading">Featured Rooms</h2>
      <p className="section-subheading">
        Discover our top meeting rooms designed for your needs.
      </p>
      <Row gutter={[16, 16]} justify="center">
        {rooms.map((room, index) => (
          <Col xs={24} sm={12} md={8} lg={8} key={index}>
            <Card
              hoverable
              className="room-card"
              cover={<img alt={room.name} src={room.image} />}
            >
              <h3>{room.name}</h3>
              <p>Capacity: {room.capacity}</p>
              <p>Price: {room.price}</p>
              <Button type="primary" className="details-button">
                See Details
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="see-more-container">
        <Button type="primary" size="large" className="see-more-button">
          <Link to="/meeting-room">See More Rooms</Link>
        </Button>
      </div>
    </div>
  );
};

export default FeaturedRooms;
