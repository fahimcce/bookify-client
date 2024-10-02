/* eslint-disable @typescript-eslint/no-explicit-any */
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button, Table, TableColumnsType } from "antd";
import moment from "moment";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { removeBooking } from "../../redux/features/bookings/bookingSlice";
import Section from "../../components/common/Section";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import NoDataFound from "../../components/common/NoDataFound";

const stripePromise = loadStripe(
  import.meta.env.VITE_Publishable_Key as string
);

const CheckOutPage = () => {
  const { booking } = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  let name;
  let address;
  let phone;
  let email;
  const room: { _id: string; date: string; slots: [] }[] = [];
  let totalAmount = 0;
  let userId = "";

  const eachsslots: string[] | any = [];

  const tableProps = booking?.map((item, idx) => {
    item?.slots?.map((item) => {
      eachsslots.push(item.split(",")[0]);
    });
    totalAmount += item?.totalAmount;
    userId = item?.user;
    phone = item?.phone;
    name = item?.userName;
    email = item?.email;
    address = item?.address;
    room.push({
      _id: `${item?.room?._id}`,
      date: `${item?.date}`,
      slots: eachsslots,
    });

    return {
      key: idx + 1,
      ...item,
      no: idx + 1,
    };
  });
  // make booking info
  const bookingInfo = {
    totalAmount: totalAmount,
    email,
    user: userId,
    phone,
    room,
  };

  const columns: TableColumnsType = [
    {
      title: "No",
      dataIndex: "no",
    },
    {
      title: "Room Name",
      dataIndex: "room",
      render: (room) => <p>{room?.name}</p>,
    },
    {
      title: "Times",
      dataIndex: "slots",
      render: (slots) =>
        slots?.map((time: string) => {
          return (
            <span
              className="bg-indigo-500 text-white font-thin mx-1 rounded"
              key={time}
            >
              {time.split(",")[1]}
            </span>
          );
        }),
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => <p>{moment(date).format("DD/MM/YYYY")}</p>,
    },
    {
      title: "Action",
      dataIndex: "room",
      render: (room) => (
        <Button onClick={() => handleRemove(room._id)}>Remove</Button>
      ),
    },
  ];

  useEffect(() => {
    if (booking?.length) {
      window.onbeforeunload = () => true;
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [booking]);

  const handleRemove = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeBooking(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <Section className="py-5 md:py-16">
      <h3 className="sm:tex-lg lg:text-xl font-semibold text-center font-roboto">
        Booking Summary
      </h3>
      <div className="mt-5">
        {booking?.length ? (
          <div className="flex justify-between flex-col md:flex-row gap-3">
            <div className="w-full">
              <Table
                columns={columns}
                dataSource={tableProps}
                pagination={false}
                scroll={{ x: 500 }}
              />
              <div className="mt-10">
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    bookingInfo={bookingInfo}
                    total={totalAmount}
                  ></CheckoutForm>
                </Elements>
              </div>
            </div>
            <div className="my-1 p-2 md:p-4 md:min-w-[400px] text-left shadow">
              <h2 className="font-bold font-poppins text-lg md:text-xl border-b pb-2">
                User Info
              </h2>
              <h2 className="py-1 font-roboto font-semibold mt-4 text-lightText">
                Name: {name}
              </h2>
              <h2 className="py-1 font-roboto font-semibold mt-4 text-lightText">
                Email: {email}
              </h2>
              <h2 className="py-1 font-roboto font-semibold mt-4 text-lightText">
                Address: {address}
              </h2>
            </div>
          </div>
        ) : (
          <NoDataFound />
        )}
      </div>
    </Section>
  );
};

export default CheckOutPage;
