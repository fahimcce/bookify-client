/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Divider, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { TbTrash } from "react-icons/tb";
import Swal from "sweetalert2";
import { toast } from "sonner";
import AddaRoomModal from "./AddRoomModal";
import {
  useDeleteRoomMutation,
  useGetAllRoomsQuery,
} from "../../../redux/api/roomManagement/room.api";

export interface DataType {
  key: React.Key;
  image: string;
  name: string;
  brand: string;
  availableQuantity: number;
  price: number;
  rating: number;
  description: string;
  delete?: boolean | undefined;
}

const AllRoomsTable: React.FC = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetching } = useGetAllRoomsQuery({
    search,
    limit: 10,
  });
  const rooms = data?.data?.result;
  const filterableData: { text: string; value: string }[] = [];
  const transformedProducts = rooms?.map((room: any, index: number) => {
    filterableData.push({ text: room?.name, value: room.name });
    return {
      ...room,
      key: room._id,
      no: index + 1,
    };
  });

  const [deleteRoom] = useDeleteRoomMutation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to remove this room? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3498db",
      cancelButtonColor: "#e74c3c",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteRoom(id);
        if (res.data.success) {
          toast.success("Room successfully removed");
        } else {
          toast.error("An error occurred while deleting");
        }
      }
    });
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "No.",
      dataIndex: "no",
      render: (text: string) => (
        <span className="text-sm font-medium text-gray-700">{text}</span>
      ),
    },
    {
      title: "Room Name",
      dataIndex: "name",
      render: (text: string) => (
        <span className="text-base font-bold text-blue-600">{text}</span>
      ),
      filters: filterableData,
    },
    {
      title: "Room Number",
      dataIndex: "roomNo",
    },
    {
      title: "Amenities",
      dataIndex: "amenities",
      render: (amenities) => (
        <div className="flex flex-wrap gap-1">
          {amenities?.map((item: string) => (
            <span key={item} className="text-sm text-gray-600">
              {item},
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Price Per Slot",
      dataIndex: "pricePerSlot",
      render: (price: number) => (
        <span className="text-green-600 font-medium">${price}</span>
      ),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      render: (capacity: number) => <span>{capacity} people</span>,
    },
    {
      title: "Actions",
      render: (room) => (
        <div className="flex gap-4">
          <AddaRoomModal isUpdate={true} transformedProducts={room} />
          <Button
            onClick={() => handleDelete(room._id)}
            className="p-2 bg-transparent text-red-500 hover:bg-red-100 border-0"
          >
            <TbTrash size={18} />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <h3 className="text-center text-xl font-semibold">Loading rooms...</h3>
    );
  }

  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra?.action === "filter") {
      filters?.name?.forEach((item) => setSearch(`${item}`));
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Divider className="my-3" />
      <Table
        scroll={{ x: 800 }}
        onChange={onChange}
        sticky={true}
        loading={isFetching}
        columns={columns}
        dataSource={transformedProducts}
      />
    </div>
  );
};

export default AllRoomsTable;
