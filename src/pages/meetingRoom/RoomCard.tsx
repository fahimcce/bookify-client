import { Card, Button } from "antd";

interface RoomCardProps {
  image: string;
  name: string;
  capacity: number;
  pricePerSlot: number;
  onSeeDetails: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  image,
  name,
  capacity,
  pricePerSlot,
  onSeeDetails,
}) => {
  return (
    <Card
      hoverable
      cover={
        <img
          alt={name}
          src={image}
          style={{ height: 200, objectFit: "cover" }}
        />
      }
      style={{ width: 300, margin: 16 }}
    >
      <Card.Meta
        title={name}
        description={`Capacity: ${capacity}, Price: ৳${pricePerSlot}`}
      />
      <Button type="primary" onClick={onSeeDetails} style={{ marginTop: 16 }}>
        See Details
      </Button>
    </Card>
  );
};

export default RoomCard;
