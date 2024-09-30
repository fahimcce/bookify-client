import { Button } from "antd";
import Section from "../../components/common/Section";
import RoomCard from "../../components/RoomCard";
import { TRoomData } from "../../types/roomtype";
import { Link } from "react-router-dom";
import Loading from "../../components/common/Loading";
import { useGetAllRoomsQuery } from "../../redux/api/roomManagement/room.api";

const FeaturedRooms = () => {
  const { data: rooms, isLoading } = useGetAllRoomsQuery({
    limit: 6,
    sort: "-createdAt",
  });
  const allRoom = rooms?.data?.result;

  return (
    <Section className="py-16 md:py-32 px-6 bg-gradient-to-br from-green-100 via-white to-green-50">
      {" "}
      {/* Updated background */}
      <h2 className="text-3xl md:text-5xl font-bold mb-10 text-gray-800 text-center border-b-4 border-green-500 pb-4">
        {" "}
        {/* Changed text style */}
        Discover Our Premium Rooms
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12">
            {" "}
            {/* Adjusted grid gap */}
            {allRoom?.map((item: TRoomData, idx: number) => (
              <div key={idx}>
                <RoomCard
                  _id={item._id!}
                  name={item.name}
                  amenities={item.amenities}
                  capacity={item.capacity}
                  floorNo={item.floorNo}
                  pricePerSlot={item.pricePerSlot}
                  roomImg={item.roomImg!}
                  roomNo={item.roomNo}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/meeting-rooms">
              <Button
                className="bg-green-600 text-white hover:bg-green-500 transition-all duration-300 py-4 px-8 md:px-12 lg:px-16 text-lg font-semibold rounded-full" // Changed button style
              >
                Explore All Rooms
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Section>
  );
};

export default FeaturedRooms;
