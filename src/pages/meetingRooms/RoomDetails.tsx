import { Carousel, Tag } from "antd"; // Ant Design's Carousel component
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/Loading";
import Section from "../../components/common/Section";
import moment from "moment";
import BookingModal from "./BookingModal";
import { useGetAroomsQuery } from "../../redux/api/roomManagement/room.api";
import { useGetAllSlotsQuery } from "../../redux/api/roomManagement/slot.api";
import NoDataFound from "../../components/common/NoDataFound";

const RoomDetails = () => {
  const params = useParams();
  const { data, isLoading, isFetching } = useGetAroomsQuery(params?.id);
  const room = data?.data;

  // Getting slots
  const { data: slots } = useGetAllSlotsQuery({ roomId: params?.id });
  const availableSlots = slots?.data;

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <Section className="pb-10 bg-gradient-to-b from-gray-100 to-white">
      {Object.values(room).length ? (
        <div className="container mx-auto p-4">
          <h1 className="my-6 font-sans text-3xl font-bold text-blue-600">
            Room Overview
          </h1>
          <div className="bg-white shadow-lg rounded-lg border border-gray-300 grid grid-cols-1 md:grid-cols-2">
            {/* Image Carousel */}
            <div className="w-full">
              <Carousel autoplay arrows={true} effect="fade">
                {room?.roomImg.map((imgUrl: string, index: number) => (
                  <div key={index}>
                    <img
                      src={imgUrl}
                      alt={`Room Image ${index + 1}`}
                      className="w-full mx-auto rounded-lg max-h-[450px] object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Room Information and Amenities */}
            <div className="p-6 md:p-10 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                  Room Name: {room?.name}
                </h1>
                <div className="flex items-center mb-2">
                  <Tag className="text-base font-medium text-white bg-blue-500">
                    Room No: {room?.roomNo}
                  </Tag>
                  <Tag className="text-base font-medium text-white bg-blue-500 ml-2">
                    Floor: {room?.floorNo}
                  </Tag>
                </div>
                <Tag className="text-base font-medium text-white bg-blue-500 mb-2">
                  Capacity: {room?.capacity} persons
                </Tag>
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  Cost Per Slot:{" "}
                  <span className="text-green-600">${room?.pricePerSlot}</span>
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Facilities
                </h2>
                <ul className="gap-4">
                  {room?.amenities.map((amenity: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <FaCheckCircle className="text-blue-600 mr-2" />
                      <span className="text-gray-700">{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Available Slots */}
              <div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4">
                  Free Time Slots
                </h4>
                <div className="max-h-[150px] overflow-y-auto">
                  {availableSlots?.length > 0 ? (
                    availableSlots?.map(
                      (
                        item: {
                          startTime: string;
                          endTime: string;
                          date: string;
                        },
                        idx: number
                      ) => (
                        <div className="flex gap-4 my-1" key={idx}>
                          <div className="flex gap-2">
                            <Tag color="blue">{item?.startTime}</Tag>-
                            <Tag color="blue">{item?.endTime}</Tag>
                          </div>
                          <h2 className="text-gray-600">
                            {moment(item?.date).format("MMM Do YY")}
                          </h2>
                        </div>
                      )
                    )
                  ) : (
                    <h4 className="text-lg font-semibold text-red-500 mb-4">
                      No Available Slots
                    </h4>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pb-8 px-4">
            <BookingModal room={room} />
          </div>
        </div>
      ) : (
        <NoDataFound />
      )}
    </Section>
  );
};

export default RoomDetails;
