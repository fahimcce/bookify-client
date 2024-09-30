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

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteSlot(id);
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "no",
      render: (text: string) => (
        <a
          className="md:font-semibold text-xs sm:text-base"
          style={{ lineHeight: "1" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Room Name",
      dataIndex: ["room", "name"],
      render: (text: string) => (
        <a
          className="md:font-semibold text-xs sm:text-base"
          style={{ lineHeight: "1" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Room No",
      dataIndex: ["room", "roomNo"],
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => <p>{moment(date).format("MMM Do YY")}</p>,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
    },
    {
      title: "Status",
      dataIndex: "isBooked",
      render: (isBooked: boolean) => {
        return (
          <Tag color={`${isBooked ? "yellow" : "blue"}`}>
            {!isBooked ? "Available" : "Booked"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      render: (transformSlot) => {
        return (
          <div className="flex gap-3">
            <Button
              onClick={() => handleDelete(transformSlot._id)}
              className="w-fit p-1 h-auto border-0 text-red-600"
            >
              <TbTrash size={20} />
            </Button>
            <UpdateslotModal slotData={transformSlot} />
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {transformSlot?.length ? (
        <div>
          <Table
            scroll={{ x: 800 }}
            // onChange={onChange}
            sticky={true}
            loading={isFetching}
            columns={columns}
            dataSource={transformSlot}
          />
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default AllslotPage;
