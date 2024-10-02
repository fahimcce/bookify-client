/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Table, TableColumnsType, Tag } from "antd";
import { DataType } from "../rooms/AllRoomsTable";
import Loading from "../../../components/common/Loading";
import moment from "moment";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { TbTrash } from "react-icons/tb";
import UpdateslotModal from "./UpdateSlotModal";
import NoDataFound from "../../../components/common/NoDataFound";
import {
  useDeleteSlotMutation,
  useGetAllSlotsQuery,
} from "../../../redux/api/roomManagement/slot.api";

const AllslotPage = () => {
  const { data, isLoading, isFetching } = useGetAllSlotsQuery({});
  const [deleteSlot] = useDeleteSlotMutation();

  const transformSlot = data?.data?.map((slot: any, index: number) => {
    return {
      ...slot,
      key: slot._id,
      no: index + 1,
    };
  });

  // Function for slot deletion with updated confirmation prompt
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Confirm Deletion?",
      text: "This action is irreversible. Proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#007BFF", // Changed confirm button color
      cancelButtonColor: "#FF5733", // Changed cancel button color
      confirmButtonText: "Delete Slot",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteSlot(id);
        if (res.data.success) {
          toast.success(res.data.message || "Slot removed successfully!");
        } else {
          toast.error("Failed to delete. Please try again.");
        }
      }
    });
  };

  // Define the columns for the table
  const columns: TableColumnsType<DataType> = [
    {
      title: "S/N",
      dataIndex: "no",
      render: (text: string) => (
        <span
          className="font-medium text-sm"
          style={{ lineHeight: "1.2", color: "#4A4A4A" }} // Modified text color and size
        >
          {text}
        </span>
      ),
    },
    {
      title: "Room Title",
      dataIndex: ["room", "name"],
      render: (text: string) => (
        <span
          className="font-medium text-sm"
          style={{ lineHeight: "1.2", color: "#009688" }} // Changed text color to teal
        >
          {text}
        </span>
      ),
    },
    {
      title: "Room Number",
      dataIndex: ["room", "roomNo"],
      render: (roomNo: string) => (
        <span className="text-gray-700">{roomNo}</span> // Text for room number
      ),
    },
    {
      title: "Date Reserved",
      dataIndex: "date",
      render: (date) => (
        <span>{moment(date).format("MMMM Do, YYYY")}</span> // Full month, day, and year format
      ),
    },
    {
      title: "Starts At",
      dataIndex: "startTime",
      render: (time) => (
        <span className="text-indigo-600">{time}</span> // Changed text color for time
      ),
    },
    {
      title: "Ends At",
      dataIndex: "endTime",
      render: (time) => (
        <span className="text-red-600">{time}</span> // Changed text color for end time
      ),
    },
    {
      title: "Current Status",
      dataIndex: "isBooked",
      render: (isBooked: boolean) => {
        return (
          <Tag color={`${isBooked ? "orange" : "green"}`}>
            {" "}
            {/* Updated colors */}
            {!isBooked ? "Open" : "Reserved"}
          </Tag>
        );
      },
    },
    {
      title: "Operations",
      render: (transformSlot) => {
        return (
          <div className="flex gap-3">
            <Button
              onClick={() => handleDelete(transformSlot._id)}
              className="w-fit p-1 h-auto border-0 text-[#DC3545]" // Custom red color for delete button
            >
              <TbTrash size={18} />
            </Button>
            <UpdateslotModal slotData={transformSlot} />
          </div>
        );
      },
    },
  ];

  // Show loading indicator while data is being fetched
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {transformSlot?.length ? (
        <div className="p-4 bg-[#F7F9FB]">
          {" "}
          {/* Light background color */}
          <Table
            scroll={{ x: 800 }}
            sticky={true}
            loading={isFetching}
            columns={columns}
            dataSource={transformSlot}
            className="shadow-lg" // Added box-shadow for the table
          />
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default AllslotPage;
