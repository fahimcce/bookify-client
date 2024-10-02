/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateStatusMutation,
} from "../../../redux/features/auth/auth.api";
import { Button, Table, TableColumnsType, TableProps, Tag } from "antd";
import { TUser } from "../../../types/TUser";
import { TbTrash } from "react-icons/tb";
import NoDataFound from "../../../components/common/NoDataFound";
import Loading from "../../../components/common/Loading";
import Swal from "sweetalert2";
import { toast } from "sonner";

const AllUsers = () => {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const {
    data: users,
    isLoading,
    isFetching,
  } = useGetAllUserQuery({ search, sort: "role" });
  const [deleteUser] = useDeleteUserMutation();
  const [makeAdmin] = useUpdateStatusMutation();
  const namefiltering: { text: string; value: string }[] = [];

  const transformedUser = users?.data?.map((user: TUser, idx: number) => {
    const nameIsExist = namefiltering.some(
      (item) => item.text === user?.name && item?.value === user.name
    );
    if (!nameIsExist) {
      namefiltering.push({
        text: user?.name,
        value: user?.name,
      });
    }
    return {
      ...user,
      key: user?._id,
      no: idx + 1,
    };
  });

  // Handle deletion with confirmation
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "This action cannot be undone. Proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#276749", // Dark green color
      cancelButtonColor: "#b91c1c", // Red color for cancel button
      confirmButtonText: "Yes, remove!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUser(id);
        if (res.data.success) {
          toast.success("User successfully removed.");
        } else {
          toast.error("Failed to delete the user.");
        }
      }
    });
  };

  // Handle role update (e.g., make admin)
  const handleMakeAdmin = (id: string, role: string) => {
    Swal.fire({
      title: `Change Role`,
      text: `You are about to assign ${
        role === "admin" ? "User" : "Admin"
      } privileges. Continue?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#2563eb", // Blue for confirmation
      cancelButtonColor: "#b91c1c", // Red for cancel
      confirmButtonText: `Yes, change role to ${
        role === "admin" ? "User" : "Admin"
      }`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await makeAdmin(id);
        if (res.data.success) {
          toast.success(`Role successfully changed to ${res.data.role}.`);
        } else {
          toast.error("Role update failed.");
        }
      }
    });
  };

  // Define columns for the user table
  const columns: TableColumnsType<TUser> = [
    {
      title: "No",
      dataIndex: "no",
      render: (text: string) => (
        <a className="font-semibold text-sm text-gray-700">{text}</a>
      ),
    },
    {
      title: "User Name",
      dataIndex: "name",
      filters: namefiltering,
      render: (text: string) => (
        <a className="font-medium text-sm text-gray-900">{text}</a>
      ),
    },
    {
      title: "Email Address",
      dataIndex: "email",
      render: (text: string) => (
        <span className="text-sm text-gray-600">{text}</span>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      render: (text: string) => (
        <span className="text-sm text-gray-600">{text}</span>
      ),
    },
    {
      title: "User Role",
      dataIndex: "role",
      render: (role) => (
        <Tag
          className="text-sm"
          color={`${role === "admin" ? "geekblue" : "cyan"}`}
        >
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Tag>
      ),
      filters: [
        {
          text: "Administrator",
          value: "admin",
        },
        {
          text: "Regular User",
          value: "user",
        },
      ],
    },
    {
      title: "Actions",
      render: (user) => (
        <div className="flex space-x-3">
          <Button
            onClick={() => handleDelete(user._id)}
            className="bg-red-500 text-white p-2 hover:bg-red-600"
          >
            <TbTrash size={18} />
          </Button>
          <Button
            onClick={() => handleMakeAdmin(user._id, user.role)}
            className="bg-blue-500 text-white p-2 hover:bg-blue-600"
          >
            {user.role === "user" ? "Promote to Admin" : "Demote to User"}
          </Button>
        </div>
      ),
    },
  ];

  // Handle filtering
  const onChange: TableProps<TUser>["onChange"] = (_pagination, filters) => {
    if (filters?.role && filters.role[0]) {
      setSearch(filters.role[0] as string);
    }
    if (filters?.name && filters.name[0]) {
      setSearch(filters.name[0] as string);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {transformedUser?.length ? (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <Table
            scroll={{ x: 800 }}
            sticky={true}
            loading={isFetching}
            onChange={onChange}
            columns={columns}
            dataSource={transformedUser}
          />
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default AllUsers;
