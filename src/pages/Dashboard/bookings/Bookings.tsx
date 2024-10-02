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
      title: "No.",
      dataIndex: "no",
      render: (no: number) => <p className="font-medium text-blue-800">{no}</p>,
    },
    {
      title: "Room Name",
      dataIndex: "room",
      render: (room: any) =>
        room?.map((item: { _id: { name: string } }, idx: number) => (
          <p key={idx} className="font-medium text-gray-900">
            {item?._id?.name}
          </p>
        )),
    },
    {
      title: "Room Picture",
      dataIndex: "room",
      render: (room: any) =>
        room?.map((item: { _id: { roomImg: any } }, idx: number) => (
          <Image
            key={idx}
            className="max-w-16 rounded-lg shadow-sm"
            src={item?._id?.roomImg[0]}
          />
        )),
    },
    {
      title: "Date of Booking",
      dataIndex: "room",
      render: (room: any) =>
        room?.map((item: any, idx: number) => (
          <p key={idx} className="font-medium text-gray-700">
            {moment(item?.date).format("MMMM D, YYYY")}
          </p>
        )),
    },
    {
      title: "Scheduled Times",
      dataIndex: "room",
      render: (room: any) =>
        room?.map((item: any) => {
          const slots = item?.slots;

          return slots?.map((slot: any, idx: number) => (
            <p
              key={idx}
              className="text-gray-700"
            >{`${slot?.startTime} - ${slot?.endTime}`}</p>
          ));
        }),
    },
    {
      title: "Status",
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
          {isConfirmed.charAt(0).toUpperCase() + isConfirmed.slice(1)}
        </Tag>
      ),
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Section className="py-8 bg-white rounded-lg shadow-lg">
      <h1 className="mb-5 text-2xl font-semibold text-gray-900">
        Your Reservations
      </h1>
      {bookingData?.length ? (
        <Table
          loading={isFetching}
          dataSource={bookingData}
          columns={Tablecolumn}
          className="rounded-lg overflow-hidden"
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20"],
          }}
          rowClassName={(_record, index) =>
            index % 2 === 0 ? "bg-gray-50" : "bg-white"
          }
        />
      ) : (
        <NoDataFound />
      )}
    </Section>
  );
};

export default Bookings;
