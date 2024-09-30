
import { Carousel, Tag } from 'antd'; // Ant Design's Carousel component
import { FaCheckCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import Section from '../../components/common/Section';
import moment from 'moment';
import BookingModal from './BookingModal';
import { useGetAroomsQuery } from '../../redux/api/roomManagement/room.api';
import { useGetAllSlotsQuery } from '../../redux/api/roomManagement/slot.api';
import NoDataFound from '../../components/common/NoDataFound';


// interface RoomDetailsProps {
//     name: string;
//     roomNo: number;
//     floorNo: number;
//     capacity: number;
//     pricePerSlot: number;
//     amenities: string[];
//     roomImg: string[];
// }

const RoomDetails = () => {
    const params = useParams()
    const { data, isLoading, isFetching } = useGetAroomsQuery(params?.id)
    const room = data?.data;
    // getting slots

    const { data: slots } = useGetAllSlotsQuery({ roomId: params?.id })
    const availableSlots = slots?.data;

    if (isLoading || isFetching) {
        return <Loading />
    }
    return (
        <Section className='pb-10'>
            {
                Object.values(room).length ?
                    <div className="container mx-auto p-4">
                        <h1 className='my-6 font-roboto text-2xl font-semibold'>Room Details</h1>
                        <div className="bg-white shadow-lg rounded-lg">
                            {/* Image Carousel */}
                            <div className="w-full">
                                <Carousel autoplay arrows={true}>
                                    {room?.roomImg.map((imgUrl: string, index: number) => (
                                        <div key={index}>
                                            <img
                                                src={imgUrl}
                                                alt={`Room Image ${index + 1}`}
                                                className="w-full mx-auto rounded-md max-h-[450px] object-cover"
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>

                            {/* Room Information */}
                            <div className="p-3 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div className='flex flex-col gap-4'>
                                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Name: {room?.name}</h1>
                                    <p className="text-gray-600 mb-2"> <Tag className='text-base font-semibold md:text-lg' color='blue'>Room No: {room?.roomNo}</Tag> | <Tag className='text-base font-semibold md:text-lg' color='blue'> Floor: {room?.floorNo}</Tag></p>
                                    <p className="text-gray-600 mb-2"><Tag className='text-base font-semibold md:text-lg' color='blue'>Capacity: {room?.capacity} people</Tag></p>
                                    <p className="text-2xl font-semibold text-gray-800 mb-6">Price Per Slot: ${room?.pricePerSlot}</p>
                                </div>
                                {/* Amenities */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Amenities</h2>
                                    <ul className="gap-4">
                                        {room?.amenities.map((amenity: string, index: number) => (
                                            <li key={index} className="flex items-center">
                                                <FaCheckCircle className="text-blue-500 mr-2" />
                                                <span className="text-gray-600">{amenity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-2xl font-semibold text-gray-800 mb-4">Available Slots</h4>
                                    <div className='max-h-[150px] overflow-y-auto'>
                                        {
                                            availableSlots?.length > 0 ?
                                                availableSlots?.map((items: { startTime: string, endTime: string, date: string }, idx: number) => (
                                                    <div className='flex gap-3' key={idx}>
                                                        <div className='felx gap-2'>
                                                            <Tag>{items?.startTime}</Tag>-<Tag> {items?.endTime}</Tag>
                                                        </div>
                                                        <h2><p>{moment(items?.date).format("MMM Do YY")}</p></h2>
                                                    </div>
                                                )) :
                                                <h4 className="text-base md:text-xl font-semibold text-gray-800 mb-4">Not Available Slots</h4>
                                        }
                                    </div>
                                </div>

                            </div>

                            <div className="flex justify-center pb-8 px-4">
                                <BookingModal room={room} />
                            </div>
                        </div>
                    </div> :
                    <NoDataFound />
            }
        </Section>
    );
};

export default RoomDetails;
