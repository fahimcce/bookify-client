/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDeleteUserMutation, useGetAllUserQuery, useUpdateStatusMutation } from "../../../redux/features/auth/auth.api"
import { Button, Table, TableColumnsType, TableProps, Tag } from "antd";
import { TUser } from "../../../types/TUser";
import { TbTrash } from "react-icons/tb";
import NoDataFound from "../../../components/common/NoDataFound";
import Loading from "../../../components/common/Loading";
import Swal from "sweetalert2";
import { toast } from "sonner";


const AllUsers = () => {
    const [search, setSearch] = useState<string | undefined>(undefined);
    const { data: users, isLoading, isFetching } = useGetAllUserQuery({ search, sort: "role" })
    const [deleteUser] = useDeleteUserMutation()
    const [makeAdmin] = useUpdateStatusMutation();
    const namefiltering: { text: string; value: string }[] = []


    const transformedUser = users?.data?.map((user: TUser, idx: number) => {
        const nameIsExist = namefiltering.some(item => item.text === user?.name && item?.value === user.name)
        if (!nameIsExist) {
            namefiltering.push({
                text: user?.name,
                value: user?.name
            })
        }
        return {
            ...user,
            key: user?._id,
            no: idx + 1
        }
    })

    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteUser(id)
                if (res.data.success) {
                    toast.success(res.data.message)
                } else {
                    toast.error("Something went wrong")
                }
            }
        });
    }


    // handle make Admin
    const handleMakeAdmin = (id: string, role: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are going to make admin this user, You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, Make ${role === "admin" ? "User" : "Admin"}!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await makeAdmin(id)
                if (res.data.success) {
                    toast.success(res.data.message)
                } else {
                    toast.error("Something went wrong")
                }
            }
        });
    }
    const columns: TableColumnsType<TUser> = [
        {
            title: 'No',
            dataIndex: "no",
            render: (text: string) => <a className='md:font-semibold text-xs sm:text-base' style={{ lineHeight: "1" }}>{text}</a>,
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (text: string) => <a className='md:font-semibold text-xs sm:text-base' style={{ lineHeight: "1" }}>{text}</a>,
            // filters: filterableData,
            // onFilter: (value, record) => record.address.indexOf(value as string) === 0,
            filters: namefiltering,
        },
        {
            title: 'Email',
            dataIndex: "email",
            // render: (text: string) => <a className='md:font-bold text-xs sm:text-base' style={{ lineHeight: "1" }}>{text}</a>,
        },
        {
            title: 'Phone',
            dataIndex: "phone",
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (role) => <Tag className="text-sm" color={`${role === "admin" ? "indigo" : "blue"}`}>{role}</Tag>,
            filters: [
                {
                    text: "Admin",
                    value: "admin"
                },
                {
                    text: "User",
                    value: "user"
                }
            ],

        },
        {
            title: 'Action',
            render: (transformedUser) => {
                // console.log(transformSlot?.isBooked)
                return <div className='flex gap-3 items-center'>
                    {/* <EditProduct product={transformedProducts} /> */}

                    <Button onClick={() => handleDelete(transformedUser._id)} className='w-fit p-1 h-auto border-0 text-red-600'><TbTrash size={20} />
                    </Button>
                    <Button onClick={() => handleMakeAdmin(transformedUser?._id, transformedUser?.role)}>{transformedUser?.role === "user" ? "Make Admin" : "Make user"}</Button>
                </div >
            },
        },
    ];

    const onChange: TableProps<TUser>['onChange'] = (_pagination, filters, _sorter, extra) => {
        if (extra?.action === "filter") {
            filters?.role?.forEach((item: any) => setSearch(item))
            filters?.name?.forEach((item: any) => setSearch(item))
        }
    };

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            {
                transformedUser?.length ?
                    <div>
                        <Table
                            scroll={({ x: 800 })}
                            sticky={true}
                            loading={isFetching}
                            onChange={onChange}
                            columns={columns}
                            dataSource={transformedUser}
                        />
                    </div> :
                    <NoDataFound />
            }

        </>
    )
}

export default AllUsers