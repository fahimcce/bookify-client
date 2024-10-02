/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Card, Modal } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { clearBookingSlice } from "../../redux/features/bookings/bookingSlice";

const SuccessModal = ({
  isSuccessModalOpen,
  setIsSuccessModalOpen,
  id,
  total,
  totalRoom,
  totalSlot,
}: {
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: any;
  id: string;
  total: number;
  totalRoom: number;
  totalSlot: number;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleViewBookings = () => {
    navigate("/myBookings");
  };

  const handleGoHome = () => {
    dispatch(clearBookingSlice());
    navigate("/");
  };

  const handleOk = () => {
    dispatch(clearBookingSlice());
    setIsSuccessModalOpen(false);
  };

  const handleCancel = () => {
    dispatch(clearBookingSlice());
    setIsSuccessModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Booking Status"
        open={isSuccessModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="success-modal"
        centered
        footer={null} // No default footer, we will create our own buttons
      >
        <div className="relative flex flex-col items-center justify-center">
          <Confetti
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            numberOfPieces={300}
            opacity={0.9}
          />
          <Card
            className="relative z-10 p-6 text-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg rounded-lg"
            style={{ maxWidth: "700px", width: "100%" }}
          >
            <CheckCircleOutlined className="text-6xl mb-4" />
            <h1 className="text-3xl font-extrabold mb-4">
              Your Booking is Successful!
            </h1>
            <p className="text-md mb-8">
              Thank you for choosing Bookify! Your reservation has been
              confirmed.
            </p>
            <div className="flex flex-col items-start pb-4 gap-2">
              <p className="font-semibold">
                Booking ID: <span className="font-normal">{id}</span>
              </p>
              <p className="font-semibold">
                Total Amount:{" "}
                <span className="font-normal">${total.toFixed(2)}</span>
              </p>
              <p className="font-semibold">
                Rooms Booked: <span className="font-normal">{totalRoom}</span>
              </p>
              <p className="font-semibold">
                Total Slots: <span className="font-normal">{totalSlot}</span>
              </p>
            </div>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Button
                type="primary"
                size="large"
                className="w-full rounded-md shadow-md hover:shadow-lg transition duration-200 ease-in-out"
                onClick={handleViewBookings}
              >
                My Bookings
              </Button>
              <Button
                size="large"
                className="w-full bg-gray-200 text-gray-800 rounded-md shadow-md hover:shadow-lg transition duration-200 ease-in-out"
                onClick={handleGoHome}
              >
                Return to Homepage
              </Button>
            </div>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default SuccessModal;
