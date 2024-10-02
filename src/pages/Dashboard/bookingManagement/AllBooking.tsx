/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, Tag } from "antd";
import {
  useConfirmationBookingMutation,
  useDeleteBookingMutation,
  useGetAllBookingQuery,
} from "../../../redux/api/roomManagement/booking.api";
import moment from "moment";
import { toast } from "sonner";
import { TResponse } from "../../../types/ResponseType";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const AllBooking = () => {
  const { data } = useGetAllBookingQuery({});
  const [confirmBooking] = useConfirmationBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();
  const bookingData = data?.data?.map((booking: any, idx: number) => {
    return { ...booking, key: idx, no: idx + 1 };
  });

  const Tablecolumn = [
    {
      title: "No",
      dataIndex: "no",
      render: (no: number) => <p className="font-bold text-blue-700">{no}</p>,
    },
    {
      title: "Client Name",
      dataIndex: ["user", "name"],
      render: (name: string) => (
        <p className="font-semibold text-gray-900">{name}</p>
      ),
    },
    {
      title: "Room Information",
      dataIndex: "room",
      render: (room: any) => {
        return room?.map(
          (
            item: { _id: { name: string | number | boolean | undefined } },
            idx: number
          ) => {
            return (
              <p key={idx} className="font-semibold text-gray-900">
                {item?._id?.name}
              </p>
            );
          }
        );
      },
    },
    {
      title: "Date of Booking",
      dataIndex: "room",
      render: (room: any) => {
        return room?.map((item: any, idx: number) => {
          return (
            <p key={idx} className="font-semibold text-gray-900">
              {moment(item?.date).format("DD-MMM-YYYY")}
            </p>
          );
        });
      },
    },
    {
      title: "Scheduled Time",
      dataIndex: "room",
      render: (room: any) => {
        return room?.map((item: any) => {
          const slots = item?.slots;
          return slots?.map((slot: any, idx: number) => {
            return (
              <p key={idx} className="text-gray-800">
                {`${slot?.startTime} - ${slot?.endTime}`}
              </p>
            );
          });
        });
      },
    },
    {
      title: "Current Status",
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
    {
      title: "Actions",
      render: (allData: any) => {
        return (
          <div className="flex gap-2 items-center">
            <Button
              disabled={allData?.isConfirmed === "canceled"}
              className="bg-teal-600 text-white hover:bg-teal-700 transition duration-300"
              onClick={() => handleConfirm(allData?._id, allData?.isConfirmed)}
            >
              {allData?.isConfirmed === "canceled"
                ? "Rejected"
                : allData?.isConfirmed === "confirmed"
                ? "Revert"
                : "Approve"}
            </Button>
            <Button
              onClick={() =>
                handleConfirm(
                  allData?._id,
                  allData?.isConfirmed === "canceled"
                    ? "unconfirmed"
                    : "canceled"
                )
              }
              className="bg-red-600 text-white hover:bg-red-700 transition duration-300"
            >
              {allData?.isConfirmed === "canceled" ? "Reapprove" : "Cancel"}
            </Button>
            <Button className="px-2" onClick={() => handleDelete(allData?._id)}>
              <FaTrash className="text-red-600 hover:text-red-700 transition duration-300" />
            </Button>
          </div>
        );
      },
    },
  ];

  const handleConfirm = async (id: string, status: string) => {
    const newStatus =
      status === "unconfirmed"
        ? "confirmed"
        : status === "confirmed"
        ? "unconfirmed"
        : "canceled";
    const toastId = toast.loading("Updating your booking...");
    const res = (await confirmBooking({
      id,
      status: newStatus,
    })) as TResponse<any>;
    if (res.data) {
      toast.success(res.data.message, { id: toastId });
    } else {
      toast.error(res.error?.message || res.error?.data?.message, {
        id: toastId,
      });
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Delete Confirmation",
      text: "This action is irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      cancelButtonColor: "#5bc0de",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const toastId = toast.loading("Removing booking...");
        const res = (await deleteBooking(id)) as TResponse<any>;
        if (res.data) {
          toast.success(res.data.message, { id: toastId });
        } else if (res.error) {
          toast.error(res.error?.data?.message, { id: toastId });
        } else {
          toast.error("An unexpected error occurred.", { id: toastId });
        }
      }
    });
  };

  return (
    <>
      <Table
        dataSource={bookingData}
        columns={Tablecolumn}
        className="bg-white rounded-lg shadow-lg"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20"],
        }}
        rowClassName={(_record, index) =>
          index % 2 === 0 ? "bg-gray-50" : "bg-white"
        }
      />
    </>
  );
};

export default AllBooking;
