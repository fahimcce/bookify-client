/* eslint-disable @typescript-eslint/no-explicit-any */
import { Image, Table, Tag } from "antd";
import moment from "moment";
import Section from "../../../components/common/Section";
import { useGetMyBookingsQuery } from "../../../redux/api/roomManagement/booking.api";
import Loading from "../../../components/common/Loading";
import NoDataFound from "../../../components/common/NoDataFound";

const Bookings = () => {
  const { data, isFetching, isLoading } = useGetMyBookingsQuery({});
  const bookingData = data?.data?.map((booking: any, idx: number) => ({
    ...booking,
    key: idx,
    no: idx + 1,
  }));

  const Tablecolumn = [
    {
      title: "S/N",
      dataIndex: "no",
      render: (no: number) => <p className="font-medium text-gray-700">{no}</p>,
    },
    {
      title: "Room Title",
      dataIndex: "room",
      render: (room: any) =>
        room?.map((item: { _id: { name: string } }, idx: number) => (
          <p key={idx} className="font-medium text-gray-800">
            {item?._id?.name}
          </p>
        )),
    },
    {
      title: "Room Image",
      dataIndex: "room",
      render: (room: any) =>
        room?.map((item: { _id: { roomImg: any } }, idx: number) => (
          <Image key={idx} className="max-w-16" src={item?._id?.roomImg[0]} />
        )),
    },
    {
      title: "Booking Date",
      dataIndex: "room",
      render: (room: any) =>
        room?.map((item: any, idx: number) => (
          <p key={idx} className="font-medium text-gray-600">
            {moment(item?.date).format("DD-MMM-YYYY")}
          </p>
        )),
    },
    {
      title: "Time Slots",
      dataIndex: "room",
      render: (room: any) =>
        room?.map((item: any) => {
          const slots = item?.slots;

          return slots?.map((slot: any, idx: number) => (
            <p
              key={idx}
              className="text-gray-600"
            >{`${slot?.startTime} - ${slot?.endTime}`}</p>
          ));
        }),
    },
    {
      title: "Booking Status",
      dataIndex: "isConfirmed",
      render: (isConfirmed: string) => (
        <Tag
          color={
            isConfirmed === "unconfirmed"
              ? "orange"
              : isConfirmed === "confirmed"
              ? "green"
              : "red"
          }
        >
          {isConfirmed}
        </Tag>
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Section className="py-8 bg-gray-50 rounded-lg shadow-md">
      <h1 className="mb-5 text-xl font-bold text-gray-800">Your Bookings</h1>
      {bookingData?.length ? (
        <Table
          loading={isFetching}
          dataSource={bookingData}
          columns={Tablecolumn}
        />
      ) : (
        <NoDataFound />
      )}
    </Section>
  );
};

export default Bookings;
